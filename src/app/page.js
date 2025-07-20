// src/app/page.js
import Hero from '@/components/Hero';
import About from '@/components/About';
import Education from '@/components/Education'; // New
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications'; // New
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      {/* 1. NAME */}
      <Hero />
      {/* 2. ABOUT SECTION WITH IMAGE */}
      <About />
      {/* 3. EDUCATION */}
      <Education />
      {/* 4. EXPERIENCE */}
      <Experience />
      {/* 5. SKILLS */}
      <Skills />
      {/* 6. PROJECTS */}
      <Projects />
      {/* 7. CERTIFICATIONS & ACHIEVEMENTS */}
      <Certifications />
      {/* 8. COLLABORATION / CONTACT */}
      <Contact />
      <Footer />
    </main>
  );
}