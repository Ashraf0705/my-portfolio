'use client';

import styled from 'styled-components';
import { colors, fonts } from '@/styles/theme';
import Scene from './Scene'; // Your 3D model component

const HeroContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background: transparent;
  padding: 2rem;
  overflow: hidden;
`;

const SceneWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1; /* Renders above the canvas background */
`;

const TextContainer = styled.div`
  position: relative;
  z-index: 2; /* Above 3D scene */
  text-align: center;
`;

const Title = styled.h1`
  font-family: ${fonts.heading};
  font-size: clamp(3rem, 12vw, 6rem); /* was 2.5rem–4.5rem */
  color: #ffffff; /* bright white for better contrast */
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 20px rgba(0, 255, 255, 0.4); /* optional glowing effect */
`;

const Subtitle = styled.p`
  font-family: ${fonts.body};
  font-size: clamp(1.25rem, 4vw, 2rem); /* increased min and max size */
  color: #00bfff; /* bright cyan blue */
  font-weight: 700;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(0, 191, 255, 0.5); /* optional glow */
`;

const Hero = () => {
  return (
    <HeroContainer>
      <SceneWrapper>
        <Scene />
      </SceneWrapper>
      <TextContainer>
        <Title>Shaik Mohammed Ashraf</Title>
        <Subtitle>AI & ML Engineer, Full-Stack Developer</Subtitle>
      </TextContainer>
    </HeroContainer>
  );
};

export default Hero;
