'use client';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import VideoIntro from '../components/VideoIntro';
import About from '../components/About';
import Skills from '../components/Skills';
import Certifications from '../components/Certifications';
import Projects from '../components/Projects';
import DailyActivity from '../components/DailyActivity';
import Education from '../components/Education';
import Contact from '../components/Contact';
import MatrixRain from '../components/MatrixRain';
import ResumeModal from '../components/ResumeModal';

export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <>
      {/* Subtle global matrix rain texture */}
      <MatrixRain opacity={0.035} />

      {/* Navigation */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      <main>
        {/* Hero — fullscreen cinematic video */}
        <VideoIntro
          eyebrow="Ethical Hacker & Cybersecurity Enthusiast"
          firstName="Madan"
          lastName="Prasath"
          subtitle="Breaking systems ethically to make the digital world safer. CEH certified • ISC2 Candidate • Hack2Hire achiever."
          videoSrc="/videos/madan-intro.mp4"
          nextSectionId="about"
        />

        {/* Portfolio sections */}
        <About />
        <div className="divider" />
        <Skills />
        <div className="divider" />
        <Certifications />
        <div className="divider" />
        <Projects />
        <div className="divider" />
        <DailyActivity />
        <div className="divider" />
        <Education />
        <div className="divider" />
        <Contact />
      </main>

      {/* Resume modal for HR/recruiter print and PDF generation */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </>
  );
}
