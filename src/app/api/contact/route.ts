import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  serviceType: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormData = await request.json();

    // Validate required fields
    const requiredFields = [
      'name',
      'email',
      'subject',
      'serviceType',
      'message',
    ];
    const missingFields = requiredFields.filter(
      field => !formData[field as keyof ContactFormData]
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Send email to Admin (You)
    await resend.emails.send({
      from: 'B.Khrease Contact Form <onboarding@resend.dev>', // Use verified domain if available, else default resend.dev
      to: 'Info.bkhrease.ng@gmail.com',
      replyTo: formData.email,
      subject: `New Inquiry: ${formData.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
        <p><strong>Service Type:</strong> ${formData.serviceType}</p>
        <p><strong>Subject:</strong> ${formData.subject}</p>
        <hr />
        <h3>Message:</h3>
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
        <hr />
        <p><small>Submitted on ${new Date().toLocaleString()}</small></p>
      `,
    });

    // Send confirmation email to User
    await resend.emails.send({
      from: 'B.Khrease Support <onboarding@resend.dev>',
      to: formData.email,
      subject: 'We received your message!',
      html: `
        <h2>Hi ${formData.name},</h2>
        <p>Thank you for reaching out to B.Khrease Academic Consult.</p>
        <p>We have received your inquiry about "<strong>${formData.subject}</strong>" and our team will get back to you shortly.</p>
        <p>Best regards,<br>The B.Khrease Team</p>
      `,
    });

    return NextResponse.json(
      {
        message: 'Message sent successfully!',
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      {
        error: 'Failed to send message. Please try again later.',
      },
      { status: 500 }
    );
  }
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
