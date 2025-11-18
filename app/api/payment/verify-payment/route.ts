import { connectToDatabase } from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { sendBookingConfirmation, sendAdminBookingNotification } from '@/lib/email-service';
import { Booking, Tour } from '@/lib/types';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export async function POST(request: NextRequest) {
  try {
    const {
      bookingId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    } = await request.json();

    if (!bookingId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json(
        { error: 'Missing required payment details' },
        { status: 400 }
      );
    }

    // Verify signature
    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '');
    shasum.update(`${razorpayOrderId}|${razorpayPaymentId}`);
    const digest = shasum.digest('hex');

    if (digest !== razorpaySignature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    
    // Fetch booking and tour details
    const booking = await db.collection('bookings').findOne({
      _id: new ObjectId(bookingId),
    }) as unknown as Booking;

    const tour = await db.collection('tours').findOne({
      _id: new ObjectId(booking?.tourId),
    }) as unknown as Tour;

    // Update booking with payment details
    await db.collection('bookings').updateOne(
      { _id: new ObjectId(bookingId) },
      {
        $set: {
          status: 'confirmed',
          paymentDetails: {
            razorpayOrderId,
            razorpayPaymentId,
            razorpaySignature,
            amount: booking?.totalPrice || 0,
            status: 'completed',
          },
          updatedAt: new Date(),
        },
      }
    );

    // Send booking confirmation email to customer
    if (booking && tour) {
      await sendBookingConfirmation(booking, tour);
      // Send notification email to admin
      await sendAdminBookingNotification(booking, tour);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
