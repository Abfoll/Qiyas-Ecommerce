import Order from "../models/order.js";
import asyncHandler from "../utils/asynchandler.js";
import { ApiResponse, ApiError } from "../utils/apiresponse.js";
import { constructWebhookEvent } from "../services/paymentservice.js";
import logger from "../utils/logger.js";

// @route   POST /api/webhooks/stripe
// @access  Public 

export const stripeWebhook = asyncHandler(async (req, res) => {
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = constructWebhookEvent(req.body, signature);
  } catch (err) {
    logger.warn(`Stripe webhook signature verification failed: ${err.message}`);
    throw new ApiError(400, `Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata.orderId;

      const order = await Order.findById(orderId);
      if (order) {
        order.isPaid = true;
        order.paidAt = new Date();
        order.status = 'processing';
        order.paymentResult = {
          id: paymentIntent.id,
          status: paymentIntent.status,
          updateTime: new Date().toISOString(),
          email: paymentIntent.receipt_email,
        };
        await order.save();
        logger.info(`Order ${orderId} marked as paid via Stripe webhook`);
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object;
      logger.warn(`Payment failed for order ${paymentIntent.metadata.orderId}`);
      break;
    }

    default:
      logger.debug(`Unhandled Stripe event type: ${event.type}`);
  }

  // Stripe expects a fast 200 response just to confirm receipt
  return ApiResponse.success(res, { message: 'Webhook received' });
});
export default {
  stripeWebhook
};