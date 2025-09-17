const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: [true, 'Movie ID is required']
  },
  theater: {
    type: String,
    required: [true, 'Theater name is required'],
    trim: true
  },
  screen: {
    type: String,
    required: [true, 'Screen name is required'],
    trim: true
  },
  startTime: {
    type: Date,
    required: [true, 'Start time is required']
  },
  endTime: {
    type: Date,
    required: [true, 'End time is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [50, 'Price must be at least ₹50'],
    max: [1000, 'Price cannot exceed ₹1000']
  },
  totalSeats: {
    type: Number,
    required: [true, 'Total seats is required'],
    default: 140, // 10 rows × 14 seats
    min: [50, 'Must have at least 50 seats'],
    max: [300, 'Cannot exceed 300 seats']
  },
  bookedSeats: {
    type: Number,
    default: 0,
    min: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Validate that end time is after start time
showSchema.pre('save', function(next) {
  if (this.endTime <= this.startTime) {
    next(new Error('End time must be after start time'));
  }
  if (this.bookedSeats > this.totalSeats) {
    next(new Error('Booked seats cannot exceed total seats'));
  }
  next();
});

// Index for efficient queries
showSchema.index({ movieId: 1, startTime: 1 });
showSchema.index({ theater: 1, screen: 1, startTime: 1 });
showSchema.index({ startTime: 1, isActive: 1 });

module.exports = mongoose.model('Show', showSchema);