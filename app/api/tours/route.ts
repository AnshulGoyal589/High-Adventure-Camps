import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Tour } from '@/lib/types';
import { ObjectId } from 'mongodb';
import { isAdmin } from '@/lib/admin-auth';
import { auth } from '@clerk/nextjs/server';

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const searchParams = request.nextUrl.searchParams;
    const featured = searchParams.get('featured');
    
    const filter: any = {};
    if (featured === 'true') {
      filter.featured = true;
    }

    const tours = await db
      .collection('tours')
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(tours);
  } catch (error) {
    console.error('Error fetching tours:', error);
    return NextResponse.json({ error: 'Failed to fetch tours' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const adminAccess = await isAdmin();
    if (!adminAccess) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin access required' },
        { status: 403 }
      );
    }

    const { db } = await connectToDatabase();
    const data: Tour = await request.json();

    const tour = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Remove any string _id before inserting to satisfy MongoDB types
    const { _id, ...tourDoc } = tour;
    const result = await db.collection('tours').insertOne(tourDoc);
    return NextResponse.json({ ...tourDoc, _id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Error creating tour:', error);
    return NextResponse.json({ error: 'Failed to create tour' }, { status: 500 });
  }
}
