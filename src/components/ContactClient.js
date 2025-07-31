'use client';

import dynamic from 'next/dynamic';

// Disable SSR for Contact
const Contact = dynamic(() => import('./Contact'), { ssr: false });

export default function ContactClient() {
  return <Contact />;
}
