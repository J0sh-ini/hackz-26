import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { NoiseOverlay } from './components/ambient/NoiseOverlay';
import { NodeNetwork } from './components/ambient/NodeNetwork';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { StatsMarquee } from './components/sections/StatsMarquee';
import { About } from './components/sections/About';
import { Tracks } from './components/sections/Tracks';
import { Sponsors } from './components/sections/Sponsors';
import { Prizes } from './components/sections/Prizes';
import { Timeline } from './components/sections/Timeline';
import { GetInvolved } from './components/sections/GetInvolved';
import { Faq } from './components/sections/Faq';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';

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
      <NoiseOverlay />

      {/* Ambient Floating Cyber Node Network */}
      <NodeNetwork opacity={0.3} />

      {/* Persistent Navigation Bar */}
      <Navbar />

      {/* Main Content Layout */}
      <main>
        {/* [01] Hero Section */}
        <Hero />

        {/* [02] Marquee Stats Strip */}
        <StatsMarquee />

        {/* [03] About Section */}
        <About />

        {/* Terminal Divider
        <div className="w-full max-w-[1200px] mx-auto px-6 max-md:px-4">
          <SectionDivider label="TRACKS PROTOCOL" />
        </div> */}

        {/* [04] Mission Tracks */}
        <Tracks />

        {/* Terminal Divider
        <div className="w-full max-w-[1200px] mx-auto px-6 max-md:px-4">
          <SectionDivider label="STRATEGIC PARTNERS" />
        </div> */}

        {/* [05] Sponsors */}
        <Sponsors />

        {/* [06] Prizes Bounty */}
        <Prizes />

        {/* [07] Sequence of Events Timeline */}
        <Timeline />

        {/* Terminal Divider
        <div className="w-full max-w-[1200px] mx-auto px-6 max-md:px-4">
          <SectionDivider label="DEPLOYMENT FORCES" />
        </div> */}

        {/* [08] Get Involved CTAs */}
        <GetInvolved />

        {/* Terminal Divider
        <div className="w-full max-w-[1200px] mx-auto px-6 max-md:px-4">
          <SectionDivider label="KNOWLEDGE BASE" />
        </div> */}

        {/* [09] FAQs Accordion */}
        <Faq />

        {/* Terminal Divider
        <div className="w-full max-w-[1200px] mx-auto px-6 max-md:px-4">
          <SectionDivider label="TRANSMISSION LINKS" />
        </div> */}

        {/* [10] Contact & Socials */}
        <Contact />
      </main>

      {/* [11] Footer */}
      <Footer />
    </div>
  );
};
