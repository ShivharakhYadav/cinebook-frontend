'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, CreditCard, AlertTriangle, CheckCircle } from 'lucide-react';

export default function CancellationPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 -ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">Cancellation & Refunds</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Understanding our cancellation policy and refund process for movie bookings
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Quick Overview */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              Quick Overview
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Free Cancellation</p>
                    <p className="text-sm text-muted-foreground">Up to 2 hours before showtime</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Instant Refunds</p>
                    <p className="text-sm text-muted-foreground">For online payments within 5-7 business days</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="font-medium">No Refund Zone</p>
                    <p className="text-sm text-muted-foreground">Within 2 hours of showtime</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Processing Fee</p>
                    <p className="text-sm text-muted-foreground">₹20 convenience fee (non-refundable)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-6">Cancellation Policy</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-semibold text-green-600 mb-2">Free Cancellation Period</h3>
                <p className="text-muted-foreground mb-3">
                  You can cancel your booking free of charge up to 2 hours before the scheduled showtime.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>100% refund of ticket price (excluding convenience fee)</li>
                  <li>Instant cancellation through your bookings page</li>
                  <li>No questions asked policy</li>
                  <li>Automatic seat release for other customers</li>
                </ul>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="text-lg font-semibold text-yellow-600 mb-2">Restricted Cancellation Period</h3>
                <p className="text-muted-foreground mb-3">
                  Bookings cannot be cancelled within 2 hours of showtime to ensure optimal theater operations.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>No refunds available during this period</li>
                  <li>Seats remain blocked for your booking</li>
                  <li>Contact customer support for emergency situations</li>
                </ul>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="text-lg font-semibold text-red-600 mb-2">Show Cancellation by Theater</h3>
                <p className="text-muted-foreground mb-3">
                  In rare cases where the theater cancels a show due to technical issues or unforeseen circumstances.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Full refund including convenience fee</li>
                  <li>Automatic processing within 24 hours</li>
                  <li>Email notification with refund details</li>
                  <li>Option to reschedule to another show</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Refund Process */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-6">Refund Process</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-500" />
                  Online Payments
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">1</div>
                    <div>
                      <p className="font-medium">Initiate Cancellation</p>
                      <p className="text-sm text-muted-foreground">Cancel through your bookings page or mobile app</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">2</div>
                    <div>
                      <p className="font-medium">Automatic Processing</p>
                      <p className="text-sm text-muted-foreground">Refund processed automatically to original payment method</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">3</div>
                    <div>
                      <p className="font-medium">Receive Refund</p>
                      <p className="text-sm text-muted-foreground">5-7 business days for credit/debit cards, 1-2 days for UPI</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-500" />
                  Cash Payments
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">1</div>
                    <div>
                      <p className="font-medium">Cancel Booking</p>
                      <p className="text-sm text-muted-foreground">Cancel through your account or contact customer support</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">2</div>
                    <div>
                      <p className="font-medium">Visit Theater</p>
                      <p className="text-sm text-muted-foreground">Visit the theater counter with booking confirmation</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">3</div>
                    <div>
                      <p className="font-medium">Collect Refund</p>
                      <p className="text-sm text-muted-foreground">Receive cash refund immediately at the counter</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Special Circumstances */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-6">Special Circumstances</h2>
            
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Medical Emergency</h3>
                <p className="text-sm text-muted-foreground">
                  In case of medical emergencies, contact our customer support with relevant documentation. 
                  We may provide full refunds even within the restricted period on a case-by-case basis.
                </p>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Technical Issues</h3>
                <p className="text-sm text-muted-foreground">
                  If you experience technical issues during booking or face problems with seat selection, 
                  our support team will assist with free cancellation and rebooking.
                </p>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Weather Conditions</h3>
                <p className="text-sm text-muted-foreground">
                  In case of severe weather conditions or natural disasters that prevent you from attending, 
                  we offer flexible cancellation options with full refunds.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-4">Need Help?</h2>
            <p className="text-muted-foreground mb-4">
              Our customer support team is available 24/7 to assist you with cancellations and refunds.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="font-medium">Phone Support</p>
                <p className="text-primary">1800-123-4567</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="font-medium">Email Support</p>
                <p className="text-primary">support@cinebook.com</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="font-medium">Live Chat</p>
                <p className="text-primary">Available on website</p>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Last updated: January 2025</p>
            <p>This policy is subject to change. Please check regularly for updates.</p>
          </div>
        </div>
      </div>
    </div>
  );
}