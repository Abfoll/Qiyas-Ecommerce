import stripe from '../config/payment.js';

/**
 * Creates a Stripe PaymentIntent for a given order.
 * Amount must be in the smallest currency unit (cents for USD).
 */
const createPaymentIntent = async ({ amount, currency = 'usd', orderId, customerEmail }) => {
  return stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency,
    metadata: { orderId },
    receipt_email: customerEmail,
    automatic_payment_methods: { enabled: true },
  });
};


const constructWebhookEvent = (rawBody, signature) => {
  return stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
};

export { createPaymentIntent, constructWebhookEvent };
