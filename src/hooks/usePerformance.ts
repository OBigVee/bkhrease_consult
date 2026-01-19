'use client';

import { useEffect, useState } from 'react';

interface PerformanceData {
  loadTime: number;
  domContentLoaded: number;
  firstPaint: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  score: number;
}

export function usePerformance() {
  const [performanceData, setPerformanceData] =
    useState<PerformanceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const measurePerformance = () => {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');

      if (!navigation) {
        setIsLoading(false);
        return;
      }

      const loadTime = navigation.loadEventEnd - navigation.fetchStart;
      const domContentLoaded =
        navigation.domContentLoadedEventEnd - navigation.fetchStart;

      const firstPaint =
        paint.find(entry => entry.name === 'first-paint')?.startTime || 0;
      const firstContentfulPaint =
        paint.find(entry => entry.name === 'first-contentful-paint')
          ?.startTime || 0;

      // Calculate performance score
      let score = 100;
      if (loadTime > 3000) score -= 20;
      if (loadTime > 5000) score -= 30;
      if (domContentLoaded > 2000) score -= 15;
      if (firstContentfulPaint > 2500) score -= 20;

      const data: PerformanceData = {
        loadTime,
        domContentLoaded,
        firstPaint,
        firstContentfulPaint,
        largestContentfulPaint: 0, // Will be updated by LCP observer
        cumulativeLayoutShift: 0, // Will be updated by CLS observer
        firstInputDelay: 0, // Will be updated by FID observer
        score: Math.max(0, score),
      };

      setPerformanceData(data);
      setIsLoading(false);
    };

    // Wait for page load
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
    }

    // Observe Core Web Vitals
    const observer = new PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
        if (entry.entryType === 'largest-contentful-paint') {
          setPerformanceData(prev =>
            prev
              ? {
                  ...prev,
                  largestContentfulPaint: entry.startTime,
                }
              : null
          );
        }
      });
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });

    return () => {
      window.removeEventListener('load', measurePerformance);
      observer.disconnect();
    };
  }, []);

  return { performanceData, isLoading };
}

export function usePageSpeed() {
  const [pageSpeed, setPageSpeed] = useState<{
    score: number;
    metrics: Record<string, number>;
    recommendations: string[];
  } | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const analyzePageSpeed = () => {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;
      const resources = performance.getEntriesByType(
        'resource'
      ) as PerformanceResourceTiming[];

      if (!navigation) return;

      const metrics = {
        dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
        tcpConnection: navigation.connectEnd - navigation.connectStart,
        serverResponse: navigation.responseEnd - navigation.requestStart,
        domProcessing:
          navigation.domComplete - navigation.domContentLoadedEventStart,
        totalLoad: navigation.loadEventEnd - navigation.fetchStart,
      };

      const recommendations: string[] = [];
      let score = 100;

      // Analyze metrics and provide recommendations
      if (metrics.dnsLookup > 100) {
        recommendations.push('Consider using a faster DNS provider');
        score -= 5;
      }

      if (metrics.serverResponse > 500) {
        recommendations.push('Optimize server response time');
        score -= 10;
      }

      if (metrics.totalLoad > 3000) {
        recommendations.push('Optimize page load time');
        score -= 15;
      }

      // Analyze resource loading
      const slowResources = resources.filter(
        resource => resource.duration > 1000
      );
      if (slowResources.length > 0) {
        recommendations.push(
          `Optimize ${slowResources.length} slow-loading resources`
        );
        score -= slowResources.length * 2;
      }

      const largeResources = resources.filter(
        resource => resource.transferSize && resource.transferSize > 500000 // 500KB
      );
      if (largeResources.length > 0) {
        recommendations.push(
          `Compress ${largeResources.length} large resources`
        );
        score -= largeResources.length * 3;
      }

      setPageSpeed({
        score: Math.max(0, score),
        metrics,
        recommendations,
      });
    };

    setTimeout(analyzePageSpeed, 2000); // Wait for resources to load
  }, []);

  return pageSpeed;
}

export function useBundleAnalysis() {
  const [bundleInfo, setBundleInfo] = useState<{
    totalSize: number;
    chunks: Array<{ name: string; size: number }>;
    recommendations: string[];
  } | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const analyzeBundles = async () => {
      const scripts = Array.from(document.querySelectorAll('script[src]'));
      const chunks: Array<{ name: string; size: number }> = [];
      let totalSize = 0;

      for (const script of scripts) {
        const src = script.getAttribute('src');
        if (src && src.includes('/_next/static/')) {
          try {
            const response = await fetch(src, { method: 'HEAD' });
            const size = parseInt(
              response.headers.get('content-length') || '0'
            );
            const name = src.split('/').pop() || 'unknown';

            chunks.push({ name, size });
            totalSize += size;
          } catch (error) {
            console.warn(`Could not analyze bundle: ${src}`);
          }
        }
      }

      const recommendations: string[] = [];

      if (totalSize > 500000) {
        // 500KB
        recommendations.push('Consider code splitting to reduce bundle size');
      }

      const largeChunks = chunks.filter(chunk => chunk.size > 100000); // 100KB
      if (largeChunks.length > 0) {
        recommendations.push(`Optimize ${largeChunks.length} large chunks`);
      }

      setBundleInfo({
        totalSize,
        chunks: chunks.sort((a, b) => b.size - a.size),
        recommendations,
      });
    };

    setTimeout(analyzeBundles, 1000);
  }, []);

  return bundleInfo;
}
