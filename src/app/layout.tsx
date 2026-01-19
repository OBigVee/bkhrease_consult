import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from '@/lib/providers';
import WebVitals from '@/components/analytics/WebVitals';
import PerformanceDashboard from '@/components/dev/PerformanceDashboard';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bkhrease.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'B.Khrease Academic Consult - Distinction with Ease',
    template: '%s | B.Khrease Academic Consult',
  },
  description:
    'Leading academic consultancy providing undergraduate research mentorship, laboratory assistance, and thesis consultancy services in Nigeria and beyond. Empowering 1000+ students since 2018.',
  keywords: [
    'academic consulting',
    'research mentorship',
    'undergraduate research',
    'Nigeria',
    'academic support',
    'thesis consultancy',
    'laboratory assistance',
    'research training',
    'B.Khrease',
    'Christopher B. Olowosoke',
    'SMEDAN',
    'CAC',
  ],
  authors: [
    { name: 'B.Khrease Academic Consult' },
    { name: 'Christopher B. Olowosoke', url: `${siteUrl}/team` },
  ],
  creator: 'B.Khrease Academic Consult',
  publisher: 'B.Khrease Academic Consult',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'B.Khrease Academic Consult',
    title: 'B.Khrease Academic Consult - Distinction with Ease',
    description:
      'Leading academic consultancy providing undergraduate research mentorship in Nigeria and beyond. 1000+ students trained since 2018.',
    images: [
      {
        url: '/bk.jpg',
        width: 1200,
        height: 630,
        alt: 'B.Khrease Academic Consult Logo',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B.Khrease Academic Consult - Distinction with Ease',
    description:
      'Leading academic consultancy providing undergraduate research mentorship in Nigeria and beyond.',
    images: ['/bk.jpg'],
    creator: '@bkhrease',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-US': siteUrl,
    },
  },
  category: 'education',
  classification: 'Academic Services',
  referrer: 'origin-when-cross-origin',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1e40af' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Providers>
          {children}
          <WebVitals />
          <PerformanceDashboard />
        </Providers>
      </body>
    </html>
  );
}
