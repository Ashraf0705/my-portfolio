// src/components/Education.js
'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { educationData } from '@/data/credentials'; 
import { colors, fonts, breakpoints } from '@/styles/theme';
import { FaGraduationCap, FaCalendarAlt, FaTrophy } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EducationSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 150px 2rem;
  position: relative;
`;

const SectionTitle = styled.h2`
  font-family: ${fonts.heading};
  font-size: clamp(3.5rem, 10vw, 5rem);
  color: ${colors.text};
  text-align: center;
  margin-bottom: 8rem;
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

const TimelineContainer = styled.div`
  position: relative;
  max-width: 900px;
  margin: 0 auto;
`;

const TimelinePath = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, ${colors.accent}, rgba(0, 191, 255, 0.3));
  transform: translateX(-50%);
  border-radius: 2px;
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    background: ${colors.accent};
    border-radius: 50%;
    box-shadow: 0 0 20px ${colors.accent};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    background: ${colors.accent};
    border-radius: 50%;
    box-shadow: 0 0 20px ${colors.accent};
  }

  @media (max-width: ${breakpoints.tablet}) {
    left: 30px;
  }
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 6rem;
  display: flex;
  align-items: center;
  
  &:nth-child(odd) .timeline-content {
    margin-left: auto;
    margin-right: 3rem;
    text-align: right;
    
    .timeline-card {
      transform-origin: right center;
    }
  }
  
  &:nth-child(even) .timeline-content {
    margin-right: auto;
    margin-left: 3rem;
    text-align: left;
    
    .timeline-card {
      transform-origin: left center;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    &:nth-child(odd) .timeline-content,
    &:nth-child(even) .timeline-content {
      margin-left: 4rem;
      margin-right: 0;
      text-align: left;
      
      .timeline-card {
        transform-origin: left center;
      }
    }
  }
`;

const TimelineContent = styled.div`
  width: 45%;
  position: relative;

  @media (max-width: ${breakpoints.tablet}) {
    width: calc(100% - 5rem);
  }
`;

const TimelineCard = styled.div`
  background: linear-gradient(135deg, ${colors.subtle} 0%, rgba(26, 26, 26, 0.8) 100%);
  border: 1px solid rgba(0, 191, 255, 0.2);
  border-radius: 15px;
  padding: 2rem;
  position: relative;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  min-width: 350px;
  max-width: 450px;
  
  &:hover {
    transform: translateY(-5px);
    border-color: ${colors.accent};
    box-shadow: 0 20px 40px rgba(0, 191, 255, 0.1);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    width: 0;
    height: 0;
    border: 15px solid transparent;
    
    ${TimelineItem}:nth-child(odd) & {
      right: -30px;
      border-left-color: rgba(0, 191, 255, 0.2);
      transform: translateY(-50%);
    }
    
    ${TimelineItem}:nth-child(even) & {
      left: -30px;
      border-right-color: rgba(0, 191, 255, 0.2);
      transform: translateY(-50%);
    }

    @media (max-width: ${breakpoints.tablet}) {
      ${TimelineItem}:nth-child(odd) &,
      ${TimelineItem}:nth-child(even) & {
        left: -30px;
        right: auto;
        border-right-color: rgba(0, 191, 255, 0.2);
        border-left-color: transparent;
        transform: translateY(-50%);
      }
    }
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, ${colors.accent}, #0080cc);
  border: 4px solid ${colors.background};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 0 30px rgba(0, 191, 255, 0.5);
  
  svg {
    font-size: 1.5rem;
    color: white;
  }

  @media (max-width: ${breakpoints.tablet}) {
    left: 30px;
    width: 50px;
    height: 50px;
    
    svg {
      font-size: 1.2rem;
    }
  }
`;

const DegreeTitle = styled.h3`
  font-family: ${fonts.heading};
  font-size: clamp(1.8rem, 4vw, 2.2rem);
  color: ${colors.text};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: ${colors.accent};
    font-size: 1.5rem;
  }
`;

const Institution = styled.h4`
  color: ${colors.accent};
  font-family: ${fonts.body};
  font-size: clamp(1.2rem, 3vw, 1.4rem);
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ScoreContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const Score = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 191, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid rgba(0, 191, 255, 0.3);
  
  svg {
    color: ${colors.accent};
    font-size: 1rem;
  }
  
  span {
    color: ${colors.text};
    font-weight: 600;
    font-size: 1rem;
  }
`;

const Year = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #a8b2d1;
  font-size: 1rem;
  
  svg {
    color: ${colors.accent};
  }
`;

const Education = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(sectionRef.current.querySelector('h2'), {
        scrollTrigger: { 
          trigger: sectionRef.current, 
          start: "top 80%" 
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      });

      // Timeline path animation
      gsap.from(timelineRef.current, {
        scrollTrigger: { 
          trigger: timelineRef.current, 
          start: "top 70%" 
        },
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.5,
        ease: 'power3.out',
      });

      // Timeline items animation
      const items = sectionRef.current.querySelectorAll('.timeline-item');
      items.forEach((item, index) => {
        gsap.from(item.querySelector('.timeline-card'), {
          scrollTrigger: { 
            trigger: item, 
            start: "top 85%" 
          },
          opacity: 0,
          scale: 0.8,
          y: 50,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'back.out(1.7)',
        });

        gsap.from(item.querySelector('.timeline-dot'), {
          scrollTrigger: { 
            trigger: item, 
            start: "top 85%" 
          },
          opacity: 0,
          scale: 0,
          duration: 0.6,
          delay: index * 0.2 + 0.3,
          ease: 'back.out(1.7)',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <EducationSection ref={sectionRef} id="education">
      <SectionTitle>ACADEMIC <span>JOURNEY</span></SectionTitle>
      <TimelineContainer>
        <TimelinePath ref={timelineRef} />
        {educationData.map((edu, index) => (
          <TimelineItem key={index} className="timeline-item">
            <TimelineContent className="timeline-content">
              <TimelineCard className="timeline-card">
                <DegreeTitle>
                  <FaGraduationCap />
                  {edu.degree}
                </DegreeTitle>
                <Institution>{edu.institution}</Institution>
                <ScoreContainer>
                  <Score>
                    <FaTrophy />
                    <span>{edu.score}</span>
                  </Score>
                  <Year>
                    <FaCalendarAlt />
                    {edu.year}
                  </Year>
                </ScoreContainer>
              </TimelineCard>
            </TimelineContent>
            <TimelineDot className="timeline-dot">
              <FaGraduationCap />
            </TimelineDot>
          </TimelineItem>
        ))}
      </TimelineContainer>
    </EducationSection>
  );
};

export default Education;

