'use client';

import React, { useState, useEffect } from 'react';
import { NewsItem, StrapiResponse } from '@/types/strapi';
import { formatDate, extractTextFromBlocks } from '@/lib/utils';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Card from '@/components/ui/Card';
import Link from 'next/link';
import Image from 'next/image';
import { strapiService } from '@/lib/strapi';

interface NewsArticleProps {
  newsItem: NewsItem;
}

interface SocialShareProps {
  title: string;
  url: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ title, url }) => {
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-700">Share:</span>
      <div className="flex gap-2">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors duration-200"
          aria-label="Share on Twitter"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        </a>
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors duration-200"
          aria-label="Share on Facebook"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors duration-200"
          aria-label="Share on LinkedIn"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600 transition-colors duration-200"
          aria-label="Share on WhatsApp"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
        </a>
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors duration-200"
          aria-label="Copy link"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const NewsArticle: React.FC<NewsArticleProps> = ({ newsItem }) => {
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRelatedNews = async () => {
      try {
        const response = await strapiService.getNewsUpdates();
        const allNews = (response as StrapiResponse<NewsItem[]>).data || [];
        // Filter out current article and get same type or recent articles
        const related = allNews
          .filter((item: NewsItem) => item.id !== newsItem.id)
          .filter((item: NewsItem) => item.type === newsItem.type)
          .slice(0, 3);

        // If not enough related by type, fill with recent articles
        if (related.length < 3) {
          const additional = allNews
            .filter(
              (item: NewsItem) =>
                item.id !== newsItem.id &&
                !related.find((r: NewsItem) => r.id === item.id)
            )
            .slice(0, 3 - related.length);
          related.push(...additional);
        }

        setRelatedNews(related);
      } catch (error) {
        console.error('Error fetching related news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRelatedNews();
  }, [newsItem.id, newsItem.type]);

  const getTypeColor = (type: string) => {
    const colors = {
      event: 'bg-blue-100 text-blue-800',
      publication: 'bg-green-100 text-green-800',
      achievement: 'bg-yellow-100 text-yellow-800',
      announcement: 'bg-purple-100 text-purple-800',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      event: '📅',
      publication: '�',
      achievement: '🏆',
      announcement: '📢',
    };
    return icons[type as keyof typeof icons] || '📰';
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link
              href="/"
              className="hover:text-primary-600 transition-colors duration-200"
            >
              Home
            </Link>
            <span>›</span>
            <Link
              href="/news"
              className="hover:text-primary-600 transition-colors duration-200"
            >
              News
            </Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">{newsItem.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{getTypeIcon(newsItem.type)}</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(
                  newsItem.type
                )}`}
              >
                {newsItem.type.charAt(0).toUpperCase() + newsItem.type.slice(1)}
              </span>
              {newsItem.isUpcoming && (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                  Upcoming
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {newsItem.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <span>🕒</span>
                <span>Published {formatDate(newsItem.publishedAt)}</span>
              </div>
              {newsItem.eventDate && (
                <div className="flex items-center gap-2">
                  <span>📅</span>
                  <span>Event Date: {formatDate(newsItem.eventDate)}</span>
                </div>
              )}
            </div>

            {/* Registration Link for Events */}
            {newsItem.registrationLink && (
              <div className="mb-6">
                <a
                  href={newsItem.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  <span>Register for Event</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            )}

            {/* Social Share */}
            <SocialShare title={newsItem.title} url={currentUrl} />
          </div>

          {/* Featured Image */}
          {newsItem.featuredImage && (
            <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={newsItem.featuredImage.url}
                alt={newsItem.featuredImage.alternativeText || newsItem.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Article Content */}
          <Card variant="default" padding="lg" className="mb-12">
            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:my-2 prose-li:my-0 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700">
              <BlocksRenderer content={newsItem.content} />
            </div>
          </Card>

          {/* Related Articles */}
          {!loading && relatedNews.length > 0 && (
            <div className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedNews.map(item => (
                  <Card
                    key={item.id}
                    variant="elevated"
                    className="group hover:shadow-xl transition-all duration-300"
                  >
                    {item.featuredImage && (
                      <div className="relative h-32 mb-4 -m-4 mb-4">
                        <Image
                          src={item.featuredImage.url}
                          alt={item.featuredImage.alternativeText || item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">
                          {getTypeIcon(item.type)}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                            item.type
                          )}`}
                        >
                          {item.type.charAt(0).toUpperCase() +
                            item.type.slice(1)}
                        </span>
                      </div>

                      <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-600 line-clamp-2">
                        {extractTextFromBlocks(item.content).substring(0, 100)}
                        ...
                      </p>

                      <div className="pt-2">
                        <Link
                          href={`/news/${item.slug}`}
                          className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Back to News */}
          <div className="mt-12 text-center">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to All News
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsArticle;
