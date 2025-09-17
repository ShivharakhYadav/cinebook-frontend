const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Movie title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  genre: [{
    type: String,
    required: true,
    enum: ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Drama',
      'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller',
      'War', 'Western', 'Biography', 'Documentary', 'Family', 'Musical']
  }],
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [60, 'Duration must be at least 60 minutes'],
    max: [300, 'Duration cannot exceed 300 minutes']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [0, 'Rating cannot be less than 0'],
    max: [10, 'Rating cannot exceed 10']
  },
  movieLanguage: {
    type: String,
    required: [true, 'movieLanguage is required'],
    enum: ['English', 'Hindi', 'Tamil', 'Telugu', 'Malayalam', 'Kannada', 'Bengali', 'Marathi']
  },
  poster: {
    type: String,
    required: [true, 'Poster URL is required']
  },
  releaseDate: {
    type: Date,
    required: [true, 'Release date is required']
  },
  cast: [{
    type: String,
    trim: true
  }],
  director: {
    type: String,
    required: [true, 'Director is required'],
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for search functionality
movieSchema.index({ title: 'text', description: 'text' });
movieSchema.index({ genre: 1, rating: -1 });
movieSchema.index({ isActive: 1, releaseDate: -1 });

module.exports = mongoose.model('Movie', movieSchema);