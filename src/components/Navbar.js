// src/components/Navbar.js
'use client';

import { useState, useEffect } from 'react';
import styled, { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import { colors, fonts, breakpoints } from '@/styles/theme';
import { FaBars, FaTimes } from 'react-icons/fa';

const shouldForwardProp = (prop) => {
  return isPropValid(prop) && !['scrolled', 'isOpen'].includes(prop);
};

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 2rem 2rem;
  background: ${props => props.$scrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent'};
  backdrop-filter: ${props => props.$scrolled ? 'blur(10px)' : 'none'};
  border-bottom: ${props => props.$scrolled ? '1px solid rgba(0, 191, 255, 0.1)' : 'none'};
  transition: all 0.3s ease;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 4rem;
  margin: 0;
  padding: 0;

  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled.li`
  a {
    color: ${colors.text};
    text-decoration: none;
    font-family: ${fonts.body};
    font-size: 1.4rem;
    font-weight: 600;
    position: relative;
    transition: color 0.3s ease;

    &:hover {
      color: ${colors.accent};
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 0;
      height: 2px;
      background: ${colors.accent};
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }
`;

const MobileMenuButton = styled.button`
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: none;
  background: none;
  border: none;
  color: ${colors.text};
  font-size: 2rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.accent};
  }

  @media (max-width: ${breakpoints.tablet}) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: ${props => props.$isOpen ? '0' : '-100%'};
  width: 300px;
  height: 100vh;
  background: rgba(10, 10, 10, 0.98);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(0, 191, 255, 0.1);
  padding: 2rem;
  transition: right 0.3s ease;
  z-index: 1001;

  @media (min-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

const MobileNavLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MobileNavLink = styled.li`
  margin-bottom: 2rem;

  a {
    color: ${colors.text};
    text-decoration: none;
    font-family: ${fonts.body};
    font-size: 1.3rem;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: ${colors.accent};
    }
  }
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <NavContainer $scrolled={scrolled}>
        <NavContent>
          <NavLinks>
            <NavLink><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection("about"); }}>About</a></NavLink>
            <NavLink><a href="#experience" onClick={(e) => { e.preventDefault(); scrollToSection("experience"); }}>Experience</a></NavLink>
            <NavLink><a href="#education" onClick={(e) => { e.preventDefault(); scrollToSection("education"); }}>Education</a></NavLink>
            <NavLink><a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection("skills"); }}>Skills</a></NavLink>
            <NavLink><a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection("projects"); }}>Projects</a></NavLink>
            <NavLink><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}>Contact</a></NavLink>
          </NavLinks>
          <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </NavContent>
      </NavContainer>

      <MobileMenu $isOpen={mobileMenuOpen}>
        <MobileMenuHeader>
          <MobileMenuButton onClick={() => setMobileMenuOpen(false)}>
            <FaTimes />
          </MobileMenuButton>
        </MobileMenuHeader>
        <MobileNavLinks>
          <MobileNavLink><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection("about"); }}>About</a></MobileNavLink>
          <MobileNavLink><a href="#experience" onClick={(e) => { e.preventDefault(); scrollToSection("experience"); }}>Experience</a></MobileNavLink>
          <MobileNavLink><a href="#education" onClick={(e) => { e.preventDefault(); scrollToSection("education"); }}>Education</a></MobileNavLink>
          <MobileNavLink><a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection("skills"); }}>Skills</a></MobileNavLink>
          <MobileNavLink><a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection("projects"); }}>Projects</a></MobileNavLink>
          <MobileNavLink><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}>Contact</a></MobileNavLink>
        </MobileNavLinks>
      </MobileMenu>
    </StyleSheetManager>
  );
};

export default Navbar;



