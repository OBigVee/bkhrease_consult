'use client';

import { useEffect } from 'react';
import {
  getCLS,
  getFID,
  getFCP,
  getLCP,
  getTTFB,
  type Metric,
} from 'web-vitals';
import { sendToAnalytics } from '@/lib/performance';

export function WebVitals() {
  useEffect(() => {
    // Only run in production or when explicitly enabled
    if (
      process.env.NODE_ENV !== 'production' &&
      !process.env.NEXT_PUBLIC_ENABLE_WEB_VITALS
    ) {
      return;
    }

    const handleMetric = (metric: Metric) => {
      sendToAnalytics({
        name: metric.name as 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB' | 'INP',
        value: metric.value,
        rating: metric.rating as 'good' | 'needs-improvement' | 'poor',
        id: metric.id,
        delta: metric.delta,
        navigationType: metric.navigationType as
          | 'navigate'
          | 'reload'
          | 'back-forward'
          | 'back-forward-cache',
      });
    };

    // Measure Core Web Vitals
    getCLS(handleMetric);
    getFID(handleMetric);
    getFCP(handleMetric);
    getLCP(handleMetric);
    getTTFB(handleMetric);

    // Measure INP (Interaction to Next Paint) if available
    if ('getINP' in window) {
      import('web-vitals').then(({ getINP }) => {
        getINP(handleMetric);
      });
    }
  }, []);

  return null;
}

export default WebVitals;
