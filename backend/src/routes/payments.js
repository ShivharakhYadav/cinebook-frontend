const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create payment intent
router.post('/create-payment-intent', authMiddleware, [
  body('showId').isMongoId().withMessage('Valid show ID is required'),
  body('seats').isArray({ min: 1, max: 6 }).withMessage('Must select 1-6 seats'),
  body('amount').isFloat({ min: 1 }).withMessage('Valid amount is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { amount, showId, seats } = req.body;

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to paise
      currency: 'inr',
      payment_method_types: ['card'],
      metadata: {
        showId,
        seats: seats.join(','),
        userId: req.user._id.toString()
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Create payment intent error:', error);
    res.status(500).json({ message: 'Payment initialization failed' });
  }
});

// Webhook to handle payment confirmation
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle payment succeeded event
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      const { showId, seats, userId } = paymentIntent.metadata;

      // Find and update the booking
      const booking = await Booking.findOne({
        userId,
        showId,
        seats: { $all: seats.split(',') },
        paymentStatus: 'pending'
      });

      if (booking) {
        booking.paymentStatus = 'paid';
        booking.status = 'confirmed';
        booking.paymentId = paymentIntent.id;
        await booking.save();

        console.log(`Payment confirmed for booking ${booking._id}`);
      }
    }

    // Handle payment failed event
    if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object;
      const { showId, seats, userId } = paymentIntent.metadata;

      // Find and update the booking
      const booking = await Booking.findOne({
        userId,
        showId,
        seats: { $all: seats.split(',') },
        paymentStatus: 'pending'
      });

      if (booking) {
        booking.paymentStatus = 'failed';
        booking.status = 'cancelled';
        await booking.save();

        // Release the seats by reducing booked count
        const Show = require('../models/Show');
        await Show.findByIdAndUpdate(showId, {
          $inc: { bookedSeats: -booking.seats.length }
        });

        console.log(`Payment failed for booking ${booking._id}`);
      }
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ message: 'Webhook processing failed' });
  }
});

module.exports = router;