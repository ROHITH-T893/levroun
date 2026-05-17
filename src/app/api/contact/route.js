import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Contact } from '@/lib/models';

export async function GET(request) {
  try {
    await connectDB();
    const token = request.cookies.get('adminToken')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const submissions = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: submissions }, { status: 200 });
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return NextResponse.json({ error: 'Failed to fetch contact submissions' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { firstName, lastName, email, message } = body;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newSubmission = await Contact.create(body);
    return NextResponse.json({ success: true, data: newSubmission }, { status: 201 });
  } catch (error) {
    console.error('Error saving contact submission:', error);
    return NextResponse.json({ error: 'Failed to save contact submission' }, { status: 500 });
  }
}
