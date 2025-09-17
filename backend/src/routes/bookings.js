const express = require('express');
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const Show = require('../models/Show');
const Movie = require('../models/Movie');
const SeatLock = require('../models/SeatLock');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create booking
router.post('/', authMiddleware, [
  body('showId').isMongoId().withMessage('Valid show ID is required'),
  body('seats').isArray({ min: 1, max: 6 }).withMessage('Must select 1-6 seats'),
  body('seats.*').matches(/^[A-J](1[0-4]|[1-9])$/).withMessage('Invalid seat format'),
  body('paymentMethod').isIn(['cash', 'online']).withMessage('Invalid payment method')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { showId, seats, paymentMethod, paymentId } = req.body;
    const userId = req.user._id;

    // Get show details
    const show = await Show.findById(showId).populate('movieId');
    if (!show || !show.isActive) {
      return res.status(404).json({ message: 'Show not found' });
    }

    // Check if seats are still available and locked by this user
    for (const seatId of seats) {
      // Check if seat is already booked
      const existingBooking = await Booking.findOne({
        showId,
        seats: seatId,
        status: { $in: ['confirmed', 'pending'] }
      });

      if (existingBooking) {
        return res.status(409).json({ message: `Seat ${seatId} is already booked` });
      }

      // Check if seat is locked by this user
      const lock = await SeatLock.findOne({
        showId,
        seatId,
        lockedBy: userId,
        lockedUntil: { $gt: new Date() }
      });

      if (!lock) {
        return res.status(409).json({ message: `Seat ${seatId} is not locked by you or lock expired` });
      }
    }

    // Calculate total amount
    const totalAmount = seats.length * show.price;

    // Create booking
    const booking = new Booking({
      userId,
      showId,
      movieTitle: show.movieId.title,
      theater: show.theater,
      screen: show.screen,
      showTime: show.startTime,
      seats,
      totalAmount,
      paymentMethod,
      paymentId,
      status: paymentMethod === 'cash' ? 'pending' : 'confirmed',
      paymentStatus: paymentMethod === 'cash' ? 'pending' : 'paid'
    });

    await booking.save();

    // Update show booked seats count
    await Show.findByIdAndUpdate(showId, {
      $inc: { bookedSeats: seats.length }
    });

    // Remove seat locks
    await SeatLock.deleteMany({
      showId,
      seatId: { $in: seats },
      lockedBy: userId
    });

    res.status(201).json({
      message: 'Booking created successfully',
      data: booking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user bookings
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    
    const bookings = await Booking.find({ userId })
      .sort({ createdAt: -1 })
      .populate('showId', 'movieId theater screen startTime')
      .populate({
        path: 'showId',
        populate: {
          path: 'movieId',
          model: 'Movie',
          select: 'title poster'
        }
      });

    res.json(bookings);
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single booking
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).populate('showId').populate({
      path: 'showId',
      populate: {
        path: 'movieId',
        model: 'Movie'
      }
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Cancel booking
router.patch('/:id/cancel', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      userId: req.user._id,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found or already cancelled' });
    }

    // Check if show time allows cancellation (e.g., at least 2 hours before)
    const showTime = new Date(booking.showTime);
    const twoHoursFromNow = new Date(Date.now() + 2 * 60 * 60 * 1000);

    if (showTime <= twoHoursFromNow) {
      return res.status(400).json({ message: 'Cannot cancel booking less than 2 hours before show time' });
    }

    // Update booking status
    booking.status = 'cancelled';
    await booking.save();

    // Update show booked seats count
    await Show.findByIdAndUpdate(booking.showId, {
      $inc: { bookedSeats: -booking.seats.length }
    });

    res.json({
      message: 'Booking cancelled successfully',
      data: booking
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;