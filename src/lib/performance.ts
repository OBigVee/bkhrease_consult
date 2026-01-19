/**
 * Performance monitoring utilities for Core Web Vitals and other metrics
 */

export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
  id?: string;
  navigationType?: string;
}

export interface WebVitalsMetric {
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB' | 'INP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: 'navigate' | 'reload' | 'back-forward' | 'back-forward-cache';
}

// Core Web Vitals thresholds
const THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FID: { good: 100, poor: 300 },
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 },
};

export function getRating(
  name: keyof typeof THRESHOLDS,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name];
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

export function sendToAnalytics(metric: WebVitalsMetric) {
  // Send to Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(
        metric.name === 'CLS' ? metric.value * 1000 : metric.value
      ),
      custom_map: {
        metric_rating: metric.rating,
        metric_delta: metric.delta,
        navigation_type: metric.navigationType,
      },
    });
  }

  // Send to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Performance] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
    });
  }

  // Send to custom analytics endpoint
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'web-vital',
        metric: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
        navigationType: metric.navigationType,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
      }),
    }).catch(console.error);
  }
}

export function measurePerformance() {
  if (typeof window === 'undefined') return;

  // Measure page load time
  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming;

    if (navigation) {
      const metrics = {
        domContentLoaded:
          navigation.domContentLoadedEventEnd -
          navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        totalPageLoad: navigation.loadEventEnd - navigation.fetchStart,
        dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
        tcpConnection: navigation.connectEnd - navigation.connectStart,
        serverResponse: navigation.responseEnd - navigation.requestStart,
        domProcessing:
          navigation.domComplete - navigation.domContentLoadedEventStart,
      };

      console.log('[Performance] Page Load Metrics:', metrics);
    }
  });

  // Measure resource loading
  const observer = new PerformanceObserver(list => {
    list.getEntries().forEach(entry => {
      if (entry.entryType === 'resource') {
        const resource = entry as PerformanceResourceTiming;

        // Log slow resources (>1s)
        if (resource.duration > 1000) {
          console.warn(
            `[Performance] Slow resource: ${resource.name} (${Math.round(resource.duration)}ms)`
          );
        }
      }
    });
  });

  observer.observe({ entryTypes: ['resource'] });
}

export function measureBundleSize() {
  if (typeof window === 'undefined') return;

  // Measure JavaScript bundle size
  const scripts = Array.from(document.querySelectorAll('script[src]'));
  let totalSize = 0;

  scripts.forEach(async script => {
    const src = script.getAttribute('src');
    if (src && src.includes('/_next/static/')) {
      try {
        const response = await fetch(src, { method: 'HEAD' });
        const size = parseInt(response.headers.get('content-length') || '0');
        totalSize += size;

        console.log(
          `[Performance] Bundle: ${src.split('/').pop()} (${(size / 1024).toFixed(2)}KB)`
        );
      } catch (error) {
        console.warn(`[Performance] Could not measure bundle size for ${src}`);
      }
    }
  });

  setTimeout(() => {
    console.log(
      `[Performance] Total JS Bundle Size: ${(totalSize / 1024).toFixed(2)}KB`
    );
  }, 1000);
}

export function trackUserInteractions() {
  if (typeof window === 'undefined') return;

  let interactionCount = 0;
  const interactions: Array<{
    type: string;
    timestamp: number;
    target: string;
  }> = [];

  ['click', 'keydown', 'scroll'].forEach(eventType => {
    document.addEventListener(
      eventType,
      event => {
        interactionCount++;
        interactions.push({
          type: eventType,
          timestamp: performance.now(),
          target: (event.target as Element)?.tagName || 'unknown',
        });

        // Log interaction patterns every 10 interactions
        if (interactionCount % 10 === 0) {
          console.log(
            `[Performance] User Interactions (${interactionCount}):`,
            interactions.slice(-10)
          );
        }
      },
      { passive: true }
    );
  });
}

export function monitorMemoryUsage() {
  if (typeof window === 'undefined' || !('memory' in performance)) return;

  const memory = (performance as any).memory;

  setInterval(() => {
    const memoryInfo = {
      usedJSHeapSize: Math.round(memory.usedJSHeapSize / 1048576), // MB
      totalJSHeapSize: Math.round(memory.totalJSHeapSize / 1048576), // MB
      jsHeapSizeLimit: Math.round(memory.jsHeapSizeLimit / 1048576), // MB
    };

    // Warn if memory usage is high
    if (memoryInfo.usedJSHeapSize > 50) {
      console.warn('[Performance] High memory usage:', memoryInfo);
    }
  }, 30000); // Check every 30 seconds
}

// Initialize performance monitoring
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return;

  measurePerformance();
  measureBundleSize();
  trackUserInteractions();
  monitorMemoryUsage();

  // Report performance score
  setTimeout(() => {
    const score = calculatePerformanceScore();
    console.log(`[Performance] Overall Score: ${score}/100`);
  }, 5000);
}

function calculatePerformanceScore(): number {
  const navigation = performance.getEntriesByType(
    'navigation'
  )[0] as PerformanceNavigationTiming;

  if (!navigation) return 0;

  const loadTime = navigation.loadEventEnd - navigation.fetchStart;
  const domContentLoaded =
    navigation.domContentLoadedEventEnd - navigation.fetchStart;

  let score = 100;

  // Deduct points for slow loading
  if (loadTime > 3000) score -= 20;
  if (loadTime > 5000) score -= 30;
  if (domContentLoaded > 2000) score -= 15;
  if (domContentLoaded > 3000) score -= 25;

  return Math.max(0, score);
}

// Declare global gtag function for TypeScript
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: any
    ) => void;
  }
}
