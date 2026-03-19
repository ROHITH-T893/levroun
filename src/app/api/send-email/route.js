// src/app/api/send-email/route.js
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request) {
  try {
    const body = await request.json();
    const { type, leadData } = body;

    if (!type || !leadData) {
      return NextResponse.json(
        { error: 'Missing required fields: type and leadData' },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    let result;

    if (type === 'user_confirmation') {
      // Send confirmation email to user
      result = await resend.emails.send({
        from: 'Levroun Enterprises <noreply@levroun.tech>',
        to: leadData.email,
        subject: 'We Received Your Request - Levroun Enterprises',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1AC2FF 0%, #060134 100%); padding: 20px; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; text-align: center;">Thank You!</h1>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
              <p style="color: #060134; font-size: 16px;">Hi ${leadData.firstName},</p>
              <p style="color: #555; line-height: 1.6;">
                Thank you for reaching out to Levroun Enterprises! We've received your request and will get back to you shortly.
              </p>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #060134; margin-top: 0;">Request Details:</h3>
                <p><strong>Name:</strong> ${leadData.firstName} ${leadData.lastName}</p>
                <p><strong>Email:</strong> ${leadData.email}</p>
                <p><strong>Service:</strong> ${leadData.service_requested || 'Not specified'}</p>
              </div>
              
              <p style="color: #555; line-height: 1.6;">
                Our team is working on your request and will contact you soon via email or phone.
              </p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                <p style="color: #999; font-size: 12px;">
                  Best regards,<br/>
                  Levroun Enterprises Team<br/>
                  <a href="https://levroun.tech" style="color: #1AC2FF;">levroun.tech</a>
                </p>
              </div>
            </div>
          </div>
        `,
      });
    } else if (type === 'admin_notification') {
      // Send notification email to admin
      result = await resend.emails.send({
        from: 'Levroun CMS <noreply@levroun.tech>',
        to: process.env.ADMIN_EMAIL,
        subject: `New Lead: ${leadData.firstName} ${leadData.lastName} - ${leadData.service_requested}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1AC2FF 0%, #060134 100%); padding: 20px; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; text-align: center;">New Lead Received</h1>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #060134; margin-top: 0;">Contact Information</h2>
                <p><strong>Name:</strong> ${leadData.firstName} ${leadData.lastName}</p>
                <p><strong>Email:</strong> <a href="mailto:${leadData.email}">${leadData.email}</a></p>
                <p><strong>Phone:</strong> ${leadData.phone || 'Not provided'}</p>
                <p><strong>Service Interest:</strong> ${leadData.service_requested || 'Not specified'}</p>
                <p><strong>Preferred Date:</strong> ${leadData.preferred_date || 'Not specified'}</p>
              </div>
              
              <div style="background: white; padding: 20px; border-radius: 8px;">
                <h3 style="color: #060134; margin-top: 0;">Message:</h3>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 4px; line-height: 1.6; white-space: pre-wrap;">
${leadData.message}
                </div>
              </div>
              
              <div style="margin-top: 20px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/bookings" style="background: #1AC2FF; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; display: inline-block;">View in Admin Panel</a>
              </div>
            </div>
          </div>
        `,
      });
    }

    if (result.error) {
      throw result.error;
    }

    return NextResponse.json({ 
      success: true,
      message: 'Email sent successfully',
      emailId: result.id 
    });
  } catch (error) {
    console.error('Email API Error:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: error.message },
      { status: 500 }
    );
  }
}
