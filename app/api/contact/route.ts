
import { sendContactUsMessage } from '@/lib/email-service';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Basic validation
    if (!data.name || !data.email || !data.phone || !data.message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const success = await sendContactUsMessage(data);

    if (success) {
      return NextResponse.json({ message: 'Message sent successfully!' });
    } else {
      return NextResponse.json({ message: 'Failed to send message via email service.' }, { status: 500 });
    }
  } catch (error) {
    console.error('Contact Form API Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}