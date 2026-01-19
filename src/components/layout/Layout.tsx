'use client';

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ErrorBoundary from '../ErrorBoundary';
import SEOHead from '../seo/SEOHead';
import {
  NavigationItem,
  SocialLink,
  QuickLink,
  CompanyInfo,
  SEOData,
} from './types';

interface LayoutProps {
  children: React.ReactNode;
  seo?: SEOData;
  navigation?: NavigationItem[];
  socialLinks?: SocialLink[];
  quickLinks?: QuickLink[];
  companyInfo?: CompanyInfo;
  className?: string;
  skipToContentId?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  seo,
  navigation,
  socialLinks,
  quickLinks,
  companyInfo,
  className = '',
  skipToContentId = 'main-content',
}) => {
  return (
    <ErrorBoundary>
      <SEOHead seo={seo} />

      <div className={`min-h-screen flex flex-col bg-white ${className}`}>
        {/* Skip to content link for accessibility */}
        <a
          href={`#${skipToContentId}`}
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          Skip to main content
        </a>

        <Header navigation={navigation} />

        <main id={skipToContentId} className="flex-grow" role="main">
          <ErrorBoundary
            fallback={({ reset }) => (
              <div className="min-h-[50vh] flex items-center justify-center">
                <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center mx-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Content Error
                  </h2>
                  <p className="text-gray-600 mb-4">
                    There was an error loading this content. Please try again.
                  </p>
                  <button
                    onClick={reset}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}
          >
            {children}
          </ErrorBoundary>
        </main>

        <Footer
          socialLinks={socialLinks}
          quickLinks={quickLinks}
          companyInfo={companyInfo}
        />
      </div>
    </ErrorBoundary>
  );
};

export default Layout;
