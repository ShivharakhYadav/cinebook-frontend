'use client';

import { useState, useEffect } from 'react';
import { MovieCard } from '@/components/movie-card';
import { SearchBar } from '@/components/search-bar';
import { FilterPanel } from '@/components/filter-panel';
import { api } from '@/lib/api';
import type { Movie } from '@/types';
export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedRating, setSelectedRating] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    filterMovies();
  }, [movies, searchQuery, selectedGenre, selectedRating]);

  const fetchMovies = async () => {
    try {
      const response = await api.get('/movies');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterMovies = () => {
    let filtered = movies;

    if (searchQuery) {
      filtered = filtered.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedGenre) {
      filtered = filtered.filter((movie) =>
        movie.genre.includes(selectedGenre)
      );
    }

    if (selectedRating) {
      filtered = filtered.filter(
        (movie) => movie.rating >= parseFloat(selectedRating)
      );
    }

    setFilteredMovies(filtered);
  };

  if (loading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center py-20'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto'></div>
          <p className='mt-4 text-muted-foreground'>Loading movies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Hero Section */}
      {/* <div className="text-center py-12 mb-8">
        <h1 className="text-5xl font-bold mb-4 text-primary">
          CineBook
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover and book your favorite movies with the best cinema experience
        </p>
      </div> */}

      {/* Search and Filters */}
      <div className='mb-8 space-y-6'>
        {/* <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder='Search for movies...'
        /> */}
        <FilterPanel
          selectedGenre={selectedGenre}
          selectedRating={selectedRating}
          onGenreChange={setSelectedGenre}
          onRatingChange={setSelectedRating}
        />
      </div>

      {/* Movies Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
          />
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <div className='text-center py-20'>
          <p className='text-xl text-muted-foreground'>
            No movies found matching your criteria
          </p>
        </div>
      )}
    </div>
  );
}
