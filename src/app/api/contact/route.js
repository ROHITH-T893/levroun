// src/app/api/contact/route.js
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { databases } from '@/lib/appwrite-server';
import { ID } from 'appwrite';

const resend = new Resend(process.env.RESEND_API_KEY);
const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const LEADS_COLLECTION_ID = process.env.NEXT_PUBLIC_LEADS_COLLECTION_ID;

export async function POST(request) {
  try {
    console.log('📧 API route called');
    
    const body = await request.json();
    const { firstName, lastName, email, phone, service, message } = body;

    console.log('📧 Received data:', { firstName, lastName, email, phone, service });

    // Validate required fields
    if (!firstName || !email || !message) {
      console.log('❌ Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields: firstName, email, and message are required' },
        { status: 400 }
      );
    }

    // Check if API key exists
    if (!process.env.RESEND_API_KEY) {
      console.log('❌ RESEND_API_KEY not found');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    console.log('📧 Sending email via Resend...');

    // Save lead to Appwrite
    let leadId = null;
    try {
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
          status: 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      );
      leadId = lead.$id;
      console.log('✅ Lead saved to Appwrite:', leadId);
    } catch (dbError) {
      console.warn('⚠️ Failed to save lead to Appwrite:', dbError.message);
      // Continue with email sending even if DB save fails
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Levroun Contact <onboarding@resend.dev>', // Sandbox - works perfectly
      to: ['levroun2k5@gmail.com'], // Your Gmail
      subject: `New Contact Form - ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1AC2FF 0%, #060134 100%); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; text-align: center;">New Contact Form Submission</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #060134; margin-top: 0;">Contact Details</h2>
              <p><strong>Name:</strong> ${firstName} ${lastName}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
              <p><strong>Service Interest:</strong> ${service || 'Not specified'}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h3 style="color: #060134; margin-top: 0;">Message:</h3>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 4px; line-height: 1.6;">
                ${message}
              </div>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: #e7f3ff; border-radius: 8px;">
              <p style="margin: 0; color: #0066cc;"><strong>Reply to:</strong> ${email}</p>
            </div>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Service: ${service || 'Not specified'}
        
        Message:
        ${message}
        
        Reply to: ${email}
      `,
    });

    console.log('📧 Resend response:', { data, error });

    if (error) {
      console.error('❌ Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 400 }
      );
    }

    console.log('✅ Email sent successfully:', data);
    return NextResponse.json({ 
      success: true,
      message: 'Email sent successfully and lead saved',
      emailId: data?.id,
      leadId: leadId
    });

  } catch (error) {
    console.error('❌ API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// Handle GET requests (for testing)
export async function GET() {
  return NextResponse.json({ 
    message: 'Contact API endpoint is working',
    timestamp: new Date().toISOString()
  });
}