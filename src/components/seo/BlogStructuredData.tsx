import { extractTextFromBlocks } from '@/lib/utils';
import { BlogPost } from '@/types/strapi';

interface BlogStructuredDataProps {
  blogPost: BlogPost;
}

const BlogStructuredData: React.FC<BlogStructuredDataProps> = ({
  blogPost,
}) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bkhrease.com';
  const postUrl = `${siteUrl}/blog/${blogPost.slug}`;
  const textContent = extractTextFromBlocks(blogPost.content);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blogPost.title,
    description:
      blogPost.excerpt ||
      textContent.substring(0, 160),
    image: blogPost.featuredImage
      ? {
        '@type': 'ImageObject',
        url: blogPost.featuredImage.url.startsWith('http')
          ? blogPost.featuredImage.url
          : `${siteUrl}${blogPost.featuredImage.url}`,
        width: blogPost.featuredImage.width || 1200,
        height: blogPost.featuredImage.height || 630,
        alt: blogPost.featuredImage.alternativeText || blogPost.title,
      }
      : undefined,
    author: blogPost.author
      ? {
        '@type': 'Person',
        name: blogPost.author.name,
        jobTitle: blogPost.author.role,
        description: blogPost.author.bio,
        image: blogPost.author.image
          ? {
            '@type': 'ImageObject',
            url: blogPost.author.image.url.startsWith('http')
              ? blogPost.author.image.url
              : `${siteUrl}${blogPost.author.image.url}`,
            alt: blogPost.author.name,
          }
          : undefined,
        sameAs: blogPost.author.socialLinks
          ? Object.values(blogPost.author.socialLinks).filter(Boolean)
          : undefined,
      }
      : {
        '@type': 'Organization',
        name: 'B.Khrease Academic Consult',
        url: siteUrl,
      },
    publisher: {
      '@type': 'Organization',
      name: 'B.Khrease Academic Consult',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo.png`,
        alt: 'B.Khrease Academic Consult Logo',
      },
    },
    datePublished: blogPost.publishedAt,
    dateModified: blogPost.updatedAt,
    url: postUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    keywords: [
      ...(blogPost.tags || []),
      ...(blogPost.categories?.map(cat => cat.name) || []),
      'academic research',
      'career advice',
      'education',
    ].join(', '),
    articleSection: blogPost.categories?.[0]?.name || 'Blog',
    wordCount: textContent.split(/\s+/).length,
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    genre: 'Educational',
    audience: {
      '@type': 'Audience',
      audienceType: 'Students, Researchers, Academics',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
};

export default BlogStructuredData;
