import Link from 'next/link';
import { Layout } from '@/components/layout';

export default function NewsNotFound() {
  const seo = {
    title: 'News Article Not Found - B.Khrease Academic Consult',
    description: 'The requested news article could not be found.',
  };

  return (
    <Layout seo={seo}>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center mx-4">
          <div className="text-6xl mb-4">📰</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            News Article Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The news article you&apos;re looking for doesn&apos;t exist or may
            have been moved.
          </p>
          <div className="space-y-3">
            <Link
              href="/news"
              className="block w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
            >
              Browse All News
            </Link>
            <Link
              href="/"
              className="block w-full text-primary-600 hover:text-primary-700 px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
