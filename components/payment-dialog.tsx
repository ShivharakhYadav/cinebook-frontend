'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { loadStripe } from '@stripe/stripe-js';
import {
  CreditCard,
  Wallet,
  MapPin,
  Calendar,
  Clock,
  Users,
} from 'lucide-react';

console.log('Stripe Key:', process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  booking: {
    showId: string;
    movieTitle: string;
    theater: string;
    screen: string;
    date: string;
    time: string;
    seats: string[];
    totalPrice: number;
  };
  onSuccess: () => void;
}

export function PaymentDialog({
  isOpen,
  onClose,
  booking,
  onSuccess,
}: PaymentDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online' | null>(
    null
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCashPayment = async () => {
    setIsProcessing(true);
    try {
      const response = await api.post('/bookings', {
        showId: booking.showId,
        seats: booking.seats,
        paymentMethod: 'cash',
      });

      toast.success('Booking confirmed! Please pay at the theater.');
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOnlinePayment = async () => {
    setIsProcessing(true);
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe not loaded');

      const response = await api.post('/payments/create-payment-intent', {
        showId: booking.showId,
        seats: booking.seats,
        amount: booking.totalPrice,
      });

      const { clientSecret, bookingId } = response;

      // For demo purposes, we'll simulate a successful payment
      // In a real app, you'd use stripe.confirmCardPayment() with the client secret

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Confirm booking
      await api.post('/bookings', {
        showId: booking.showId,
        seats: booking.seats,
        paymentMethod: 'online',
        paymentId: 'demo_payment_' + Date.now(),
        bookingReference: 'demo_payment_' + Date.now(),
      });

      toast.success('Payment successful! Booking confirmed.');
      onSuccess();
      onClose();
    } catch (error: any) {
      console.log('Payment error:', error);
      toast.error(error.response?.data?.message || 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!paymentMethod) {
    return (
      <Dialog
        open={isOpen}
        onOpenChange={onClose}
      >
        <DialogContent className='max-w-md'>
          <DialogHeader>
            <DialogTitle>Choose Payment Method</DialogTitle>
          </DialogHeader>

          <div className='space-y-6'>
            {/* Booking Summary */}
            <div className='space-y-4 p-4 bg-muted rounded-lg'>
              <h3 className='font-semibold'>{booking.movieTitle}</h3>

              <div className='space-y-2 text-sm'>
                <div className='flex items-center gap-2'>
                  <MapPin className='w-4 h-4 text-muted-foreground' />
                  <span>
                    {booking.theater} - {booking.screen}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar className='w-4 h-4 text-muted-foreground' />
                  <span>{booking.date}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className='w-4 h-4 text-muted-foreground' />
                  <span>{booking.time}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Users className='w-4 h-4 text-muted-foreground' />
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
              </div>

              <div className='flex justify-between items-center pt-2 border-t text-lg font-semibold'>
                <span>Total:</span>
                <span className='text-primary'>₹{booking.totalPrice}</span>
              </div>
            </div>

            {/* Payment Options */}
            <div className='space-y-3'>
              <Button
                variant='outline'
                className='w-full justify-start h-auto p-4'
                onClick={() => setPaymentMethod('cash')}
              >
                <div className='flex items-center gap-3'>
                  <Wallet className='w-6 h-6 text-green-600' />
                  <div className='text-left'>
                    <div className='font-medium'>Pay at Theater (Cash)</div>
                    <div className='text-sm text-muted-foreground'>
                      Reserve seats and pay at the counter
                    </div>
                  </div>
                </div>
              </Button>

              <Button
                variant='outline'
                className='w-full justify-start h-auto p-4'
                onClick={() => setPaymentMethod('online')}
              >
                <div className='flex items-center gap-3'>
                  <CreditCard className='w-6 h-6 text-blue-600' />
                  <div className='text-left'>
                    <div className='font-medium'>Pay Online</div>
                    <div className='text-sm text-muted-foreground'>
                      Cards, UPI, Net Banking
                    </div>
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>
            {paymentMethod === 'cash' ? 'Confirm Booking' : 'Online Payment'}
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          {paymentMethod === 'cash' ? (
            <div className='space-y-4'>
              <p className='text-muted-foreground'>
                Your seats will be reserved. Please arrive 15 minutes early to
                complete payment at the theater counter.
              </p>

              <div className='bg-yellow-50 border border-yellow-200 p-4 rounded-lg'>
                <p className='text-sm text-yellow-800'>
                  <strong>Important:</strong> Unpaid reservations will be
                  automatically cancelled 15 minutes before showtime.
                </p>
              </div>

              <div className='flex gap-3'>
                <Button
                  variant='outline'
                  onClick={() => setPaymentMethod(null)}
                  className='flex-1'
                >
                  Back
                </Button>
                <Button
                  onClick={handleCashPayment}
                  disabled={isProcessing}
                  className='flex-1'
                >
                  {isProcessing ? 'Confirming...' : 'Confirm Booking'}
                </Button>
              </div>
            </div>
          ) : (
            <div className='space-y-4'>
              <div className='bg-blue-50 border border-blue-200 p-4 rounded-lg'>
                <p className='text-sm text-blue-800'>
                  <strong>Demo Mode:</strong> This is a demonstration. No actual
                  payment will be processed.
                </p>
              </div>

              <p className='text-muted-foreground'>
                In a real implementation, this would integrate with
                Stripe&apos;s payment form for secure card processing with
                support for Cards, UPI, and other payment methods.
              </p>

              <div className='flex gap-3'>
                <Button
                  variant='outline'
                  onClick={() => setPaymentMethod(null)}
                  className='flex-1'
                >
                  Back
                </Button>
                <Button
                  onClick={handleOnlinePayment}
                  disabled={isProcessing}
                  className='flex-1'
                >
                  {isProcessing ? 'Processing...' : 'Pay Now'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
