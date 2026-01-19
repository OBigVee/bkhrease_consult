import { Layout } from '@/components/layout';
import { BlogListing } from '@/components/sections';

export const metadata = {
  title: 'Blog - B.Khrease Academic Consult',
  description:
    'Read our latest articles about research methods, career advice, success stories, and academic insights from B.Khrease Academic Consult.',
  keywords: [
    'academic blog',
    'research methods',
    'career advice',
    'success stories',
    'academic tips',
    'undergraduate research',
    'B.Khrease',
  ],
  openGraph: {
    title: 'Academic Blog - B.Khrease Academic Consult',
    description:
      'Read our latest articles about research methods, career advice, success stories, and academic insights.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bkhrease.com'}/blog`,
    siteName: 'B.Khrease Academic Consult',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bkhrease.com'}/images/blog-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'B.Khrease Academic Consult Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@BKhreaseAcademic',
    title: 'Academic Blog - B.Khrease Academic Consult',
    description:
      'Read our latest articles about research methods, career advice, success stories, and academic insights.',
    images: [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bkhrease.com'}/images/blog-og.jpg`,
    ],
  },
  alternates: {
    types: {
      'application/rss+xml': [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bkhrease.com'}/blog/rss`,
          title: 'B.Khrease Academic Consult Blog RSS Feed',
        },
      ],
    },
  },
};

export default function BlogPage() {
  const seo = {
    title: 'Blog - B.Khrease Academic Consult',
    description:
      'Read our latest articles about research methods, career advice, success stories, and academic insights from B.Khrease Academic Consult.',
    keywords: [
      'academic blog',
      'research methods',
      'career advice',
      'success stories',
      'academic tips',
      'undergraduate research',
      'B.Khrease',
    ],
  };

  return (
    <Layout seo={seo}>
      <BlogListing />
    </Layout>
  );
}
