import React from 'react';
import { motion, type Variants } from 'motion/react';
import { TRACKS, Track } from '../../data/tracks';
import { TrackIcon } from '../ui/TrackIcon';

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

export const Tracks: React.FC = () => {
  return (
    <section
      id="tracks"
      className="py-[100px] max-md:py-16 relative"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-page)',
        borderTop: '1px solid var(--border-default)',
        overflow: 'hidden',
      }}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 max-md:px-4 relative" style={{ zIndex: 10 }}>
        {/* Header */}
        <div style={{ marginBottom: '52px' }}>
          <div className="font-mono text-[13px] text-accent-green uppercase tracking-[0.15em] mb-3 flex items-center gap-2">
            <span>// 02</span>
            <span>CHALLENGE DOMAINS</span>
          </div>
          <h2 className="text-[clamp(32px,5vw,56px)] font-extrabold tracking-tight uppercase mb-6">MISSION TRACKS</h2>
          <p style={{ maxWidth: '640px', fontSize: '16px' }}>
            Choose an operational theater. Each domain addresses pressing technical, industrial, and societal challenges requiring scalable, high-impact prototypes.
          </p>
        </div>

        {/* Tracks Grid */}
        <motion.div
          className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {TRACKS.map((track: Track) => {
            const isSpecial = track.isSpecial;
            const accent = track.accentColor || (isSpecial ? 'var(--accent-green-volt)' : 'var(--accent-green)');

            return (
              <motion.div
                key={track.id}
                variants={cardVariants}
                whileHover={{ y: -4, backgroundColor: 'var(--bg-card-hover)', borderColor: accent }}
                transition={{ duration: 0.2 }}
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: isSpecial ? `1px solid ${accent}` : '1px solid var(--border-default)',
                  borderTop: `2px solid ${accent}`,
                  padding: '32px 28px 36px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                  transition: 'border-color 0.2s ease, transform 0.2s ease',
                }}
              >
                {/* Card Top Row: Icon + Track Number */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginBottom: '28px',
                  }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#070707',
                      border: `1px solid ${accent}40`,
                      boxShadow: `0 0 12px ${accent}20`,
                    }}
                  >
                    <TrackIcon type={track.iconType} color={accent} size={36} />
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: accent,
                      letterSpacing: '0.1em',
                      backgroundColor: `${accent}15`,
                      border: `1px solid ${accent}35`,
                      padding: '3px 8px',
                    }}
                  >
                    {isSpecial ? track.specialLabel : track.number}
                  </span>
                </div>

                {/* Track Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '22px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '12px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {track.name}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    flexGrow: 1,
                  }}
                >
                  {track.description}
                </p>

                {/* Bottom Animating Bar */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: '2px',
                    backgroundColor: accent,
                    boxShadow: `0 0 8px ${accent}`,
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

