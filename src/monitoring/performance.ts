/**
 * Performance monitoring utilities.
 */

export interface PerformanceMetrics {
  pageLoadTime: number;
  domContentLoaded: number;
  firstPaint: number | null;
  firstContentfulPaint: number | null;
  domInteractive: number;
  resourceCount: number;
  resourceSize: number;
  connectionType: string | null;
  effectiveType: string | null;
  memoryUsage: number | null;
}

/**
 * Get current page performance metrics.
 */
function getPerformanceMetrics(): PerformanceMetrics | null {
  if (typeof window === 'undefined' || !window.performance) {
    return null;
  }

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const paintEntries = performance.getEntriesByType('paint');
  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

  const firstPaint = paintEntries.find((entry) => entry.name === 'first-paint');
  const firstContentfulPaint = paintEntries.find(
    (entry) => entry.name === 'first-contentful-paint'
  );

  // Get network info if available
  const connection = (navigator as Navigator & {
    connection?: {
      type?: string;
      effectiveType?: string;
    };
  }).connection;

  // Get memory info if available (Chrome only)
  const memory = (performance as Performance & {
    memory?: {
      usedJSHeapSize: number;
    };
  }).memory;

  return {
    pageLoadTime: navigation?.loadEventEnd - navigation?.fetchStart || 0,
    domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.fetchStart || 0,
    firstPaint: firstPaint?.startTime || null,
    firstContentfulPaint: firstContentfulPaint?.startTime || null,
    domInteractive: navigation?.domInteractive - navigation?.fetchStart || 0,
    resourceCount: resources.length,
    resourceSize: resources.reduce((acc, r) => acc + (r.transferSize || 0), 0),
    connectionType: connection?.type || null,
    effectiveType: connection?.effectiveType || null,
    memoryUsage: memory?.usedJSHeapSize || null,
  };
}

/**
 * Format bytes to human-readable size.
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Log performance metrics to console (development only).
 */
export function logPerformanceMetrics(): void {
  if (!import.meta.env.DEV) return;

  // Wait for page to fully load
  window.addEventListener('load', () => {
    // Wait a bit more for all metrics to be available
    setTimeout(() => {
      const metrics = getPerformanceMetrics();
      if (!metrics) return;

      console.group('%c[Performance Metrics]', 'color: #3498db; font-weight: bold;');
      console.log(`Page Load Time: ${(metrics.pageLoadTime / 1000).toFixed(2)}s`);
      console.log(`DOM Content Loaded: ${(metrics.domContentLoaded / 1000).toFixed(2)}s`);
      console.log(`DOM Interactive: ${(metrics.domInteractive / 1000).toFixed(2)}s`);
      
      if (metrics.firstPaint) {
        console.log(`First Paint: ${(metrics.firstPaint / 1000).toFixed(2)}s`);
      }
      if (metrics.firstContentfulPaint) {
        console.log(`First Contentful Paint: ${(metrics.firstContentfulPaint / 1000).toFixed(2)}s`);
      }
      
      console.log(`Resources: ${metrics.resourceCount} (${formatBytes(metrics.resourceSize)})`);
      
      if (metrics.effectiveType) {
        console.log(`Connection: ${metrics.effectiveType}`);
      }
      if (metrics.memoryUsage) {
        console.log(`Memory Usage: ${formatBytes(metrics.memoryUsage)}`);
      }
      
      console.groupEnd();
    }, 1000);
  });
}

export default {
  logPerformanceMetrics,
};
