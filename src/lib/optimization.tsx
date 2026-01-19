/**
 * Performance optimization utilities for code splitting and lazy loading
 */

import { lazy, ComponentType } from 'react';

// Dynamic import wrapper with error handling
export function dynamicImport<T = any>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  fallback?: ComponentType<any>
) {
  return lazy(async () => {
    try {
      return await importFn();
    } catch (error) {
      console.error('Dynamic import failed:', error);

      // Return fallback component if available
      if (fallback) {
        return { default: fallback };
      }

      // Return error component
      return {
        default: () => (
          <div className="p-4 text-center text-red-600">
            <p>Failed to load component</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        ),
      };
    }
  });
}

// Preload critical resources
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  // Preload critical fonts
  const fontLinks = ['/fonts/inter-var.woff2', '/fonts/inter-var-latin.woff2'];

  fontLinks.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });

  // Preload critical images
  const criticalImages = ['/bk.jpg', '/hero-bg.jpg'];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = src;
    link.as = 'image';
    document.head.appendChild(link);
  });
}

// Prefetch next page resources
export function prefetchRoute(route: string) {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = route;
  document.head.appendChild(link);
}

// Optimize images with intersection observer
export function createImageObserver(
  callback: (entry: IntersectionObserverEntry) => void
) {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  return new IntersectionObserver(
    entries => {
      entries.forEach(callback);
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.01,
    }
  );
}

// Service Worker registration for caching
export function registerServiceWorker() {
  if (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    process.env.NODE_ENV === 'production'
  ) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}

// Bundle analyzer helper
export function analyzeBundleSize() {
  if (typeof window === 'undefined') return;

  const scripts = Array.from(
    document.querySelectorAll('script[src]')
  ) as HTMLScriptElement[];
  const analysis = {
    totalScripts: scripts.length,
    nextJSScripts: scripts.filter(s => s.src.includes('/_next/')).length,
    externalScripts: scripts.filter(
      s => !s.src.includes(window.location.origin)
    ).length,
    estimatedSize: 0,
  };

  console.log('Bundle Analysis:', analysis);
  return analysis;
}

// Critical CSS inlining helper
export function inlineCriticalCSS(css: string) {
  if (typeof window === 'undefined') return;

  const style = document.createElement('style');
  style.textContent = css;
  style.setAttribute('data-critical', 'true');
  document.head.appendChild(style);
}

// Resource hints helper
export function addResourceHints() {
  if (typeof window === 'undefined') return;

  const hints = [
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
    { rel: 'dns-prefetch', href: '//res.cloudinary.com' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
  ];

  hints.forEach(hint => {
    const link = document.createElement('link');
    link.rel = hint.rel;
    link.href = hint.href;
    if (hint.crossOrigin) {
      link.crossOrigin = hint.crossOrigin;
    }
    document.head.appendChild(link);
  });
}

// Performance budget checker
export function checkPerformanceBudget() {
  if (typeof window === 'undefined') return;

  const budget = {
    maxLoadTime: 3000, // 3 seconds
    maxBundleSize: 500000, // 500KB
    maxImageSize: 200000, // 200KB per image
  };

  const navigation = performance.getEntriesByType(
    'navigation'
  )[0] as PerformanceNavigationTiming;
  const resources = performance.getEntriesByType(
    'resource'
  ) as PerformanceResourceTiming[];

  const results = {
    loadTime: {
      actual: navigation.loadEventEnd - navigation.fetchStart,
      budget: budget.maxLoadTime,
      passed:
        navigation.loadEventEnd - navigation.fetchStart <= budget.maxLoadTime,
    },
    bundleSize: {
      actual: 0,
      budget: budget.maxBundleSize,
      passed: true,
    },
    images: resources
      .filter(r => r.initiatorType === 'img')
      .map(r => ({
        url: r.name,
        size: r.transferSize || 0,
        passed: (r.transferSize || 0) <= budget.maxImageSize,
      })),
  };

  // Calculate bundle size
  const jsResources = resources.filter(r => r.name.includes('.js'));
  results.bundleSize.actual = jsResources.reduce(
    (sum, r) => sum + (r.transferSize || 0),
    0
  );
  results.bundleSize.passed = results.bundleSize.actual <= budget.maxBundleSize;

  console.log('Performance Budget Check:', results);
  return results;
}

// Initialize all optimizations
export function initOptimizations() {
  if (typeof window === 'undefined') return;

  preloadCriticalResources();
  addResourceHints();
  registerServiceWorker();

  // Run analysis after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      analyzeBundleSize();
      checkPerformanceBudget();
    }, 2000);
  });
}
