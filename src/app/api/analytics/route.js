import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Visitor } from '@/lib/models';

// GET handlers: fetch visitor statistics for Admin Dashboard
export async function GET() {
  try {
    await connectDB();

    const totalVisitors = await Visitor.countDocuments({});

    // Calculate today's visitors (from midnight local time, assuming IST or server local time)
    // For universal simplicity, we use UTC start of day
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const todayVisitors = await Visitor.countDocuments({
      createdAt: { $gte: startOfToday }
    });

    return NextResponse.json({
      success: true,
      totalVisitors,
      todayVisitors
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}

// POST handler: log a new visit from the client
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json().catch(() => ({}));
    const path = body.path || '/';

    await Visitor.create({ path });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Error logging visit:', error);
    return NextResponse.json({ error: 'Failed to log visit' }, { status: 500 });
  }
}
