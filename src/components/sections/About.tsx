import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CircuitBoard } from '../ui/CircuitBoard';
import ScrambleText from '../ui/ScrambleText';

gsap.registerPlugin(ScrollTrigger);

const ABOUT_PARAGRAPHS = [
  "HackZ'26 is a dynamic 24-hour hackathon initiated by CSEA that brings together the brightest minds to solve real-world challenges through technology and innovation.",
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
          {/* Left Column: Circuit Board SVG Illustration with Anime.js createMotionPath & random active wire pulses */}
          <motion.div
            className="flex items-center justify-center relative select-none"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            aria-hidden="true"
          >
            <CircuitBoard />
          </motion.div>

          {/* Right Column: Content Stack */}
          <div>
            <div className="font-mono text-[13px] text-accent-green mb-3 flex items-center gap-2 max-md:justify-center">
              <ScrambleText text="About the marathon" as="span" className="text-[13px] text-accent-green font-mono tracking-[0.15em]" from="random" easing="linear"/>
            </div>

            <h2 className="text-[clamp(22px,3.8vw,38px)] font-pixel uppercase mb-6 leading-tight max-md:text-center" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-pixel)' }}>
              <ScrambleText text="HACKZ'26" as="span" className="text-[clamp(22px,3.8vw,38px)] font-pixel uppercase tracking-normal" style={{ fontFamily: 'var(--font-pixel)' }} from="random" easing="linear"/>
            </h2>

            {/* Body Text with Vertical Border Accent */}
            <div
              style={{
                borderLeft: '2px solid var(--border-default)',
                paddingLeft: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                textAlign: 'justify',
              }}
            >
              {ABOUT_PARAGRAPHS.map((text, idx) => (
                <span key={idx} style={{ color: 'var(--text-secondary)',textAlign:'center' }}>
                  {text}
                  {/* <Shuffle text={text} style={{
                    fontSize: 'clamp(15px, 2.5vw, 17px)',
                    color: '#c5c5c5',
                    lineHeight: 1.7,
                  }} /> */}
                  </span>
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
              display:'flex',
              flexDirection:'column',
              justifyContent:'center',
              alignItems:'center'
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
                fontFamily: 'var(--font-mono)',
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
              display:'flex',
              flexDirection:'column',
              justifyContent:'center',
              alignItems:'center'
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
                fontFamily: 'var(--font-mono)',
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
              display:'flex',
              flexDirection:'column',
              justifyContent:'center',
              alignItems:'center'
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
                fontFamily: 'var(--font-mono)',
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

