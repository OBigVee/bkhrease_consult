import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, source = 'website' } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // In a real implementation, you would integrate with your email service provider
    // Examples: Mailchimp, ConvertKit, SendGrid, etc.

    // For now, we'll simulate the subscription process
    console.log(`Newsletter subscription: ${email} from ${source}`);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // In production, you would:
    // 1. Add the email to your mailing list
    // 2. Send a confirmation email
    // 3. Handle any errors from the email service

    // Example with a hypothetical email service:
    /*
    const emailService = new EmailService(process.env.EMAIL_SERVICE_API_KEY);
    await emailService.addSubscriber({
      email,
      tags: ['blog-subscriber', source],
      doubleOptIn: true,
    });
    */

    return NextResponse.json(
      {
        message:
          'Thank you for subscribing! Please check your email to confirm your subscription.',
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
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
