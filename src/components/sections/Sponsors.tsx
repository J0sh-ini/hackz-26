import React from 'react';
import { RollingText } from '../ui/RollingText';
import ScrambleText from '../ui/ScrambleText';
import Shuffle from '../ui/Shuffle';
import CircularCarousel from '../ui/CircularCarousel';
import Carousel from '../ui/Carousel';
import { SPONSORS, Sponsor } from '../../data/sponsors.tsx';

const getTierConfig = (tier: Sponsor['tier']) => {
  const configs = {
    title: {
      label: 'TITLE SPONSOR',
      badgeBg: 'rgba(0, 255, 65, 0.02)',
      badgeTextColor: 'var(--accent-green)',
      borderColor: 'var(--accent-green)',
    },
    platinum: {
      label: 'PLATINUM SPONSOR',
      badgeBg: 'rgba(0, 255, 136, 0.02)',
      badgeTextColor: 'var(--accent-green-mint)',
      borderColor: 'var(--accent-green-mint)',
    },
    gold: {
      label: 'GOLD SPONSOR',
      badgeBg: 'rgba(132, 255, 0, 0.02)',
      badgeTextColor: 'var(--accent-green-volt)',
      borderColor: 'var(--accent-green-volt)',
    },
    silver: {
      label: 'SILVER SPONSOR',
      badgeBg: 'rgba(163, 255, 184, 0.02)',
      badgeTextColor: 'var(--accent-green-light)',
      borderColor: 'var(--accent-green-light)',
    },
    associate: {
      label: 'ASSOCIATE SPONSOR',
      badgeBg: 'rgba(28, 73, 194, 0.03)',
      badgeTextColor: '#4e82f7',
      borderColor: '#1C49C2',
    },
    'powered-by': {
      label: 'POWERED BY',
      badgeBg: 'rgba(78, 130, 247, 0.03)',
      badgeTextColor: '#4e82f7',
      borderColor: '#4e82f7',
    }
  };
  return configs[tier];
};

const SponsorCard: React.FC<{ sponsor: Sponsor; isDesktop?: boolean }> = ({ sponsor, isDesktop = true }) => {
  const tierConfig = getTierConfig(sponsor.tier);

  return (
    <a
      href={sponsor.website}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-default)',
          borderTop: `3px solid ${tierConfig.borderColor}`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          position: 'relative',
          transition: 'border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
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
            backgroundColor: tierConfig.badgeBg,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: tierConfig.badgeTextColor,
              letterSpacing: '0.15em',
              fontWeight: 700,
            }}
          >
            [ {tierConfig.label} ]
          </span>

          {/* <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: tierConfig.badgeTextColor,
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
                backgroundColor: tierConfig.badgeTextColor,
                display: 'inline-block',
                boxShadow: `0 0 6px ${tierConfig.badgeTextColor}`,
              }}
            />
            [ OK ]
          </span> */}
        </div>

        {/* Main Stage: Sponsor Logo */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isDesktop ? '42px 36px 32px' : '32px 24px 24px',
            flexGrow: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              minHeight: '70px',
              marginBottom: '18px',
            }}
          >
            {sponsor.logo}
          </div>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: isDesktop ? '11px' : '10px',
              color: tierConfig.badgeTextColor,
              letterSpacing: '0.12em',
              textAlign: 'center',
              marginBottom: '8px',
            }}
          >
            {sponsor.tagline}
          </div>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: isDesktop ? '13px' : '12px',
              color: 'var(--text-secondary)',
              textAlign: 'center',
              lineHeight: 1.6,
              maxWidth: isDesktop ? '480px' : '380px',
              margin: '0 auto',
            }}
          >
            {sponsor.description}
          </p>
        </div>

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
            DOMAIN: {sponsor.id.toUpperCase().replace('-', '_')}
          </span>

          <RollingText
            text={`${sponsor.name.toLowerCase().replace(/\s+/g, '')}.com →`}
            baseColor={tierConfig.badgeTextColor}
            hoverColor="#ffffff"
            stagger={0.015}
          />
        </div>
      </div>
    </a>
  );
};

export const Sponsors: React.FC = () => {
  // Prepare items for React Bits Carousel (desktop)
  const carouselItems = SPONSORS.map((sponsor) => (
    <SponsorCard key={sponsor.id} sponsor={sponsor} isDesktop={true} />
  ));

  // Prepare items for CircularCarousel (mobile)
  const circularItems = SPONSORS.map((sponsor, index) => ({
    id: index + 1,
    content: <SponsorCard sponsor={sponsor} isDesktop={false} />,
  }));

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
          <Shuffle text="Empowered by industry pioneers driving global financial software infrastructure and collegiate developer opportunity." style={{ maxWidth: '600px', margin: '0 auto', fontSize: '15px', lineHeight: '1.5', textAlign: 'center' }}/>
        </div>

        {/* Desktop: React Bits Carousel */}
        <div className="hidden md:flex flex-col items-center justify-center w-full" style={{ position: 'relative' }}>
          <div
            style={{
              width: '100%',
              maxWidth: '700px',
              margin: '0 auto',
              position: 'relative',
            }}
          >
            <Carousel
              items={carouselItems}
              baseWidth={700}
              aspectRatio={1.42}
              peek={0}
              gap={0}
              radius={0}
              frame={false}
              effect="cube"
              indicator="dots"
              arrows={true}
              autoplay={true}
              autoplayDelay={4000}
              pauseOnHover={true}
              loop={true}
              draggable={false}
              theme="dark"
              className="w-full"
            />
          </div>
        </div>

        {/* Mobile: CircularCarousel */}
        <div className="md:hidden">
          <div style={{ height: '480px', position: 'relative' }}>
            <CircularCarousel
              items={circularItems}
              cardWidth={280}
              intro="rise"
              aspectRatio={0.55}
            />
          </div>
        </div>
      </div>
    </section>
  );
};