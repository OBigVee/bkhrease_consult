import { MetadataRoute } from 'next';
import { strapiService } from '@/lib/strapi';
import { BlogPost, NewsItem } from '@/types/strapi';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bkhrease.com';

  try {
    // Get dynamic content
    const [blogResponse, newsResponse] = await Promise.all([
      strapiService.getBlogPosts(1, 1000).catch(() => ({ data: [] })),
      strapiService.getNewsUpdates(1000).catch(() => ({ data: [] })),
    ]);

    const blogPosts = (blogResponse as any).data || [];
    const newsItems = (newsResponse as any).data || [];

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: siteUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${siteUrl}/services`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${siteUrl}/team`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${siteUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${siteUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${siteUrl}/news`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
    ];

    // Blog posts
    const blogSitemap: MetadataRoute.Sitemap = blogPosts.map(
      (post: BlogPost) => ({
        url: `${siteUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      })
    );

    // News items
    const newsSitemap: MetadataRoute.Sitemap = newsItems.map(
      (item: NewsItem) => ({
        url: `${siteUrl}/news/${item.slug}`,
        lastModified: new Date(item.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })
    );

    return [...staticPages, ...blogSitemap, ...newsSitemap];
  } catch (error) {
    console.error('Error generating sitemap:', error);

    // Return static pages only if dynamic content fails
    return [
      {
        url: siteUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${siteUrl}/services`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${siteUrl}/team`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${siteUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${siteUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${siteUrl}/news`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
    ];
  }
}
