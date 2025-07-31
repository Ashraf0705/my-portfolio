// src/app/layout.js
import React from 'react';
import StyledComponentsRegistry from '@/lib/registry';
import './globals.css';

export const metadata = {
  title: 'Shaik Mohammed Ashraf | AI & Full-Stack Developer',
  description: 'The portfolio of Shaik Mohammed Ashraf, an architect of intelligent digital experiences.',
  // Your favicon metadata here if you added it
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}