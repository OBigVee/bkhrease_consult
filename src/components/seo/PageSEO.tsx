'use client';

import React from 'react';
import Head from 'next/head';
import StructuredData from './StructuredData';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonicalUrl?: string;
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  structuredData?: {
    type:
      | 'organization'
      | 'website'
      | 'blog'
      | 'news'
      | 'service'
      | 'person'
      | 'breadcrumb';
    data?: any;
  }[];
  breadcrumbs?: Array<{ name: string; url: string }>;
}

const PageSEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = [],
  ogImage,
  ogType = 'website',
  canonicalUrl,
  noIndex = false,
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
  structuredData = [],
  breadcrumbs,
}) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bkhrease.com';
  const siteName = 'B.Khrease Academic Consult';

  const fullTitle = title
    ? title.includes(siteName)
      ? title
      : `${title} | ${siteName}`
    : `${siteName} - Distinction with Ease`;

  const metaDescription =
    description ||
    'Leading academic consultancy providing undergraduate research mentorship, laboratory assistance, and thesis consultancy services in Nigeria and beyond.';

  const metaKeywords =
    keywords.length > 0
      ? keywords.join(', ')
      : 'academic consulting, research mentorship, undergraduate research, Nigeria, academic support';

  const imageUrl = ogImage || `${siteUrl}/bk.jpg`;
  const canonical = canonicalUrl || siteUrl;

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{fullTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        {author && <meta name="author" content={author} />}

        {/* Robots */}
        <meta
          name="robots"
          content={
            noIndex
              ? 'noindex, nofollow'
              : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
          }
        />
        <meta
          name="googlebot"
          content={noIndex ? 'noindex, nofollow' : 'index, follow'}
        />

        {/* Canonical URL */}
        <link rel="canonical" href={canonical} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={ogType} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:alt" content="B.Khrease Academic Consult" />
        <meta property="og:url" content={canonical} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content="en_US" />

        {/* Article specific Open Graph tags */}
        {ogType === 'article' && (
          <>
            {publishedTime && (
              <meta property="article:published_time" content={publishedTime} />
            )}
            {modifiedTime && (
              <meta property="article:modified_time" content={modifiedTime} />
            )}
            {author && <meta property="article:author" content={author} />}
            {section && <meta property="article:section" content={section} />}
            {tags.map((tag, index) => (
              <meta key={index} property="article:tag" content={tag} />
            ))}
          </>
        )}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:image:alt" content="B.Khrease Academic Consult" />
        <meta name="twitter:creator" content="@bkhrease" />
        <meta name="twitter:site" content="@bkhrease" />

        {/* Additional Meta Tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="msapplication-TileColor" content="#1e40af" />

        {/* Language and Region */}
        <meta name="language" content="English" />
        <meta name="geo.region" content="NG" />
        <meta name="geo.country" content="Nigeria" />

        {/* Cache Control */}
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000" />
      </Head>

      {/* Structured Data */}
      {structuredData.map((schema, index) => (
        <StructuredData key={index} type={schema.type} data={schema.data} />
      ))}

      {/* Breadcrumbs Structured Data */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <StructuredData type="breadcrumb" data={breadcrumbs} />
      )}
    </>
  );
};

export default PageSEO;
