'use client';

import React from 'react';
import {
  organizationSchema,
  generateWebsiteSchema,
  generateBlogPostSchema,
  generateNewsArticleSchema,
  generateServiceSchema,
  generatePersonSchema,
} from '@/lib/seo';

interface StructuredDataProps {
  type:
    | 'organization'
    | 'website'
    | 'blog'
    | 'news'
    | 'service'
    | 'person'
    | 'breadcrumb';
  data?: any;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  let schema: any;

  switch (type) {
    case 'organization':
      schema = organizationSchema;
      break;
    case 'website':
      schema = generateWebsiteSchema();
      break;
    case 'blog':
      schema = generateBlogPostSchema(data);
      break;
    case 'news':
      schema = generateNewsArticleSchema(data);
      break;
    case 'service':
      schema = generateServiceSchema(data);
      break;
    case 'person':
      schema = generatePersonSchema(data);
      break;
    case 'breadcrumb':
      schema = generateBreadcrumbSchema(data);
      break;
    default:
      return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
};

function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>
) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bkhrease.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.url}`,
    })),
  };
}

export default StructuredData;
