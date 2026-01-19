'use client';

import React, { useState, useEffect } from 'react';
import { BlogPost, Category } from '@/types/strapi';
import { strapiService } from '@/lib/strapi';
import Card from '@/components/ui/Card';
import BlogSubscription from '@/components/ui/BlogSubscription';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

interface BlogListingProps {
  initialPosts?: BlogPost[];
  initialCategories?: Category[];
}

const BlogListing: React.FC<BlogListingProps> = ({
  initialPosts = [],
  initialCategories = [],
}) => {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(initialPosts);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(!initialPosts.length);
  const [error, setError] = useState<string | null>(null);

  const postsPerPage = 9;

  useEffect(() => {
    if (!initialPosts.length) {
      fetchBlogData();
    }
  }, [initialPosts.length]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    filterAndSearchPosts();
  }, [selectedCategory, searchQuery, posts, currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchBlogData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [postsResponse, categoriesResponse] = await Promise.all([
        strapiService.getBlogPosts(currentPage, postsPerPage),
        strapiService.getBlogCategories(),
      ]);

      const postsData = (postsResponse as any).data || [];
      const categoriesData = (categoriesResponse as any).data || [];
      const pagination = (postsResponse as any).meta?.pagination;

      setPosts(postsData);
      setCategories(categoriesData);
      setTotalPages(pagination?.pageCount || 1);
    } catch (err) {
      setError('Failed to load blog posts. Please try again later.');
      console.error('Error fetching blog data:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSearchPosts = () => {
    let filtered = posts;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post =>
        post.categories?.some(cat => cat.slug === selectedCategory)
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredPosts(filtered);
  };

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <h2 className="text-lg font-semibold text-red-800 mb-2">
                Error Loading Blog
              </h2>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchBlogData}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
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
              Academic Blog
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Insights, tips, and success stories from the world of academic
              research and career development
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Articles
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category.slug
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📝</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  No Articles Found
                </h2>
                <p className="text-gray-600">
                  {searchQuery
                    ? `No articles match your search "${searchQuery}".`
                    : selectedCategory === 'all'
                      ? 'No blog articles are available at the moment.'
                      : `No articles found in the "${categories.find(c => c.slug === selectedCategory)?.name}" category.`}
                </p>
                {(searchQuery || selectedCategory !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Featured Post (First Post) */}
                {filteredPosts.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Featured Article
                    </h2>
                    <FeaturedBlogCard post={filteredPosts[0]} />
                  </div>
                )}

                {/* Regular Posts Grid */}
                {filteredPosts.length > 1 && (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Latest Articles
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredPosts.slice(1).map(post => (
                        <BlogCard key={post.id} post={post} />
                      ))}
                    </div>
                  </>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Previous
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        page => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 border rounded-lg ${
                              currentPage === page
                                ? 'bg-primary-600 text-white border-primary-600'
                                : 'border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            <div className="sticky top-24 space-y-6">
              {/* Categories Widget */}
              <Card variant="elevated">
                <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                        selectedCategory === category.slug
                          ? 'bg-primary-100 text-primary-800'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </Card>

              {/* Recent Posts Widget */}
              <Card variant="elevated">
                <h3 className="font-bold text-gray-900 mb-4">Recent Posts</h3>
                <div className="space-y-4">
                  {posts.slice(0, 5).map(post => (
                    <div key={post.id} className="flex gap-3">
                      {post.featuredImage && (
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={post.featuredImage.url}
                            alt={
                              post.featuredImage.alternativeText || post.title
                            }
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-sm font-medium text-gray-900 hover:text-primary-600 line-clamp-2"
                        >
                          {post.title}
                        </Link>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(post.publishedAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Blog Subscription */}
              <BlogSubscription />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Featured Blog Card Component
const FeaturedBlogCard: React.FC<{ post: BlogPost }> = ({ post }) => (
  <Card variant="elevated" className="overflow-hidden">
    <div className="md:flex">
      {post.featuredImage && (
        <div className="md:w-1/2 relative h-64 md:h-auto">
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alternativeText || post.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className={`p-6 ${post.featuredImage ? 'md:w-1/2' : 'w-full'}`}>
        <div className="flex items-center gap-2 mb-3">
          {post.categories?.slice(0, 2).map(category => (
            <span
              key={category.id}
              className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full"
            >
              {category.name}
            </span>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors duration-200">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {post.author?.image && (
              <div className="relative w-8 h-8">
                <Image
                  src={post.author.image.url}
                  alt={post.author.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
            )}
            <div className="text-sm">
              <p className="font-medium text-gray-900">{post.author?.name}</p>
              <p className="text-gray-500">{formatDate(post.publishedAt)}</p>
            </div>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  </Card>
);

// Regular Blog Card Component
const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => (
  <Card
    variant="elevated"
    className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
  >
    {post.featuredImage && (
      <div className="relative h-48 mb-4 -m-4 mb-4">
        <Image
          src={post.featuredImage.url}
          alt={post.featuredImage.alternativeText || post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
    )}

    <div className="space-y-3">
      {/* Categories */}
      <div className="flex flex-wrap gap-1">
        {post.categories?.slice(0, 2).map(category => (
          <span
            key={category.id}
            className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full"
          >
            {category.name}
          </span>
        ))}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>

      {/* Excerpt */}
      <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>

      {/* Author and Date */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          {post.author?.image && (
            <div className="relative w-6 h-6">
              <Image
                src={post.author.image.url}
                alt={post.author.name}
                fill
                className="object-cover rounded-full"
              />
            </div>
          )}
          <div className="text-xs text-gray-500">
            <p>{post.author?.name}</p>
            <p>{formatDate(post.publishedAt)}</p>
          </div>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200"
        >
          Read →
        </Link>
      </div>
    </div>
  </Card>
);

export default BlogListing;
