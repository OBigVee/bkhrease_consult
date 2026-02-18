'use client';

import React, { useState, useMemo } from 'react';
import { NewsItem } from '@/types/strapi';
import { useNewsUpdates, useUpcomingEvents } from '@/hooks/useStrapi';
import { APIErrorBoundary } from '@/components/errors/APIErrorBoundary';
import { NewsGridSkeleton, ErrorState } from '@/components/ui/LoadingStates';
import Card from '@/components/ui/Card';
import CountdownTimer from '@/components/ui/CountdownTimer';
import NewsSubscription from '@/components/ui/NewsSubscription';
import EventReminder from '@/components/ui/EventReminder';
import { formatDate, extractTextFromBlocks } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

interface NewsListingProps {
  initialNews?: NewsItem[];
}

const NewsListingContent: React.FC<NewsListingProps> = ({
  initialNews = [],
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Use React Query hooks for data fetching
  const { data: newsResponse, isLoading, error, refetch } = useNewsUpdates();

  const { data: upcomingEventsResponse, isLoading: eventsLoading } =
    useUpcomingEvents();

  const newsTypes = [
    { value: 'all', label: 'All News' },
    { value: 'event', label: 'Events' },
    { value: 'publication', label: 'Publications' },
    { value: 'achievement', label: 'Achievements' },
    { value: 'announcement', label: 'Announcements' },
  ];

  // Get news data from React Query or fallback to initial data
  const news = newsResponse?.data || initialNews;
  const upcomingEvents = upcomingEventsResponse?.data || [];

  // Filter news based on selected filter
  const filteredNews = useMemo(() => {
    if (selectedFilter === 'all') {
      return news;
    }
    return news.filter(item => item.type === selectedFilter);
  }, [selectedFilter, news]);

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
      publication: '📄',
      achievement: '🏆',
      announcement: '📢',
    };
    return icons[type as keyof typeof icons] || '📰';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <NewsGridSkeleton count={6} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <ErrorState
            message="Failed to load news updates. Please try again later."
            onRetry={() => refetch()}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              News & Updates
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Stay informed about our latest achievements, upcoming events, and
              research publications
            </p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {newsTypes.map(type => (
              <button
                key={type.value}
                onClick={() => setSelectedFilter(type.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedFilter === type.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events Countdown */}
      {upcomingEvents.length > 0 && (
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Upcoming Events
            </h2>
            {eventsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse bg-gray-200 h-32 rounded-lg"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.slice(0, 3).map(event => (
                  <CountdownTimer
                    key={event.id}
                    targetDate={event.eventDate!}
                    eventTitle={event.title}
                    onExpired={() => {
                      refetch();
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* News Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {filteredNews.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📰</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  No News Found
                </h2>
                <p className="text-gray-600">
                  {selectedFilter === 'all'
                    ? 'No news updates are available at the moment.'
                    : `No ${selectedFilter} updates are available at the moment.`}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredNews.map(item => (
                  <Card
                    key={item.id}
                    variant="elevated"
                    className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    {/* Featured Image */}
                    {item.featuredImage && (
                      <div className="relative h-48 mb-4 -m-4 mb-4">
                        <Image
                          src={item.featuredImage.url}
                          alt={item.featuredImage.alternativeText || item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="space-y-3">
                      {/* Type Badge */}
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
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
                        {item.isUpcoming && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            Upcoming
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                        {item.title}
                      </h3>

                      {/* Content Preview */}
                      <p className="text-gray-600 line-clamp-3">
                        {extractTextFromBlocks(item.content).substring(0, 150)}
                        ...
                      </p>

                      {/* Event Date */}
                      {item.eventDate && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>📅</span>
                          <span>{formatDate(item.eventDate)}</span>
                        </div>
                      )}

                      {/* Published Date */}
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>🕒</span>
                        <span>Published {formatDate(item.displayDate || item.publishedAt)}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <Link
                          href={`/news/${item.slug}`}
                          className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200"
                        >
                          Read More →
                        </Link>

                        {item.registrationLink && (
                          <a
                            href={item.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200"
                          >
                            Register
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            <div className="sticky top-24 space-y-6">
              {/* Event Reminders */}
              <EventReminder events={news} />

              {/* Newsletter Subscription */}
              <NewsSubscription />

              {/* Quick Stats */}
              <Card variant="elevated" className="text-center">
                <div className="text-2xl mb-3">📊</div>
                <h3 className="font-bold text-gray-900 mb-4">News Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Articles:</span>
                    <span className="font-medium">{news.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">This Month:</span>
                    <span className="font-medium">
                      {
                        news.filter(item => {
                          const publishedDate = new Date(item.publishedAt);
                          const currentDate = new Date();
                          return (
                            publishedDate.getMonth() ===
                            currentDate.getMonth() &&
                            publishedDate.getFullYear() ===
                            currentDate.getFullYear()
                          );
                        }).length
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Upcoming Events:</span>
                    <span className="font-medium">
                      {
                        news.filter(
                          item => item.type === 'event' && item.isUpcoming
                        ).length
                      }
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component wrapped with error boundary
const NewsListing: React.FC<NewsListingProps> = props => {
  return (
    <APIErrorBoundary>
      <NewsListingContent {...props} />
    </APIErrorBoundary>
  );
};

export default NewsListing;
