import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PODIUM_PRIZES = [
  {
    rank: 'RANK_01',
    title: 'CHAMPIONS',
    amount: '₹75,000',
    borderColor: 'var(--accent-green)',
    amountColor: 'var(--accent-green)',
    glowColor: 'rgba(0, 255, 65, 0.25)',
    height: '320px',
    orderDesktop: 1,
    orderMobile: 1,
    isWinner: true,
    perks: ['Grand Cash Award', 'Winner Trophy & Citations', 'Fast-Track Mentorship'],
  },
  {
    rank: 'RANK_02',
    title: 'RUNNERS UP',
    amount: '₹50,000',
    borderColor: 'var(--accent-orange)',
    amountColor: 'var(--accent-orange)',
    glowColor: 'rgba(255, 107, 0, 0.25)',
    height: '280px',
    orderDesktop: 2,
    orderMobile: 2,
    isWinner: false,
    perks: ['Cash Prize', 'Certificate of Merit', 'Exclusive Temenos Swag'],
  },
  {
    rank: 'RANK_03',
    title: 'SECOND RUNNERS UP',
    amount: '₹25,000',
    borderColor: 'var(--accent-purple)',
    amountColor: 'var(--accent-purple-light)',
    glowColor: 'rgba(176, 38, 255, 0.25)',
    height: '250px',
    orderDesktop: 3,
    orderMobile: 3,
    isWinner: false,
    perks: ['Cash Prize', 'Certificate of Merit', 'Tech Goodies'],
  },
];

export const Prizes: React.FC = () => {
  const counterRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [displayValue, setDisplayValue] = useState<string>('0');

  useEffect(() => {
    if (!counterRef.current || !sectionRef.current) return;

    const counterObj = { val: 0 };
    const target = 170000;

    const trigger = ScrollTrigger.create({
      trigger: counterRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(counterObj, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            const formatted = '₹' + Math.floor(counterObj.val).toLocaleString('en-IN');
            setDisplayValue(formatted);
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
      id="prizes"
      ref={sectionRef}
      className="section-padding"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-deep-green)',
        borderTop: '1px solid var(--border-green-dim)',
        borderBottom: '1px solid var(--border-green-dim)',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="section-meta" style={{ justifyContent: 'center' }}>
            <span>// 04</span>
            <span>REWARDS & HONORS</span>
          </div>
          <h2 className="section-title">WHAT'S AT STAKE</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '16px' }}>
            Compete for a combined bounty pool engineered to reward disruptive engineering, technical prowess, and innovative design.
          </p>
        </div>

        {/* Massive Countup Number Banner */}
        <div
          ref={counterRef}
          style={{
            textAlign: 'center',
            marginBottom: '72px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--accent-green-dim)',
              letterSpacing: '0.25em',
              marginBottom: '8px',
            }}
          >
            TOTAL CUMULATIVE PRIZE POOL
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(42px, 10vw, 115px)',
              fontWeight: 800,
              color: 'var(--accent-green)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            {displayValue}
          </div>
        </div>

        {/* Podium Blocks Row */}
        <div
          className="prizes-podium-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            alignItems: 'stretch',
            marginBottom: '48px',
          }}
        >
          {PODIUM_PRIZES.map((podium) => (
            <motion.div
              key={podium.rank}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: podium.orderDesktop * 0.12 }}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: `1px solid var(--border-default)`,
                borderLeft: `4px solid ${podium.borderColor}`,
                boxShadow: `inset 0 0 20px ${podium.glowColor}`,
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                order: podium.orderDesktop,
              }}
              className="podium-card"
            >
              {/* Rank Tag */}
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: podium.borderColor,
                  letterSpacing: '0.15em',
                  marginBottom: '8px',
                }}
              >
                {podium.rank}
              </div>

              {/* Title */}
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '16px',
                }}
              >
                {podium.title}
              </div>

              {/* Amount */}
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(28px, 4vw, 42px)',
                  fontWeight: 800,
                  color: podium.amountColor,
                  lineHeight: 1,
                  marginBottom: '24px',
                }}
              >
                {podium.amount}
              </div>

              {/* Perks */}
              <div
                style={{
                  borderTop: '1px solid var(--border-default)',
                  paddingTop: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {podium.perks.map((perk, i) => (
                  <div
                    key={i}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span style={{ color: podium.borderColor, fontSize: '11px' }}>&rsaquo;</span>
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Special Prize Row: Women Empowerment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="prizes-special-card"
          style={{
            backgroundColor: '#120f06',
            border: '1px solid rgba(245, 166, 35, 0.4)',
            borderLeft: '4px solid var(--accent-amber)',
            boxShadow: 'inset 0 0 20px rgba(245, 166, 35, 0.15)',
            padding: '24px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div
            className="prizes-special-info"
            style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', flex: '1 1 300px' }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                minWidth: '48px',
                backgroundColor: 'rgba(245, 166, 35, 0.15)',
                border: '1px solid var(--accent-amber)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-amber)',
                fontSize: '24px',
                fontWeight: 700,
                boxShadow: '0 0 10px rgba(245, 166, 35, 0.25)',
              }}
            >
              &#9792;
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--accent-amber)',
                  letterSpacing: '0.15em',
                  marginBottom: '4px',
                  fontWeight: 700,
                }}
              >
                SPECIAL CITATION PRIZE
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#ffffff',
                }}
              >
                Women Empowerment — Leading Women's Team
              </div>
              <div style={{ fontSize: '13px', color: '#b0b0b0', marginTop: '4px', lineHeight: 1.5 }}>
                Exclusive cash prize and mentorship package dedicated to the highest-scoring all-women engineering squad.
              </div>
            </div>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              fontWeight: 700,
              color: 'var(--accent-amber)',
              backgroundColor: 'rgba(245, 166, 35, 0.12)',
              border: '1px solid var(--accent-amber)',
              padding: '10px 20px',
              letterSpacing: '0.08em',
              whiteSpace: 'nowrap',
            }}
          >
            [ SPECIAL TRACK BOUNTY ]
          </div>
        </motion.div>
      </div>
    </section>
  );
};
