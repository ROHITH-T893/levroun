// Create: src/components/ClientLayout.js
'use client';
import { useEffect } from 'react';

export default function ClientLayout({ children }) {
  useEffect(() => {
    // Your client-side logic here
    console.log('Client-side layout logic');
  }, []);

  return <>{children}</>;
}