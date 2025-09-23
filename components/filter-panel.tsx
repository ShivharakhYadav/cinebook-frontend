import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';

interface FilterPanelProps {
  selectedGenre: string;
  selectedRating: string;
  onGenreChange: (genre: string) => void;
  onRatingChange: (rating: string) => void;
}

const genres = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Drama',
  'Fantasy',
  'Horror',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Thriller',
  'War',
  'Western',
];

const ratings = [
  { value: '7', label: '7.0+' },
  { value: '8', label: '8.0+' },
  { value: '9', label: '9.0+' },
];

export function FilterPanel({
  selectedGenre,
  selectedRating,
  onGenreChange,
  onRatingChange,
}: FilterPanelProps) {
  const hasActiveFilters = selectedGenre || selectedRating;

  const clearAllFilters = () => {
    onGenreChange('');
    onRatingChange('');
  };

  return (
    <div className='flex items-center gap-4 justify-center'>
      <div className='flex items-center gap-2 text-sm text-muted-foreground'>
        <Filter className='w-4 h-4' />
        <span>Filters:</span>
      </div>

      <Select
        value={selectedGenre}
        onValueChange={onGenreChange}
      >
        <SelectTrigger className='w-40'>
          <SelectValue placeholder='Genre' />
        </SelectTrigger>
        <SelectContent>
          {genres.map((genre) => (
            <SelectItem
              key={genre}
              value={genre}
            >
              {genre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedRating}
        onValueChange={onRatingChange}
      >
        <SelectTrigger className='w-40'>
          <SelectValue placeholder='Rating' />
        </SelectTrigger>
        <SelectContent>
          {ratings.map((rating) => (
            <SelectItem
              key={rating.value}
              value={rating.value}
            >
              {rating.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button
          variant='outline'
          size='sm'
          onClick={clearAllFilters}
          className='flex items-center gap-2'
        >
          <X className='w-3 h-3' />
          Clear All
        </Button>
      )}
    </div>
  );
}
