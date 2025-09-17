'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SeatMap } from '@/components/seat-map';
import { PaymentDialog } from '@/components/payment-dialog';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { formatDate } from '@/lib/utils';
import type { Show, Movie, SeatStatus } from '@/types';
import { ArrowLeft, MapPin, Calendar, Clock, Users } from 'lucide-react';

export default function BookingPage() {
  const { showId } = useParams();
  const { user } = useAuth();
  const router = useRouter();

  const [show, setShow] = useState<Show | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [seats, setSeats] = useState<SeatStatus[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  useEffect(() => {
    if (showId && user) {
      fetchShowDetails();
      fetchSeats();

      // Set up real-time updates
      const interval = setInterval(() => {
        fetchSeats();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [showId, user]);

  const fetchShowDetails = async () => {
    try {
      const response = await api.get(`/shows/${showId}`);
      setShow(response.show);
      setMovie(response.movie);
    } catch (error) {
      console.error('Error fetching show details:', error);
    }
  };

  const fetchSeats = async () => {
    try {
      const response = await api.get(`/shows/${showId}/seats`);
      setSeats(response);
    } catch (error) {
      console.error('Error fetching seats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeatSelect = async (seatId: string) => {
    const seat = seats.find((s) => s.seatId === seatId);
    if (!seat || seat.status === 'booked' || seat.status === 'locked') return;

    const isSelected = selectedSeats.includes(seatId);

    try {
      if (isSelected) {
        // Unlock seat
        await api.post(`/shows/${showId}/unlock-seat`, { seatId });
        setSelectedSeats((prev) => prev.filter((id) => id !== seatId));
      } else {
        // Lock seat
        await api.post(`/shows/${showId}/lock-seat`, { seatId });
        setSelectedSeats((prev) => [...prev, seatId]);
      }

      // Refresh seats immediately
      fetchSeats();
    } catch (error: any) {
      console.error('Error toggling seat:', error);
      if (error.response?.status === 409) {
        // Seat was locked by someone else
        fetchSeats();
      }
    }
  };

  const totalPrice = selectedSeats.length * (show?.price || 0);

  if (loading || !show || !movie) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center py-20'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto'></div>
          <p className='mt-4 text-muted-foreground'>
            Loading booking details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <Button
            variant='ghost'
            onClick={() => router.back()}
            className='mb-4 -ml-4'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Movie
          </Button>

          <div className='bg-card p-6 rounded-lg border'>
            <h1 className='text-2xl font-bold text-primary mb-4'>
              {movie.title}
            </h1>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4 text-sm'>
              <div className='flex items-center gap-2'>
                <MapPin className='w-4 h-4 text-muted-foreground' />
                <span>
                  {show.theater} - {show.screen}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Calendar className='w-4 h-4 text-muted-foreground' />
                <span>
                  {formatDate(
                    new Date(show.startTime).toISOString().split('T')[0]
                  )}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Clock className='w-4 h-4 text-muted-foreground' />
                <span>
                  {new Date(show.startTime).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Users className='w-4 h-4 text-muted-foreground' />
                <span>₹{show.price} per seat</span>
              </div>
            </div>
          </div>
        </div>

        {/* Seat Selection */}
        <div className='bg-card p-6 rounded-lg border mb-8'>
          <h2 className='text-xl font-semibold mb-6'>Select Seats</h2>

          {/* Legend */}
          <div className='flex flex-wrap gap-6 mb-8 justify-center'>
            <div className='flex items-center gap-2'>
              <div className='seat seat-available'></div>
              <span className='text-sm'>Available</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='seat seat-selected'></div>
              <span className='text-sm'>Selected</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='seat seat-locked'></div>
              <span className='text-sm'>Locked</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='seat seat-booked'></div>
              <span className='text-sm'>Booked</span>
            </div>
          </div>

          <SeatMap
            seats={seats}
            selectedSeats={selectedSeats}
            onSeatSelect={handleSeatSelect}
          />
        </div>

        {/* Booking Summary */}
        {selectedSeats.length > 0 && (
          <div className='bg-card p-6 rounded-lg border'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-semibold'>Booking Summary</h3>
              <Badge variant='secondary'>
                {selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''}
              </Badge>
            </div>

            <div className='space-y-2 mb-6'>
              <div className='flex justify-between'>
                <span>Selected Seats:</span>
                <span className='font-medium'>{selectedSeats.join(', ')}</span>
              </div>
              <div className='flex justify-between'>
                <span>Price per seat:</span>
                <span>₹{show.price}</span>
              </div>
              <div className='flex justify-between font-semibold text-lg border-t pt-2'>
                <span>Total:</span>
                <span className='text-primary'>₹{totalPrice}</span>
              </div>
            </div>

            <Button
              onClick={() => setIsPaymentOpen(true)}
              className='w-full'
              disabled={selectedSeats.length === 0}
            >
              Proceed to Payment
            </Button>
          </div>
        )}

        {/* Payment Dialog */}
        <PaymentDialog
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
          booking={{
            showId: show._id,
            movieTitle: movie.title,
            theater: show.theater,
            screen: show.screen,
            date: formatDate(
              new Date(show.startTime).toISOString().split('T')[0]
            ),
            time: new Date(show.startTime).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            }),
            seats: selectedSeats,
            totalPrice,
          }}
          onSuccess={() => {
            router.push('/bookings');
          }}
        />
      </div>
    </div>
  );
}
