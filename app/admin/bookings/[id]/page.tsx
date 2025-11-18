'use client';

import { useEffect, useState } from 'react';
import { Booking } from '@/lib/types';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Loader, AlertCircle, CheckCircle, X } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { AdminNavbar } from '@/components/admin-navbar';

export default function AdminBookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.id as string;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`/api/bookings/${bookingId}`);
        if (!response.ok) throw new Error('Booking not found');
        const data = await response.json();
        setBooking(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load booking');
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handleStatusUpdate = async (newStatus: string) => {
    setUpdating(true);
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update booking');
      
      setBooking(prev => prev ? { ...prev, status: newStatus as any } : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update booking');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col">
        <AdminNavbar />
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
        <AdminNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Booking Not Found</h2>
            <Link href="/admin/bookings" className="text-primary hover:underline">
              Back to Bookings
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <AdminNavbar />

      <section className="py-12 flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/admin/bookings" className="text-primary hover:underline mb-6 inline-block">
            ← Back to Bookings
          </Link>

          <h1 className="text-4xl font-bold mb-8">Booking Details</h1>

          {error && (
            <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-lg flex items-start gap-3 mb-8">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-secondary/5 border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Booking Status</h2>
                <span className={`inline-block px-4 py-2 rounded-full font-semibold ${
                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>

              <div className="flex gap-2">
                {['pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusUpdate(status)}
                    disabled={updating || booking.status === status}
                    className="px-4 py-2 rounded-lg border transition disabled:opacity-50 capitalize"
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Details */}
            <div className="bg-secondary/5 border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Customer Details</h2>
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

            {/* Booking Details */}
            <div className="bg-secondary/5 border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Booking Details</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Package</p>
                    <p className="font-semibold text-lg">{booking.tourTitle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Number of Travelers</p>
                    <p className="font-semibold text-lg">{booking.numberOfPeople}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Start Date</p>
                    <p className="font-semibold text-lg">{new Date(booking.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Price Per Person</p>
                    <p className="font-semibold text-lg">₹{booking.tourPrice.toLocaleString()}</p>
                  </div>
                </div>

                {booking.specialRequests && (
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-2">Special Requests</p>
                    <p className="font-medium">{booking.specialRequests}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Details */}
            {booking.paymentDetails && (
              <div className="bg-secondary/5 border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Payment Details</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order ID</span>
                    <span className="font-mono font-semibold">{booking.paymentDetails.razorpayOrderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment ID</span>
                    <span className="font-mono font-semibold">{booking.paymentDetails.razorpayPaymentId || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-border">
                    <span className="font-semibold">Total Amount</span>
                    <span className="text-2xl font-bold text-primary">₹{booking.totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Summary */}
            <div className="bg-primary/5 border border-primary rounded-lg p-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Booking ID: {booking._id}</h3>
                  <p className="text-sm text-muted-foreground">
                    Created on {new Date(booking.createdAt).toLocaleDateString()} at {new Date(booking.createdAt).toLocaleTimeString()}
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
