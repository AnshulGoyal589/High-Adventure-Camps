'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useEffect, useState } from 'react';
import { Booking } from '@/lib/types';
import { useAuth } from '@clerk/nextjs';
import { useRouter, useParams } from 'next/navigation';
import { CheckCircle, Loader, AlertCircle, Download, MapPin, Calendar, Users, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  const params = useParams();
  const bookingId = params.id as string;
  const { userId } = useAuth();
  const router = useRouter();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloadingReceipt, setDownloadingReceipt] = useState(false);

  useEffect(() => {
    if (!userId) {
      router.push('/sign-in');
      return;
    }

    const fetchBooking = async () => {
      try {
        const response = await fetch(`/api/bookings/${bookingId}`);
        if (!response.ok) throw new Error('Booking not found');
        const data = await response.json();
        setBooking(data);
      } catch (error) {
        console.error('Error fetching booking:', error);
        setError('Failed to load booking details');
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [userId, router, bookingId]);

  const handleDownloadReceipt = async () => {
    try {
      setDownloadingReceipt(true);
      const response = await fetch(`/api/bookings/${bookingId}/receipt`);
      
      if (!response.ok) {
        throw new Error('Failed to download receipt');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `booking-receipt-${bookingId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error downloading receipt:', err);
      alert('Failed to download receipt. Please try again.');
    } finally {
      setDownloadingReceipt(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader className="w-8 h-8 text-primary animate-spin" />
        </div>
        <Footer />
      </main>
    );
  }

  if (!booking) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Booking Not Found</h2>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <section className="py-12 flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <CheckCircle className="w-16 h-16 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-lg text-muted-foreground">Your adventure booking is confirmed. Get ready for an amazing experience!</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Confirmation Card */}
              <div className="bg-secondary/5 border border-border rounded-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Booking Details</h2>
                  <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                    Confirmed
                  </span>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Booking Reference</p>
                    <p className="text-lg font-mono font-bold">{booking._id}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-y border-border">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Start Date
                      </p>
                      <p className="font-semibold">{new Date(booking.startDate).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4" /> Travelers
                      </p>
                      <p className="font-semibold">{booking.numberOfPeople} person{booking.numberOfPeople > 1 ? 's' : ''}</p>
                    </div>
                  </div>

                  <div className="bg-primary/5 p-6 rounded-lg">
                    <h3 className="font-bold mb-4">Package Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-foreground">{booking.tourTitle}</span>
                        <span className="font-semibold">₹{booking.tourPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground">Quantity ({booking.numberOfPeople}x)</span>
                        <span className="font-semibold">₹{(booking.tourPrice * booking.numberOfPeople).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guest Information */}
              <div className="bg-secondary/5 border border-border rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Guest Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                    <p className="font-semibold">{booking.customerDetails.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="font-semibold break-all">{booking.customerDetails.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <p className="font-semibold">{booking.customerDetails.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Address</p>
                    <p className="font-semibold">{booking.customerDetails.address}</p>
                  </div>
                </div>
              </div>

              {/* What's Next */}
              <div className="bg-secondary/5 border border-border rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6">What's Next?</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">1</div>
                    <div>
                      <p className="font-semibold">Confirmation Email Sent</p>
                      <p className="text-sm text-muted-foreground">We've sent a detailed confirmation email to {booking.customerDetails.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">2</div>
                    <div>
                      <p className="font-semibold">Review Itinerary</p>
                      <p className="text-sm text-muted-foreground">Check the booking details and prepare for your adventure</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">3</div>
                    <div>
                      <p className="font-semibold">Pre-Trip Communication</p>
                      <p className="text-sm text-muted-foreground">Our team will reach out 7 days before your trip</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Summary Card */}
              <div className="bg-secondary/10 border border-border rounded-lg p-6 sticky top-24 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Amount Paid</p>
                  <p className="text-4xl font-bold text-primary">₹{booking.totalPrice.toLocaleString()}</p>
                </div>

                <button
                  onClick={handleDownloadReceipt}
                  disabled={downloadingReceipt}
                  className="w-full flex items-center justify-center gap-2 bg-secondary text-foreground py-2 rounded-lg hover:bg-border transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4" />
                  {downloadingReceipt ? 'Downloading...' : 'Download Receipt'}
                </button>

                <Link
                  href="/packages"
                  className="block text-center py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-medium"
                >
                  Explore More Packages
                </Link>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-sm">
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-primary">Need help?</span> Contact our support team at support@highventurecamps.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
