import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import VolunteerForm from './components/pages/VolunteerForm';
import MentorForm from './components/pages/MentorForm';
import { VideoLoader } from './components/LoadingScreen/VideoLoader';
gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      lenisRef.current?.stop();
    } else {
      document.body.style.overflow = '';
      lenisRef.current?.start();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  useEffect(() => {
    // Only init Lenis on non-touch devices or where appropriate

    const lenis = new Lenis({
      duration: isMobile ? 0.9 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
    });
    lenisRef.current = lenis;

    if (isLoading) {
      lenis.stop();
    }

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    lenis.on('scroll', ScrollTrigger.update);

    // Global in-page smooth scroll interceptor for all hash links and CTAs
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement, {
            offset: -64,
            duration: 1.2,
          });
          window.history.pushState(null, '', href);
        }
      } else if (href === '#') {
        e.preventDefault();
        lenis.scrollTo(0, { duration: 1.2 });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: 'var(--bg-page)' }}>
      {/* Video Loading Screen — swap src when you have the file */}
      {isLoading && (
        <VideoLoader
          src={isMobile ? '/loader3.mp4' : '/short.mp4'}
          onComplete={() => setIsLoading(false)}
          fadeDuration={900}
          maxDuration={8000}
          isMobile={isMobile}
        />
      )}

      {/* Global Grain Texture Overlay */}
      {/* <NoiseOverlay /> */}

      {/* Ambient Floating Cyber Node Network */}

      {/* Persistent Navigation Bar */}
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/volunteer" element={<VolunteerForm />} />
          <Route path="/mentor" element={<MentorForm />} />
        </Routes>
      <Footer />
      </BrowserRouter>
      
      {/* [11] Footer */}
    </div>
  );
};
