// src/components/Contact.js
'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { colors, fonts } from '@/styles/theme';
import { FaEnvelope, FaLinkedin, FaGithub, FaRocket } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 150px 2rem;
  position: relative;
`;

const SectionTitle = styled.h2`
  font-family: ${fonts.heading};
  font-size: clamp(3.5rem, 10vw, 5rem);
  color: ${colors.text};
  text-align: center;
  margin-bottom: 2rem;
  
  span { 
    color: ${colors.accent};
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, ${colors.accent}, transparent);
      border-radius: 2px;
    }
  }
`;

const SectionSubtitle = styled.p`
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  color: #a8b2d1;
  text-align: center;
  margin-bottom: 4rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const ContactBox = styled.div`
  background: linear-gradient(135deg, ${colors.subtle} 0%, rgba(26, 26, 26, 0.8) 100%);
  border: 1px solid rgba(0, 191, 255, 0.2);
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${colors.accent}, #0080cc);
  }
`;

const FormTitle = styled.h3`
  font-family: ${fonts.heading};
  font-size: 2.2rem;
  color: ${colors.accent};
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const ContactButton = styled.a`
  display: inline-block;
  background: linear-gradient(135deg, ${colors.accent}, #0080cc);
  color: white;
  border: none;
  padding: 1.2rem 3rem;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  gap: 0.8rem;
  transition: all 0.3s ease;
  font-family: ${fonts.heading};
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 191, 255, 0.4);
  }
`;

const SocialSection = styled.div`
  text-align: center;
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 1px solid rgba(0, 191, 255, 0.1);
`;

const SocialTitle = styled.h4`
  font-family: ${fonts.heading};
  font-size: 1.5rem;
  color: ${colors.text};
  margin-bottom: 1.5rem;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, rgba(0, 191, 255, 0.1), rgba(0, 191, 255, 0.05));
  border: 2px solid rgba(0, 191, 255, 0.3);
  border-radius: 50%;
  color: ${colors.accent};
  font-size: 1.8rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${colors.accent};
    color: ${colors.background};
    transform: translateY(-8px) scale(1.1);
    box-shadow: 0 15px 30px rgba(0, 191, 255, 0.4);
  }
`;

const Contact = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // GSAP animations...
  }, []);

  return (
    <ContactSection ref={sectionRef} id="contact">
      <SectionTitle>GET IN <span>TOUCH</span></SectionTitle>
      <SectionSubtitle className="contact-subtitle">
        {/* THE DEFINITIVE FIX: Rephrased to remove apostrophe */}
        I am always excited to discuss new opportunities, innovative projects, and potential collaborations. 
        We should create something amazing together!
      </SectionSubtitle>

      <ContactBox className="contact-form">
        <FormTitle>
          <FaRocket />
          Let us Build Something Great
        </FormTitle>
        <ContactButton href="mailto:smdashraf01@gmail.com">
          Start a Conversation
        </ContactButton>
      </ContactBox>

      <SocialSection>
        <SocialTitle>Connect With Me</SocialTitle>
        <SocialLinks>
          <SocialLink href="https://github.com/Ashraf0705" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-item"><FaGithub /></SocialLink>
          <SocialLink href="https://www.linkedin.com/in/ashrafshaikmohammed/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-item"><FaLinkedin /></SocialLink>
          <SocialLink href="mailto:smdashraf01@gmail.com" aria-label="Email" className="social-item"><FaEnvelope /></SocialLink>
        </SocialLinks>
      </SocialSection>
    </ContactSection>
  );
};

export default Contact;