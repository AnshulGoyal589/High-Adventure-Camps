import { connectToDatabase } from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { auth } from '@clerk/nextjs/server';
import { isAdmin } from '@/lib/admin-auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { db } = await connectToDatabase();
    const booking = await db
      .collection('bookings')
      .findOne({ _id: new ObjectId(params.id) });

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    const adminAccess = await isAdmin();
    if (!adminAccess && booking.userId !== userId) {
      return NextResponse.json(
        { error: 'Forbidden: Cannot access this booking' },
        { status: 403 }
      );
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      { error: 'Failed to fetch booking' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { db } = await connectToDatabase();
    
    const existingBooking = await db.collection('bookings').findOne({
      _id: new ObjectId(params.id),
    });

    if (!existingBooking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    const adminAccess = await isAdmin();
    if (!adminAccess && existingBooking.userId !== userId) {
      return NextResponse.json(
        { error: 'Forbidden: Cannot update this booking' },
        { status: 403 }
      );
    }

    const data = await request.json();

    const updateData: any = {
      updatedAt: new Date(),
    };

    if (data.paymentDetails) {
      updateData.paymentDetails = data.paymentDetails;
      updateData.status = 'confirmed';
    }

    if (data.status && adminAccess) {
      updateData.status = data.status;
    }

    const result = await db.collection('bookings').updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}
