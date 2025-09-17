const express = require('express');
const { query } = require('express-validator');
const Movie = require('../models/Movie');

const router = express.Router();

// Get all movies with optional filtering and search
router.get('/', [
  query('search').optional().trim(),
  query('genre').optional().trim(),
  query('rating').optional().isFloat({ min: 0, max: 10 }),
  query('movieLanguage').optional().trim(),
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 50 }).toInt()
], async (req, res) => {
  try {
    const { search, genre, rating, movieLanguage, page = 1, limit = 20 } = req.query;

    // Build query
    const query = { isActive: true };

    if (search) {
      query.$text = { $search: search };
    }

    if (genre) {
      query.genre = { $in: [genre] };
    }

    if (rating) {
      query.rating = { $gte: parseFloat(rating) };
    }

    if (movieLanguage) {
      query.movieLanguage = movieLanguage;
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const movies = await Movie.find(query)
      .sort(search ? { score: { $meta: 'textScore' } } : { releaseDate: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Movie.countDocuments(query);

    res.json({
      data: movies,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get movies error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie || !movie.isActive) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json(movie);
  } catch (error) {
    console.error('Get movie error:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid movie ID' });
    }

    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;