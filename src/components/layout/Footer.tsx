import React from 'react';
import { SOCIAL_LINKS } from '../../data/contact';
import { RollingText } from '../ui/RollingText';
import { DeveloperProfileView } from '../ui/DeveloperProfileView';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 50,
        borderTop: '1px solid var(--border-default)',
        backgroundColor: 'var(--bg-page)',
        paddingTop: '28px',
        paddingBottom: '28px',
      }}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 max-md:px-4 flex items-center justify-between flex-wrap gap-6 max-sm:flex-col max-sm:items-center max-sm:text-center">
        {/* Left */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--text-secondary)',
            letterSpacing: '0.05em',
          }}
        >
          HACKZ'26 — CSEA-CEG
        </div>

        {/* Center */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--text-muted)',
          }}
        >
          &copy; 2026 CSEA. All rights reserved.
        </div>

        {/* Right: Developer Profile & Social Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}
          className="max-sm:justify-center max-sm:flex-col"
        >
          {/* Developer Profile View */}
          <DeveloperProfileView />

          {/* Subtle Cyber Separator */}
          <div
            style={{
              width: '1px',
              height: '16px',
              backgroundColor: 'var(--border-default)',
            }}
            className="max-sm:hidden"
            aria-hidden="true"
          />

          {/* Social Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {SOCIAL_LINKS.map((link) => {
              const platformColors: Record<string, { color: string; bg: string }> = {
                Instagram: { color: '#E1306C', bg: 'rgba(225, 48, 108, 0.12)' },
                LinkedIn: { color: '#0A66C2', bg: 'rgba(10, 102, 194, 0.14)' },
                Website: { color: '#00ff41', bg: 'rgba(0, 255, 65, 0.12)' },
              };
              const config = platformColors[link.name] ?? { color: 'var(--accent-green)', bg: 'rgba(0, 255, 65, 0.07)' };

              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 6px',
                    '--hover-color': config.color,
                    '--hover-fill-bg': config.bg,
                    '--hover-fill-border': config.color,
                    transition: 'color 0.2s ease',
                  } as React.CSSProperties}
                  className={`nav-link-item subtle-roll-link social-link--${link.name.toLowerCase()}`}
                >
                  <span className="subtle-link-fill" aria-hidden="true" />
                  <span style={{ position: 'relative', zIndex: 2, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    {link.name === 'Instagram' && (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transition: 'stroke 0.2s ease' }}>
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    )}
                    {link.name === 'LinkedIn' && (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transition: 'stroke 0.2s ease' }}>
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    )}
                    {link.name === 'Website' && (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transition: 'stroke 0.2s ease' }}>
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z" />
                      </svg>
                    )}
                    <RollingText
                      text={link.name}
                      baseColor="var(--text-secondary)"
                      hoverColor={config.color}
                      stagger={0.015}
                    />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};
