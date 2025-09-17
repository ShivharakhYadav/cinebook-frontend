import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import type { Movie } from '@/types';
import { Star, Clock, Calendar } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie._id}`}>
      <div className='movie-card group'>
        <div className='relative h-80 overflow-hidden'>
          <img
            src={
              movie.poster ||
              'https://images.unsplash.com/photo-1489599763687-2d2def4d2ec5'
            }
            alt={movie.title}
            className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent' />
          <div className='absolute bottom-4 left-4 right-4'>
            <div className='flex items-center gap-2 mb-2'>
              <div className='flex items-center gap-1 bg-black/50 rounded-full px-2 py-1'>
                <Star className='w-3 h-3 text-yellow-500 fill-current' />
                <span className='text-xs font-medium text-white'>
                  {movie.rating}
                </span>
              </div>
              <div className='flex items-center gap-1 bg-black/50 rounded-full px-2 py-1'>
                <Clock className='w-3 h-3 text-white' />
                <span className='text-xs text-white'>{movie.duration}m</span>
              </div>
            </div>
            <h3 className='font-bold text-white text-lg mb-1 line-clamp-2'>
              {movie.title}
            </h3>
            <p className='text-gray-300 text-sm line-clamp-2 mb-2'>
              {movie.description}
            </p>
          </div>
        </div>

        <div className='p-4 space-y-3'>
          <div className='flex flex-wrap gap-1'>
            {movie.genre.slice(0, 2).map((g) => (
              <Badge
                key={g}
                variant='secondary'
                className='text-xs'
              >
                {g}
              </Badge>
            ))}
            {movie.genre.length > 2 && (
              <Badge
                variant='outline'
                className='text-xs'
              >
                +{movie.genre.length - 2}
              </Badge>
            )}
          </div>

          <div className='flex items-center justify-between text-sm text-muted-foreground'>
            <Badge variant='outline'>{movie.movieLanguage}</Badge>
            <div className='flex items-center gap-1'>
              <Calendar className='w-3 h-3' />
              <span>Now Showing</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
