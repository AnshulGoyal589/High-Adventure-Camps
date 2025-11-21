import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Lead } from '@/lib/types';
import { validateEmail } from '@/lib/utils/validations';
import { isAdmin } from '@/lib/admin-auth';
import { auth } from '@clerk/nextjs/server';
import { sendLeadNotification } from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const data: Lead = await request.json();

    // Validate input
    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!validateEmail(data.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // if (!validatePhone(data.phone)) {
    //   return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
    // }

    const { _id, ...rest } = data as any;

    const lead = {
      ...rest,
      createdAt: new Date(),
    };

    const result = await db.collection('leads').insertOne(lead);

    try {
      await sendLeadNotification(data);
    } catch (emailError) {
      console.error('API succeeded, but failed to send email:', emailError);
    }
    return NextResponse.json({ ...lead, _id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
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

    const adminAccess = await isAdmin();
    if (!adminAccess) {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }

    const { db } = await connectToDatabase();
    const leads = await db
      .collection('leads')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}
