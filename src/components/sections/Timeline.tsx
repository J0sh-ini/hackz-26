import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TIMELINE_EVENTS, TimelineEvent } from '../../data/timeline';
import ScrambleText from '../ui/ScrambleText';
gsap.registerPlugin(ScrollTrigger);

export const Timeline: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackContainerRef = useRef<HTMLDivElement | null>(null);
  const lineFillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!trackContainerRef.current || !lineFillRef.current) return;

    const ctx = gsap.context(() => {
      // Scrub the vertical connecting line from scaleY: 0 to 1 through the track
      gsap.fromTo(
        lineFillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: trackContainerRef.current,
            start: 'top 65%',
            end: 'bottom 65%',
            scrub: 0.3,
          },
        }
      );

      // Animate each event node as scroll reaches it
      const items = trackContainerRef.current?.querySelectorAll('.timeline-item-wrapper');
      items?.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, trackContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="py-[100px] max-md:py-16 relative"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-page)',
        borderTop: '1px solid var(--border-default)',
        overflow: 'hidden',
      }}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 max-md:px-4" style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="font-mono text-[13px] text-accent-green mb-3 flex items-center gap-2" style={{ justifyContent: 'center' }}>
            <ScrambleText text="Event path" as="span" className="text-[13px] text-accent-green tracking-[0.15em]" from="random" easing="linear"/>
          </div>
          <ScrambleText text="SEQUENCE OF EVENTS" as="h2" className="text-[clamp(20px,3.5vw,36px)] font-pixel uppercase mb-6 leading-tight" style={{ fontFamily: 'var(--font-pixel)' }} from="random" easing="linear"/>
          <p style={{ maxWidth: '580px', margin: '0 auto', fontSize: '16px', lineHeight: '1.5' }}>
            A synchronized progression from nationwide ideation review to the intensive 24-hour on-campus prototype deployment.
          </p>
        </div>

        {/* Timeline Container */}
        <div
          ref={trackContainerRef}
          className="timeline-track-container"
          style={{
            position: 'relative',
            maxWidth: '920px',
            margin: '0 auto',
            padding: '24px 0',
          }}
        >
          {/* Central Connecting Line Wrapper (desktop center / mobile left-aligned) */}
          <div
            className="timeline-center-line-wrapper"
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '4px',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            {/* Background Dimmed Static Line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '1px',
                width: '2px',
                backgroundColor: 'var(--border-default)',
              }}
            />

            {/* Active Drawing Green Line — scrubs scaleY: 0 -> 1 all the way to the end */}
            <div
              ref={lineFillRef}
              style={{
                position: 'absolute',
                top: 0,
                left: '1px',
                width: '2px',
                height: '100%',
                backgroundColor: 'var(--accent-green)',
                transformOrigin: 'top',
                boxShadow: '0 0 8px rgba(0, 255, 65, 0.6)',
              }}
            >
              {/* Glowing Leading Tracer Head */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-4px',
                  left: '-3px',
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 0 8px #00ff41, 0 0 16px #00ff41',
                  transform: 'rotate(45deg)',
                }}
              />
            </div>
          </div>

          {/* Timeline Nodes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', position: 'relative', zIndex: 2 }}>
            {TIMELINE_EVENTS.map((event: TimelineEvent, idx: number) => {
              const isEven = idx % 2 === 0;
              const isActive = event.status === 'active';
              const isLast = idx === TIMELINE_EVENTS.length - 1;

              const nodeColor = isActive
                ? 'var(--accent-green-bright)'
                : 'var(--accent-green)';

              return (
                <div
                  key={event.id}
                  className={`timeline-item-wrapper ${isEven ? 'timeline-item-left' : 'timeline-item-right'}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isEven ? 'flex-end' : 'flex-start',
                    position: 'relative',
                    width: '100%',
                  }}
                >
                  {/* Indicator Diamond Node with Neon Glow & Active Radar Ping */}
                  <div
                    className={`timeline-node-marker ${isActive ? 'timeline-node-marker-active' : ''}`}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '22px',
                      height: '22px',
                      backgroundColor: 'var(--bg-page)',
                      border: `2px solid ${nodeColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 5,
                      boxShadow: isActive
                        ? '0 0 14px rgba(57, 255, 20, 0.75)'
                        : isLast
                        ? '0 0 14px rgba(0, 255, 65, 0.8)'
                        : '0 0 8px rgba(0, 255, 65, 0.4)',
                    }}
                  >
                    {/* Active Radar Sonar Ping Waves */}
                    {isActive && (
                      <>
                        <span className="timeline-radar-ping" aria-hidden="true" />
                        <span className="timeline-radar-ping timeline-radar-ping-delayed" aria-hidden="true" />
                      </>
                    )}

                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: nodeColor,
                        transform: 'rotate(45deg)',
                        boxShadow: isActive
                          ? '0 0 8px var(--accent-green-bright)'
                          : '0 0 8px var(--accent-green)',
                        position: 'relative',
                        zIndex: 2,
                      }}
                    />
                  </div>

                  {/* Node Content Card */}
                  <div
                    className="timeline-card"
                    style={{
                      width: '44%',
                      backgroundColor: isActive
                        ? '#08170c'
                        : isLast
                        ? '#0b140e'
                        : 'var(--bg-card)',
                      border: isActive
                        ? '1px solid rgba(57, 255, 20, 0.45)'
                        : isLast
                        ? '1px solid rgba(0, 255, 65, 0.35)'
                        : '1px solid var(--border-default)',
                      borderLeft: isActive
                        ? '3px solid var(--accent-green-bright)'
                        : isLast
                        ? '3px solid var(--accent-green)'
                        : undefined,
                      padding: '24px 22px',
                      position: 'relative',
                      opacity: 1,
                    }}
                  >
                    {/* Date Row */}
                    <div style={{ marginBottom: '8px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '12px',
                          color: isActive ? 'var(--accent-green-bright)' : 'var(--accent-green)',
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                        }}
                      >
                        {event.dateStr}
                      </span>
                    </div>

                    {/* Milestone Title */}
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '18px',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        marginBottom: '8px',
                      }}
                    >
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '13px',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.55,
                        textAlign:'justify',
                        margin: 0,
                      }}
                    >
                      {event.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
