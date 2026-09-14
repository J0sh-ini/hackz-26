import React from 'react';

interface SectionDividerProps {
  label?: string;
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ label, className = '' }) => {
  return (
    <div
      className={`section-divider ${className}`}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '24px 0',
        color: '#1a1a1a',
        userSelect: 'none',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {label ? (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--accent-green-dim)',
            letterSpacing: '0.15em',
            whiteSpace: 'nowrap',
          }}
        >
          // {label}
        </span>
      ) : null}
      <div
        style={{
          flex: 1,
          height: '1px',
          backgroundColor: 'var(--border-default)',
        }}
      />
    </div>
  );
};
