// src/app/layout.js
import React from 'react';
import StyledComponentsRegistry from '@/lib/registry';
import InteractiveBackground from '@/components/InteractiveBackground'; // IMPORT THE MASTERPIECE
import './globals.css';

export const metadata = {
  title: 'Shaik Mohammed Ashraf | AI & Full-Stack Developer',
  description: 'The portfolio of Shaik Mohammed Ashraf, a final-year Computer Science student specializing in AI, Machine Learning, and MERN/Django development.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <InteractiveBackground /> {/* RENDER IT GLOBALLY */}
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}