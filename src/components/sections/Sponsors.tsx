import React from 'react';
import { RollingText } from '../ui/RollingText';
import ScrambleText from '../ui/ScrambleText';
import Shuffle from '../ui/Shuffle';
import CircularCarousel, { CircularCarouselRef } from '../ui/CircularCarousel';
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
            padding: isDesktop ? '14px 20px' : '10px 16px',
            borderBottom: '1px solid var(--border-default)',
            backgroundColor: tierConfig.badgeBg,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: isDesktop ? '11px' : '10px',
              color: tierConfig.badgeTextColor,
              letterSpacing: '0.15em',
              fontWeight: 700,
            }}
          >
            [ {tierConfig.label} ]
          </span>
        </div>

        {/* Main Stage: Sponsor Logo */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isDesktop ? '42px 36px 32px' : '20px 16px 16px',
            flexGrow: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: isDesktop ? '72px' : '52px',
              marginBottom: isDesktop ? '18px' : '10px',
            }}
          >
            {sponsor.id === 'temenos' ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: isDesktop ? '14px' : '10px',
                }}
              >
                <div
                  style={{
                    width: isDesktop ? '50px' : '38px',
                    height: isDesktop ? '50px' : '38px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#223577',
                  }}
                >
                  <img
                    src="/temenos_t.jpg"
                    alt="Temenos"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    fontSize: isDesktop ? '28px' : '20px',
                    color: '#ffffff',
                    letterSpacing: '0.14em',
                    lineHeight: 1,
                    textShadow: '0 0 12px rgba(255, 255, 255, 0.25)',
                  }}
                >
                  TEMENOS
                </span>
              </div>
            ) : sponsor.id === 'ibm' ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                <img
                  src="/ibm.png"
                  alt="IBM"
                  style={{
                    height: isDesktop ? '48px' : '34px',
                    width: 'auto',
                    maxWidth: isDesktop ? '210px' : '150px',
                    objectFit: 'contain',
                    display: 'block',
                    filter: 'contrast(1.1) brightness(1.15)',
                  }}
                />
              </div>
            ) : sponsor.id === 'aaceg' ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: isDesktop ? '14px' : '10px',
                }}
              >
                <img
                  src="/aaceg.png"
                  alt="AACEG"
                  style={{
                    height: isDesktop ? '50px' : '38px',
                    width: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    fontSize: isDesktop ? '28px' : '20px',
                    color: '#ffffff',
                    letterSpacing: '0.14em',
                    lineHeight: 1,
                  }}
                >
                  AACEG
                </span>
              </div>
            ) : (
              <img
                src={sponsor.logoSrc}
                alt={sponsor.name}
                style={{
                  height: isDesktop ? '48px' : '34px',
                  width: 'auto',
                  maxWidth: isDesktop ? '210px' : '150px',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            )}
          </div>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: isDesktop ? '11px' : '10px',
              color: tierConfig.badgeTextColor,
              letterSpacing: '0.12em',
              textAlign: 'center',
              marginBottom: isDesktop ? '8px' : '6px',
            }}
          >
            {sponsor.tagline}
          </div>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: isDesktop ? '13px' : '11.5px',
              color: 'var(--text-secondary)',
              textAlign: 'center',
              lineHeight: isDesktop ? 1.6 : 1.5,
              maxWidth: isDesktop ? '480px' : '260px',
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
            padding: isDesktop ? '14px 20px' : '10px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: isDesktop ? '11px' : '10px',
              color: 'var(--text-muted)',
            }}
          >
            DOMAIN: {sponsor.id.toUpperCase().replace('-', '_')}
          </span>

          <RollingText
            text={sponsor.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/.*$/, '') + ' →'}
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
  const [mobileIndex, setMobileIndex] = React.useState(0);
  const mobileCarouselRef = React.useRef<CircularCarouselRef>(null);

  // Prepare items for React Bits Carousel (desktop)
  const carouselItems = SPONSORS.map((sponsor) => (
    <SponsorCard key={sponsor.id} sponsor={sponsor} isDesktop={true} />
  ));

  // Prepare items for CircularCarousel (mobile)
  // Repeating the sponsors forms a complete 6-card 3D cylinder
  // so adjacent sponsor cards peek into view with depth, creating a fluid continuous carousel
  const mobileSponsors = [...SPONSORS, ...SPONSORS];
  const circularItems = mobileSponsors.map((sponsor, index) => ({
    id: index + 1,
    content: <SponsorCard sponsor={sponsor} isDesktop={false} />,
  }));

  return (
    <section
      id="sponsors"
      className="pt-16 relative"
      style={{
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
        <div className="md:hidden flex flex-col items-center">
          <div style={{ width: '100%', height: '390px', position: 'relative' }}>
            <CircularCarousel
              ref={mobileCarouselRef}
              items={circularItems}
              cardWidth={295}
              aspectRatio={0.82}
              curve={0}
              tilt={0}
              gap={16}
              intro="spin"
              autoplay="step"
              interval={4}
              snap={true}
              draggable={true}
              cornerRadius={0}
              preset="cylinder"
              depthFade={0.6}
              fadeColor="#030712"
              innerShade={0.85}
              onChange={(idx) => setMobileIndex(idx % SPONSORS.length)}
            />
          </div>

          {/* Cyberpunk Navigation Controls for Mobile */}
          <div className="flex items-center justify-center w-full max-w-[310px] mt-4 px-1">
            {/* <button
              type="button"
              onClick={() => mobileCarouselRef.current?.prev()}
              className="font-mono text-[11px] text-accent-green hover:text-white bg-black/60 border border-border-default hover:border-accent-green px-3 py-1.5 transition-colors active:scale-95 flex items-center gap-1 cursor-pointer select-none"
              aria-label="Previous sponsor"
            >
              <span>&lt;</span>
            </button> */}

            {/* Indicator Pips */}
            <div className="flex items-center gap-2">
              {SPONSORS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => mobileCarouselRef.current?.goTo(i)}
                  className={`h-2 transition-all duration-300 cursor-pointer ${
                    mobileIndex === i
                      ? 'w-6 bg-accent-green'
                      : 'w-2 bg-border-default hover:bg-text-muted'
                  }`}
                  aria-label={`Go to sponsor ${i + 1}`}
                />
              ))}
            </div>

            {/* <button
              type="button"
              onClick={() => mobileCarouselRef.current?.next()}
              className="font-mono text-[11px] text-accent-green hover:text-white bg-black/60 border border-border-default hover:border-accent-green px-3 py-1.5 transition-colors active:scale-95 flex items-center gap-1 cursor-pointer select-none"
              aria-label="Next sponsor"
            >
              <span>&gt;</span>
            </button> */}
          </div>

        </div>
      </div>
    </section>
  );
};