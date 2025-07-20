// src/components/About.js
'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { colors, fonts, breakpoints } from '@/styles/theme';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  padding: 150px 2rem;
`;

const SectionTitle = styled.h2`
  font-family: ${fonts.heading};
  font-size: clamp(3rem, 10vw, 4.5rem);
  color: ${colors.accent};
  text-transform: uppercase;
  margin-bottom: 4rem;
  text-align: center;
`;

const AboutWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 50px;
  align-items: center;

  @media (max-width: ${breakpoints.desktop}) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 3rem;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 350px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid ${colors.accent};
  justify-self: center;
  box-shadow: 0 10px 30px -15px rgba(0,0,0,0.7);

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    filter: grayscale(100%) contrast(1.1);
    transition: filter 0.5s ease;

    &:hover {
      filter: grayscale(0%) contrast(1);
    }
  }
`;

const TextContainer = styled.div`
  color: ${colors.text};
  font-family: ${fonts.body};
  font-size: clamp(1.1rem, 2.5vw, 1.3rem);
  line-height: 1.8;

  p { margin-bottom: 1.5rem; }
  strong { color: ${colors.accent}; font-weight: 700; }
`;

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.from(sectionRef.current.children, {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
    });
  }, []);

  return (
    <AboutSection ref={sectionRef}>
      <SectionTitle>The Manifesto</SectionTitle>
      <AboutWrapper>
        <ImageContainer>
          <Image src="/profile.png" alt="Shaik Mohammed Ashraf" width={400} height={400} priority />
        </ImageContainer>
        <TextContainer>
          <p>
            I am an architect of intelligent digital experiences. My work exists at the intersection of <strong>Artificial Intelligence , Machine Learning</strong> and robust <strong>Full-Stack Development</strong>, transforming complex problems into elegant, high-performance solutions.
          </p>
          <p>
            With a proven ability to deliver 99% accuracy in AI models and a deep expertise in the MERN & Python ecosystems, my mission is to not just build applications, but to engineer the future of interactive technology.
          </p>
        </TextContainer>
      </AboutWrapper>
    </AboutSection>
  );
};

export default About;