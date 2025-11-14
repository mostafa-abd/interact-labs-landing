'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function VirtualPageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'virtualPageView',
      pagePath: pathname,
      pageTitle: document.title,
    });
  }, [pathname]);

  return null;
}

