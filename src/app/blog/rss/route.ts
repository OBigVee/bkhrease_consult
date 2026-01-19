import { strapiService } from '@/lib/strapi';
import { BlogPost } from '@/types/strapi';

export async function GET() {
  try {
    const response = await strapiService.getBlogPosts(1, 50);
    const posts = (response as any).data || [];

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bkhrease.com';

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>B.Khrease Academic Consult Blog</title>
    <description>Insights, tips, and success stories from the world of academic research and career development</description>
    <link>${siteUrl}/blog</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/blog/rss" rel="self" type="application/rss+xml"/>
    
    ${posts
      .map((post: BlogPost) => {
        const postUrl = `${siteUrl}/blog/${post.slug}`;
        const pubDate = new Date(post.publishedAt).toUTCString();
        const description =
          post.excerpt ||
          post.content.replace(/<[^>]*>/g, '').substring(0, 300);

        return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${description}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      ${post.author ? `<author>${post.author.name}</author>` : ''}
      ${post.categories?.map(cat => `<category>${cat.name}</category>`).join('') || ''}
    </item>`;
      })
      .join('')}
  </channel>
</rss>`;

    return new Response(rssXml, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new Response('Error generating RSS feed', { status: 500 });
  }
}
