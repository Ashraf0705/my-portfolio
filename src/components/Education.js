// src/components/Education.js
'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { educationData } from '@/data/credentials'; 
import { colors, fonts, breakpoints } from '@/styles/theme';
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
  span { color: ${colors.accent}; }
`;

// --- THE DEFINITIVE, UNBREAKABLE LAYOUT ENGINE ---
const TimelineWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8rem; // Spacing between nodes
`;

const SVGContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
`;

const SVGPath = styled.path`
  stroke: ${colors.accent};
  stroke-width: 2.5;
  fill: none;
  filter: drop-shadow(0 0 10px ${colors.accent});
`;

const TimelineNode = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr; // Left | Center | Right
  gap: 2rem;
  align-items: center;
  width: 100%;
  position: relative;
`;

const NodeContent = styled.div`
  // The Alternating Logic, perfected
  ${TimelineNode}:nth-child(odd) & { 
    grid-column: 1 / 2;
    text-align: right;
  }
  ${TimelineNode}:nth-child(even) & { 
    grid-column: 3 / 4;
    text-align: left;
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-column: 1 / -1 !important; // Full width on mobile
    text-align: center !important;
    margin-top: 2rem;
  }
`;

const NodeDot = styled.div`
  grid-column: 2 / 3; // Always in the center column
  grid-row: 1 / 2;
  width: 24px;
  height: 24px;
  background-color: ${colors.accent};
  border-radius: 50%;
  box-shadow: 0 0 20px ${colors.accent}, 0 0 30px ${colors.accent};
  z-index: 1;

  @media (max-width: ${breakpoints.tablet}) {
    grid-column: 1 / -1; // Center dot on top for mobile
    margin: 0 auto;
  }
`;

const Degree = styled.h3`
  font-family: ${fonts.heading};
  font-size: clamp(2.4rem, 5vw, 3.2rem);
  color: #ccd6f6;
  margin-bottom: 0.5rem;
  white-space: nowrap; // Prevents "AI & DS" from breaking
`;
const Institution = styled.p`
  color: #a8b2d1;
  font-size: clamp(1.6rem, 4vw, 2rem);
  font-weight: 700;
  margin-bottom: 1rem;
`;
const Score = styled.p`
  color: ${colors.accent};
  font-family: ${fonts.body}; // Using clearer font for numbers
  font-weight: 700;
  font-size: clamp(1.3rem, 3vw, 1.5rem);
  margin-bottom: 0.5rem;
`;
const Year = styled.p`
  color: #a8b2d1;
  font-family: ${fonts.body}; // Using clearer font for numbers
  font-size: clamp(1.1rem, 3vw, 1.3rem);
`;

const Education = () => {
  const sectionRef = useRef(null);
  const svgPathRef = useRef(null);
  const nodeRefs = useRef([]);

  useEffect(() => {
    const path = svgPathRef.current;
    if (!path) return;
    
    // --- The Robust Path Calculation ---
    const updatePath = () => {
      let d = "";
      const wrapperRect = sectionRef.current.getBoundingClientRect();
      const nodes = nodeRefs.current.filter(n => n);

      nodes.forEach((node, i) => {
        const dot = node.querySelector('.timeline-dot');
        if (!dot) return;
        const dotRect = dot.getBoundingClientRect();
        const x = dotRect.left - wrapperRect.left + dotRect.width / 2;
        const y = dotRect.top - wrapperRect.top + dotRect.height / 2;

        if (i === 0) {
          d += `M ${x} ${y}`;
        } else {
          const prevDot = nodes[i-1].querySelector('.timeline-dot');
          if (!prevDot) return;
          const prevDotRect = prevDot.getBoundingClientRect();
          const prevY = prevDotRect.top - wrapperRect.top + prevDotRect.height / 2;
          const cpy = (y + prevY) / 2;
          d += ` C ${x} ${cpy}, ${x} ${cpy}, ${x} ${y}`;
        }
      });

      path.setAttribute("d", d);
      const pathLength = path.getTotalLength();
      path.style.strokeDasharray = pathLength;
      path.style.strokeDashoffset = pathLength;
    };
    
    const timeoutId = setTimeout(updatePath, 100);
    window.addEventListener('resize', updatePath);

    const ctx = gsap.context(() => {
      // The Restored Scroll-Driven Animation
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom bottom",
          scrub: 1.5,
          onUpdate: self => { if (self.progress > 0) path.style.display = 'block'; },
        }
      });

      const items = sectionRef.current.querySelectorAll('.node-content');
      items.forEach(item => {
        gsap.from(item, {
          opacity: 0, y: 50, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none reverse" }
        });
      });
    }, sectionRef);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updatePath);
      ctx.revert();
    }
  }, []);

  return (
    <EducationSection ref={sectionRef}>
      <SectionTitle>ACADEMIC <span>JOURNEY</span></SectionTitle>
      <SVGContainer>
          <svg width="100%" height="100%" preserveAspectRatio="none">
              <SVGPath ref={svgPathRef} style={{display: 'none'}}/>
          </svg>
      </SVGContainer>
      <TimelineWrapper>
        {educationData.map((edu, index) => (
          <TimelineNode key={index} ref={el => nodeRefs.current[index] = el}>
            <NodeContent>
              <Degree>{edu.degree}</Degree>
              <Institution>{edu.institution}</Institution>
              <Score>{edu.score}</Score>
              <Year>{edu.year}</Year>
            </NodeContent>
            <NodeDot className="timeline-dot" />
            <NodeContent /> {/* This empty div ensures the grid stays balanced */}
          </TimelineNode>
        ))}
      </TimelineWrapper>
    </EducationSection>
  );
};

export default Education;