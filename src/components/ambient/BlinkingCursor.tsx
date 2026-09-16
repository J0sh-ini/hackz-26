import React from 'react';
import { motion } from 'motion/react';

interface BlinkingCursorProps {
  color?: string;
  char?: string;
  className?: string;
}

export const BlinkingCursor: React.FC<BlinkingCursorProps> = ({
  color = 'var(--accent-green)',
  char = '▌',
  className = '',
}) => {
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      style={{
        color,
        fontFamily: 'var(--font-mono)',
        display: 'inline-block',
        marginLeft: '2px',
      }}
      className={className}
      aria-hidden="true"
    >
      {char}
    </motion.span>
  );
};
