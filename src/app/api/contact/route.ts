import { NextRequest, NextResponse } from 'next/server';

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

    // Validate message length
    if (formData.message.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long.' },
        { status: 400 }
      );
    }

    // Log the contact form submission (in production, you'd save to database or send email)
    console.log('Contact form submission:', {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || 'Not provided',
      subject: formData.subject,
      serviceType: formData.serviceType,
      message: formData.message,
      timestamp: new Date().toISOString(),
    });

    // In a real implementation, you would:
    // 1. Save the contact form data to your database
    // 2. Send an email notification to the team
    // 3. Send a confirmation email to the user
    // 4. Integrate with a CRM system

    // Example email integration (commented out):
    /*
    const emailService = new EmailService(process.env.EMAIL_SERVICE_API_KEY);
    
    // Send notification to team
    await emailService.sendEmail({
      to: 'Info.bkhrease.ng@gmail.com',
      subject: `New Contact Form: ${formData.subject}`,
      html: generateTeamNotificationEmail(formData),
    });
    
    // Send confirmation to user
    await emailService.sendEmail({
      to: formData.email,
      subject: 'Thank you for contacting B.Khrease Academic Consult',
      html: generateUserConfirmationEmail(formData),
    });
    */

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json(
      {
        message:
          'Thank you for your message! We have received your inquiry and will get back to you within 24 hours.',
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      {
        error:
          'Something went wrong processing your request. Please try again later.',
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

// Helper functions for email templates (for future implementation)
// eslint-disable-next-line no-unused-vars
function generateTeamNotificationEmail(formData: ContactFormData): string {
  return `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${formData.name}</p>
    <p><strong>Email:</strong> ${formData.email}</p>
    <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
    <p><strong>Service Type:</strong> ${formData.serviceType}</p>
    <p><strong>Subject:</strong> ${formData.subject}</p>
    <p><strong>Message:</strong></p>
    <p>${formData.message.replace(/\n/g, '<br>')}</p>
    <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
  `;
}

// eslint-disable-next-line no-unused-vars
function generateUserConfirmationEmail(formData: ContactFormData): string {
  return `
    <h2>Thank you for contacting B.Khrease Academic Consult!</h2>
    <p>Dear ${formData.name},</p>
    <p>We have received your inquiry about "${formData.subject}" and will get back to you within 24 hours.</p>
    <p>In the meantime, feel free to:</p>
    <ul>
      <li>Follow us on our social media channels for updates</li>
      <li>Browse our blog for academic tips and insights</li>
      <li>Contact us directly via WhatsApp at +234 812 235 9970 for urgent matters</li>
    </ul>
    <p>Best regards,<br>The B.Khrease Academic Consult Team</p>
  `;
}
