import React from 'react';
import { SOCIAL_LINKS } from '../../data/contact';
import { RollingText } from '../ui/RollingText';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-default)',
        backgroundColor: 'var(--bg-page)',
        paddingTop: '28px',
        paddingBottom: '28px',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        {/* Left */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--text-secondary)',
            letterSpacing: '0.05em',
          }}
        >
          HackZ '24 — CSEA-CEG
        </div>

        {/* Center */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--text-muted)',
          }}
        >
          &copy; 2024 CSEA. All rights reserved.
        </div>

        {/* Right */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
          }}
        >
          {SOCIAL_LINKS.map((link) => (
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
              }}
              className="nav-link-item subtle-roll-link"
            >
              <span className="subtle-link-fill" aria-hidden="true" />
              <span style={{ position: 'relative', zIndex: 2, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                {link.name === 'Instagram' && (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                )}
                {link.name === 'LinkedIn' && (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                )}
                {link.name === 'CSEA Official' && (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                )}
                <RollingText
                  text={link.name}
                  baseColor="var(--text-secondary)"
                  hoverColor="var(--accent-green)"
                  stagger={0.015}
                />
              </span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
