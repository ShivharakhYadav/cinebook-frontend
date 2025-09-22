'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Eye, Lock, Database, Share2, Cookie } from 'lucide-react';

export default function PrivacyPage() {
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
            <h1 className="text-4xl font-bold text-primary mb-4">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your privacy matters to us. Learn how we collect, use, and protect your information.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Privacy Commitment */}
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">Our Privacy Commitment</h3>
                <p className="text-blue-700 text-sm">
                  CineBook is committed to protecting your privacy and ensuring the security of your personal information. 
                  This policy explains how we collect, use, and safeguard your data when you use our services.
                </p>
              </div>
            </div>
          </div>

          {/* Information We Collect */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
              <Database className="w-6 h-6" />
              Information We Collect
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">We collect the following personal information when you:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Create an account:</strong> Name, email address, phone number, date of birth</li>
                    <li><strong>Make bookings:</strong> Payment information, billing address, seat preferences</li>
                    <li><strong>Contact support:</strong> Communication history, feedback, and support requests</li>
                    <li><strong>Use our services:</strong> Location data (with permission), device information</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Automatically Collected Information</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Usage data:</strong> Pages visited, features used, time spent on platform</li>
                    <li><strong>Device information:</strong> IP address, browser type, operating system</li>
                    <li><strong>Cookies and tracking:</strong> Session data, preferences, analytics information</li>
                    <li><strong>Transaction data:</strong> Booking history, payment methods, purchase patterns</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Third-Party Information</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Social media:</strong> Profile information when you connect social accounts</li>
                    <li><strong>Payment processors:</strong> Transaction verification and fraud prevention data</li>
                    <li><strong>Analytics providers:</strong> Aggregated usage statistics and performance metrics</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
              <Eye className="w-6 h-6" />
              How We Use Your Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Service Delivery</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Process and manage your bookings</li>
                  <li>• Send booking confirmations and tickets</li>
                  <li>• Provide customer support</li>
                  <li>• Process payments and refunds</li>
                  <li>• Send important service updates</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Personalization</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Recommend movies based on preferences</li>
                  <li>• Customize your user experience</li>
                  <li>• Remember your seat preferences</li>
                  <li>• Suggest nearby theaters</li>
                  <li>• Provide relevant offers and promotions</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Communication</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Send booking reminders and updates</li>
                  <li>• Notify about new movies and shows</li>
                  <li>• Share promotional offers (with consent)</li>
                  <li>• Conduct surveys and feedback requests</li>
                  <li>• Provide customer support responses</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Security & Analytics</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Prevent fraud and unauthorized access</li>
                  <li>• Monitor and improve service performance</li>
                  <li>• Analyze usage patterns and trends</li>
                  <li>• Ensure platform security and stability</li>
                  <li>• Comply with legal requirements</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Information Sharing */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
              <Share2 className="w-6 h-6" />
              Information Sharing
            </h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-green-600 mb-2">We DO NOT sell your personal information</h3>
                <p className="text-sm text-muted-foreground">
                  Your personal data is never sold to third parties for marketing or commercial purposes.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">We may share information with:</h3>
                
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Theater Partners</h4>
                  <p className="text-sm text-muted-foreground">
                    Booking details and customer information necessary for ticket validation and entry management.
                  </p>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Payment Processors</h4>
                  <p className="text-sm text-muted-foreground">
                    Payment information required to process transactions securely through Stripe and other payment gateways.
                  </p>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Service Providers</h4>
                  <p className="text-sm text-muted-foreground">
                    Trusted third-party services for email delivery, SMS notifications, analytics, and customer support.
                  </p>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Legal Requirements</h4>
                  <p className="text-sm text-muted-foreground">
                    When required by law, court order, or government regulations, or to protect our rights and safety.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Security */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
              <Lock className="w-6 h-6" />
              Data Security
            </h2>
            
            <div className="space-y-4">
              <p className="text-muted-foreground">
                We implement industry-standard security measures to protect your personal information:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Encryption</h3>
                  <p className="text-sm text-muted-foreground">
                    All data transmission is encrypted using SSL/TLS protocols. Sensitive data is encrypted at rest.
                  </p>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Access Controls</h3>
                  <p className="text-sm text-muted-foreground">
                    Strict access controls ensure only authorized personnel can access your information.
                  </p>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Regular Audits</h3>
                  <p className="text-sm text-muted-foreground">
                    Regular security audits and vulnerability assessments to maintain system integrity.
                  </p>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Secure Infrastructure</h3>
                  <p className="text-sm text-muted-foreground">
                    Hosted on secure cloud infrastructure with automated backups and disaster recovery.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cookies and Tracking */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
              <Cookie className="w-6 h-6" />
              Cookies and Tracking
            </h2>
            
            <div className="space-y-4">
              <p className="text-muted-foreground">
                We use cookies and similar technologies to enhance your experience:
              </p>
              
              <div className="space-y-3">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Essential Cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    Required for basic functionality like login sessions, shopping cart, and security features.
                  </p>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Performance Cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    Help us understand how you use our platform to improve performance and user experience.
                  </p>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Functional Cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    Remember your preferences, language settings, and personalization choices.
                  </p>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Marketing Cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    Used to deliver relevant advertisements and measure campaign effectiveness (with your consent).
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                You can manage cookie preferences through your browser settings or our cookie consent banner.
              </p>
            </div>
          </div>

          {/* Your Rights */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-6">Your Privacy Rights</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Access & Control</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• View and download your personal data</li>
                  <li>• Update or correct your information</li>
                  <li>• Delete your account and data</li>
                  <li>• Export your booking history</li>
                  <li>• Manage communication preferences</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Privacy Controls</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Opt-out of marketing communications</li>
                  <li>• Restrict data processing</li>
                  <li>• Object to automated decision-making</li>
                  <li>• Request data portability</li>
                  <li>• File privacy complaints</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>How to exercise your rights:</strong> Contact us at privacy@cinebook.com or use the 
                privacy controls in your account settings. We will respond to your request within 30 days.
              </p>
            </div>
          </div>

          {/* Data Retention */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-6">Data Retention</h2>
            
            <div className="space-y-4">
              <p className="text-muted-foreground">
                We retain your information only as long as necessary for the purposes outlined in this policy:
              </p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="font-medium">Account Information</span>
                  <span className="text-sm text-muted-foreground">Until account deletion</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="font-medium">Booking History</span>
                  <span className="text-sm text-muted-foreground">7 years (tax/legal requirements)</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="font-medium">Payment Information</span>
                  <span className="text-sm text-muted-foreground">As required by payment processors</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="font-medium">Support Communications</span>
                  <span className="text-sm text-muted-foreground">3 years</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="font-medium">Analytics Data</span>
                  <span className="text-sm text-muted-foreground">2 years (aggregated/anonymized)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Children's Privacy */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-6">Children's Privacy</h2>
            
            <div className="space-y-4">
              <p className="text-muted-foreground">
                We are committed to protecting children's privacy online:
              </p>
              
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Our services are not intended for children under 13 years of age</li>
                <li>We do not knowingly collect personal information from children under 13</li>
                <li>Users aged 13-17 require parental consent for account creation</li>
                <li>Parents can request deletion of their child's information</li>
                <li>We comply with applicable children's privacy laws (COPPA, etc.)</li>
              </ul>
              
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-700">
                  <strong>Parents:</strong> If you believe your child has provided personal information to us, 
                  please contact us immediately at privacy@cinebook.com to have it removed.
                </p>
              </div>
            </div>
          </div>

          {/* International Transfers */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-6">International Data Transfers</h2>
            
            <div className="space-y-4 text-muted-foreground text-sm">
              <p>
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place:
              </p>
              
              <ul className="list-disc list-inside space-y-1">
                <li>Data processing agreements with third-party providers</li>
                <li>Compliance with international data protection standards</li>
                <li>Use of approved transfer mechanisms (Standard Contractual Clauses)</li>
                <li>Regular monitoring of data protection practices</li>
              </ul>
            </div>
          </div>

          {/* Updates to Policy */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-6">Policy Updates</h2>
            
            <div className="space-y-4 text-muted-foreground text-sm">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices 
                or legal requirements. When we make significant changes:
              </p>
              
              <ul className="list-disc list-inside space-y-1">
                <li>We will notify you via email or platform notification</li>
                <li>We will post the updated policy on our website</li>
                <li>We will update the "Last Modified" date</li>
                <li>For material changes, we may seek your consent</li>
              </ul>
              
              <p>
                We encourage you to review this policy periodically to stay informed about how we 
                protect your information.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-primary mb-4">Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Privacy Officer</h3>
                <p className="text-sm text-muted-foreground">
                  Email: privacy@cinebook.com<br />
                  Phone: 1800-123-4567<br />
                  Response time: Within 48 hours
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Mailing Address</h3>
                <p className="text-sm text-muted-foreground">
                  CineBook Technologies Pvt. Ltd.<br />
                  Privacy Department<br />
                  123 Entertainment District<br />
                  Mumbai, Maharashtra 400001<br />
                  India
                </p>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Last updated: January 2025</p>
            <p>This Privacy Policy is effective immediately and supersedes all previous versions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}