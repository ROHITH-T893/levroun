// src/app/api/leads/route.js
import { NextResponse } from 'next/server';
import { databases } from '@/lib/appwrite-server';
import { ID } from 'appwrite';

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const LEADS_COLLECTION_ID = process.env.NEXT_PUBLIC_LEADS_COLLECTION_ID;

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, service, message, preferred_date } = body;

    // Validation
    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: firstName, email, and message' },
        { status: 400 }
      );
    }

    // Create lead in Appwrite
    const lead = await databases.createDocument(
      DB_ID,
      LEADS_COLLECTION_ID,
      ID.unique(),
      {
        firstName,
        lastName: lastName || '',
        email,
        phone: phone || '',
        service_requested: service || '',
        message,
        preferred_date: preferred_date || null,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    );

    return NextResponse.json({ 
      success: true,
      message: 'Lead created successfully',
      leadId: lead.$id 
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to create lead', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const response = await databases.listDocuments(
      DB_ID,
      LEADS_COLLECTION_ID,
      [],
      500
    );
    
    return NextResponse.json({
      success: true,
      leads: response.documents.sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
      )
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}
