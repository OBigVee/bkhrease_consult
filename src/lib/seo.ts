/**
 * SEO utilities and configuration for B.Khrease Academic website
 */

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: any;
  noindex?: boolean;
  ogType?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export const defaultSEO: SEOData = {
  title: 'B.Khrease Academic Consult - Distinction with Ease',
  description:
    'Leading academic consultancy providing undergraduate research mentorship, laboratory assistance, and thesis consultancy services in Nigeria and beyond.',
  keywords: [
    'academic consultancy',
    'undergraduate research',
    'research mentorship',
    'thesis consultancy',
    'laboratory assistance',
    'Nigeria',
    'academic support',
    'research training',
  ],
  ogImage: '/images/og-image.jpg',
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'B.Khrease Academic Consult',
  alternateName: 'B.Khrease',
  description:
    'Leading academic consultancy providing undergraduate research mentorship, laboratory assistance, and thesis consultancy services in Nigeria and beyond.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://bkhrease.com',
  logo: {
    '@type': 'ImageObject',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bkhrease.com'}/bk.jpg`,
    width: 400,
    height: 400,
  },
  image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bkhrease.com'}/bk.jpg`,
  foundingDate: '2018',
  founder: {
    '@type': 'Person',
    name: 'Christopher B. Olowosoke',
    jobTitle: 'Founder & CEO',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+2348122359970',
      contactType: 'customer service',
      email: 'Info.bkhrease.ng@gmail.com',
      availableLanguage: ['English'],
      areaServed: 'NG',
    },
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'Nigeria',
    addressRegion: 'Nigeria',
  },
  areaServed: [
    {
      '@type': 'Country',
      name: 'Nigeria',
    },
    {
      '@type': 'Place',
      name: 'Africa',
    },
  ],
  serviceType: [
    'Academic Consulting',
    'Research Mentorship',
    'Thesis Consultancy',
    'Laboratory Assistance',
    'Skills Training',
    'Project Development',
  ],
  knowsAbout: [
    'Undergraduate Research',
    'Academic Writing',
    'Research Methodology',
    'Laboratory Procedures',
    'Thesis Development',
    'Academic Mentorship',
  ],
  sameAs: [
    'https://www.linkedin.com/company/b-khrease-academic-consult',
    'https://www.youtube.com/@B.khreaseAcademicConsult',
    'https://www.tiktok.com/@bkhreaseacademicconsult',
    'https://www.facebook.com/bkhreaseacademicconsult',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '150',
    bestRating: '5',
    worstRating: '1',
  },
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    value: '10-20',
  },
};

export function generatePageSEO(
  pageSEO: Partial<SEOData>,
  basePath = ''
): SEOData {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bkhrease.com';

  return {
    ...defaultSEO,
    ...pageSEO,
    title: pageSEO.title
      ? `${pageSEO.title} | B.Khrease Academic Consult`
      : defaultSEO.title,
    canonicalUrl: pageSEO.canonicalUrl || `${siteUrl}${basePath}`,
    ogImage: pageSEO.ogImage || `${siteUrl}${defaultSEO.ogImage}`,
  };
}

export function generateBlogPostSchema(post: {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  image?: string;
  slug: string;
  content?: string;
  tags?: string[];
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bkhrease.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image ? `${siteUrl}${post.image}` : `${siteUrl}/bk.jpg`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author,
      url: `${siteUrl}/team`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'B.Khrease Academic Consult',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/bk.jpg`,
        width: 400,
        height: 400,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
    articleSection: 'Academic Research',
    keywords:
      post.tags?.join(', ') || 'academic research, undergraduate, mentorship',
    wordCount: post.content ? post.content.split(' ').length : undefined,
    inLanguage: 'en-US',
    isAccessibleForFree: true,
  };
}

export function generateNewsArticleSchema(article: {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
  slug: string;
  type: string;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bkhrease.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.description,
    image: article.image ? `${siteUrl}${article.image}` : `${siteUrl}/bk.jpg`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'B.Khrease Academic Consult',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'B.Khrease Academic Consult',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/bk.jpg`,
        width: 400,
        height: 400,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/news/${article.slug}`,
    },
    articleSection: article.type,
    inLanguage: 'en-US',
    isAccessibleForFree: true,
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  features: string[];
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bkhrease.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'B.Khrease Academic Consult',
      url: siteUrl,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Nigeria',
    },
    serviceType: service.name,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceRange: 'Contact for pricing',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.name,
      itemListElement: service.features.map((feature, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: feature,
        },
        position: index + 1,
      })),
    },
  };
}

export function generatePersonSchema(person: {
  name: string;
  role: string;
  bio: string;
  image?: string;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bkhrease.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.role,
    description: person.bio,
    image: person.image ? `${siteUrl}${person.image}` : undefined,
    worksFor: {
      '@type': 'Organization',
      name: 'B.Khrease Academic Consult',
      url: siteUrl,
    },
    url: `${siteUrl}/team`,
    knowsAbout: [
      'Academic Research',
      'Undergraduate Mentorship',
      'Research Methodology',
    ],
  };
}

export function generateWebsiteSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bkhrease.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'B.Khrease Academic Consult',
    alternateName: 'B.Khrease',
    url: siteUrl,
    description: 'Undergraduate research mentorship in Nigeria and beyond',
    publisher: {
      '@type': 'Organization',
      name: 'B.Khrease Academic Consult',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-US',
  };
}
