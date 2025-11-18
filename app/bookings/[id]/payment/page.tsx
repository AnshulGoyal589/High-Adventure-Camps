'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useEffect, useState } from 'react';
import { Booking } from '@/lib/types';
import { useAuth } from '@clerk/nextjs';
import { useRouter, useParams } from 'next/navigation';
import { AlertCircle, Loader, CheckCircle } from 'lucide-react';
import Script from 'next/script';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentPage() {
  const params = useParams();
  const bookingId = params.id as string;
  const { userId } = useAuth();
  const router = useRouter();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);

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

  const handlePayment = async () => {
    if (!booking) return;

    setProcessing(true);
    setError('');

    try {
      // Create order on Razorpay
      const orderResponse = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create payment order');
      }

      const orderData = await orderResponse.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: orderData.orderId,
        amount: orderData.amount * 100,
        currency: orderData.currency,
        name: 'High Adventure Camps',
        description: booking.tourTitle,
        customer_notify: 1,
        prefill: {
          name: orderData.name,
          email: orderData.email,
          contact: orderData.phone,
        },
        handler: async (response: any) => {
          try {
            // Verify payment signature
            const verifyResponse = await fetch('/api/payment/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                bookingId,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            if (!verifyResponse.ok) {
              throw new Error('Payment verification failed');
            }

            // Payment successful
            setPaymentInitiated(false);
            router.push(`/bookings/${bookingId}/success`);
          } catch (err) {
            setError('Payment verification failed. Please contact support.');
            setProcessing(false);
            setPaymentInitiated(false);
          }
        },
        modal: {
          ondismiss: () => {
            setProcessing(false);
            setPaymentInitiated(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      setPaymentInitiated(true);
      razorpay.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
      setProcessing(false);
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
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <Navbar />

      <section className="py-12 flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Payment</h1>
          <p className="text-muted-foreground mb-8">Complete your booking with secure payment</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-secondary/5 border border-border rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-8 pb-8 border-b border-border">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Package</p>
                      <p className="font-semibold text-lg">{booking.tourTitle}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">Price</p>
                      <p className="font-semibold">₹{booking.tourPrice.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Number of Travelers</p>
                      <p className="font-semibold">{booking.numberOfPeople}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">Subtotal</p>
                      <p className="font-semibold">₹{(booking.tourPrice * booking.numberOfPeople).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Start Date</p>
                      <p className="font-semibold">{new Date(booking.startDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold">Total Amount</span>
                  <span className="text-4xl font-bold text-primary">₹{booking.totalPrice.toLocaleString()}</span>
                </div>

                {error && (
                  <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-lg flex items-start gap-3 mb-6">
                    <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <p>{error}</p>
                  </div>
                )}

                <div className="bg-primary/10 border border-primary text-primary p-4 rounded-lg flex items-start gap-3 mb-6">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Your payment is secure and encrypted with Razorpay</p>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={processing}
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 transition flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Pay Now with Razorpay'
                  )}
                </button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Secured by Razorpay. All transactions are safe and encrypted.
                </p>
              </div>
            </div>

            {/* Traveler Details */}
            <div className="lg:col-span-1">
              <div className="bg-secondary/10 border border-border rounded-lg p-6 sticky top-24">
                <h3 className="font-bold mb-4">Traveler Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Name</p>
                    <p className="font-medium">{booking.customerDetails.fullName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Email</p>
                    <p className="font-medium break-all">{booking.customerDetails.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Phone</p>
                    <p className="font-medium">{booking.customerDetails.phone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Address</p>
                    <p className="font-medium">{booking.customerDetails.address}</p>
                  </div>
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
