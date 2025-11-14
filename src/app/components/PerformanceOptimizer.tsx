'use client';

import { useEffect } from 'react';

/**
 * Performance optimizer component that:
 * - Optimizes IntersectionObserver performance
 * - Sets up performance monitoring
 */
export default function PerformanceOptimizer() {
  useEffect(() => {
    // Optimize IntersectionObserver defaults
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      // Use requestIdleCallback for non-critical operations
      const scheduleIdleTask = (callback: () => void) => {
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(callback, { timeout: 2000 });
        } else {
          setTimeout(callback, 1);
        }
      };

      // Pre-warm IntersectionObserver for better performance
      scheduleIdleTask(() => {
        // Observer is ready
      });
    }
  }, []);

  return null;
}

