// src/components/Certifications.js
'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { colors, fonts, breakpoints } from '@/styles/theme';
import { FaCertificate, FaTrophy, FaAward, FaStar, FaExternalLinkAlt, FaUsers } from 'react-icons/fa';

const CertificationsSection = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 2rem;
  position: relative;
  z-index: 10;
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  margin-top: 50px;
  margin-bottom: 50px;
  border: 1px solid rgba(0, 191, 255, 0.1);
`;

const SectionTitle = styled.h2`
  font-family: ${fonts.heading};
  font-size: clamp(2.5rem, 8vw, 3.5rem);
  color: ${colors.text};
  text-align: center;
  margin-bottom: 1.5rem;
  
  span { 
    color: ${colors.accent};
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, ${colors.accent}, transparent);
      border-radius: 2px;
    }
  }
`;

const SectionSubtitle = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  color: #a8b2d1;
  text-align: center;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CategoryContainer = styled.div`
  margin-bottom: 4rem;
`;

const CategoryTitle = styled.h3`
  font-family: ${fonts.heading};
  font-size: clamp(1.5rem, 4vw, 2rem);
  color: ${colors.accent};
  text-align: center;
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  
  svg {
    font-size: 1.5rem;
  }
`;

const CertificationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const CertificationCard = styled.div`
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(16, 16, 16, 0.95) 100%);
  border: 1px solid rgba(0, 191, 255, 0.3);
  border-radius: 12px;
  padding: 1.8rem;
  position: relative;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  overflow: hidden;
  opacity: 1;
  visibility: visible;
  
  &:hover {
    transform: translateY(-5px);
    border-color: ${colors.accent};
    box-shadow: 0 15px 30px rgba(0, 191, 255, 0.2);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${colors.accent}, #0080cc);
  }
`;

const CertificationHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.2rem;
`;

const CertificationIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, ${colors.accent}, #0080cc);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  svg {
    font-size: 1.3rem;
    color: white;
  }
`;

const CertificationContent = styled.div`
  flex: 1;
`;

const CertificationTitle = styled.h4`
  font-family: ${fonts.heading};
  font-size: 1.2rem;
  color: ${colors.text};
  margin-bottom: 0.4rem;
  line-height: 1.3;
`;

const CertificationIssuer = styled.p`
  color: ${colors.accent};
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const CertificationDescription = styled.p`
  color: #a8b2d1;
  font-size: 0.85rem;
  line-height: 1.5;
  margin-bottom: 1.2rem;
`;

const CertificationFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 191, 255, 0.1);
`;

const CertificationLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${colors.accent};
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    color: white;
    transform: translateX(3px);
  }
  
  svg {
    font-size: 0.7rem;
  }
`;

const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const AchievementCard = styled.div`
  background: linear-gradient(135deg, rgba(0, 191, 255, 0.1) 0%, rgba(26, 26, 26, 0.9) 100%);
  border: 2px solid rgba(0, 191, 255, 0.3);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  position: relative;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  opacity: 1;
  visibility: visible;
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    border-color: ${colors.accent};
    box-shadow: 0 20px 40px rgba(0, 191, 255, 0.25);
  }
`;

const AchievementIcon = styled.div`
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, ${colors.accent}, #0080cc);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.2rem;
  box-shadow: 0 8px 16px rgba(0, 191, 255, 0.3);
  
  svg {
    font-size: 1.8rem;
    color: white;
  }
`;

const AchievementTitle = styled.h4`
  font-family: ${fonts.heading};
  font-size: 1.3rem;
  color: ${colors.text};
  margin-bottom: 0.8rem;
`;

const AchievementDescription = styled.p`
  color: #a8b2d1;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 0.8rem;
`;

const AchievementDetails = styled.p`
  color: ${colors.accent};
  font-size: 0.8rem;
  font-weight: 600;
`;

const Certifications = () => {
  const sectionRef = useRef(null);

  const certificationsData = [
    {
      title: "Oracle OCI Generative AI",
      issuer: "Oracle",
      description: "Comprehensive certification covering Oracle Cloud Infrastructure's Generative AI services, including model deployment, fine-tuning, and enterprise AI solutions.",
      link: "#"
    },
    {
      title: "Machine Learning",
      issuer: "Stanford University",
      description: "Advanced machine learning concepts including supervised and unsupervised learning, neural networks, and practical implementation strategies.",
      link: "#"
    },
    {
      title: "Artificial Intelligence",
      issuer: "Infosys",
      description: "Enterprise-level AI certification covering AI strategy, implementation, and real-world applications in business environments.",
      link: "#"
    },
    {
      title: "Full Stack Development",
      issuer: "Matrimony.com",
      description: "Complete full-stack development certification covering modern web technologies, database design, and scalable application architecture.",
      link: "#"
    },
    {
      title: "Prompt Engineering",
      issuer: "OpenAI, Anthropic, Gemini",
      description: "Advanced prompt engineering techniques for large language models, covering optimization strategies and practical applications.",
      link: "#"
    }
  ];

  const achievementsData = [
    {
      title: "National Hackathon Finalist",
      description: "Placed among the top 10 teams out of thousands of participants nationwide.",
      details: "PrepBee HiveLive, HackVega",
      icon: <FaTrophy />
    },
    {
      title: "Active Member",
      description: "Collaborating on innovative projects with technology professionals and peers.",
      details: "Computer Society of India (CSI)",
      icon: <FaUsers />
    }
  ];

  return (
    <CertificationsSection ref={sectionRef}>
      <SectionTitle>Recognition & <span>Achievements</span></SectionTitle>
      <SectionSubtitle>
        Professional certifications and achievements that validate my expertise in cutting-edge technologies
      </SectionSubtitle>

      <CategoryContainer>
        <CategoryTitle>
          <FaCertificate />
          Certifications
        </CategoryTitle>
        <CertificationsGrid>
          {certificationsData.map((cert, index) => (
            <CertificationCard key={index} className="cert-card">
              <CertificationHeader>
                <CertificationIcon>
                  <FaCertificate />
                </CertificationIcon>
                <CertificationContent>
                  <CertificationTitle>{cert.title}</CertificationTitle>
                  <CertificationIssuer>Issuer: {cert.issuer}</CertificationIssuer>
                </CertificationContent>
              </CertificationHeader>
              <CertificationDescription>
                {cert.description}
              </CertificationDescription>
              <CertificationFooter>
                <CertificationLink href={cert.link} target="_blank" rel="noopener noreferrer">
                  View Certificate <FaExternalLinkAlt />
                </CertificationLink>
              </CertificationFooter>
            </CertificationCard>
          ))}
        </CertificationsGrid>
      </CategoryContainer>

      <CategoryContainer>
        <CategoryTitle>
          <FaAward />
          Achievements and Recognition
        </CategoryTitle>
        <AchievementsGrid>
          {achievementsData.map((achievement, index) => (
            <AchievementCard key={index} className="achievement-card">
              <AchievementIcon>
                {achievement.icon}
              </AchievementIcon>
              <AchievementTitle>{achievement.title}</AchievementTitle>
              <AchievementDescription>
                {achievement.description}
              </AchievementDescription>
              <AchievementDetails>{achievement.details}</AchievementDetails>
            </AchievementCard>
          ))}
        </AchievementsGrid>
      </CategoryContainer>
    </CertificationsSection>
  );
};

export default Certifications;

