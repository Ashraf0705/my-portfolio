// src/components/Certifications.js
'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { certificationsData, achievementsData } from '@/data/credentials';
import { colors, fonts } from '@/styles/theme';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CertsSection = styled.section`
  max-width: 1100px;
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

const SubSection = styled.div`
  margin-bottom: 5rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Subtitle = styled.h3`
  font-family: ${fonts.heading};
  font-size: 2.2rem;
  color: #ccd6f6;
  margin-bottom: 2.5rem;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  background: linear-gradient(145deg, #1a1a1a, #111111);
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #2a2a2a;
  box-shadow: 0 4px 15px rgba(0,0,0,0.5);
  transition: all 0.3s ease;
  
  // --- THE CORE FIX: NO MORE OPACITY IN CSS ---
  // The animation will handle the entrance.

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 25px rgba(0, 191, 255, 0.1);
    border-color: ${colors.accent};
  }
`;

const CardTitle = styled.p`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 1.3rem;
  color: #f5f5f5;
  margin-bottom: 0.75rem;
`;

const CardInfo = styled.p`
  font-family: ${fonts.body};
  color: #a8b2d1;
  font-size: 1rem;
  line-height: 1.6;
`;

const Certifications = () => {
  const sectionRef = useRef(null);

  // --- THE UNBREAKABLE ANIMATION LOGIC ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set the initial state of the cards to be invisible
      gsap.set(".cert-card", { opacity: 0, y: 50 });

      ScrollTrigger.batch(".cert-card", {
        start: "top 85%",
        onEnter: batch => gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          overwrite: true
        }),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <CertsSection ref={sectionRef}>
      <SectionTitle>Recognition <span>&</span> Achievements</SectionTitle>
      <SubSection>
        <Subtitle>Certifications</Subtitle>
        <Grid>
          {certificationsData.map((cert, i) => (
            <Card key={i} className="cert-card">
              <CardTitle>{cert.name}</CardTitle>
              <CardInfo>Issuer: {cert.issuer}</CardInfo>
            </Card>
          ))}
        </Grid>
      </SubSection>
      <SubSection>
        <Subtitle>Achievements and Club</Subtitle>
        <Grid>
          {achievementsData.map((ach, i) => (
            <Card key={i} className="cert-card">
              <CardTitle>{ach.name}</CardTitle>
              <CardInfo>{ach.event}</CardInfo>
              <CardInfo style={{ marginTop: '0.5rem', opacity: 0.8 }}>{ach.description}</CardInfo>
            </Card>
          ))}
        </Grid>
      </SubSection>
    </CertsSection>
  );
};

export default Certifications;