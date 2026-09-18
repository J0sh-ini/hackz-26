import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ABOUT_PARAGRAPHS = [
  "HackZ '24 is a dynamic 24-hour hackathon initiated by CSEA that brings together the brightest minds to solve real-world challenges through technology and innovation.",
  "Open to engineering students across India, it encourages collaboration and out-of-the-box thinking, fostering an environment of continuous learning and rapid architectural prototyping.",
  "Participants work in multidisciplinary teams to solve industry-relevant problems, with the opportunity to engineer impactful solutions that can be scaled and deployed in the real world."
];

export const About: React.FC = () => {
  const statsRowRef = useRef<HTMLDivElement | null>(null);
  const [hoursVal, setHoursVal] = useState<number>(0);
  const [teamVal, setTeamVal] = useState<number>(0);
  const [prizeVal, setPrizeVal] = useState<number>(0);

  useEffect(() => {
    if (!statsRowRef.current) return;

    const statsObj = { hours: 0, team: 0, prize: 0 };

    const trigger = ScrollTrigger.create({
      trigger: statsRowRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(statsObj, {
          hours: 24,
          team: 4,
          prize: 170000,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => {
            setHoursVal(Math.floor(statsObj.hours));
            setTeamVal(Math.floor(statsObj.team));
            setPrizeVal(Math.floor(statsObj.prize));
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      id="about"
      className="py-[100px] max-md:py-16 relative"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-page)',
        borderTop: '1px solid var(--border-default)',
        overflow: 'hidden',
      }}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 max-md:px-4 relative" style={{ zIndex: 10 }}>
        {/* Two Column Layout */}
        <div
          className="grid grid-cols-[1fr_1.5fr] gap-16 items-center mb-16 max-[992px]:grid-cols-1 max-[992px]:gap-8"
        >
          {/* Left Column: Circuit Board SVG Illustration (Desktop only, fades in softly) */}
          <motion.div
            className="flex items-center justify-center relative select-none max-[992px]:hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 380 340"
              style={{
                width: '100%',
                maxWidth: '380px',
                height: 'auto',
                stroke: 'var(--accent-green)',
                fill: 'none',
              }}
            >
              {/* Central Microcontroller Package */}
              <rect x="140" y="120" width="100" height="100" strokeWidth="2.5" />
              <rect x="155" y="135" width="70" height="70" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="150" cy="130" r="3" fill="var(--accent-green)" />
              
              {/* Central IC Pinouts - Top */}
              <line x1="160" y1="120" x2="160" y2="90" strokeWidth="2" />
              <line x1="180" y1="120" x2="180" y2="70" strokeWidth="2" />
              <line x1="200" y1="120" x2="200" y2="90" strokeWidth="2" />
              <line x1="220" y1="120" x2="220" y2="70" strokeWidth="2" />

              {/* Central IC Pinouts - Bottom */}
              <line x1="160" y1="220" x2="160" y2="250" strokeWidth="2" />
              <line x1="180" y1="220" x2="180" y2="270" strokeWidth="2" />
              <line x1="200" y1="220" x2="200" y2="250" strokeWidth="2" />
              <line x1="220" y1="220" x2="220" y2="270" strokeWidth="2" />

              {/* Central IC Pinouts - Left */}
              <line x1="140" y1="140" x2="100" y2="140" strokeWidth="2" />
              <line x1="140" y1="160" x2="80" y2="160" strokeWidth="2" />
              <line x1="140" y1="180" x2="100" y2="180" strokeWidth="2" />
              <line x1="140" y1="200" x2="80" y2="200" strokeWidth="2" />

              {/* Central IC Pinouts - Right */}
              <line x1="240" y1="140" x2="280" y2="140" strokeWidth="2" />
              <line x1="240" y1="160" x2="300" y2="160" strokeWidth="2" />
              <line x1="240" y1="180" x2="280" y2="180" strokeWidth="2" />
              <line x1="240" y1="200" x2="300" y2="200" strokeWidth="2" />

              {/* Angled Circuit Bus Traces (45-degree cyber traces) */}
              <path d="M160,90 L120,50 L40,50" strokeWidth="1.8" />
              <circle cx="40" cy="50" r="4" fill="var(--accent-green)" />

              <path d="M180,70 L220,30 L340,30" strokeWidth="1.8" />
              <circle cx="340" cy="30" r="4" fill="var(--accent-green)" />

              <path d="M200,90 L240,50 L320,50" strokeWidth="1.8" />
              <circle cx="320" cy="50" r="3" />

              <path d="M100,140 L60,100 L30,100" strokeWidth="1.8" />
              <circle cx="30" cy="100" r="3" />

              <path d="M80,160 L40,160 L20,180 L20,240" strokeWidth="1.8" />
              <circle cx="20" cy="240" r="4" fill="var(--accent-green)" />

              <path d="M100,180 L60,220 L30,220" strokeWidth="1.8" />
              <circle cx="30" cy="220" r="3" />

              <path d="M80,200 L50,230 L50,290 L100,310" strokeWidth="1.8" />
              <circle cx="100" cy="310" r="4" fill="var(--accent-green)" />

              <path d="M160,250 L120,290 L50,290" strokeWidth="1.8" />
              <circle cx="50" cy="290" r="3" />

              <path d="M180,270 L200,290 L200,320" strokeWidth="1.8" />
              <circle cx="200" cy="320" r="4" fill="var(--accent-green)" />

              <path d="M220,270 L260,310 L330,310" strokeWidth="1.8" />
              <circle cx="330" cy="310" r="4" fill="var(--accent-green)" />

              <path d="M280,140 L330,90 L360,90" strokeWidth="1.8" />
              <circle cx="360" cy="90" r="3" />

              <path d="M300,160 L340,160 L360,180 L360,240" strokeWidth="1.8" />
              <circle cx="360" cy="240" r="4" fill="var(--accent-green)" />

              <path d="M280,180 L320,220 L350,220" strokeWidth="1.8" />
              <circle cx="350" cy="220" r="3" />

              <path d="M300,200 L330,230 L330,270" strokeWidth="1.8" />
              <circle cx="330" cy="270" r="3" />

              {/* Secondary SMT Chips & Decoupling Capacitors */}
              <rect x="70" y="70" width="24" height="14" strokeWidth="1.5" />
              <rect x="290" y="100" width="20" height="12" strokeWidth="1.5" />
              <rect x="80" y="250" width="22" height="14" strokeWidth="1.5" />
              <rect x="280" y="250" width="26" height="14" strokeWidth="1.5" />

              {/* Via Arrays (Test points) */}
              <circle cx="120" cy="110" r="2" fill="var(--accent-green)" />
              <circle cx="128" cy="110" r="2" fill="var(--accent-green)" />
              <circle cx="120" cy="118" r="2" fill="var(--accent-green)" />
              <circle cx="128" cy="118" r="2" fill="var(--accent-green)" />

              <circle cx="255" cy="110" r="2" fill="var(--accent-green)" />
              <circle cx="263" cy="110" r="2" fill="var(--accent-green)" />
              <circle cx="255" cy="118" r="2" fill="var(--accent-green)" />
              <circle cx="263" cy="118" r="2" fill="var(--accent-green)" />

              <circle cx="120" cy="225" r="2" fill="var(--accent-green)" />
              <circle cx="128" cy="225" r="2" fill="var(--accent-green)" />
              <circle cx="255" cy="225" r="2" fill="var(--accent-green)" />
              <circle cx="263" cy="225" r="2" fill="var(--accent-green)" />
            </svg>
          </motion.div>

          {/* Right Column: Content Stack */}
          <div>
            <div className="font-mono text-[13px] text-accent-green uppercase tracking-[0.15em] mb-3 flex items-center gap-2">
              <span>// 01</span>
              <span>ABOUT THE MARATHON</span>
            </div>

            <h2 className="text-[clamp(32px,5vw,56px)] font-extrabold tracking-tight uppercase mb-6" style={{ color: 'var(--text-primary)' }}>
              WHAT IS HACKZ'24?
            </h2>

            {/* Body Text with Vertical Border Accent */}
            <div
              style={{
                borderLeft: '2px solid var(--border-default)',
                paddingLeft: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {ABOUT_PARAGRAPHS.map((text, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.45, delay: idx * 0.08, ease: 'easeOut' }}
                  style={{
                    fontSize: 'clamp(15px, 2.5vw, 17px)',
                    color: '#c5c5c5',
                    lineHeight: 1.7,
                  }}
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </div>
        </div>

        {/* 3 Sharp Metric Boxes with GSAP Countup on Scroll Entry */}
        <div
          ref={statsRowRef}
          className="grid grid-cols-3 gap-6 max-sm:grid-cols-1 max-sm:gap-4"
        >
          {/* Stat 1: 24 HRS */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              padding: '28px 24px',
              position: 'relative',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 700,
                color: 'var(--accent-green)',
                lineHeight: 1,
                marginBottom: '8px',
              }}
            >
              {hoursVal} HRS
            </div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '4px',
              }}
            >
              DURATION
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'var(--text-secondary)',
              }}
            >
              Non-stop sprint
            </div>
          </motion.div>

          {/* Stat 2: 2–4 MEMBERS */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              padding: '28px 24px',
              position: 'relative',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 700,
                color: 'var(--accent-green)',
                lineHeight: 1,
                marginBottom: '8px',
              }}
            >
              {teamVal === 0 ? '0' : `2–${teamVal}`} MBRS
            </div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '4px',
              }}
            >
              TEAM SIZE
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'var(--text-secondary)',
              }}
            >
              2 to 4 engineers
            </div>
          </motion.div>

          {/* Stat 3: ₹1,70,000 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.3 }}
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              padding: '28px 24px',
              position: 'relative',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 700,
                color: 'var(--accent-green)',
                lineHeight: 1,
                marginBottom: '8px',
              }}
            >
              ₹{prizeVal.toLocaleString('en-IN')}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '4px',
              }}
            >
              PRIZE POOL
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'var(--text-secondary)',
              }}
            >
              Cash & recognitions
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

