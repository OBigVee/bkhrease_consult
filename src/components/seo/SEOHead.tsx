'use client';

import React from 'react';
import Head from 'next/head';

interface SEOData {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  structuredData?: any;
  noIndex?: boolean;
  author?: string;
}

interface SEOHeadProps {
  seo?: SEOData;
  children?: React.ReactNode;
}

const defaultSEO: SEOData = {
  title: 'B.Khrease Academic Consult - Distinction with Ease',
  description:
    'Undergraduate research mentorship in Nigeria and beyond. Empowering students through research excellence and academic support.',
  keywords: [
    'academic consulting',
    'research mentorship',
    'undergraduate research',
    'Nigeria',
    'academic support',
    'B.Khrease',
    'research training',
    'thesis consultancy',
    'laboratory assistance',
  ],
  ogType: 'website',
  author: 'B.Khrease Academic Consult',
};

// Organization structured data
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'B.Khrease Academic Consult',
  alternateName: 'B.Khrease',
  description: 'Undergraduate research mentorship in Nigeria and beyond',
  url: 'https://bkhrease.com',
  logo: 'https://bkhrease.com/bk.jpg',
  foundingDate: '2018',
  founder: {
    '@type': 'Person',
    name: 'Christopher B. Olowosoke',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+2348122359970',
    contactType: 'customer service',
    email: 'Info.bkhrease.ng@gmail.com',
    availableLanguage: 'English',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'Nigeria',
  },
  sameAs: [
    'https://www.linkedin.com/company/b-khrease-academic-consult',
    'https://www.youtube.com/@B.khreaseAcademicConsult',
    'https://www.tiktok.com/@bkhreaseacademicconsult',
    'https://www.facebook.com/bkhreaseacademicconsult',
  ],
  areaServed: {
    '@type': 'Country',
    name: 'Nigeria',
  },
  serviceType: [
    'Academic Consulting',
    'Research Mentorship',
    'Thesis Consultancy',
    'Laboratory Assistance',
    'Skills Training',
  ],
};

const SEOHead: React.FC<SEOHeadProps> = ({ seo = {}, children }) => {
  const mergedSEO = { ...defaultSEO, ...seo };
  const {
    title,
    description,
    keywords,
    ogImage,
    ogType,
    canonicalUrl,
    structuredData,
    noIndex,
    author,
  } = mergedSEO;

  const fullTitle = title?.includes('B.Khrease')
    ? title
    : `${title} | B.Khrease Academic Consult`;
  const keywordsString = keywords?.join(', ') || '';
  const defaultOgImage = ogImage || '/bk.jpg';

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywordsString} />
      )}
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={defaultOgImage} />
      <meta property="og:image:alt" content="B.Khrease Academic Consult Logo" />
      <meta property="og:site_name" content="B.Khrease Academic Consult" />
      <meta property="og:locale" content="en_US" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={defaultOgImage} />
      <meta
        name="twitter:image:alt"
        content="B.Khrease Academic Consult Logo"
      />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Theme Color */}
      <meta name="theme-color" content="#1e40af" />
      <meta name="msapplication-TileColor" content="#1e40af" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData || organizationSchema),
        }}
      />

      {/* Additional custom head elements */}
      {children}
    </Head>
  );
};

export default SEOHead;
