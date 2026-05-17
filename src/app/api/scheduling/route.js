import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';

const SchedulingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  service: { type: String },
  message: { type: String },
  status: { type: String, default: 'pending', enum: ['pending', 'confirmed', 'rejected'] }
}, { timestamps: true });

const Scheduling = mongoose.models.Scheduling || mongoose.model('Scheduling', SchedulingSchema);

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (date) {
      // Return only booked time slots for this specific date
      const bookings = await Scheduling.find({ date, status: { $ne: 'rejected' } }, 'time');
      const bookedSlots = bookings.map(b => b.time);
      return NextResponse.json({ success: true, bookedSlots }, { status: 200 });
    }

    const schedules = await Scheduling.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: schedules }, { status: 200 });
  } catch (error) {
    console.error('Error fetching schedules:', error);
    return NextResponse.json({ error: 'Failed to fetch schedules' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, email, date, time } = body;

    if (!name || !email || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newSchedule = await Scheduling.create(body);

    // Send email notifications (Async - don't block the response)
    try {
      const { sendBookingConfirmation, sendAdminNotification } = await import('@/lib/mailer');
      const formattedDate = new Date(date).toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      // Notify client
      sendBookingConfirmation({
        name,
        email,
        date: formattedDate,
        time,
        service: body.service
      }).catch(err => console.error('Mailing Error (Client):', err));

      // Notify admin
      sendAdminNotification({
        name,
        email,
        phone: body.phone,
        date: formattedDate,
        time,
        service: body.service,
        message: body.message
      }).catch(err => console.error('Mailing Error (Admin):', err));

    } catch (mailError) {
      console.error('Failed to trigger email system:', mailError);
    }

    return NextResponse.json({ success: true, data: newSchedule }, { status: 201 });
  } catch (error) {
    console.error('Error creating schedule:', error);
    return NextResponse.json({ error: 'Failed to create scheduling request' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    await connectDB();
    const token = request.cookies.get('adminToken')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { id, status } = body;

    const updated = await Scheduling.findByIdAndUpdate(id, { status }, { new: true });
    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error) {
    console.error('Error updating schedule:', error);
    return NextResponse.json({ error: 'Failed to update schedule' }, { status: 500 });
  }
}
