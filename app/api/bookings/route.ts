import { connectToDatabase } from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { auth } from '@clerk/nextjs/server';
import { isAdmin } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized: Must be logged in' },
        { status: 401 }
      );
    }

    const { db } = await connectToDatabase();
    const data = await request.json();

    // Validate required fields
    if (
      !data.tourId ||
      !data.customerDetails ||
      !data.numberOfPeople ||
      !data.startDate
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create booking document
    const booking = {
      userId,
      tourId: new ObjectId(data.tourId),
      tourTitle: data.tourTitle,
      tourPrice: data.tourPrice,
      numberOfPeople: data.numberOfPeople,
      totalPrice: data.totalPrice,
      startDate: data.startDate,
      specialRequests: data.specialRequests || '',
      customerDetails: {
        fullName: data.customerDetails.fullName,
        email: data.customerDetails.email,
        phone: data.customerDetails.phone,
        address: data.customerDetails.address,
      },
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('bookings').insertOne(booking);

    return NextResponse.json({
      _id: result.insertedId,
      ...booking,
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { db } = await connectToDatabase();
    const searchParams = request.nextUrl.searchParams;
    const adminAccess = await isAdmin();

    let query: any = {};
    
    if (!adminAccess) {
      query.userId = userId;
    }

    const bookings = await db
      .collection('bookings')
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}
