import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Activity } from '@/lib/types';
import { isAdmin } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const searchParams = request.nextUrl.searchParams;
    const featured = searchParams.get('featured');

    const filter: any = {};
    if (featured === 'true') {
      filter.featured = true;
    }

    const activities = await db
      .collection('activities')
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 });
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
    const data = (await request.json()) as Activity;
    // Remove any incoming string _id so MongoDB can create a proper ObjectId
    const { _id, ...activityData } = data;

    const activity = {
      ...activityData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('activities').insertOne(activity);
    return NextResponse.json({ ...activity, _id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Error creating activity:', error);
    return NextResponse.json({ error: 'Failed to create activity' }, { status: 500 });
  }
}
