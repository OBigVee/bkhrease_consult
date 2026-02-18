import { Suspense } from 'react';
import { Layout } from '@/components/layout';
import { ContactForm, ContactInfo } from '@/components/sections';

export const metadata = {
  title: 'Contact Us - B.Khrease Academic Consult',
  description:
    'Get in touch with B.Khrease Academic Consult for undergraduate research mentorship, laboratory assistance, and thesis consultancy services.',
  keywords: [
    'contact B.Khrease',
    'academic consultancy contact',
    'undergraduate research help',
    'thesis consultancy',
    'laboratory assistance',
    'research mentorship',
    'Nigeria academic support',
  ],
  openGraph: {
    title: 'Contact B.Khrease Academic Consult',
    description:
      'Get in touch with our team for undergraduate research mentorship and academic consultancy services.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bkhrease.com'}/contact`,
    siteName: 'B.Khrease Academic Consult',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bkhrease.com'}/images/contact-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Contact B.Khrease Academic Consult',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@BKhreaseAcademic',
    title: 'Contact B.Khrease Academic Consult',
    description:
      'Get in touch with our team for undergraduate research mentorship and academic consultancy services.',
    images: [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bkhrease.com'}/images/contact-og.jpg`,
    ],
  },
};

export default function ContactPage() {
  const seo = {
    title: 'Contact Us - B.Khrease Academic Consult',
    description:
      'Get in touch with B.Khrease Academic Consult for undergraduate research mentorship, laboratory assistance, and thesis consultancy services.',
    keywords: [
      'contact B.Khrease',
      'academic consultancy contact',
      'undergraduate research help',
      'thesis consultancy',
      'laboratory assistance',
      'research mentorship',
      'Nigeria academic support',
    ],
  };

  return (
    <Layout seo={seo}>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Get In Touch
              </h1>
              <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                Ready to start your research journey? We&apos;re here to help
                you achieve academic distinction with ease.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <ContactInfo />

            {/* Contact Form */}
            <Suspense fallback={<div>Loading form...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </Layout>
  );
}
