const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  showId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Show',
    required: [true, 'Show ID is required']
  },
  movieTitle: {
    type: String,
    required: [true, 'Movie title is required']
  },
  theater: {
    type: String,
    required: [true, 'Theater name is required']
  },
  screen: {
    type: String,
    required: [true, 'Screen name is required']
  },
  showTime: {
    type: Date,
    required: [true, 'Show time is required']
  },
  seats: [{
    type: String,
    required: true,
    match: [/^[A-J](1[0-4]|[1-9])$/, 'Invalid seat format']
  }],
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'online'],
    required: [true, 'Payment method is required']
  },
  paymentId: {
    type: String,
    sparse: true // Allow null/undefined values, but ensure uniqueness when present
  },
  bookingReference: {
    type: String,
    unique: true,
    required: false
  }
}, {
  timestamps: true
});

// Generate booking reference before saving
bookingSchema.pre('save', function (next) {
  if (!this.bookingReference) {
    this.bookingReference = 'BK' + Date.now() + Math.random().toString(36).substr(2, 4).toUpperCase();
  }
  next();
});

// Index for efficient queries
bookingSchema.index({ userId: 1, createdAt: -1 });
bookingSchema.index({ showId: 1, status: 1 });
bookingSchema.index({ bookingReference: 1 });
bookingSchema.index({ paymentId: 1 });

module.exports = mongoose.model('Booking', bookingSchema);