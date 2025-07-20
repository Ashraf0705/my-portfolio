// src/components/Projects.js
'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { projectsData } from '@/data/projects';
import { colors, fonts, breakpoints } from '@/styles/theme';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = styled.section`
  padding: 100px 2rem 150px;
`;

const SectionTitle = styled.h2`
  font-family: ${fonts.heading};
  font-size: clamp(3rem, 10vw, 4.5rem);
  color: ${colors.text};
  text-align: center;
  margin-bottom: 6rem;
  span { color: ${colors.accent}; }
`;

const ProjectItem = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  gap: 2rem;
  margin-bottom: 10rem;

  &:last-child { margin-bottom: 0; }

  &:nth-child(even) {
    .project-image { order: 2; }
    .project-content { order: 1; text-align: left; }
    // Fix for even items to align links left
    .project-links, .tech-stack-container { align-items: flex-start; }
  }

  @media (max-width: ${breakpoints.desktop}) {
    grid-template-columns: 1fr;
    .project-image, .project-content {
      order: unset !important;
      text-align: left !important;
    }
    // Fix for mobile to align links left
    .project-links, .tech-stack-container { align-items: flex-start !important; }
  }
`;

const ImageContainer = styled.a`
  position: relative;
  display: block;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 20px 30px -15px rgba(0,0,0,0.7);
  transition: all 0.3s ease;
  background: ${colors.accent};

  img {
    width: 100%;
    height: auto;
    vertical-align: middle;
    mix-blend-mode: multiply;
    filter: grayscale(100%) contrast(1);
    transition: all 0.4s ease;
  }
  
  &:hover img {
    mix-blend-mode: normal;
    filter: grayscale(0%) contrast(1);
  }
`;

const ContentContainer = styled.div`
  text-align: right; 
`;

const ProjectType = styled.p`
  color: ${colors.accent};
  font-family: ${fonts.heading};
  font-size: 1.1rem;
`;

const ProjectTitle = styled.h3`
  font-family: ${fonts.heading};
  font-size: clamp(2.2rem, 4vw, 2.8rem);
  margin: 0.25rem 0 1.5rem;
  color: #ccd6f6;
`;

const Summary = styled.div`
  background-color: ${colors.subtle};
  padding: 1.5rem;
  border-radius: 5px;
  font-size: 1.2rem;
  line-height: 1.7;
  color: #a8b2d1;
  box-shadow: 0 10px 30px -15px rgba(0,0,0,0.7);
  margin-bottom: 1.5rem;
  text-align: left;
`;

const FeaturesList = styled.ul`
  list-style-type: none;
  font-size: 1.15rem;
  line-height: 1.8;
  margin: 1.5rem 0;
  padding: 0;
  
  li {
    margin-bottom: 0.75rem;
    position: relative;
    padding-left: 25px;
    text-align: left;

    &::before {
      content: '▹';
      position: absolute;
      left: 0;
      color: ${colors.accent};
      font-size: 1.4rem;
      line-height: 1;
    }
  }
`;

// --- THE SURGICAL FIX ---
const TechStackContainer = styled.div`
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: inherit; // Inherit alignment from parent
`;

const StackHeader = styled.h4`
  font-family: ${fonts.heading};
  font-size: 1rem;
  color: ${colors.accent};
  margin-bottom: 0.75rem;
`;

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const Tag = styled.li`
  font-family: ${fonts.body};
  font-size: 0.9rem;
  color: #a8b2d1;
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  align-items: center;
  justify-content: inherit; // Inherit alignment from parent
`;

const ProjectLink = styled.a`
  color: #ccd6f6;
  font-size: 1.5rem;
  transition: color 0.3s ease;
  &:hover { color: ${colors.accent}; }
`;

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // GSAP animations
    const projectItems = sectionRef.current.querySelectorAll('.project-item');
    projectItems.forEach(item => {
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: "top 85%" },
        opacity: 0, y: 100, duration: 0.8, ease: 'power3.out'
      });
    });
  }, []);

  return (
    <ProjectsSection ref={sectionRef}>
      <SectionTitle>The <span>Proof</span></SectionTitle>
      <div>
        {projectsData.map((project, index) => (
          <ProjectItem key={index} className="project-item">
            <ImageContainer href={project.liveUrl !== '#' ? project.liveUrl : project.codeUrl} target="_blank" rel="noopener noreferrer" className="project-image">
              <Image src={project.image} alt={project.title} width={600} height={370} />
            </ImageContainer>

            <ContentContainer className="project-content">
              <ProjectType>Featured Project</ProjectType>
              <ProjectTitle>{project.title}</ProjectTitle>
              <Summary><p>{project.summary}</p></Summary>
              <FeaturesList>
                {project.features.map(feature => <li key={feature}>{feature}</li>)}
              </FeaturesList>
              
              <TechStackContainer className="tech-stack-container">
                <StackHeader>Tech Stack</StackHeader>
                <TagList>
                  {project.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                </TagList>
              </TechStackContainer>

              <LinksContainer className="project-links">
                {project.liveUrl !== '#' && <ProjectLink href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo"><FaExternalLinkAlt /></ProjectLink>}
                {project.codeUrl !== '#' && <ProjectLink href={project.codeUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Code"><FaGithub /></ProjectLink>}
              </LinksContainer>
            </ContentContainer>
          </ProjectItem>
        ))}
      </div>
    </ProjectsSection>
  );
};

export default Projects;