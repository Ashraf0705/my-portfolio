// src/components/Footer.js
'use client';

import styled from 'styled-components';
import { colors, fonts } from '@/styles/theme';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const FooterContainer = styled.footer`
  padding: 2rem;
  text-align: center;
  background-color: #030303; // A slightly different black to give subtle separation
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
`;

const SocialLink = styled.a`
  color: #a8b2d1;
  font-size: 2rem; // Larger, more confident icons
  transition: all 0.3s ease;

  &:hover {
    color: ${colors.accent};
    transform: translateY(-5px);
  }
`;

const FooterText = styled.p`
  font-family: ${fonts.body};
  font-size: 1rem;
  color: #8892b0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <SocialLinks>
        <SocialLink href="https://github.com/Ashraf0705" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FaGithub />
        </SocialLink>
        <SocialLink href="https://linkedin.com/in/ashrafshaikmohammed" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin />
        </SocialLink>
      </SocialLinks>
      <FooterText>
        Designed & Built with passion by Shaik Mohammed Ashraf
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;