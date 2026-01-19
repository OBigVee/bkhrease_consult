/**
 * Example component demonstrating proper usage of Strapi React Query hooks
 * Shows loading states, error handling, and data fetching patterns
 */

'use client';

import React from 'react';
import {
  useHomepageData,
  useTeamMembers,
  useBlogPosts,
  useNewsUpdates,
  useContactFormSubmission,
  useNewsletterSubscription,
} from '@/hooks/useStrapi';
import { APIErrorBoundary } from '@/components/errors/APIErrorBoundary';
import {
  HeroSkeleton,
  TeamGridSkeleton,
  BlogPostGridSkeleton,
  NewsGridSkeleton,
  ErrorState,
} from '@/components/ui/LoadingStates';
import Button from '@/components/ui/Button';
import { useFormSubmission } from '@/hooks/useAPIState';

// Homepage data example
function HomepageExample() {
  const { data, isLoading, error, refetch } = useHomepageData();

  if (isLoading) {
    return <HeroSkeleton />;
  }

  if (error) {
    return (
      <ErrorState
        message="Failed to load homepage content"
        onRetry={() => refetch()}
      />
    );
  }

  if (!data?.data) {
    return <ErrorState message="No homepage content available" />;
  }

  const homepage = data.data;

  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-4">{homepage.tagline}</h1>
      <p className="text-lg text-gray-600 mb-4">{homepage.vision}</p>
      <p className="text-lg text-gray-600">{homepage.mission}</p>

      {homepage.statistics && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {homepage.statistics.studentsTrained}+
            </div>
            <div className="text-sm text-gray-600">Students Trained</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {homepage.statistics.foundingYear}
            </div>
            <div className="text-sm text-gray-600">Founded</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {homepage.statistics.partnersCount}+
            </div>
            <div className="text-sm text-gray-600">Partners</div>
          </div>
        </div>
      )}
    </div>
  );
}

// Team members example
function TeamExample() {
  const { data, isLoading, error, refetch } = useTeamMembers();

  if (isLoading) {
    return <TeamGridSkeleton />;
  }

  if (error) {
    return (
      <ErrorState
        message="Failed to load team members"
        onRetry={() => refetch()}
      />
    );
  }

  if (!data?.data || data.data.length === 0) {
    return <ErrorState message="No team members found" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.data.map(member => (
        <div key={member.id} className="bg-white p-6 rounded-lg shadow-md">
          {member.image && (
            <img
              src={member.image.url}
              alt={member.image.alternativeText || member.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
          )}
          <h3 className="text-lg font-semibold text-center">{member.name}</h3>
          <p className="text-blue-600 text-center mb-2">{member.role}</p>
          <p className="text-gray-600 text-sm">{member.bio}</p>
          <div className="mt-2 text-xs text-gray-500 text-center">
            Category: {member.category}
          </div>
        </div>
      ))}
    </div>
  );
}

// Blog posts example with pagination
function BlogExample() {
  const { data, isLoading, error, refetch } = useBlogPosts({
    page: 1,
    limit: 6,
  });

  if (isLoading) {
    return <BlogPostGridSkeleton />;
  }

  if (error) {
    return (
      <ErrorState
        message="Failed to load blog posts"
        onRetry={() => refetch()}
      />
    );
  }

  if (
    !data ||
    typeof data !== 'object' ||
    !('data' in data) ||
    !Array.isArray((data as any).data) ||
    (data as any).data.length === 0
  ) {
    return <ErrorState message="No blog posts found" />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(data as any)?.data?.map((post: any) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {post.featuredImage && (
              <img
                src={post.featuredImage.url}
                alt={post.featuredImage.alternativeText || post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                {post.author && <span>By {post.author.name}</span>}
              </div>
            </div>
          </article>
        )) || []}
      </div>

      {(data as any)?.meta?.pagination && (
        <div className="mt-6 text-center text-sm text-gray-600">
          Showing {(data as any)?.data?.length || 0} of{' '}
          {(data as any)?.meta?.pagination?.total || 0} posts
        </div>
      )}
    </div>
  );
}

// News updates example
function NewsExample() {
  const { data, isLoading, error, refetch } = useNewsUpdates(4);

  if (isLoading) {
    return <NewsGridSkeleton />;
  }

  if (error) {
    return (
      <ErrorState
        message="Failed to load news updates"
        onRetry={() => refetch()}
      />
    );
  }

  if (!data?.data || data.data.length === 0) {
    return <ErrorState message="No news updates found" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.data.map(news => (
        <article
          key={news.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="p-4">
            <div className="flex items-center mb-2">
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  news.type === 'event'
                    ? 'bg-blue-100 text-blue-800'
                    : news.type === 'publication'
                      ? 'bg-green-100 text-green-800'
                      : news.type === 'achievement'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                }`}
              >
                {news.type}
              </span>
              <span className="ml-2 text-xs text-gray-500">
                {new Date(news.publishedAt).toLocaleDateString()}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{news.title}</h3>
            <div
              className="text-gray-600 text-sm"
              dangerouslySetInnerHTML={{
                __html: news.content.substring(0, 150) + '...',
              }}
            />
            {news.eventDate && (
              <div className="mt-2 text-xs text-blue-600">
                Event Date: {new Date(news.eventDate).toLocaleDateString()}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

// Contact form example with mutation
function ContactFormExample() {
  const contactMutation = useContactFormSubmission();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await contactMutation.mutateAsync(formData);
      // Reset form on success
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      // Error is handled by the mutation
      console.error('Form submission failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={e =>
            setFormData(prev => ({ ...prev, name: e.target.value }))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={e =>
            setFormData(prev => ({ ...prev, email: e.target.value }))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          value={formData.subject}
          onChange={e =>
            setFormData(prev => ({ ...prev, subject: e.target.value }))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          value={formData.message}
          onChange={e =>
            setFormData(prev => ({ ...prev, message: e.target.value }))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <Button
        type="submit"
        disabled={contactMutation.isPending}
        className="w-full"
      >
        {contactMutation.isPending ? 'Sending...' : 'Send Message'}
      </Button>

      {contactMutation.isSuccess && (
        <div className="text-green-600 text-sm text-center">
          Message sent successfully!
        </div>
      )}

      {contactMutation.isError && (
        <div className="text-red-600 text-sm text-center">
          Failed to send message. Please try again.
        </div>
      )}
    </form>
  );
}

// Main example component
export default function StrapiDataExample() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <APIErrorBoundary>
        <section>
          <h2 className="text-2xl font-bold mb-6">Homepage Data</h2>
          <HomepageExample />
        </section>
      </APIErrorBoundary>

      <APIErrorBoundary>
        <section>
          <h2 className="text-2xl font-bold mb-6">Team Members</h2>
          <TeamExample />
        </section>
      </APIErrorBoundary>

      <APIErrorBoundary>
        <section>
          <h2 className="text-2xl font-bold mb-6">Blog Posts</h2>
          <BlogExample />
        </section>
      </APIErrorBoundary>

      <APIErrorBoundary>
        <section>
          <h2 className="text-2xl font-bold mb-6">News Updates</h2>
          <NewsExample />
        </section>
      </APIErrorBoundary>

      <APIErrorBoundary>
        <section>
          <h2 className="text-2xl font-bold mb-6">Contact Form</h2>
          <ContactFormExample />
        </section>
      </APIErrorBoundary>
    </div>
  );
}
