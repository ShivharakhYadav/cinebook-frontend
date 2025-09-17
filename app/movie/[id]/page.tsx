'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { formatDate } from '@/lib/utils';
import type { Movie, Show } from '@/types';
import { Calendar, Clock, Star, MapPin } from 'lucide-react';

function MovieDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (id) {
      fetchMovieDetails();
      fetchShows();
    }
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      const response = await api.get(`/movies/${id}`);

      setMovie(response);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const fetchShows = async () => {
    try {
      const response = await api.get(`/shows/movie/${id}`);
      console.log('response', response);
      setShows(response);

      // Set default date to today if shows are available
      if (response?.data?.length > 0) {
        const today = new Date().toISOString().split('T')[0];
        setSelectedDate(today);
      }
    } catch (error) {
      console.error('Error fetching shows:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUniqueShowDates = () => {
    const dates = shows.map(
      (show) => new Date(show.startTime).toISOString().split('T')[0]
    );
    return [...new Set(dates)].sort();
  };

  const getShowsForDate = (date: string) => {
    return shows
      .filter((show) => {
        const showDate = new Date(show.startTime).toISOString().split('T')[0];
        return showDate === date;
      })
      .sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      );
  };

  if (loading || !movie) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center py-20'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto'></div>
          <p className='mt-4 text-muted-foreground'>Loading movie details...</p>
        </div>
      </div>
    );
  }

  const uniqueDates = getUniqueShowDates();
  const showsForSelectedDate = selectedDate
    ? getShowsForDate(selectedDate)
    : [];

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <div className='relative h-96 bg-gradient-to-r from-background to-secondary/20'>
        <div
          className='absolute inset-0 bg-cover bg-center opacity-20'
          style={{
            backgroundImage: `url(${
              movie.poster ||
              'https://images.unsplash.com/photo-1489599763687-2d2def4d2ec5'
            })`,
          }}
        />
        <div className='relative container mx-auto px-4 py-16 flex items-center'>
          <div className='flex flex-col md:flex-row gap-8 items-start'>
            <div className='w-64 h-80 bg-card rounded-lg overflow-hidden shadow-2xl'>
              <img
                src={
                  movie.poster ||
                  'https://images.unsplash.com/photo-1489599763687-2d2def4d2ec5'
                }
                alt={movie.title}
                className='w-full h-full object-cover'
              />
            </div>
            <div className='flex-1 space-y-6'>
              <div>
                <h1 className='text-4xl md:text-5xl font-bold text-primary mb-2'>
                  {movie.title}
                </h1>
                <div className='flex flex-wrap items-center gap-4 text-muted-foreground'>
                  <div className='flex items-center gap-1'>
                    <Star className='w-4 h-4 text-yellow-500 fill-current' />
                    <span className='font-medium'>{movie.rating}/10</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Clock className='w-4 h-4' />
                    <span>{movie.duration} min</span>
                  </div>
                  <Badge variant='secondary'>{movie.movieLanguage}</Badge>
                </div>
              </div>

              <div className='space-y-2'>
                <p className='text-lg text-foreground'>{movie.description}</p>
                <div className='flex flex-wrap gap-2'>
                  {movie.genre.map((g) => (
                    <Badge
                      key={g}
                      variant='outline'
                    >
                      {g}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Showtimes Section */}
      <div className='container mx-auto px-4 py-12'>
        <h2 className='text-3xl font-bold mb-8'>Showtimes</h2>

        {uniqueDates.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-xl text-muted-foreground'>
              No shows available for this movie
            </p>
          </div>
        ) : (
          <>
            {/* Date Selection */}
            <div className='mb-8'>
              <div className='flex flex-wrap gap-2'>
                {uniqueDates.map((date) => (
                  <Button
                    key={date}
                    variant={selectedDate === date ? 'default' : 'outline'}
                    onClick={() => setSelectedDate(date)}
                    className='flex items-center gap-2'
                  >
                    <Calendar className='w-4 h-4' />
                    {formatDate(date)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Shows for Selected Date */}
            {selectedDate && (
              <div className='space-y-6'>
                {showsForSelectedDate.length === 0 ? (
                  <p className='text-muted-foreground'>
                    No shows available for this date
                  </p>
                ) : (
                  showsForSelectedDate.map((show) => (
                    <div
                      key={show._id}
                      className='bg-card p-6 rounded-lg border'
                    >
                      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                        <div className='space-y-2'>
                          <div className='flex items-center gap-2'>
                            <MapPin className='w-4 h-4 text-muted-foreground' />
                            <span className='font-medium'>{show.theater}</span>
                          </div>
                          <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                            <span>Screen: {show.screen}</span>
                            <span>•</span>
                            <span>
                              {new Date(show.startTime).toLocaleTimeString(
                                'en-US',
                                {
                                  hour: 'numeric',
                                  minute: '2-digit',
                                  hour12: true,
                                }
                              )}
                            </span>
                            <span>•</span>
                            <span>₹{show.price}</span>
                          </div>
                          <div className='text-sm'>
                            <span className='text-green-500'>
                              {show.totalSeats - show.bookedSeats} seats
                              available
                            </span>
                            <span className='text-muted-foreground ml-2'>
                              out of {show.totalSeats}
                            </span>
                          </div>
                        </div>

                        <div className='flex gap-2'>
                          {user ? (
                            <Link href={`/booking/${show._id}`}>
                              <Button
                                disabled={show.bookedSeats >= show.totalSeats}
                                className='w-full md:w-auto'
                              >
                                {show.bookedSeats >= show.totalSeats
                                  ? 'Sold Out'
                                  : 'Book Seats'}
                              </Button>
                            </Link>
                          ) : (
                            <Link href='/auth/login'>
                              <Button variant='outline'>Login to Book</Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MovieDetailPage;
