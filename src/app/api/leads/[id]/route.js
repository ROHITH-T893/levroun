// src/app/api/leads/[id]/route.js
import { NextResponse } from 'next/server';
import { databases } from '@/lib/appwrite-server';

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const LEADS_COLLECTION_ID = process.env.NEXT_PUBLIC_LEADS_COLLECTION_ID;

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    // Update the lead
    const updatedLead = await databases.updateDocument(
      DB_ID,
      LEADS_COLLECTION_ID,
      id,
      {
        ...body,
        updated_at: new Date().toISOString()
      }
    );

    return NextResponse.json({
      success: true,
      lead: updatedLead
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to update lead', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    const lead = await databases.getDocument(
      DB_ID,
      LEADS_COLLECTION_ID,
      id
    );

    return NextResponse.json({
      success: true,
      lead
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lead' },
      { status: 500 }
    );
  }
}
