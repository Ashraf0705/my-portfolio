'use client';

import InteractiveBackground from '@/components/InteractiveBackground';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import SkillsClient from '@/components/SkillsClient';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import ContactClient from '@/components/ContactClient';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <InteractiveBackground />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <SkillsClient />
        <Projects />
        <Certifications />
        <ContactClient />
        <Footer />
      </main>
    </>
  );
}
