// src/components/Experience.js
'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { experienceData } from '@/data/experience';
import { colors, fonts } from '@/styles/theme';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 100px 2rem;
`;

const SectionTitle = styled.h2`
  font-family: ${fonts.heading};
  font-size: clamp(3rem, 10vw, 4.5rem);
  color: ${colors.text};
  text-align: center;
  margin-bottom: 5rem;
  span { color: ${colors.accent}; }
`;

const TimelineContainer = styled.div`
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 15px;
    height: 100%;
    width: 2px;
    background-color: ${colors.subtle};
  }
`;

const TimelineItem = styled.div`
  position: relative;
  padding-left: 50px;
  margin-bottom: 50px;
  &:last-child { margin-bottom: 0; }
`;

const TimelineDot = styled.div`
  position: absolute;
  top: 5px;
  left: 0;
  width: 32px;
  height: 32px;
  background-color: ${colors.background};
  border: 2px solid ${colors.accent};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
  color: ${colors.accent};
`;

const TimelineContent = styled.div`
  background-color: ${colors.subtle};
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #2a2a2a;
`;

const RoleTitle = styled.h3`
  font-family: ${fonts.heading};
  font-size: 1.5rem;
  color: #ccd6f6;
  span {
    color: ${colors.accent};
    font-size: 1.6rem;
  }
`;

const Duration = styled.p`
  color: #8892b0;
  font-size: 0.9rem;
  margin: 0.5rem 0 1.5rem;
`;

const ResponsibilitiesList = styled.ul`
  list-style: none;
  font-size: 1.05rem;
  line-height: 1.8;
  li {
    margin-bottom: 0.75rem;
    position: relative;
    padding-left: 25px;
    &::before {
      content: '▹'; position: absolute; left: 0;
      color: ${colors.accent}; font-size: 1.2rem; line-height: 1;
    }
  }
`;

const Experience = () => {
  const sectionRef = useRef(null);

  // Inside the Experience component
useEffect(() => {
    const ctx = gsap.context(() => {
        const items = sectionRef.current.querySelectorAll('.timeline-item');
        gsap.from(items, {
            scrollTrigger: { 
                trigger: sectionRef.current, 
                start: "top 75%" 
            },
            opacity: 0,
            x: -50,
            duration: 0.8,
            stagger: 0.2, // Stagger the animation of each item
            ease: 'power3.out',
        });
    }, sectionRef);
    return () => ctx.revert();
}, []);
  return (
    <ExperienceSection ref={sectionRef}>
      <SectionTitle>MY<span>Experience</span></SectionTitle>
      <TimelineContainer>
        {experienceData.map((exp, index) => (
          <TimelineItem key={index} className="timeline-item">
            <TimelineDot>{index + 1}</TimelineDot>
            <TimelineContent>
              <RoleTitle>{exp.role} <span>@ {exp.company}</span></RoleTitle>
              <Duration>{exp.duration}</Duration>
              <ResponsibilitiesList>
                {exp.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
              </ResponsibilitiesList>
            </TimelineContent>
          </TimelineItem>
        ))}
      </TimelineContainer>
    </ExperienceSection>
  );
};

export default Experience;