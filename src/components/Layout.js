// src/components/Layout.js
'use client';

import styled from 'styled-components';
import InteractiveBackground from '@/components/InteractiveBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const MainContent = styled.main`
  position: relative;
  z-index: 1;
`;

// This component now correctly wraps everything that uses styled-components
const Layout = ({ children }) => {
  return (
    <>
      <InteractiveBackground />
      <Navbar />
      <MainContent>
        {children}
      </MainContent>
      <Footer />
    </>
  );
};

export default Layout;