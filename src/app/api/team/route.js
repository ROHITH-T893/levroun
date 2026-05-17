import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Team } from '@/lib/models';

export async function GET() {
  try {
    await connectDB();
    const team = await Team.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: team }, { status: 200 });
  } catch (error) {
    console.error('Error fetching team:', error);
    return NextResponse.json({ error: 'Failed to fetch team' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const token = request.cookies.get('adminToken')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const newMember = await Team.create(body);
    return NextResponse.json({ success: true, data: newMember }, { status: 201 });
  } catch (error) {
    console.error('Error adding team member:', error);
    return NextResponse.json({ error: 'Failed to add team member' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    const token = request.cookies.get('adminToken')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { id, _id, __v, ...updateData } = body;
    const updateId = id || _id;
    if (!updateId) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    
    const updatedMember = await Team.findByIdAndUpdate(updateId, updateData, { new: true });
    return NextResponse.json({ success: true, data: updatedMember }, { status: 200 });
  } catch (error) {
    console.error('Error updating team member:', error);
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const token = request.cookies.get('adminToken')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await Team.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Member deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting team member:', error);
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
}
