const mongoose = require('mongoose');

const seatLockSchema = new mongoose.Schema({
  showId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Show',
    required: [true, 'Show ID is required']
  },
  seatId: {
    type: String,
    required: [true, 'Seat ID is required'],
    match: [/^[A-J](1[0-4]|[1-9])$/, 'Invalid seat format']
  },
  lockedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  lockedUntil: {
    type: Date,
    required: [true, 'Lock expiry time is required'],
    default: function() {
      return new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
    }
  }
}, {
  timestamps: true
});

// Compound index to ensure one user can lock one seat per show
seatLockSchema.index({ showId: 1, seatId: 1 }, { unique: true });
seatLockSchema.index({ lockedBy: 1, showId: 1 });

// TTL index to automatically remove expired locks
seatLockSchema.index({ lockedUntil: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('SeatLock', seatLockSchema);