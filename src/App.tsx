import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import VolunteerForm from './components/pages/VolunteerForm';
gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  useEffect(() => {
    // Only init Lenis on non-touch devices or where appropriate
    const isMobile = window.innerWidth < 768;

    const lenis = new Lenis({
      duration: isMobile ? 0.9 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
    });

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
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: 'var(--bg-page)' }}>
      {/* Global Grain Texture Overlay */}
      {/* <NoiseOverlay /> */}

      {/* Ambient Floating Cyber Node Network */}

      {/* Persistent Navigation Bar */}
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/volunteer" element={<VolunteerForm />} />
        </Routes>
      <Footer />
      </BrowserRouter>
      
      {/* [11] Footer */}
    </div>
  );
};
