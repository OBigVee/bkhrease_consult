import Link from 'next/link';
import { Layout } from '@/components/layout';

export default function BlogNotFound() {
  const seo = {
    title: 'Blog Post Not Found - B.Khrease Academic Consult',
    description: 'The blog post you are looking for could not be found.',
    keywords: ['404', 'not found', 'blog', 'B.Khrease'],
  };

  return (
    <Layout seo={seo}>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-md">
            The blog post you&apos;re looking for doesn&apos;t exist or may have
            been moved.
          </p>
          <div className="space-x-4">
            <Link
              href="/blog"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Browse All Posts
            </Link>
            <Link
              href="/"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
