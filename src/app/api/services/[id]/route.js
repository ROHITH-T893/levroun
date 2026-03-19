// src/app/api/services/[id]/route.js
import { NextResponse } from 'next/server';
import { databases } from '@/lib/appwrite-server';

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const SERVICES_COLLECTION_ID = process.env.NEXT_PUBLIC_SERVICES_COLLECTION_ID;

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const service = await databases.getDocument(
      DB_ID,
      SERVICES_COLLECTION_ID,
      id
    );

    return NextResponse.json({
      success: true,
      service
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service' },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updatedService = await databases.updateDocument(
      DB_ID,
      SERVICES_COLLECTION_ID,
      id,
      body
    );

    return NextResponse.json({
      success: true,
      service: updatedService
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to update service' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await databases.deleteDocument(
      DB_ID,
      SERVICES_COLLECTION_ID,
      id
    );

    return NextResponse.json({
      success: true,
      message: 'Service deleted'
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    );
  }
}
