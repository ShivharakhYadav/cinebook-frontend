'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Smartphone, Mail, Printer, Download, QrCode, Clock } from 'lucide-react';

export default function ShippingPage() {
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
            <h1 className="text-4xl font-bold text-primary mb-4">Ticket Delivery</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Multiple convenient ways to access your movie tickets
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Digital First Notice */}
          <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
            <div className="flex items-start gap-3">
              <Smartphone className="w-6 h-6 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-800 mb-2">100% Digital Delivery</h3>
                <p className="text-green-700 text-sm">
                  CineBook is committed to eco-friendly practices. All tickets are delivered digitally - 
                  no physical shipping required! Access your tickets instantly after booking confirmation.
                </p>
              </div>
            </div>
          </div>

          {/* Delivery Methods */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-6">Ticket Delivery Methods</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Mobile App */}
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Mobile App</h3>
                    <p className="text-sm text-muted-foreground">Recommended</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Instant access after booking</li>
                  <li>• Offline ticket storage</li>
                  <li>• QR code for easy scanning</li>
                  <li>• Push notifications for reminders</li>
                  <li>• Easy ticket sharing</li>
                </ul>
              </div>

              {/* Email */}
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email Delivery</h3>
                    <p className="text-sm text-muted-foreground">Always included</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Sent to registered email address</li>
                  <li>• PDF attachment with ticket details</li>
                  <li>• Booking confirmation included</li>
                  <li>• Easy to forward and share</li>
                  <li>• Backup copy for your records</li>
                </ul>
              </div>

              {/* SMS */}
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <QrCode className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">SMS Confirmation</h3>
                    <p className="text-sm text-muted-foreground">Quick reference</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Booking reference number</li>
                  <li>• Show details and timing</li>
                  <li>• Theater location</li>
                  <li>• Customer support contact</li>
                  <li>• Link to download full ticket</li>
                </ul>
              </div>

              {/* Print at Home */}
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <Printer className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Print at Home</h3>
                    <p className="text-sm text-muted-foreground">Optional</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Download PDF from email</li>
                  <li>• Print on A4 paper</li>
                  <li>• No special paper required</li>
                  <li>• Scannable QR code included</li>
                  <li>• Physical backup option</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Delivery Timeline */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              Delivery Timeline
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">1</div>
                <div>
                  <h3 className="font-semibold">Immediate (0-2 minutes)</h3>
                  <p className="text-sm text-muted-foreground mb-2">After successful payment confirmation</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    <li>Booking confirmation on screen</li>
                    <li>Ticket available in mobile app</li>
                    <li>SMS confirmation sent</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">2</div>
                <div>
                  <h3 className="font-semibold">Within 5 minutes</h3>
                  <p className="text-sm text-muted-foreground mb-2">Email delivery with full ticket details</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    <li>Detailed email confirmation</li>
                    <li>PDF ticket attachment</li>
                    <li>Show and theater information</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">3</div>
                <div>
                  <h3 className="font-semibold">24 hours before show</h3>
                  <p className="text-sm text-muted-foreground mb-2">Reminder notifications</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    <li>Email reminder with directions</li>
                    <li>SMS reminder notification</li>
                    <li>Push notification (if app installed)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Information */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-6">What's Included in Your Ticket</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Essential Information</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Movie title and language</li>
                  <li>• Show date and time</li>
                  <li>• Theater name and address</li>
                  <li>• Screen number</li>
                  <li>• Seat numbers</li>
                  <li>• Booking reference number</li>
                  <li>• Total amount paid</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Additional Features</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• QR code for entry</li>
                  <li>• Barcode for verification</li>
                  <li>• Terms and conditions</li>
                  <li>• Customer support contact</li>
                  <li>• Directions to theater</li>
                  <li>• Parking information</li>
                  <li>• Age rating and duration</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Entry Process */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-6">Theater Entry Process</h2>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                <div>
                  <h3 className="font-semibold">Arrive Early</h3>
                  <p className="text-sm text-muted-foreground">
                    Reach the theater at least 15 minutes before showtime for smooth entry and to find your seats.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                <div>
                  <h3 className="font-semibold">Show Your Ticket</h3>
                  <p className="text-sm text-muted-foreground">
                    Present your digital ticket (mobile app or email) or printed ticket at the entrance.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                <div>
                  <h3 className="font-semibold">QR Code Scanning</h3>
                  <p className="text-sm text-muted-foreground">
                    Theater staff will scan the QR code on your ticket for quick verification and entry.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                <div>
                  <h3 className="font-semibold">Find Your Seats</h3>
                  <p className="text-sm text-muted-foreground">
                    Use the seat numbers on your ticket to locate your assigned seats in the theater.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-6">Troubleshooting</h2>
            
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Didn't receive your ticket?</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Check your spam/junk folder</li>
                  <li>• Verify the email address in your account</li>
                  <li>• Log into your CineBook account to download tickets</li>
                  <li>• Contact customer support with your booking reference</li>
                </ul>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">QR code not scanning?</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Ensure your phone screen brightness is at maximum</li>
                  <li>• Clean your phone screen</li>
                  <li>• Show the booking reference number to theater staff</li>
                  <li>• Use the printed ticket as backup</li>
                </ul>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Lost your ticket?</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Check your email for the ticket attachment</li>
                  <li>• Log into your CineBook account</li>
                  <li>• Visit the 'My Bookings' section</li>
                  <li>• Download or re-send the ticket to your email</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-4">Need Help?</h2>
            <p className="text-muted-foreground mb-4">
              Our customer support team is available 24/7 to help you with ticket delivery issues.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="font-medium">Phone Support</p>
                <p className="text-primary">1800-123-4567</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="font-medium">Email Support</p>
                <p className="text-primary">tickets@cinebook.com</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="font-medium">Live Chat</p>
                <p className="text-primary">Available on website</p>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Last updated: January 2025</p>
            <p>Ticket delivery methods may vary based on theater partnerships and technical capabilities.</p>
          </div>
        </div>
      </div>
    </div>
  );
}