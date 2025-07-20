// src/components/Contact.js
'use client';

import styled from 'styled-components';
import { colors, fonts } from '@/styles/theme';

const ContactSection = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: 150px 2rem;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-family: ${fonts.heading};
  font-size: clamp(2.5rem, 8vw, 4rem);
  color: ${colors.text};
  margin-bottom: 1rem;
  span { color: ${colors.accent}; }
`;

const ContactText = styled.p`
  font-size: 1.25rem;
  line-height: 1.7;
  color: #a8b2d1;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ContactButton = styled.a`
  display: inline-block;
  font-family: ${fonts.heading};
  font-size: 1.2rem;
  color: ${colors.accent};
  background-color: transparent;
  border: 2px solid ${colors.accent};
  border-radius: 5px;
  padding: 1.25rem 2.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 191, 255, 0.1);
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 0 25px rgba(0, 191, 255, 0.5);
  }
`;

const Contact = () => {
  return (
    <ContactSection>
      <SectionTitle>Create <span>Together</span></SectionTitle>
      <ContactText>
        {/* THE DEFINITIVE FIX: The sentence has been rephrased to remove the apostrophe. */}
        My inbox is always open. Whether you have a project, an idea, or an opportunity, we should connect and build the future—one line of code at a time.
      </ContactText>
      <ContactButton href="mailto:smdashraf01@gmail.com">
        Start a Conversation
      </ContactButton>
    </ContactSection>
  );
};

export default Contact;