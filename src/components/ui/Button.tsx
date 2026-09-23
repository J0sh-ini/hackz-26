import React from 'react';
import { motion } from 'motion/react';
import { RollingText } from './RollingText';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'amber' | 'volt';
  href?: string;
  onClick?: () => void;
  className?: string;
  isExternal?: boolean;
  fullWidth?: boolean;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
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
  type = 'button',
  disabled = false,
}) => {
  const isVolt = variant === 'volt' || variant === 'amber';

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
   
    if (isVolt) {
      return {
        baseBg: '#07150a',
        borderColor: 'var(--accent-green-volt)',
        fillColor: 'var(--accent-green-volt)',
        textColor: 'var(--accent-green-volt)',
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
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        ...combinedStyles,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      className={`cyber-btn ${className}`}
      whileTap={disabled ? undefined : { scale: 0.96 }}
    >
      {content}
    </motion.button>
  );
};
