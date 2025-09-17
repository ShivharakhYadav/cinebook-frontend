'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { formatDate } from '@/lib/utils';
import type { Booking } from '@/types';
import { Calendar, Clock, MapPin, Ticket, CreditCard } from 'lucide-react';

export default function BookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings');
      setBookings(response);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center py-20'>
          <p className='text-xl text-muted-foreground mb-4'>
            Please login to view your bookings
          </p>
          <Link href='/auth/login'>
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center py-20'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto'></div>
          <p className='mt-4 text-muted-foreground'>Loading your bookings...</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-primary mb-2'>My Bookings</h1>
        <p className='text-muted-foreground'>Manage your movie reservations</p>
      </div>

      {bookings.length === 0 ? (
        <div className='text-center py-20'>
          <Ticket className='w-24 h-24 text-muted-foreground mx-auto mb-4' />
          <p className='text-xl text-muted-foreground mb-4'>
            No bookings found
          </p>
          <Link href='/'>
            <Button>Browse Movies</Button>
          </Link>
        </div>
      ) : (
        <div className='space-y-6'>
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className='bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow'
            >
              <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-4'>
                <div className='flex-1 space-y-4'>
                  <div className='flex items-start justify-between'>
                    <div>
                      <h3 className='text-xl font-semibold text-primary mb-1'>
                        {booking.movieTitle}
                      </h3>
                      <p className='text-sm text-muted-foreground'>
                        Booking ID: {booking._id.slice(-8)}
                      </p>
                    </div>
                    <div className='flex gap-2'>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                      <Badge
                        variant='outline'
                        className={getPaymentStatusColor(booking.paymentStatus)}
                      >
                        {booking.paymentStatus}
                      </Badge>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm'>
                    <div className='flex items-center gap-2'>
                      <MapPin className='w-4 h-4 text-muted-foreground' />
                      <span>
                        {booking.theater} - {booking.screen}
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Calendar className='w-4 h-4 text-muted-foreground' />
                      <span>
                        {formatDate(
                          new Date(booking.showTime).toISOString().split('T')[0]
                        )}
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Clock className='w-4 h-4 text-muted-foreground' />
                      <span>
                        {new Date(booking.showTime).toLocaleTimeString(
                          'en-US',
                          {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true,
                          }
                        )}
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <CreditCard className='w-4 h-4 text-muted-foreground' />
                      <span>₹{booking.totalAmount}</span>
                    </div>
                  </div>

                  <div className='flex items-center gap-4 text-sm'>
                    <span className='font-medium'>Seats:</span>
                    <div className='flex gap-1'>
                      {booking.seats.map((seat) => (
                        <Badge
                          key={seat}
                          variant='secondary'
                          className='text-xs'
                        >
                          {seat}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className='text-sm text-muted-foreground'>
                    <span>
                      Booked on:{' '}
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </span>
                    {booking.paymentMethod && (
                      <span className='ml-4'>
                        Payment: {booking.paymentMethod}
                      </span>
                    )}
                  </div>
                </div>

                <div className='flex flex-col gap-2'>
                  {booking.status === 'confirmed' &&
                    new Date(booking.showTime) > new Date() && (
                      <Button
                        variant='outline'
                        size='sm'
                      >
                        View Ticket
                      </Button>
                    )}
                  {booking.status === 'pending' &&
                    booking.paymentStatus === 'pending' && (
                      <Button size='sm'>Complete Payment</Button>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
