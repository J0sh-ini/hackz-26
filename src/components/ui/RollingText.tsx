import React from 'react';

interface RollingTextProps {
  text: string;
  baseColor?: string;
  hoverColor?: string;
  className?: string;
  stagger?: number;
}

export const RollingText: React.FC<RollingTextProps> = ({
  text,
  baseColor,
  hoverColor = '#050505',
  className = '',
  stagger = 0.02,
}) => {
  const chars = Array.from(text);

  return (
    <span
      className={`rolling-text-track ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none',
      }}
      aria-label={text}
    >
      {chars.map((char, index) => {
        const isSpace = char === ' ';
        const delay = `${index * stagger}s`;

        return (
          <span
            key={index}
            className="roll-char-slot"
            style={{
              display: 'inline-block',
              position: 'relative',
              overflow: 'hidden',
              height: '1.25em',
              lineHeight: '1.25em',
              verticalAlign: 'middle',
              width: isSpace ? '0.35em' : 'auto',
            }}
          >
            {/* Primary Char (visible by default, rolls up on hover) */}
            <span
              className="roll-char roll-char-primary"
              style={{
                display: 'inline-block',
                color: baseColor || 'inherit',
                transitionDelay: delay,
              }}
            >
              {isSpace ? '\u00A0' : char}
            </span>

            {/* Secondary Char (starts offset below, rolls up to view on hover) */}
            <span
              className="roll-char roll-char-secondary"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                display: 'inline-block',
                color: hoverColor,
                transitionDelay: delay,
              }}
              aria-hidden="true"
            >
              {isSpace ? '\u00A0' : char}
            </span>
          </span>
        );
      })}
    </span>
  );
};
