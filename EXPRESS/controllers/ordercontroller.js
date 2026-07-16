import mongoose from "mongoose";
import Cart from "../models/cart.js";
import Order from "../models/order.js";
import Product from "../models/product.js";
import Coupon from "../models/coupon.js";
import asyncHandler from "../utils/asynchandler.js";
import { ApiResponse, ApiError } from "../utils/apiresponse.js";
import { createPaymentIntent } from "../services/paymentservice.js";
import { sendOrderConfirmation } from "../services/emailservice.js";

const SHIPPING_FLAT_RATE = 10;
const TAX_RATE = 0.08; // for experiement

// @route   POST /api/orders
// @access  Private

export const createOrder = asyncHandler(async (req, res) => {
  const { shippingAddress, paymentMethod, couponCode } = req.body;

  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart || cart.items.length === 0) throw new ApiError(400, 'Your cart is empty');

  // Re-check stock at checkout time — it may have changed since items were added to cart
  for (const item of cart.items) {
    const product = await Product.findById(item.product);
    if (!product || !product.isActive) throw new ApiError(400, `${item.name} is no longer available`);
    if (product.stock < item.quantity) {
      throw new ApiError(400, `Only ${product.stock} unit(s) of ${item.name} left in stock`);
    }
  }

  const itemsPrice = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : SHIPPING_FLAT_RATE; // free shipping over $100
  const taxPrice = Math.round(itemsPrice * TAX_RATE * 100) / 100;

  let discountAmount = 0;
  let appliedCoupon = null;
  if (couponCode) {
    const coupon = await Coupon.findOne({ code: couponCode.toUpperCase() });
    if (!coupon) throw new ApiError(404, 'Coupon not found');

    const { valid, reason } = coupon.isValid(itemsPrice);
    if (!valid) throw new ApiError(400, reason);

    discountAmount = coupon.calculateDiscount(itemsPrice);
    appliedCoupon = coupon;
  }

  const totalPrice = Math.max(itemsPrice + shippingPrice + taxPrice - discountAmount, 0);

  // Use a transaction so decrement stock + create order + clear cart happen
  // if any step fails, nothing is left half-applied
  const session = await mongoose.startSession();
  let order;
  try {
    await session.withTransaction(async () => {
      order = await Order.create(
        [
          {
            user: req.user.id,
            orderItems: cart.items.map((i) => ({
              product: i.product,
              name: i.name,
              image: i.image,
              price: i.price,
              quantity: i.quantity,
            })),
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            discountAmount,
            couponCode: appliedCoupon?.code,
            totalPrice,
          },
        ],
        { session }
      );
      order = order[0];

      for (const item of cart.items) {
        await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } }, { session });
      }

      if (appliedCoupon) {
        appliedCoupon.usedCount += 1;
        await appliedCoupon.save({ session });
      }

      cart.items = [];
      await cart.save({ session });
    });
  } finally {
    session.endSession();
  }

  let clientSecret = null;
  if (paymentMethod === 'stripe') {
    const paymentIntent = await createPaymentIntent({
      amount: totalPrice,
      orderId: order._id.toString(),
      customerEmail: req.user.email,
    });
    order.paymentResult = { id: paymentIntent.id, status: paymentIntent.status };
    await order.save();
    clientSecret = paymentIntent.client_secret;
  }

  sendOrderConfirmation(order, req.user.email); // fire-and-forget, doesn't block the response

  return ApiResponse.success(res, {
    statusCode: 201,
    message: 'Order created',
    data: { order, clientSecret },
  });
});

// @route   GET /api/orders/my-orders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort('-createdAt');
  return ApiResponse.success(res, { data: { orders } });
});

// @route   GET /api/orders/:id
// @access  Private (owner) or Admin
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) throw new ApiError(404, 'Order not found');

  const isOwner = order.user._id.toString() === req.user.id;
  if (!isOwner && req.user.role !== 'admin') throw new ApiError(403, 'Not authorized to view this order');

  return ApiResponse.success(res, { data: { order } });
});

// @route   PATCH /api/orders/:id/cancel
// @access  Private (owner)
export const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) throw new ApiError(404, 'Order not found');
  if (order.user.toString() !== req.user.id) throw new ApiError(403, 'Not authorized');
  if (['shipped', 'delivered'].includes(order.status)) {
    throw new ApiError(400, `Cannot cancel an order that is already ${order.status}`);
  }

  order.status = 'cancelled';
  await order.save();

  // Restock items since the order never shipped
  await Promise.all(
    order.orderItems.map((i) => Product.findByIdAndUpdate(i.product, { $inc: { stock: i.quantity } }))
  );

  return ApiResponse.success(res, { message: 'Order cancelled', data: { order } });
});

// ---------- Admin ----------

// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};

  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit) || 20, 100);
  const skip = (page - 1) * limit;

  const [orders, total] = await Promise.all([
    Order.find(filter).populate('user', 'name email').sort('-createdAt').skip(skip).limit(limit),
    Order.countDocuments(filter),
  ]);

  return ApiResponse.success(res, {
    data: { orders },
    meta: { page, limit, total, pages: Math.ceil(total / limit) },
  });
});

// @route   PATCH /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, trackingNumber } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order) throw new ApiError(404, 'Order not found');

  order.status = status;
  if (trackingNumber) order.trackingNumber = trackingNumber;
  if (status === 'delivered') {
    order.isDelivered = true;
    order.deliveredAt = new Date();
  }

  await order.save();
  return ApiResponse.success(res, { message: 'Order status updated', data: { order } });
});
export default {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus
};