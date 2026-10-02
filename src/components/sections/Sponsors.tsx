import React from 'react';
import { motion } from 'motion/react';
import { EVENT_LINKS } from '../../data/contact';
import { RollingText } from '../ui/RollingText';
import ScrambleText from '../ui/ScrambleText';
import Shuffle from '../ui/Shuffle';
export const Sponsors: React.FC = () => {
  return (
    <section
      id="sponsors"
      className="py-[100px] max-md:py-16 relative"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-page)',
        borderTop: '1px solid var(--border-default)',
        overflow: 'hidden',
      }}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 max-md:px-4" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="font-mono text-[13px] text-accent-green mb-3 flex items-center gap-2" style={{ justifyContent: 'center' }}>
            <ScrambleText text="Strategic alliances" as="span" className="text-[13px] text-accent-green tracking-[0.15em]" from="random" easing="linear"/>
          </div>
          <span>
            <ScrambleText
              text="BACKED BY"
              className="text-[clamp(22px,3.8vw,38px)] font-pixel uppercase mb-6 leading-tight"
              style={{ fontFamily: 'var(--font-pixel)' }}
              as="h2"
            />
          </span>
          {/* <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '15px' }}>
            Empowered by industry pioneers driving global financial software infrastructure and collegiate developer opportunity.
          </p> */}
          <Shuffle text="Empowered by industry pioneers driving global financial software infrastructure and collegiate developer opportunity." style={{ maxWidth: '600px', margin: '0 auto', fontSize: '15px',lineHeight: '1.5', textAlign: 'center' }}/>
        </div> 

        {/* Balanced 2-Column Sponsor Grid */}
        <div
          className="grid grid-cols-[1.1fr_1fr] gap-8 items-stretch max-w-[1080px] mx-auto max-[860px]:grid-cols-1 max-[860px]:gap-6"
        >
          {/* Card 1: TEMENOS (Exclusive Sponsor) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            whileHover={{ y: -4, borderColor: 'rgba(0, 255, 65, 0.4)' }}
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderTop: '3px solid var(--accent-green)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              transition: 'border-color 0.2s ease, transform 0.2s ease',
            }}
          >
            {/* Terminal Status Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 20px',
                borderBottom: '1px solid var(--border-default)',
                backgroundColor: 'rgba(0, 255, 65, 0.02)',
              }}
            >
              
                <ScrambleText text="[ EXCLUSIVE SPONSOR ]" className="text-[11px] font-mono text-accent-green tracking-[0.15em]" as="span"/>
             

              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--accent-green)',
                  backgroundColor: 'rgba(0, 255, 65, 0.08)',
                  border: '1px solid rgba(0, 255, 65, 0.35)',
                  padding: '2px 8px',
                  letterSpacing: '0.1em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-green)',
                    display: 'inline-block',
                    boxShadow: '0 0 6px var(--accent-green)',
                  }}
                />
                [ OK ]
              </span>
            </div>

            {/* Main Stage: Temenos Logo */}
            <a
              href={EVENT_LINKS.temenos}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '48px 32px 36px',
                textDecoration: 'none',
                flexGrow: 1,
              }}
            >
              <motion.div
                initial={{ filter: 'grayscale(1) brightness(0.65)', opacity: 0.6 }}
                whileInView={{ filter: 'grayscale(0) brightness(1)', opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  marginBottom: '20px',
                }}
              >
                {/* High-definition Temenos vector logo */}
                <svg
                  width="260"
                  height="58"
                  viewBox="0 0 320 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ maxWidth: '100%', height: 'auto' }}
                >
                  <rect x="10" y="8" width="44" height="44" fill="#003594" />
                  <path d="M18 18H46V25H35V44H28V25H18V18Z" fill="#ffffff" />
                  <text
                    x="68"
                    y="38"
                    fontFamily="'Outfit', sans-serif"
                    fontWeight="800"
                    fontSize="32"
                    fill="#ffffff"
                    letterSpacing="4"
                  >
                    TEMENOS
                  </text>
                </svg>
              </motion.div>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--accent-green)',
                  letterSpacing: '0.12em',
                  textAlign: 'center',
                  marginBottom: '8px',
                }}
              >
                GLOBAL LEADER IN BANKING SOFTWARE
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  textAlign: 'center',
                  lineHeight: 1.5,
                  maxWidth: '380px',
                  margin: '0 auto',
                }}
              >
                Powering mission-critical financial systems and next-generation cloud banking architecture worldwide.
              </p>
            </a>

            {/* Card Link Footer */}
            <div
              style={{
                borderTop: '1px solid var(--border-default)',
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                }}
              >
                DOMAIN: FINTECH_INFRA
              </span>

              <a
                href={EVENT_LINKS.temenos}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link-item subtle-roll-link"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--accent-green)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '4px 8px',
                }}
              >
                <span className="subtle-link-fill" aria-hidden="true" />
                <span style={{ position: 'relative', zIndex: 2 }}>
                  <RollingText
                    text="temenos.com →"
                    baseColor="var(--accent-green)"
                    hoverColor="#ffffff"
                    stagger={0.015}
                  />
                </span>
              </a>
            </div>
          </motion.div>

          {/* Card 2: UNSTOP (Powered By) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            whileHover={{ y: -4, borderColor: 'rgba(255, 255, 255, 0.3)' }}
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderTop: '3px solid #1C49C2',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              transition: 'border-color 0.2s ease, transform 0.2s ease',
            }}
          >
            {/* Terminal Status Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 20px',
                borderBottom: '1px solid var(--border-default)',
                backgroundColor: 'rgba(28, 73, 194, 0.03)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  color: 'var(--text-secondary)',
                }}
              >
                [ POWERED BY ]
              </span>

              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--accent-green)',
                  backgroundColor: 'rgba(0, 255, 65, 0.08)',
                  border: '1px solid rgba(0, 255, 65, 0.35)',
                  padding: '2px 8px',
                  letterSpacing: '0.1em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-green)',
                    display: 'inline-block',
                    boxShadow: '0 0 6px var(--accent-green)',
                  }}
                />
                [ OK ]
              </span>
            </div>

            {/* Main Stage: Unstop Logo */}
            <a
              href={EVENT_LINKS.unstop}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '48px 32px 36px',
                textDecoration: 'none',
                flexGrow: 1,
              }}
            >
              <motion.div
                initial={{ filter: 'grayscale(1) brightness(0.65)', opacity: 0.6 }}
                whileInView={{ filter: 'grayscale(0) brightness(1)', opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  marginBottom: '20px',
                }}
              >
                {/* High-definition Unstop vector logo */}
                <svg
                  width="220"
                  height="52"
                  viewBox="0 0 260 54"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ maxWidth: '100%', height: 'auto' }}
                >
                  <circle cx="28" cy="27" r="18" fill="#1C49C2" />
                  <path
                    d="M20 27C20 22.5817 23.5817 19 28 19C32.4183 19 36 22.5817 36 27C36 31.4183 32.4183 35 28 35"
                    stroke="#FFD100"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <circle cx="28" cy="27" r="4" fill="#ffffff" />
                  <text
                    x="60"
                    y="36"
                    fontFamily="'Outfit', sans-serif"
                    fontWeight="800"
                    fontSize="30"
                    fill="#ffffff"
                    letterSpacing="1"
                  >
                    unstop
                  </text>
                </svg>
              </motion.div>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: '#4e82f7',
                  letterSpacing: '0.12em',
                  textAlign: 'center',
                  marginBottom: '8px',
                }}
              >
                TALENT DISCOVERY & HIRING PLATFORM
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  textAlign: 'center',
                  lineHeight: 1.5,
                  maxWidth: '360px',
                  margin: '0 auto',
                }}
              >
                Connecting millions of collegiate engineers, competitive hackers, and pioneers with career-defining opportunities.
              </p>
            </a>

            {/* Card Link Footer */}
            <div
              style={{
                borderTop: '1px solid var(--border-default)',
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                }}
              >
                DOMAIN: TALENT_NETWORK
              </span>

              <a
                href={EVENT_LINKS.unstop}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link-item subtle-roll-link"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '4px 8px',
                }}
              >
                <span className="subtle-link-fill" aria-hidden="true" />
                <span style={{ position: 'relative', zIndex: 2 }}>
                  <RollingText
                    text="unstop.com →"
                    baseColor="var(--text-secondary)"
                    hoverColor="#ffffff"
                    stagger={0.015}
                  />
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


