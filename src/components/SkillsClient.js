'use client';

import dynamic from 'next/dynamic';

// Dynamically import the actual Skills component with SSR disabled
const Skills = dynamic(() => import('./Skills'), { ssr: false });

export default function SkillsClient() {
  return <Skills />;
}
