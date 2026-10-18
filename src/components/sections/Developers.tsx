import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambleText from '../ui/ScrambleText';
import { DEVELOPERS, DeveloperProfile } from '../../data/developers';

gsap.registerPlugin(ScrollTrigger);

const GithubIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const getFallbackAvatar = (name: string): string => {
  const isLead = name.toLowerCase().includes('joshua') || name.toLowerCase().includes('j0sh');
  const roleText = isLead ? 'LEAD_DEV' : 'CORE_DEV';
  const color = isLead ? '%2300ff41' : '%2339ff14';
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%"><rect width="400" height="400" fill="%23060f09"/><circle cx="200" cy="150" r="70" fill="%230c2415" stroke="${color}" stroke-width="3"/><rect x="155" y="135" width="90" height="24" rx="6" fill="${color}" opacity="0.9"/><path d="M100 350 C100 240 145 230 200 230 C255 230 300 240 300 350" fill="%230a1c10" stroke="${color}" stroke-width="3"/><text x="200" y="315" font-family="monospace" font-size="16" fill="${color}" text-anchor="middle" font-weight="bold">${roleText}</text><circle cx="200" cy="147" r="4" fill="%23000"/></svg>`;
};

interface DeveloperCardProps {
  developer: DeveloperProfile;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({ developer, index, isExpanded, onToggle }) => {
  const handleCardClick = () => {
    if (!isExpanded) {
      onToggle();
    }
  };

  const handleHeaderClick = (e: React.MouseEvent) => {
    if (isExpanded) {
      e.stopPropagation();
      onToggle();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isExpanded && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <motion.div
      layout
      className={`developer-card group relative overflow-hidden select-none`}
      role={!isExpanded ? 'button' : undefined}
      tabIndex={!isExpanded ? 0 : undefined}
      aria-expanded={isExpanded}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        layout: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
        duration: 0.5,
        delay: index * 0.08,
      }}
      whileHover={!isExpanded ? { y: -4 } : undefined}
      style={{
        backgroundColor:  'var(--bg-card)',
        border: '1px solid var(--border-default)',
        boxShadow: 'none',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
        cursor: !isExpanded ? 'pointer' : 'default',
        outline: 'none',
      }}
    >
      {/* Expanded Avatar */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="avatar-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div style={{ paddingBottom: '16px' }}>
              <motion.img
                src={developer.avatarUrl}
                alt={developer.name}
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.src = getFallbackAvatar(developer.name);
                }}
                style={{
                  width: '210px',
                  height: '210px',
                  maxWidth: '100%',
                  aspectRatio: '1 / 1',
                  borderRadius: '6px',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  border: '1px solid var(--border-default)',
                  boxShadow: 'none',
                  display: 'block',
                }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header with Glitch Effect */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          onClick={handleHeaderClick}
          style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            textAlign: 'center',
            cursor: isExpanded ? 'pointer' : 'inherit',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <span
            className={`name-glitch-text inline-block relative ${!isExpanded ? 'active-glitch' : ''}`}
            data-text={developer.name}
          >
            {/* Glitched name text when collapsed */}
            {!isExpanded && (
              <ScrambleText
                text={developer.name}
                as="span"
                className="text-[16px] font-pixel"
                from="random"
                easing="linear"
                style={{ display: 'inline-block' }}
              />
            )}
            {isExpanded && developer.name}
          </span>
        </motion.div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="content-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              overflow: 'hidden',
            }}
          >
            <div style={{ paddingTop: '20px' }}>
              {/* Separator */}
              <div
                style={{
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, var(--accent-green), transparent)',
                  marginBottom: '20px',
                  opacity: 0.5,
                }}
              />

              {/* Social Links */}
              <div
                style={{
                  display: 'flex',
                  gap: '24px',
                  justifyContent: 'center',
                }}
              >
                {/* GitHub */}
                <a
                  href={developer.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '14px',
                    color: 'var(--accent-green)',
                    textDecoration: 'none',
                  }}
                >
                  <GithubIcon size={20} />
                </a>

                {/* LinkedIn */}
                <a
                  href={developer.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '14px',
                    color: 'var(--accent-green)',
                    textDecoration: 'none',
                  }}
                >
                  <LinkedinIcon size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Cyber glitch & scanline effects */}
      <div
        className="card-glitch-slice"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <div
          className="card-scanlines"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'repeating-linear-gradient(transparent 0px, transparent 2px, rgba(0, 0, 0, 0.22) 2px, rgba(0, 0, 0, 0.22) 4px)',
            pointerEvents: 'none',
          }}
        />
      </div>
        
    </motion.div>
  );
};

export const Developers: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    if (!wrapperRef.current || !sectionRef.current) return;

    const wrapper = wrapperRef.current;
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      // Measure natural height before collapsing
      const initialHeight = section.getBoundingClientRect().height || section.scrollHeight || 750;

      // Initially collapse wrapper with overflow hidden
      gsap.set(wrapper, { height: 0, overflow: 'hidden' });

      // Refresh ScrollTrigger so contact section sits directly below FAQ before trigger
      ScrollTrigger.refresh();

      // Trigger when contact section reaches top 50% of the viewport
      ScrollTrigger.create({
        trigger: '#contact',
        start: 'top 50%',
        once: true,
        onEnter: () => {
          const targetHeight = section.scrollHeight || initialHeight;

          gsap.to(wrapper, {
            height: targetHeight,
            duration: 0.45,
            ease: 'power2.out',
            onComplete: () => {
              gsap.set(wrapper, { height: 'auto', overflow: 'visible' });
              ScrollTrigger.refresh();
            },
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="developers-wrapper" style={{ position: 'relative', width: '100%', zIndex: 10 }}>
      <section
        id="developers"
        ref={sectionRef}
        className="py-[100px] max-md:py-16 relative"
        style={{
          position: 'relative',
          zIndex: 10,
          borderTop: '1px solid var(--border-default)',
          borderBottom: '1px solid var(--border-default)',
          overflow: 'hidden',
        }}
      >
      {/* Section Header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '64px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          className="font-mono text-[13px] text-accent-green mb-3 flex items-center gap-2"
          style={{ justifyContent: 'center' }}
        >
          <ScrambleText
            text="Core team profiles"
            as="span"
            className="text-[13px] text-accent-green font-mono tracking-[0.15em]"
            from="random"
            easing="linear"
          />
        </div>
        <ScrambleText
          text="MEET THE DEVS"
          as="h2"
          className="text-[clamp(22px,3.8vw,38px)] font-pixel uppercase mb-6 leading-tight"
          style={{ fontFamily: 'var(--font-pixel)' }}
          from="random"
          easing="linear"
        />
        <p
          style={{
            maxWidth: '560px',
            margin: '0 auto',
            fontSize: '16px',
            lineHeight: '1.5',
            color: 'var(--text-secondary)',
          }}
        >
          Meet the engineers crafting HackZ'26's Web infrastructure and magic.
        </p>
      </div>

      {/* Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '32px',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {DEVELOPERS.map((developer, index) => (
          <DeveloperCard
            key={developer.name}
            developer={developer}
            index={index}
            isExpanded={isExpanded}
            onToggle={handleToggle}
          />
        ))}
      </div>

      {/* Cyberpunk Glitch Animations */}
      <style>{`
        /* Text RGB Split Glitch */
        .name-glitch-text.active-glitch {
          animation: glitch-rgb-split 1.6s infinite;
        }

        .developer-card:hover .name-glitch-text.active-glitch {
          animation-duration: 1.6s;
        }

        @keyframes glitch-rgb-split {
          0%, 86%, 100% {
            text-shadow: none;
            transform: translate(0);
          }
          87% {
            text-shadow: -2.5px 0 #00ffff, 2.5px 0 #ff0055;
            transform: translate(-1.5px, 0.5px);
          }
          89% {
            text-shadow: 2px 0 #00ff41, -2px 0 #ff0055;
            transform: translate(1.5px, -0.5px);
          }
          91% {
            text-shadow: -1.5px 0 #00ff41, 1.5px 0 #00ffff;
            transform: translate(-0.5px, 0);
          }
          93% {
            text-shadow: none;
            transform: translate(0);
          }
          94% {
            text-shadow: 2.5px 0 #ff0055, -2px 0 #00ff41;
            transform: translate(1px, -1px);
          }
          96% {
            text-shadow: -1px 0 #00ffff, 1px 0 #ff0055;
            transform: translate(-1px, 0.5px);
          }
          97%, 100% {
            text-shadow: none;
            transform: translate(0);
          }
        }

        /* Card Digital Glitch Slice Tearing */
        .card-glitch-slice {
          opacity: 0;
          animation: cyber-glitch-tear 1.8s infinite linear;
        }

        .developer-card:hover .card-glitch-slice {
          animation-duration: 1.6s;
        }

        @keyframes cyber-glitch-tear {
          0%, 86%, 100% {
            opacity: 0;
            clip-path: inset(50% 0 50% 0);
            background: transparent;
          }
          87% {
            opacity: 0.75;
            clip-path: inset(15% 0 75% 0);
            transform: translate(-4px, 1px);
            background: rgba(0, 255, 65, 0.1);
          }
          89% {
            opacity: 0.85;
            clip-path: inset(58% 0 22% 0);
            transform: translate(4px, -1px);
            background: rgba(0, 240, 255, 0.08);
          }
          91% {
            opacity: 0;
            clip-path: inset(0 0 0 0);
          }
          92% {
            opacity: 0.8;
            clip-path: inset(80% 0 8% 0);
            transform: translate(-3px, 0);
            background: rgba(255, 0, 85, 0.08);
          }
          94% {
            opacity: 0.9;
            clip-path: inset(8% 0 82% 0);
            transform: translate(3px, 1px);
            background: rgba(0, 255, 65, 0.12);
          }
          96% {
            opacity: 0.5;
            clip-path: inset(38% 0 48% 0);
            transform: translate(-2px, -1px);
            background: rgba(0, 240, 255, 0.06);
          }
          98%, 100% {
            opacity: 0;
            clip-path: inset(50% 0 50% 0);
          }
        }
      `}</style>
    </section>
    </div>
  );
};