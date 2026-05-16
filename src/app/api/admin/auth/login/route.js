// src/app/api/admin/auth/login/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { databases } from '@/lib/appwrite-server';

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_USERS_COLLECTION_ID;

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Query user from Appwrite
    const response = await databases.listDocuments(
      DB_ID,
      USERS_COLLECTION_ID,
      []
    );

    const user = response.documents.find(u => u.email === email);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Return user info (without password)
    return NextResponse.json({
      success: true,
      email: user.email,
      userId: user.$id,
      token: Buffer.from(`${user.email}:${Date.now()}`).toString('base64')
    });
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json(
      { error: 'Login failed', details: error.message },
      { status: 500 }
    );
  }
}
