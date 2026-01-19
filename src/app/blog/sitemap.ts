import { MetadataRoute } from 'next';
import { strapiService } from '@/lib/strapi';
import { BlogPost } from '@/types/strapi';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bkhrease.com';

  try {
    // Get all blog posts
    const response = await strapiService.getBlogPosts(1, 1000);
    const posts = (response as any).data || [];

    const blogPosts: MetadataRoute.Sitemap = posts.map((post: BlogPost) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    return [
      {
        url: `${siteUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${siteUrl}/blog/rss`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.5,
      },
      ...blogPosts,
    ];
  } catch (error) {
    console.error('Error generating blog sitemap:', error);
    return [
      {
        url: `${siteUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
    ];
  }
}
