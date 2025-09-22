'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Users, CreditCard, AlertCircle } from 'lucide-react';

export default function TermsPage() {
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
            <h1 className="text-4xl font-bold text-primary mb-4">Terms & Conditions</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Please read these terms carefully before using CineBook services
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Important Notice */}
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">Important Notice</h3>
                <p className="text-yellow-700 text-sm">
                  By using CineBook services, you agree to be bound by these Terms and Conditions. 
                  If you do not agree with any part of these terms, please do not use our services.
                </p>
              </div>
            </div>
          </div>

          {/* Acceptance of Terms */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-4">1. Acceptance of Terms</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                These Terms and Conditions ("Terms") govern your use of the CineBook platform, 
                including our website, mobile applications, and related services (collectively, the "Service").
              </p>
              <p>
                By accessing or using our Service, you agree to be bound by these Terms. 
                These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
              <p>
                We reserve the right to modify these Terms at any time. We will notify users of any 
                material changes via email or through our platform. Your continued use of the Service 
                after such modifications constitutes acceptance of the updated Terms.
              </p>
            </div>
          </div>

          {/* User Accounts */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
              <Users className="w-6 h-6" />
              2. User Accounts
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Account Creation</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>You must provide accurate and complete information when creating an account</li>
                  <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                  <li>You must be at least 13 years old to create an account</li>
                  <li>One person may not maintain more than one account</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Account Responsibilities</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>You are responsible for all activities that occur under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>Keep your contact information up to date</li>
                  <li>Do not share your account with others</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Account Termination</h3>
                <p className="text-sm">
                  We reserve the right to suspend or terminate your account if you violate these Terms 
                  or engage in fraudulent, abusive, or illegal activities.
                </p>
              </div>
            </div>
          </div>

          {/* Booking Terms */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-4">3. Booking Terms</h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Ticket Booking</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>All bookings are subject to availability</li>
                  <li>Ticket prices are as displayed at the time of booking</li>
                  <li>Maximum 6 tickets per booking per show</li>
                  <li>Bookings are confirmed only after successful payment</li>
                  <li>You must arrive at least 15 minutes before showtime</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Seat Selection</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Seats are temporarily locked during the selection process</li>
                  <li>Seat locks expire after 10 minutes of inactivity</li>
                  <li>Selected seats cannot be changed after payment confirmation</li>
                  <li>Theater reserves the right to change seating arrangements in exceptional circumstances</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Age Restrictions</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Age restrictions apply as per movie certification</li>
                  <li>Valid ID proof may be required at the theater</li>
                  <li>Children under 3 years are not allowed in theaters</li>
                  <li>Parental guidance required for movies rated 'A' or 'U/A'</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
              <CreditCard className="w-6 h-6" />
              4. Payment Terms
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Payment Methods</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>We accept credit cards, debit cards, UPI, and cash payments</li>
                  <li>All online payments are processed through secure payment gateways</li>
                  <li>Cash payments must be completed at the theater counter</li>
                  <li>Convenience fees apply to all online transactions</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Pricing</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>All prices are inclusive of applicable taxes</li>
                  <li>Prices may vary based on show timing, theater, and seat category</li>
                  <li>Special pricing may apply during festivals and holidays</li>
                  <li>Convenience fees are non-refundable</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Failed Payments</h3>
                <p className="text-sm">
                  In case of payment failures, your seat selection will be released automatically. 
                  You may attempt to book again subject to availability.
                </p>
              </div>
            </div>
          </div>

          {/* User Conduct */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6" />
              5. User Conduct
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>You agree not to:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Use the Service for any unlawful purpose or in violation of any laws</li>
                <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
                <li>Use automated systems or bots to make bookings</li>
                <li>Resell tickets at prices higher than face value</li>
                <li>Share or distribute copyrighted content from our platform</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Create fake accounts or provide false information</li>
                <li>Engage in any fraudulent or deceptive practices</li>
              </ul>
            </div>
          </div>

          {/* Theater Rules */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-4">6. Theater Rules & Regulations</h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Entry Requirements</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Valid ticket and ID proof required for entry</li>
                  <li>Entry may be denied after showtime begins</li>
                  <li>Outside food and beverages are not permitted</li>
                  <li>Smoking and alcohol consumption are strictly prohibited</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Behavior Guidelines</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Mobile phones must be switched to silent mode</li>
                  <li>Photography and recording are strictly prohibited</li>
                  <li>Maintain decorum and respect other patrons</li>
                  <li>Follow all safety instructions and emergency procedures</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-4">7. Limitation of Liability</h2>
            <div className="space-y-4 text-muted-foreground text-sm">
              <p>
                CineBook shall not be liable for any indirect, incidental, special, consequential, 
                or punitive damages, including but not limited to loss of profits, data, or use, 
                arising out of or in connection with your use of the Service.
              </p>
              <p>
                Our total liability to you for all claims arising from or relating to the Service 
                shall not exceed the amount you paid to us in the twelve months preceding the claim.
              </p>
              <p>
                We are not responsible for any technical issues, server downtime, or third-party 
                service failures that may affect your booking experience.
              </p>
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-4">8. Privacy</h2>
            <div className="space-y-4 text-muted-foreground text-sm">
              <p>
                Your privacy is important to us. Please review our Privacy Policy, which also governs 
                your use of the Service, to understand our practices.
              </p>
              <p>
                By using our Service, you consent to the collection and use of your information 
                as described in our Privacy Policy.
              </p>
            </div>
          </div>

          {/* Governing Law */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-4">9. Governing Law</h2>
            <div className="space-y-4 text-muted-foreground text-sm">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India, 
                without regard to its conflict of law provisions.
              </p>
              <p>
                Any disputes arising from these Terms or your use of the Service shall be subject 
                to the exclusive jurisdiction of the courts in Mumbai, India.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-4">10. Contact Information</h2>
            <div className="space-y-4 text-muted-foreground text-sm">
              <p>
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-foreground">Email:</p>
                  <p>legal@cinebook.com</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Phone:</p>
                  <p>1800-123-4567</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Address:</p>
                  <p>CineBook Technologies Pvt. Ltd.<br />
                     123 Entertainment District<br />
                     Mumbai, Maharashtra 400001<br />
                     India</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Last updated: January 2025</p>
            <p>These terms are effective immediately and supersede all previous versions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}