import React from 'react';
import { motion } from 'motion/react';
import { useCountdown, formatCountdownUnit } from '../../hooks/useCountdown';

interface CountdownProps {
  variant?: 'hero' | 'compact' | 'minimal';
  showLabels?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onExpire?: () => void;
}

export const Countdown: React.FC<CountdownProps> = ({
  variant = 'hero',
  showLabels = true,
  className = '',
  style,
  onExpire,
}) => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown();

  // Trigger onExpire once when expired
  React.useEffect(() => {
    if (isExpired && onExpire) {
      onExpire();
    }
  }, [isExpired, onExpire]);

  const units = [
    { label: 'DAYS', value: days, color: 'var(--accent-green)' },
    { label: 'HRS', value: hours, color: 'var(--accent-green-bright)' },
    { label: 'MIN', value: minutes, color: 'var(--accent-green-mint)' },
    { label: 'SEC', value: seconds, color: 'var(--accent-green-volt)' },
  ];

  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: variant === 'compact' ? '8px' : 'clamp(8px, 2vw, 16px)',
    fontFamily: 'var(--font-mono)',
    ...style,
  };

  const unitStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '4px',
    minWidth: variant === 'compact' ? '48px' : 'clamp(56px, 10vw, 72px)',
  };

  const valueStyles: React.CSSProperties = {
    fontSize: variant === 'hero' ? 'clamp(32px, 5vw, 56px)' : variant === 'compact' ? '20px' : '16px',
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: '0.02em',
    fontVariantNumeric: 'tabular-nums',
  };

  const labelStyles: React.CSSProperties = {
    fontSize: variant === 'hero' ? '11px' : '9px',
    fontWeight: 500,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    opacity: 0.7,
  };

  if (isExpired) {
    return (
      <div
        style={{
          ...baseStyles,
          color: 'var(--accent-green)',
          fontSize: variant === 'hero' ? 'clamp(20px, 4vw, 28px)' : '16px',
        }}
        className={className}
      >
        HACKZ'26 IS LIVE!
      </div>
    );
  }

  return (
    <motion.div
      style={baseStyles}
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {units.map((unit, idx) => (
        <motion.div
          key={unit.label}
          style={{
            ...unitStyles,
            borderLeft: idx > 0 ? '1px solid var(--border-default)' : 'none',
            paddingLeft: idx > 0 ? (variant === 'compact' ? '8px' : 'clamp(10px, 2vw, 20px)') : 0,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: idx * 0.08, ease: 'easeOut' }}
        >
          <span
            style={{
              ...valueStyles,
              color: unit.color,
              textShadow: `0 0 12px ${unit.color}40`,
            }}
            aria-label={`${unit.value} ${unit.label.toLowerCase()}`}
          >
            {formatCountdownUnit(unit.value)}
          </span>
          {showLabels && (
            <span style={{ ...labelStyles, color: unit.color }}>{unit.label}</span>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Compact inline countdown for navbar or sticky CTA
export const CompactCountdown: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = '', style }) => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown();

  if (isExpired) {
    return <span className={className} style={{ color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', fontSize: '12px', ...style }}>LIVE NOW</span>;
  }

  return (
    <span
      className={className}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        letterSpacing: '0.08em',
        color: 'var(--accent-green)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        ...style,
      }}
    >
      <span style={{ color: 'var(--text-secondary)' }}>T-</span>
      {days > 0 ? `${days}d ` : ''}
      {formatCountdownUnit(hours)}:{formatCountdownUnit(minutes)}:{formatCountdownUnit(seconds)}
    </span>
  );
};