import React, { useState } from 'react';
import { motion } from 'motion/react';
import { EVENT_LINKS } from '../../data/contact';
import { Button } from '../ui/Button';
import { ScrambleTitle } from '../ui/ScrambleTitle';

interface RoleCardProps {
  roleTag: string;
  watermark: string;
  title: string;
  description: string;
  btnText: string;
  btnHref: string;
  slideX: number;
}

const RoleCard: React.FC<RoleCardProps> = ({
  roleTag,
  watermark,
  title,
  description,
  btnText,
  btnHref,
  slideX,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: slideX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-default)',
        padding: '48px 36px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '320px',
      }}
    >
      {/* Atmospheric oversized text background */}
      <div
        style={{
          position: 'absolute',
          top: '-20px',
          right: '-10px',
          fontFamily: 'var(--font-mono)',
          fontSize: '110px',
          fontWeight: 800,
          color: 'var(--accent-green)',
          opacity: 0.03,
          userSelect: 'none',
          pointerEvents: 'none',
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        {watermark}
      </div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--accent-green)',
            letterSpacing: '0.15em',
            marginBottom: '12px',
          }}
        >
          {roleTag}
        </div>
        <ScrambleTitle
          text={title}
          trigger={isHovered}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '28px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '14px',
          }}
        />
        <p
          style={{
            fontSize: '15px',
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            marginBottom: '32px',
          }}
        >
          {description}
        </p>
      </div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        <Button
          variant="outline"
          href={btnHref}
          isExternal
          className="get-involved-btn"
        >
          {btnText}
        </Button>
      </div>
    </motion.div>
  );
};

export const GetInvolved: React.FC = () => {
  return (
    <section
      id="get-involved"
      className="section-padding"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-page)',
        borderTop: '1px solid var(--border-default)',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="section-meta" style={{ justifyContent: 'center' }}>
            <span>// 06</span>
            <span>JOIN THE OPERATIONS</span>
          </div>
          <h2 className="section-title">GET INVOLVED</h2>
          <p style={{ maxWidth: '560px', margin: '0 auto', fontSize: '15px' }}>
            Contribute your expertise or logistical power to ensure HackZ '24 runs with precision and impact.
          </p>
        </div>

        {/* Two Side-by-Side Action Blocks with completely decoupled hover scopes */}
        <div
          className="get-involved-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '32px',
          }}
        >
          {/* Mentor Block */}
          <RoleCard
            roleTag="[ DOMAIN SPECIALIST ]"
            watermark="MENTOR"
            title="Become a Mentor"
            description="Guide collegiate engineering squads through architectural bottlenecks, code optimization, and industry viability during the 24-hour sprint."
            btnText="APPLY AS MENTOR →"
            btnHref={EVENT_LINKS.mentorForm}
            slideX={-60}
          />

          {/* Volunteer Block */}
          <RoleCard
            roleTag="[ EVENT CREW ]"
            watermark="VOLUNTEER"
            title="Become a Volunteer"
            description="Join the on-site operations team at CEG Campus. Coordinate participant hospitality, technical infrastructure, and seamless stage administration."
            btnText="APPLY AS VOLUNTEER →"
            btnHref={EVENT_LINKS.volunteerForm}
            slideX={60}
          />
        </div>
      </div>
    </section>
  );
};
