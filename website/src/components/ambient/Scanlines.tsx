import React from 'react';

interface ScanlinesProps {
  opacity?: number;
  className?: string;
}

export const Scanlines: React.FC<ScanlinesProps> = ({ opacity = 0.25, className = '' }) => {
  return (
    <div
      className={`scanline-overlay ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
};
