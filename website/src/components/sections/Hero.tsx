import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MatrixCanvas } from '../ambient/MatrixCanvas';
import { Scanlines } from '../ambient/Scanlines';
import { BlinkingCursor } from '../ambient/BlinkingCursor';
import { Button } from '../ui/Button';
import { GlitchText } from '../ui/GlitchText';
import { EVENT_LINKS } from '../../data/contact';

export const Hero: React.FC = () => {
  const [isGlitching, setIsGlitching] = useState<boolean>(true);

  useEffect(() => {
    let burstTimer: ReturnType<typeof setTimeout> | null = null;

    // Initial glitch burst on page load (850ms)
    const initialTimer = setTimeout(() => {
      setIsGlitching(false);
    }, 850);

    // Auto-glitch burst every 10 seconds
    const interval = setInterval(() => {
      setIsGlitching(true);
      if (burstTimer) clearTimeout(burstTimer);
      burstTimer = setTimeout(() => {
        setIsGlitching(false);
      }, 900);
    }, 10000);

    return () => {
      clearTimeout(initialTimer);
      if (burstTimer) clearTimeout(burstTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-page)',
        paddingTop: 'var(--header-height)',
        paddingBottom: '40px',
      }}
    >
      {/* Background Matrix Rain */}
      <MatrixCanvas opacity={0.65} />

      {/* Scanline Overlay & CRT Vignette */}
      <Scanlines opacity={0.22} />
      <div className="crt-vignette" />

      {/* Hero Content Stack */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '900px',
        }}
      >
        {/* Top Monospace Label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            color: 'var(--accent-green)',
            letterSpacing: '0.18em',
            marginBottom: '16px',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          <span>// CSEA-CEG PRESENTS</span>
          <BlinkingCursor />
        </motion.div>

        {/* Massive HackZ Wordmark with React Bits GlitchText */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            marginBottom: '14px',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <GlitchText
            as="h1"
            speed={0.25}
            enableShadows={true}
            enableOnHover={!isGlitching}
            className="hero-glitch-wordmark"
            style={{
              fontSize: 'clamp(54px, 14vw, 150px)',
              lineHeight: 0.95,
              margin: 0,
              fontFamily: 'var(--font-display)',
              color: 'var(--accent-green)',
              letterSpacing: '0.02em',
            }}
          >
            HACKZ
          </GlitchText>
        </motion.div>

        {/* Official Motto / Creed with Electric Color Accents */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(14px, 2.8vw, 18px)',
            fontWeight: 800,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginBottom: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            textShadow: '0 0 12px rgba(0, 0, 0, 0.8)',
          }}
        >
          <span style={{ color: 'var(--accent-orange)', textShadow: '0 0 10px rgba(255, 107, 0, 0.4)' }}>Zap.</span>
          <span style={{ color: 'var(--accent-purple)', textShadow: '0 0 10px rgba(176, 38, 255, 0.4)' }}>Zen.</span>
          <span style={{ color: 'var(--accent-amber)', textShadow: '0 0 10px rgba(245, 166, 35, 0.4)' }}>Zest.</span>
          <span style={{ color: 'var(--accent-green)', textShadow: '0 0 10px rgba(0, 255, 65, 0.4)' }}>HackZ</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(15px, 3vw, 22px)',
            fontWeight: 500,
            color: 'var(--text-primary)',
            opacity: 0.75,
            letterSpacing: '0.02em',
            maxWidth: '650px',
            marginBottom: '28px',
          }}
        >
          24-Hour National Tech Marathon: Innovate, Create, Dominate!
        </motion.p>

        {/* Date / Venue Sharp Pill */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 20px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-default)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(11px, 2.5vw, 13px)',
            color: 'var(--text-primary)',
            letterSpacing: '0.08em',
            marginBottom: '36px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>
            NOV 23–24, 2024
          </span>
          <span style={{ color: 'var(--text-secondary)' }}>&middot;</span>
          <span>CEG CAMPUS, ANNA UNIVERSITY</span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Button
            variant="primary"
            href={EVENT_LINKS.registration}
            isExternal
            className="hero-cta-btn"
          >
            [ REGISTER NOW ]
          </Button>

          <Button
            variant="outline"
            href="#about"
            className="hero-sub-btn"
          >
            EXPLORE DETAILS ↓
          </Button>
        </motion.div>
      </div>

      {/* Pulsing Scroll Down Indicator
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.9, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.5, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--accent-green)',
          letterSpacing: '0.1em',
          userSelect: 'none',
          cursor: 'pointer',
          textDecoration: 'none',
        }}
      >
        <span>SCROLL</span>
        <span style={{ fontSize: '14px' }}>↓</span>
      </motion.a> */}
    </section>
  );
};
