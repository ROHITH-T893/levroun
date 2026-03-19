// src/app/api/services/route.js
import { NextResponse } from 'next/server';
import { databases } from '@/lib/appwrite-server';
import { ID } from 'appwrite';

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const SERVICES_COLLECTION_ID = process.env.NEXT_PUBLIC_SERVICES_COLLECTION_ID;

export async function POST(request) {
  try {
    const body = await request.json();

    const service = await databases.createDocument(
      DB_ID,
      SERVICES_COLLECTION_ID,
      ID.unique(),
      {
        title: body.title,
        description: body.description,
        icon: body.icon || '⚙️',
        order: body.order || 0,
      }
    );

    return NextResponse.json({
      success: true,
      service
    }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const response = await databases.listDocuments(
      DB_ID,
      SERVICES_COLLECTION_ID,
      [],
      100
    );
    
    const services = response.documents.sort((a, b) => (a.order || 0) - (b.order || 0));
    
    return NextResponse.json({
      success: true,
      services
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
