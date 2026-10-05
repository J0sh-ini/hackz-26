'use client';

import React from 'react';
import FolderFloat from './FolderFloat';
import ProfileCard from './ProfileCard';
import { DEVELOPERS } from '../../data/developers';

export const DeveloperProfileView: React.FC = () => {
  const [activeCardIndex, setActiveCardIndex] = React.useState<number | null>(null);

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

  return (
    <FolderFloat
      trigger="click"
      physics={false}
      bounce={0.35}
      width={80}
      height={54}
      radius={8}
      label="DEV"
      sublabel=""
      folderColor="#0d1710"
      frontColor="#122316"
      paperColor="#0c3819"
      labelColor="#00ff41"
      onOpenChange={(open) => {
        if (!open) setActiveCardIndex(null);
      }}
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
  );
};

export default DeveloperProfileView;
