import Cart from "../models/cart.js";
import Product from "../models/product.js";
import asyncHandler from "../utils/asynchandler.js";
import { ApiResponse, ApiError } from "../utils/apiresponse.js";

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
};

// @route   GET /api/cart
// @access  Private
export const getCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user.id);
  return ApiResponse.success(res, { data: { cart } });
});

// @route   POST /api/cart/items
// @access  Private
export const addItem = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  const product = await Product.findById(productId);
  if (!product || !product.isActive) throw new ApiError(404, 'Product not found');
  if (product.stock < quantity) throw new ApiError(400, `Only ${product.stock} unit(s) in stock`);

  const cart = await getOrCreateCart(req.user.id);
  const existingItem = cart.items.find((i) => i.product.toString() === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url,
      quantity,
    });
  }

  await cart.save();
  return ApiResponse.success(res, { message: 'Item added to cart', data: { cart } });
});

// @route   PATCH /api/cart/items/:productId
// @access  Private
export const updateItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  if (!quantity || quantity < 1) throw new ApiError(400, 'Quantity must be at least 1');

  const cart = await getOrCreateCart(req.user.id);
  const item = cart.items.find((i) => i.product.toString() === req.params.productId);
  if (!item) throw new ApiError(404, 'Item not found in cart');

  const product = await Product.findById(item.product);
  if (product && product.stock < quantity) throw new ApiError(400, `Only ${product.stock} unit(s) in stock`);

  item.quantity = quantity;
  await cart.save();

  return ApiResponse.success(res, { message: 'Cart updated', data: { cart } });
});

// @route   DELETE /api/cart/items/:productId
// @access  Private
export const removeItem = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user.id);
  cart.items = cart.items.filter((i) => i.product.toString() !== req.params.productId);
  await cart.save();

  return ApiResponse.success(res, { message: 'Item removed from cart', data: { cart } });
});

// @route   DELETE /api/cart
// @access  Private
export const clearCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user.id);
  cart.items = [];
  await cart.save();

  return ApiResponse.success(res, { message: 'Cart cleared', data: { cart } });
});


export default {
  getCart,
  addItem,
  updateItem,
  removeItem,
  clearCart
};