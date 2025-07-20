// src/components/Hero.js
'use client';

import styled from 'styled-components';
import { colors, fonts } from '@/styles/theme';
import Scene from './Scene'; // Import our new 3D scene

const HeroContainer = styled.section`
  position: relative; /* This is crucial for layering child elements */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: ${colors.background};
  padding: 2rem;
  overflow: hidden; /* Prevents scrollbars from the 3D object */
`;

const TextContainer = styled.div`
  position: relative;
  z-index: 10; /* Ensures text is on top of the 3D scene */
  text-align: center;
`;

const Title = styled.h1`
  font-family: ${fonts.heading};
  font-size: clamp(2.5rem, 10vw, 4.5rem);
  color: ${colors.text};
  margin-bottom: 0.5rem;
  text-transform: uppercase;
`;

const Subtitle = styled.p`
  font-family: ${fonts.body};
  font-size: clamp(1rem, 4vw, 1.25rem);
  color: ${colors.accent};
  font-weight: 700;
  letter-spacing: 1.5px;
`;

const Hero = () => {
  return (
    <HeroContainer>
      <Scene /> {/* Our 3D Scene is rendered here */}
      <TextContainer>
        <Title>Shaik Mohammed Ashraf</Title>
        <Subtitle>AI & ML Engineer, Full-Stack Developer</Subtitle>
      </TextContainer>
    </HeroContainer>
  );
};

export default Hero;