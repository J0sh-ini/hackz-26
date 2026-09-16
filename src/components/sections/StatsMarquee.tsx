import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS_ITEMS = [
  'PRIZE POOL: ₹1,70,000',
  'TEAM SIZE: 2–4 MEMBERS',
  'DURATION: 24 HOURS',
  'VENUE: CEG CAMPUS, CHENNAI',
  'ROUND 1: FREE ENTRY',
  'STATUS: REGISTRATIONS OPEN',
  'ORGANIZER: CSEA-CEG',
  'FORMAT: HYBRID MARATHON',
];

export const StatsMarquee: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const row = marquee.querySelector('.marquee-content') as HTMLElement;
    if (!row) return;

    let xPos = 0;
    const baseSpeed = 1.2;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const deltaY = Math.abs(currentY - lastScrollY);
      scrollVelocity = Math.min(deltaY * 0.4, 15);
      lastScrollY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const updateTicker = (_time: number, deltaTime: number) => {
      const totalWidth = row.scrollWidth / 2;
      if (totalWidth <= 0) return;

      const deltaMultiplier = Math.min(deltaTime / 16.666, 2.5);
      xPos -= (baseSpeed + scrollVelocity) * deltaMultiplier;

      // Smooth decay of scroll velocity back to 0
      scrollVelocity *= 0.92;
      if (scrollVelocity < 0.01) scrollVelocity = 0;

      if (Math.abs(xPos) >= totalWidth) {
        xPos %= totalWidth;
      }

      gsap.set(row, { x: xPos });
    };

    gsap.ticker.add(updateTicker);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      gsap.ticker.remove(updateTicker);
    };
  }, []);

  return (
    <div
      ref={marqueeRef}
      style={{
        width: '100%',
        backgroundColor: 'var(--bg-deep-green)',
        borderTop: '1px solid var(--border-green-dim)',
        borderBottom: '1px solid var(--border-green-dim)',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 20,
        paddingTop: '12px',
        paddingBottom: '12px',
        userSelect: 'none',
      }}
    >
      <div
        className="marquee-content"
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          width: 'max-content',
        }}
      >
        {/* Render twice for infinite loop */}
        {[0, 1].map((copyIndex) => (
          <div
            key={copyIndex}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              paddingRight: '24px',
            }}
          >
            {STATS_ITEMS.map((stat, idx) => (
              <span
                key={idx}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(11px, 2vw, 13px)',
                  color: 'var(--accent-green)',
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                }}
              >
                <span style={{ color: 'var(--accent-green-dim)', fontSize: '10px' }}>
                  &#9670;
                </span>
                <span>{stat}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
