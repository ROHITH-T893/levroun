// src/app/api/portfolio/route.js
import { NextResponse } from 'next/server';
import { databases } from '@/lib/appwrite-server';

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const PORTFOLIO_COLLECTION_ID = process.env.NEXT_PUBLIC_PORTFOLIO_COLLECTION_ID;

export async function GET() {
  try {
    const response = await databases.listDocuments(
      DB_ID,
      PORTFOLIO_COLLECTION_ID,
      [],
      100
    );
    
    return NextResponse.json({
      success: true,
      portfolio: response.documents
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio' },
      { status: 500 }
    );
  }
}
