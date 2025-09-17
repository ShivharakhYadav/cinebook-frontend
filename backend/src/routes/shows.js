const express = require('express');
const { query, param } = require('express-validator');
const Show = require('../models/Show');
const Movie = require('../models/Movie');
const Booking = require('../models/Booking');
const SeatLock = require('../models/SeatLock');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get shows for a specific movie
router.get('/movie/:movieId', [
  param('movieId').isMongoId().withMessage('Invalid movie ID'),
  query('date').optional().isISO8601().withMessage('Invalid date format')
], async (req, res) => {
  try {
    const { movieId } = req.params;
    const { date } = req.query;

    // Build query
    const query = { 
      movieId, 
      isActive: true,
      startTime: { $gte: new Date() } // Only future shows
    };

    // Filter by date if provided
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      
      query.startTime = {
        $gte: startDate,
        $lt: endDate
      };
    }

    const shows = await Show.find(query)
      .populate('movieId', 'title duration')
      .sort({ startTime: 1 });

    res.json(shows);
  } catch (error) {
    console.error('Get shows error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single show with movie details
router.get('/:id', [
  param('id').isMongoId().withMessage('Invalid show ID')
], async (req, res) => {
  try {
    const show = await Show.findById(req.params.id)
      .populate('movieId');

    if (!show || !show.isActive) {
      return res.status(404).json({ message: 'Show not found' });
    }

    res.json({
      show,
      movie: show.movieId
    });
  } catch (error) {
    console.error('Get show error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get seat availability for a show
router.get('/:id/seats', [
  param('id').isMongoId().withMessage('Invalid show ID')
], async (req, res) => {
  try {
    const showId = req.params.id;

    // Get all booked seats for this show
    const bookings = await Booking.find({ 
      showId, 
      status: { $in: ['confirmed', 'pending'] } 
    }).select('seats');

    const bookedSeats = bookings.reduce((acc, booking) => {
      return acc.concat(booking.seats);
    }, []);

    // Get all locked seats for this show
    const locks = await SeatLock.find({ 
      showId,
      lockedUntil: { $gt: new Date() } 
    }).select('seatId lockedBy');

    // Generate seat status array
    const seatStatuses = [];
    
    // Generate all possible seats (A1-A14, B1-B14, ... J1-J14)
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    for (const row of rows) {
      for (let seatNum = 1; seatNum <= 14; seatNum++) {
        const seatId = `${row}${seatNum}`;
        let status = 'available';
        
        if (bookedSeats.includes(seatId)) {
          status = 'booked';
        } else if (locks.find(lock => lock.seatId === seatId)) {
          status = 'locked';
        }
        
        seatStatuses.push({
          seatId,
          status,
          ...(status === 'locked' && { 
            lockedBy: locks.find(lock => lock.seatId === seatId)?.lockedBy 
          })
        });
      }
    }

    res.json(seatStatuses);
  } catch (error) {
    console.error('Get seats error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Lock a seat
router.post('/:id/lock-seat', authMiddleware, [
  param('id').isMongoId().withMessage('Invalid show ID')
], async (req, res) => {
  try {
    const { id: showId } = req.params;
    const { seatId } = req.body;
    const userId = req.user._id;

    if (!seatId) {
      return res.status(400).json({ message: 'Seat ID is required' });
    }

    // Check if seat is already booked
    const existingBooking = await Booking.findOne({
      showId,
      seats: seatId,
      status: { $in: ['confirmed', 'pending'] }
    });

    if (existingBooking) {
      return res.status(409).json({ message: 'Seat already booked' });
    }

    // Try to lock the seat
    const lockExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    try {
      const seatLock = new SeatLock({
        showId,
        seatId,
        lockedBy: userId,
        lockedUntil: lockExpiry
      });

      await seatLock.save();
      
      res.json({ 
        message: 'Seat locked successfully',
        lockedUntil: lockExpiry 
      });
    } catch (error) {
      if (error.code === 11000) { // Duplicate key error
        return res.status(409).json({ message: 'Seat already locked' });
      }
      throw error;
    }
  } catch (error) {
    console.error('Lock seat error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Unlock a seat
router.post('/:id/unlock-seat', authMiddleware, [
  param('id').isMongoId().withMessage('Invalid show ID')
], async (req, res) => {
  try {
    const { id: showId } = req.params;
    const { seatId } = req.body;
    const userId = req.user._id;

    if (!seatId) {
      return res.status(400).json({ message: 'Seat ID is required' });
    }

    // Remove the lock if it belongs to the current user
    const result = await SeatLock.deleteOne({
      showId,
      seatId,
      lockedBy: userId
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Seat lock not found or not owned by you' });
    }

    res.json({ message: 'Seat unlocked successfully' });
  } catch (error) {
    console.error('Unlock seat error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;