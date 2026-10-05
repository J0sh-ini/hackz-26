'use client';

import React, { useState, Suspense, lazy } from 'react';

// Lazy-load FolderFloat so matter-js is only fetched on click/interaction
const FolderFloat = lazy(() => import('./FolderFloat'));
import ProfileCard from './ProfileCard';
import { DEVELOPERS } from '../../data/developers';
import { RollingText } from './RollingText';

export const DeveloperProfileView: React.FC = () => {
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Clear active card if window resizes to desktop
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setActiveCardIndex(null);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCardClick = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    // Only toggle card selection on mobile screens (<= 640px)
    if (typeof window !== 'undefined' && window.innerWidth <= 640) {
      setActiveCardIndex(prev => (prev === idx ? null : idx));
    }
  };

  const handleCardKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (typeof window !== 'undefined' && window.innerWidth <= 640) {
        e.preventDefault();
        e.stopPropagation();
        setActiveCardIndex(prev => (prev === idx ? null : idx));
      }
    }
  };

  const renderTriggerButton = (open: boolean, toggle: () => void) => (
    <button
      type="button"
      onClick={toggle}
      onMouseEnter={() => setHasInteracted(true)}
      onFocus={() => setHasInteracted(true)}
      aria-expanded={open}
      aria-label="Developer Profiles"
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        color: open ? 'var(--accent-green)' : 'var(--text-secondary)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 6px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        position: 'relative',
      }}
      className="nav-link-item subtle-roll-link"
    >
      <span className="subtle-link-fill" aria-hidden="true" />
      <span style={{ position: 'relative', zIndex: 2, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke={open ? 'var(--accent-green)' : 'currentColor'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transition: 'stroke 0.2s ease, transform 0.25s ease',
            transform: open ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
        <RollingText
          text="Dev Team"
          baseColor={open ? 'var(--accent-green)' : 'var(--text-secondary)'}
          hoverColor="var(--accent-green)"
          stagger={0.015}
        />
      </span>
    </button>
  );

  if (!hasInteracted) {
    return renderTriggerButton(false, () => {
      setHasInteracted(true);
      setIsOpen(true);
    });
  }

  return (
    <Suspense fallback={renderTriggerButton(isOpen, () => setIsOpen(prev => !prev))}>
      <FolderFloat
        trigger="click"
        physics={false}
        bounce={0.35}
        className="folder-float--link"
        isOpen={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) setActiveCardIndex(null);
        }}
        renderTrigger={({ open, toggle }) => renderTriggerButton(open, toggle)}
        cards={
          <>
            {DEVELOPERS.map((dev, idx) => {
              const isLeft = idx === 0;
              const isActive = activeCardIndex === idx;
              const isInactive = activeCardIndex !== null && !isActive;
              return (
                <div
                  key={dev.name}
                  role="button"
                  tabIndex={0}
                  onClick={(e) => handleCardClick(e, idx)}
                  onKeyDown={(e) => handleCardKeyDown(e, idx)}
                  className={`folder-float__card ${
                    isLeft ? 'folder-float__card--0' : 'folder-float__card--1'
                  } ${isActive ? 'folder-float__card--active' : ''} ${
                    isInactive ? 'folder-float__card--inactive' : ''
                  }`}
                >
                  <ProfileCard
                    name={dev.name}
                    avatarUrl={dev.avatarUrl}
                    githubUrl={dev.githubUrl}
                    linkedinUrl={dev.linkedinUrl}
                    behindGlowColor={isLeft ? 'rgba(0, 255, 65, 0.5)' : 'rgba(57, 255, 20, 0.5)'}
                    innerGradient="linear-gradient(145deg, rgba(0, 255, 65, 0.16) 0%, rgba(10, 26, 14, 0.85) 50%, rgba(0, 0, 0, 0.95) 100%)"
                    cardHeight="330px"
                    maxHeight="340px"
                    cardWidth="236px"
                    enableTilt={true}
                    enableMobileTilt={true}
                  />
                </div>
              );
            })}
          </>
        }
      />
    </Suspense>
  );
};

export default DeveloperProfileView;
