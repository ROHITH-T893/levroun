import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});

/**
 * Send booking confirmation email to the client
 */
export async function sendBookingConfirmation({ name, email, date, time, service }) {
  await transporter.sendMail({
    from: `"Levroun Enterprises" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: '📅 Your Strategy Call is Booked — Levroun Enterprises',
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; background:#06060c; color:#e2e8f0; max-width:560px; margin:auto; border-radius:16px; overflow:hidden;">
        <div style="background:linear-gradient(135deg,#1AC2FF22,#7000FF22); padding:40px 32px; border-bottom:1px solid #ffffff10;">
          <h1 style="margin:0; font-size:24px; color:#ffffff;">Call Confirmed 🎉</h1>
          <p style="margin:8px 0 0; color:#94a3b8; font-size:14px;">Thank you, ${name}. Here's a summary of your booking.</p>
        </div>
        <div style="padding:32px;">
          <table style="width:100%; border-collapse:collapse;">
            <tr>
              <td style="padding:12px 0; color:#94a3b8; font-size:12px; text-transform:uppercase; letter-spacing:2px; border-bottom:1px solid #ffffff08;">Date</td>
              <td style="padding:12px 0; color:#ffffff; font-weight:bold; border-bottom:1px solid #ffffff08;">${date}</td>
            </tr>
            <tr>
              <td style="padding:12px 0; color:#94a3b8; font-size:12px; text-transform:uppercase; letter-spacing:2px; border-bottom:1px solid #ffffff08;">Time (IST)</td>
              <td style="padding:12px 0; color:#1AC2FF; font-weight:bold; border-bottom:1px solid #ffffff08;">${time}</td>
            </tr>
            <tr>
              <td style="padding:12px 0; color:#94a3b8; font-size:12px; text-transform:uppercase; letter-spacing:2px;">Service</td>
              <td style="padding:12px 0; color:#ffffff; border-top:none;">${service || 'General Consultation'}</td>
            </tr>
          </table>
          <div style="margin-top:24px; padding:20px; background:#0e0e1a; border-radius:12px; border:1px solid #ffffff10;">
            <p style="margin:0; color:#94a3b8; font-size:13px; line-height:1.6;">
              ⏳ We'll send you a <strong style="color:#fff;">meeting link</strong> before your call.<br/>
              📧 Reply to this email if you need to reschedule.
            </p>
          </div>
          <p style="margin-top:32px; color:#475569; font-size:12px;">— Team Levroun Enterprises</p>
        </div>
      </div>
    `,
  });
}

/**
 * Notify admin of a new booking
 */
export async function sendAdminNotification({ name, email, phone, date, time, service, message }) {
  await transporter.sendMail({
    from: `"Levroun Site" <${process.env.GMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL || process.env.GMAIL_USER,
    subject: `🔔 New Call Booking — ${name}`,
    html: `
      <div style="font-family:Arial,sans-serif; max-width:500px; margin:auto; background:#0e0e1a; color:#e2e8f0; border-radius:12px; padding:24px; border:1px solid #1AC2FF33;">
        <h2 style="color:#1AC2FF; margin-top:0;">New Booking Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Date:</strong> ${date} at ${time} IST</p>
        <p><strong>Service:</strong> ${service || 'Not specified'}</p>
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/dashboard" 
           style="display:inline-block;margin-top:16px;padding:10px 24px;background:#1AC2FF;color:#06060c;font-weight:bold;border-radius:8px;text-decoration:none;">
          View in Dashboard
        </a>
      </div>
    `,
  });
}
