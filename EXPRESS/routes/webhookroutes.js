import express from 'express';
import { stripeWebhook } from '../controllers/paymentcontroller.js';

const router = express.Router();

// No `protect` middleware here — Stripe can't send a JWT.
// Authenticity is instead verified via the Stripe-Signature header inside the controller.
router.post('/stripe', stripeWebhook);

export default router;
