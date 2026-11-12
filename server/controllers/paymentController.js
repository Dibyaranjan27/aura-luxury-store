import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

let stripe = null;
if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.startsWith('sk_')) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
}

// @desc    Create Stripe Payment Intent
// @route   POST /api/payment/create-payment-intent
// @access  Public
export const createPaymentIntent = async (req, res, next) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      res.status(400);
      throw new Error('Valid order amount is required');
    }

    if (stripe) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Stripe expects cents
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.json({
        clientSecret: paymentIntent.client_secret,
        id: paymentIntent.id,
      });
    } else {
      // Development mock response if real Stripe key hasn't been set yet
      res.json({
        clientSecret: `mock_pi_secret_${Date.now()}`,
        id: `pi_test_${Date.now()}`,
        mock: true,
      });
    }
  } catch (error) {
    next(error);
  }
};
