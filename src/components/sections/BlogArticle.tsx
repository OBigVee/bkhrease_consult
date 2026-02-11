'use client';

import React, { useState, useEffect } from 'react';
import { BlogPost, StrapiResponse } from '@/types/strapi';
import { formatDate } from '@/lib/utils';
import Card from '@/components/ui/Card';
import BlogStructuredData from '@/components/seo/BlogStructuredData';
import Link from 'next/link';
import Image from 'next/image';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { extractTextFromBlocks } from '@/lib/utils';
import { strapiService } from '@/lib/strapi';

interface BlogArticleProps {
  blogPost: BlogPost;
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

const BlogArticle: React.FC<BlogArticleProps> = ({ blogPost }) => {
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRelatedPosts = async () => {
      try {
        const response = await strapiService.getBlogPosts(1, 20);
        const allPosts = (response as StrapiResponse<BlogPost[]>).data || [];

        // Filter out current post and get related by categories or tags
        const related = allPosts
          .filter((post: BlogPost) => post.id !== blogPost.id)
          .filter((post: BlogPost) => {
            // Check if posts share categories
            const sharedCategories = post.categories?.some(cat =>
              blogPost.categories?.some(blogCat => blogCat.id === cat.id)
            );
            // Check if posts share tags
            const sharedTags = post.tags?.some(tag =>
              blogPost.tags?.includes(tag)
            );
            return sharedCategories || sharedTags;
          })
          .slice(0, 3);

        // If not enough related posts, fill with recent posts
        if (related.length < 3) {
          const additional = allPosts
            .filter(
              (post: BlogPost) =>
                post.id !== blogPost.id &&
                !related.find((r: BlogPost) => r.id === post.id)
            )
            .slice(0, 3 - related.length);
          related.push(...additional);
        }

        setRelatedPosts(related);
      } catch (error) {
        console.error('Error fetching related posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRelatedPosts();
  }, [blogPost.id, blogPost.categories, blogPost.tags]);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      <BlogStructuredData blogPost={blogPost} />
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
                href="/blog"
                className="hover:text-primary-600 transition-colors duration-200"
              >
                Blog
              </Link>
              <span>›</span>
              <span className="text-gray-900 font-medium">
                {blogPost.title}
              </span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <div className="mb-8">
              {/* Categories */}
              {blogPost.categories && blogPost.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {blogPost.categories.map(category => (
                    <span
                      key={category.id}
                      className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {blogPost.title}
              </h1>

              {/* Excerpt */}
              {blogPost.excerpt && (
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  {blogPost.excerpt}
                </p>
              )}

              {/* Author and Date */}
              <div className="flex items-center gap-6 mb-6">
                {blogPost.author && (
                  <div className="flex items-center gap-3">
                    {blogPost.author.image && (
                      <div className="relative w-12 h-12">
                        <Image
                          src={blogPost.author.image.url}
                          alt={blogPost.author.name}
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">
                        {blogPost.author.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {blogPost.author.role}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-600">
                  <span>🕒</span>
                  <span>Published {formatDate(blogPost.publishedAt)}</span>
                </div>
              </div>

              {/* Tags */}
              {blogPost.tags && blogPost.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-sm text-gray-600">Tags:</span>
                  {blogPost.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Social Share */}
              <SocialShare title={blogPost.title} url={currentUrl} />
            </div>

            {/* Featured Image */}
            {blogPost.featuredImage && (
              <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                <Image
                  src={blogPost.featuredImage.url}
                  alt={blogPost.featuredImage.alternativeText || blogPost.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Article Content */}
            <Card variant="default" padding="lg" className="mb-12">
              <div
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-blockquote:border-primary-200 prose-blockquote:bg-primary-50 prose-blockquote:text-gray-800"
              >
                <BlocksRenderer content={blogPost.content} />
              </div>
            </Card>

            {/* Author Bio */}
            {blogPost.author && blogPost.author.bio && (
              <Card variant="elevated" className="mb-12">
                <div className="flex items-start gap-4">
                  {blogPost.author.image && (
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={blogPost.author.image.url}
                        alt={blogPost.author.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      About {blogPost.author.name}
                    </h3>
                    <p className="text-sm text-primary-600 mb-2">
                      {blogPost.author.role}
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {blogPost.author.bio}
                    </p>
                    {blogPost.author.socialLinks && (
                      <div className="flex gap-3 mt-3">
                        {blogPost.author.socialLinks.linkedin && (
                          <a
                            href={blogPost.author.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            LinkedIn
                          </a>
                        )}
                        {blogPost.author.socialLinks.email && (
                          <a
                            href={`mailto:${blogPost.author.socialLinks.email}`}
                            className="text-gray-600 hover:text-gray-700"
                          >
                            Email
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )}

            {/* Related Posts */}
            {!loading && relatedPosts.length > 0 && (
              <div className="border-t border-gray-200 pt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map(post => (
                    <Card
                      key={post.id}
                      variant="elevated"
                      className="group hover:shadow-xl transition-all duration-300"
                    >
                      {post.featuredImage && (
                        <div className="relative h-32 mb-4 -m-4 mb-4">
                          <Image
                            src={post.featuredImage.url}
                            alt={
                              post.featuredImage.alternativeText || post.title
                            }
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}

                      <div className="space-y-3">
                        {/* Categories */}
                        {post.categories && post.categories.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {post.categories.slice(0, 2).map(category => (
                              <span
                                key={category.id}
                                className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full"
                              >
                                {category.name}
                              </span>
                            ))}
                          </div>
                        )}

                        <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-sm text-gray-600 line-clamp-2">
                          {post.excerpt ||
                            extractTextFromBlocks(post.content).substring(0, 100)}
                          ...
                        </p>

                        <div className="flex items-center justify-between pt-2">
                          <div className="text-xs text-gray-500">
                            {formatDate(post.publishedAt)}
                          </div>
                          <Link
                            href={`/blog/${post.slug}`}
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

            {/* Back to Blog */}
            <div className="mt-12 text-center">
              <Link
                href="/blog"
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
                Back to All Articles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogArticle;
