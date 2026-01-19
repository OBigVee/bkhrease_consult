import { notFound } from 'next/navigation';
import { Layout } from '@/components/layout';
import { BlogArticle } from '@/components/sections';
import { strapiService } from '@/lib/strapi';
import { BlogPost } from '@/types/strapi';

interface BlogPageProps {
  params: {
    slug: string;
  };
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await strapiService.getBlogPost(slug);
    return (response as any).data?.[0] || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: BlogPageProps) {
  const blogPost = await getBlogPost(params.slug);

  if (!blogPost) {
    return {
      title: 'Blog Post Not Found - B.Khrease Academic Consult',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bkhrease.com';
  const postUrl = `${siteUrl}/blog/${blogPost.slug}`;
  const description =
    blogPost.excerpt ||
    blogPost.content.replace(/<[^>]*>/g, '').substring(0, 160);

  return {
    title: `${blogPost.title} - B.Khrease Academic Consult`,
    description,
    keywords: [
      'B.Khrease',
      'academic blog',
      'research',
      'education',
      'career advice',
      'academic tips',
      ...(blogPost.tags || []),
      ...(blogPost.categories?.map(cat => cat.name) || []),
    ],
    authors: blogPost.author ? [{ name: blogPost.author.name }] : [],
    openGraph: {
      title: blogPost.title,
      description,
      type: 'article',
      url: postUrl,
      siteName: 'B.Khrease Academic Consult',
      publishedTime: blogPost.publishedAt,
      modifiedTime: blogPost.updatedAt,
      authors: blogPost.author ? [blogPost.author.name] : [],
      tags: blogPost.tags,
      section: blogPost.categories?.[0]?.name || 'Blog',
      images: blogPost.featuredImage
        ? [
            {
              url: blogPost.featuredImage.url.startsWith('http')
                ? blogPost.featuredImage.url
                : `${siteUrl}${blogPost.featuredImage.url}`,
              width: blogPost.featuredImage.width || 1200,
              height: blogPost.featuredImage.height || 630,
              alt: blogPost.featuredImage.alternativeText || blogPost.title,
              type: blogPost.featuredImage.mime || 'image/jpeg',
            },
          ]
        : [
            {
              url: `${siteUrl}/images/blog-default-og.jpg`,
              width: 1200,
              height: 630,
              alt: 'B.Khrease Academic Consult Blog',
              type: 'image/jpeg',
            },
          ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@BKhreaseAcademic',
      creator: blogPost.author?.socialLinks?.twitter || '@BKhreaseAcademic',
      title: blogPost.title,
      description,
      images: blogPost.featuredImage
        ? [
            blogPost.featuredImage.url.startsWith('http')
              ? blogPost.featuredImage.url
              : `${siteUrl}${blogPost.featuredImage.url}`,
          ]
        : [`${siteUrl}/images/blog-default-og.jpg`],
    },
    alternates: {
      canonical: postUrl,
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
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const blogPost = await getBlogPost(params.slug);

  if (!blogPost) {
    notFound();
  }

  const seo = {
    title: `${blogPost.title} - B.Khrease Academic Consult`,
    description:
      blogPost.excerpt ||
      blogPost.content.replace(/<[^>]*>/g, '').substring(0, 160),
    keywords: [
      'B.Khrease',
      'academic blog',
      'research',
      'education',
      ...(blogPost.tags || []),
      ...(blogPost.categories?.map(cat => cat.name) || []),
    ],
  };

  return (
    <Layout seo={seo}>
      <BlogArticle blogPost={blogPost} />
    </Layout>
  );
}
