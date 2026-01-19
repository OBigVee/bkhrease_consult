import { notFound } from 'next/navigation';
import { Layout } from '@/components/layout';
import { NewsArticle } from '@/components/sections';
import { strapiService } from '@/lib/strapi';
import { NewsItem } from '@/types/strapi';

interface NewsPageProps {
  params: {
    slug: string;
  };
}

async function getNewsItem(slug: string): Promise<NewsItem | null> {
  try {
    const response = await strapiService.getNewsItem(slug);
    return (response as any).data?.[0] || null;
  } catch (error) {
    console.error('Error fetching news item:', error);
    return null;
  }
}

export async function generateMetadata({ params }: NewsPageProps) {
  const newsItem = await getNewsItem(params.slug);

  if (!newsItem) {
    return {
      title: 'News Not Found - B.Khrease Academic Consult',
    };
  }

  return {
    title: `${newsItem.title} - B.Khrease Academic Consult`,
    description: newsItem.content.replace(/<[^>]*>/g, '').substring(0, 160),
    keywords: [
      'B.Khrease',
      'academic news',
      newsItem.type,
      'research',
      'education',
    ],
    openGraph: {
      title: newsItem.title,
      description: newsItem.content.replace(/<[^>]*>/g, '').substring(0, 160),
      type: 'article',
      publishedTime: newsItem.publishedAt,
      images: newsItem.featuredImage
        ? [
            {
              url: newsItem.featuredImage.url,
              width: newsItem.featuredImage.width,
              height: newsItem.featuredImage.height,
              alt: newsItem.featuredImage.alternativeText || newsItem.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: newsItem.title,
      description: newsItem.content.replace(/<[^>]*>/g, '').substring(0, 160),
      images: newsItem.featuredImage ? [newsItem.featuredImage.url] : [],
    },
  };
}

export default async function NewsItemPage({ params }: NewsPageProps) {
  const newsItem = await getNewsItem(params.slug);

  if (!newsItem) {
    notFound();
  }

  const seo = {
    title: `${newsItem.title} - B.Khrease Academic Consult`,
    description: newsItem.content.replace(/<[^>]*>/g, '').substring(0, 160),
    keywords: [
      'B.Khrease',
      'academic news',
      newsItem.type,
      'research',
      'education',
    ],
  };

  return (
    <Layout seo={seo}>
      <NewsArticle newsItem={newsItem} />
    </Layout>
  );
}
