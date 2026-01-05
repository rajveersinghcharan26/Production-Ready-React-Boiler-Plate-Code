/**
 * Web Vitals performance monitoring.
 * @see https://web.dev/vitals/
 */

import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB, type Metric } from 'web-vitals';

export interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

export type ReportHandler = (metric: WebVitalsMetric) => void;

/**
 * Get metric rating based on thresholds.
 */
function getMetricRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds: Record<string, [number, number]> = {
    CLS: [0.1, 0.25],
    FCP: [1800, 3000],
    FID: [100, 300],
    INP: [200, 500],
    LCP: [2500, 4000],
    TTFB: [800, 1800],
  };

  const [good, poor] = thresholds[name] || [0, 0];
  if (value <= good) return 'good';
  if (value <= poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Convert web-vitals metric to our format.
 */
function formatMetric(metric: Metric): WebVitalsMetric {
  return {
    name: metric.name,
    value: metric.value,
    rating: getMetricRating(metric.name, metric.value),
    delta: metric.delta,
    id: metric.id,
  };
}

/**
 * Default handler that logs to console in development.
 */
const defaultHandler: ReportHandler = (metric) => {
  if (import.meta.env.DEV) {
    const color =
      metric.rating === 'good'
        ? 'green'
        : metric.rating === 'needs-improvement'
        ? 'orange'
        : 'red';

    console.log(
      `%c[Web Vitals] ${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})`,
      `color: ${color}`
    );
  }
};

/**
 * Report Web Vitals to analytics or monitoring service.
 */
export function reportWebVitals(onReport: ReportHandler = defaultHandler): void {
  const handleMetric = (metric: Metric) => {
    onReport(formatMetric(metric));
  };

  // Cumulative Layout Shift
  onCLS(handleMetric);

  // First Contentful Paint
  onFCP(handleMetric);

  // First Input Delay (deprecated but still useful)
  onFID(handleMetric);

  // Interaction to Next Paint
  onINP(handleMetric);

  // Largest Contentful Paint
  onLCP(handleMetric);

  // Time to First Byte
  onTTFB(handleMetric);
}

/**
 * Send metrics to analytics endpoint.
 */
export function sendToAnalytics(metric: WebVitalsMetric): void {
  // Example: Send to Google Analytics
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as { gtag: (...args: unknown[]) => void }).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }

  // Example: Send to custom analytics endpoint
  const analyticsEndpoint = import.meta.env['VITE_ANALYTICS_ENDPOINT'] as string | undefined;
  if (analyticsEndpoint) {
    fetch(analyticsEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...metric,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
      // Use keepalive to ensure the request completes even on page unload
      keepalive: true,
    }).catch((error) => {
      console.warn('Failed to send analytics:', error);
    });
  }
}

export default reportWebVitals;
