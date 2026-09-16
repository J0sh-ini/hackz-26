import React from 'react';
import { motion } from 'motion/react';
import { RollingText } from './RollingText';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'amber';
  href?: string;
  onClick?: () => void;
  className?: string;
  isExternal?: boolean;
  fullWidth?: boolean;
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  isExternal = false,
  fullWidth = false,
  style,
}) => {
  const isPrimary = variant === 'primary';
  const isAmber = variant === 'amber';

  const baseStyles: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    isolation: 'isolate',
    fontFamily: 'var(--font-mono)',
    fontSize: '14px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    padding: '14px 28px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    cursor: 'pointer',
    width: fullWidth ? '100%' : 'auto',
    minHeight: '48px',
    textDecoration: 'none',
    userSelect: 'none',
  };

  const getVariantConfig = () => {
    if (isPrimary) {
      return {
        baseBg: '#09150d',
        borderColor: 'var(--accent-green)',
        fillColor: 'var(--accent-green)',
        textColor: 'var(--accent-green)',
        hoverTextColor: '#050505',
      };
    }
    if (isAmber) {
      return {
        baseBg: '#140f04',
        borderColor: 'var(--accent-amber)',
        fillColor: 'var(--accent-amber)',
        textColor: 'var(--accent-amber)',
        hoverTextColor: '#050505',
      };
    }
    // Outline
    return {
      baseBg: 'transparent',
      borderColor: 'var(--accent-green)',
      fillColor: 'var(--accent-green)',
      textColor: 'var(--accent-green)',
      hoverTextColor: '#050505',
    };
  };

  const { baseBg, borderColor, fillColor, textColor, hoverTextColor } = getVariantConfig();

  const combinedStyles: React.CSSProperties = {
    ...baseStyles,
    backgroundColor: baseBg,
    border: `1px solid ${borderColor}`,
    color: textColor,
    ...style,
  };

  const content = (
    <>
      {/* Top-Left to Bottom-Right Diagonal Fill Layer */}
      <span
        className="btn-diagonal-fill"
        style={{
          backgroundColor: fillColor,
        }}
        aria-hidden="true"
      />

      {/* Button Content with Staggered Rolling Text */}
      <span
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        {typeof children === 'string' ? (
          <RollingText
            text={children}
            baseColor={textColor}
            hoverColor={hoverTextColor}
          />
        ) : (
          children
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        style={combinedStyles}
        className={`cyber-btn ${className}`}
        whileTap={{ scale: 0.96 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      style={combinedStyles}
      className={`cyber-btn ${className}`}
      whileTap={{ scale: 0.96 }}
    >
      {content}
    </motion.button>
  );
};
