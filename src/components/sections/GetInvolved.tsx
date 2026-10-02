import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/Button';
import { ScrambleTitle } from '../ui/ScrambleTitle';
import ScrambleText from '../ui/ScrambleText';
import {useNavigate} from 'react-router-dom';
interface RoleCardProps {
  roleTag: string;
  watermark: string;
  title: string;
  description: string;
  btnText: string;
  btnHref?: string;
  onClick?: () => void;
  slideX: number;
  isExternal?: boolean;
}

const RoleCard: React.FC<RoleCardProps> = ({
  roleTag,
  watermark,
  title,
  description,
  btnText,
  btnHref,
  onClick,
  slideX,
  isExternal = true,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  return (
    <motion.div
      className="role-card"
      initial={{ opacity: 0, x: slideX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
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
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      {/* Atmospheric oversized text background */}
      <div
        style={{
          position: 'absolute',
          top: '-1vh',
          right: '-1vw',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(50px, 4vw, 100px)',
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
          onClick={onClick}
          isExternal={isExternal}
          className="w-full sm:w-auto"
        >
          {btnText}
        </Button>
      </div>
    </motion.div>
  );
};

export const GetInvolved: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      id="get-involved"
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
          <div className="font-mono text-[13px] text-accent-green mb-3 flex items-center gap-2 justify-center">
            <ScrambleText text="Join the operations" as="span" className="text-[13px] text-accent-green tracking-[0.15em]" from="random" easing="linear"/>
          </div>
          <ScrambleText text="GET INVOLVED" as="h2" className="text-[clamp(22px,3.8vw,38px)] font-pixel uppercase mb-6 leading-tight" style={{ fontFamily: 'var(--font-pixel)' }} from="random" easing="linear"/>
          <p style={{ maxWidth: '560px', margin: '0 auto', fontSize: '16px', lineHeight:'1.5' }}>
            Contribute your expertise or logistical power to ensure HackZ'26 runs with precision and impact.
          </p>
        </div>

        {/* Two Side-by-Side Action Blocks with completely decoupled hover scopes */}
        <div
          className="grid grid-cols-2 gap-8 max-md:grid-cols-1 max-md:gap-5"
        >
          {/* Mentor Block */}
          <RoleCard
            roleTag="[ DOMAIN SPECIALIST ]"
            watermark="MENTOR"
            title="Become a Mentor"
            description="Guide collegiate engineering squads through architectural bottlenecks, code optimization, and industry viability during the 24-hour sprint."
            btnText="APPLY AS MENTOR →"
            onClick={() => navigate('/mentor')}
            isExternal={false}
            slideX={-60}
          />

          {/* Volunteer Block */}
          <RoleCard
            roleTag="[ EVENT CREW ]"
            watermark="VOLUNTEER"
            title="Become a Volunteer"
            description="Join the on-site operations team at CEG Campus. Coordinate participant hospitality, technical infrastructure, and seamless stage administration."
            btnText="APPLY AS VOLUNTEER →"
            onClick={() => navigate('/volunteer')}
            isExternal={false}
            slideX={60}
          />
        </div>
      </div>
    </section>
  );
};


