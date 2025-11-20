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
    const data = (await request.json()) as Tour;

    const {_id, ...tourData} = data;

    const tour = {
      ...tourData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('tours').insertOne(tour);
    return NextResponse.json({ ...tour, _id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Error creating tour:', error);
    return NextResponse.json({ error: 'Failed to create tour' }, { status: 500 });
  }
}
