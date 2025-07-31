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
  max-width: 1200px;
  margin: 0 auto;
  padding: 150px 2rem;
`;

const SectionTitle = styled.h2`
  font-family: ${fonts.heading};
  font-size: clamp(3.5rem, 10vw, 5rem);
  color: ${colors.text};
  text-align: center;
  margin-bottom: 6rem;
  position: relative;
  
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

const AboutWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  justify-self: center;
  
  .image-wrapper {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    background: linear-gradient(135deg, ${colors.accent} 0%, #0080cc 100%);
    padding: 4px;
    box-shadow: 0 20px 40px rgba(0, 191, 255, 0.2);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 30px 60px rgba(0, 191, 255, 0.3);
    }
    
    .inner-wrapper {
      border-radius: 16px;
      overflow: hidden;
      background: ${colors.background};
      
      img {
        width: 100%;
        height: auto;
        object-fit: cover;
        filter: grayscale(20%) contrast(1.1);
        transition: filter 0.5s ease;

        &:hover {
          filter: grayscale(0%) contrast(1);
        }
      }
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    background: linear-gradient(45deg, ${colors.accent}, transparent, ${colors.accent});
    border-radius: 25px;
    z-index: -1;
    opacity: 0.1;
    animation: pulse 3s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.1; transform: scale(1); }
    50% { opacity: 0.2; transform: scale(1.02); }
  }
`;

const TextContainer = styled.div`
  color: ${colors.text};
  font-family: ${fonts.body};
  
  .intro-text {
    font-size: clamp(1.3rem, 3vw, 1.6rem);
    line-height: 1.8;
    margin-bottom: 2rem;
    color: #a8b2d1;
  }
  
  .main-description {
    font-size: clamp(1.1rem, 2.5vw, 1.3rem);
    line-height: 1.8;
    margin-bottom: 2rem;
    
    strong { 
      color: ${colors.accent}; 
      font-weight: 700; 
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 1px;
        background: ${colors.accent};
        opacity: 0.3;
      }
    }
  }
  
  .stats-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
    margin-top: 3rem;
  }
  
  .stat-item {
    text-align: center;
    padding: 1.5rem;
    background: linear-gradient(135deg, ${colors.subtle} 0%, rgba(26, 26, 26, 0.8) 100%);
    border: 1px solid rgba(0, 191, 255, 0.2);
    border-radius: 12px;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      border-color: ${colors.accent};
      box-shadow: 0 10px 20px rgba(0, 191, 255, 0.1);
    }
    
    .stat-number {
      font-size: 2rem;
      font-weight: 700;
      color: ${colors.accent};
      font-family: ${fonts.heading};
      margin-bottom: 0.5rem;
    }
    
    .stat-label {
      font-size: 0.9rem;
      color: #8892b0;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }
`;

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelector('h2'), {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from(sectionRef.current.querySelector('.image-wrapper'), {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        opacity: 0,
        x: -50,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      });

      gsap.from(sectionRef.current.querySelectorAll('.text-animate'), {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        opacity: 0,
        x: 50,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.4,
        ease: 'power3.out',
      });

      gsap.from(sectionRef.current.querySelectorAll('.stat-item'), {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.8,
        ease: 'back.out(1.7)',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <AboutSection ref={sectionRef}>
      <SectionTitle>THE <span>MANIFESTO</span></SectionTitle>
      <AboutWrapper>
        <ImageContainer>
          <div className="image-wrapper">
            <div className="inner-wrapper">
              <Image src="/profile.png" alt="Shaik Mohammed Ashraf" width={400} height={400} priority />
            </div>
          </div>
        </ImageContainer>
        <TextContainer>
          <p className="intro-text text-animate">
            Architect of Intelligent Digital Experiences
          </p>
          <p className="main-description text-animate">
            I am an architect of intelligent digital experiences. My work exists at the intersection of <strong>Artificial Intelligence</strong>, <strong>Machine Learning</strong> and robust <strong>Full-Stack Development</strong>, transforming complex problems into elegant, high-performance solutions.
          </p>
          <p className="main-description text-animate">
            With a proven ability to deliver <strong>99% accuracy</strong> in AI models and a deep expertise in the <strong>MERN & Python</strong> ecosystems, my mission is to not just build applications, but to engineer the future of interactive technology.
          </p>
          
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-number">99%</div>
              <div className="stat-label">AI Model Accuracy</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">Projects Delivered</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">2+</div>
              <div className="stat-label">Years Experience</div>
            </div>
          </div>
        </TextContainer>
      </AboutWrapper>
    </AboutSection>
  );
};

export default About;

