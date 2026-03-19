// src/app/api/content/route.js
import { NextResponse } from 'next/server';
import { databases } from '@/lib/appwrite-server';

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const PAGES_COLLECTION_ID = process.env.NEXT_PUBLIC_PAGES_COLLECTION_ID;

export async function GET() {
  try {
    const response = await databases.listDocuments(
      DB_ID,
      PAGES_COLLECTION_ID,
      [],
      1
    );
    
    return NextResponse.json({
      success: true,
      content: response.documents[0] || null
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}
