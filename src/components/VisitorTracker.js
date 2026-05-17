'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Only track if we haven't tracked in this session yet to prevent spam from refreshes
    // This is especially important in Next.js 13+ React Strict Mode (which fires useEffect twice)
    const tracked = sessionStorage.getItem('levroun_visitor_tracked');

    if (!tracked) {
      // Mark as tracked immediately to avoid race conditions
      sessionStorage.setItem('levroun_visitor_tracked', 'true');

      // Send the visit to the backend
      fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path: pathname || '/' }),
      }).catch(err => console.error('Failed to log visit:', err));
    }
  }, [pathname]);

  // This component doesn't render anything visible
  return null;
}
