// src/components/Skills.js
'use client';

import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { skillsData } from '@/data/skills';
import { colors, fonts, breakpoints } from '@/styles/theme';
import { FaPython, FaJava, FaReact, FaNodeJs, FaDocker, FaGitAlt, FaHtml5, FaCss3Alt, FaJsSquare } from 'react-icons/fa';
import { SiExpress, SiDjango, SiPostgresql, SiMysql, SiVercel, SiKeras, SiScikitlearn, SiPandas, SiNumpy } from 'react-icons/si';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- NEW: FALLBACK ICON COMPONENT ---
const FallbackIconContainer = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${fonts.heading};
  font-size: 1.5rem;
  color: ${colors.accent};
  border: 2px solid ${colors.accent};
  border-radius: 50%;
`;

const FallbackIcon = ({ text }) => (
  <FallbackIconContainer>{text.charAt(0)}</FallbackIconContainer>
);

// --- UPDATED: ICON MAP ---
const iconMap = {
  Python: <FaPython />, Java: <FaJava />, 'React.js': <FaReact />, 'Node.js': <FaNodeJs />,
  Docker: <FaDocker />, Git: <FaGitAlt />, 'Express.js': <SiExpress />, Django: <SiDjango />,
  PostgreSQL: <SiPostgresql />, MySQL: <SiMysql />, Vercel: <SiVercel />,
  HTML5: <FaHtml5 />, CSS3: <FaCss3Alt />, JavaScript: <FaJsSquare />,
  // Add new icons if available, otherwise they will use the fallback
  Keras: <SiKeras />, 'Scikit-learn': <SiScikitlearn />, Pandas: <SiPandas />, Numpy: <SiNumpy />,
};

const SkillsSection = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 2rem 150px;
`;

const SectionTitle = styled.h2`
  font-family: ${fonts.heading};
  font-size: clamp(3rem, 10vw, 4.5rem);
  color: ${colors.text};
  text-align: center;
  margin-bottom: 4rem;
  span { color: ${colors.accent}; }
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const TabButton = styled.button`
  font-family: ${fonts.heading};
  font-size: 1.2rem;
  padding: 10px 20px;
  cursor: pointer;
  background: none;
  border: 2px solid transparent;
  border-bottom: 2px solid ${colors.subtle};
  color: ${colors.text};
  transition: all 0.3s ease;
  opacity: 0.6;

  &:hover {
    opacity: 1;
    color: ${colors.accent};
  }

  &.active {
    opacity: 1;
    color: ${colors.accent};
    border-bottom: 2px solid ${colors.accent};
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1.5rem;
`;

const SkillCard = styled.div`
  background: ${colors.subtle};
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 15px; /* Increased gap */
  min-height: 150px; /* Ensure uniform height */
  transition: all 0.3s ease;

  svg {
    font-size: 3rem;
    color: ${colors.accent};
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 191, 255, 0.1);
    border-color: ${colors.accent};
  }
`;

const Skills = () => {
  const [activeTab, setActiveTab] = useState(skillsData[0].category);
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelector('h2'), {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0, y: 50, duration: 0.8,
      });
      gsap.from(sectionRef.current.querySelector('.tabs'), {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        opacity: 0, y: 50, duration: 0.8, delay: 0.2,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  
  useEffect(() => {
    if (gridRef.current) {
        gsap.fromTo(gridRef.current.children, 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, stagger: 0.05, duration: 0.5, ease: 'power3.out' }
        );
    }
  }, [activeTab]);

  return (
    <SkillsSection ref={sectionRef}>
      <SectionTitle>My <span>Arsenal</span></SectionTitle>
      <TabsContainer className="tabs">
        {skillsData.map(category => (
          <TabButton
            key={category.category}
            onClick={() => setActiveTab(category.category)}
            className={activeTab === category.category ? 'active' : ''}
          >
            {category.category}
          </TabButton>
        ))}
      </TabsContainer>
      <SkillsGrid ref={gridRef}>
        {skillsData
          .find(cat => cat.category === activeTab)
          .items.map(skill => (
            <SkillCard key={skill}>
              {/* --- MODIFIED LOGIC --- */}
              {iconMap[skill] ? iconMap[skill] : <FallbackIcon text={skill} />}
              <span>{skill}</span>
            </SkillCard>
          ))}
      </SkillsGrid>
    </SkillsSection>
  );
};

export default Skills;