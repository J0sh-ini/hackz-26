import React, { useState, useRef, useEffect, useCallback } from 'react';

interface ScrambleTitleProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span';
  className?: string;
  style?: React.CSSProperties;
  trigger?: boolean;
}

const GLYPHS = '!@#$%^&*()_+-=<>?/[]{}0123456789ABCDEF';

export const ScrambleTitle: React.FC<ScrambleTitleProps> = ({
  text,
  as: Component = 'h3',
  className,
  style,
  trigger,
}) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const animFrameRef = useRef<number | null>(null);
  const isRunningRef = useRef<boolean>(false);
  const prevTriggerRef = useRef<boolean>(false);

  const startScramble = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    isRunningRef.current = true;

    const startTime = performance.now();
    const duration = 400; // 0.4s total per v3 spec

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Characters up to resolvedIndex lock in; remaining characters randomize
      const resolvedIndex = Math.floor(progress * text.length);

      let scrambled = '';
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          scrambled += ' ';
        } else if (i < resolvedIndex) {
          scrambled += text[i];
        } else {
          scrambled += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      setDisplayText(scrambled);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(update);
      } else {
        setDisplayText(text);
        isRunningRef.current = false;
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(update);
  }, [text]);

  // Only trigger on rising edge (when trigger transitions from false to true)
  useEffect(() => {
    if (trigger && !prevTriggerRef.current) {
      startScramble();
    }
    prevTriggerRef.current = Boolean(trigger);
  }, [trigger, startScramble]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <Component
      className={className}
      style={{
        ...style,
        cursor: 'default',
        userSelect: 'none',
      }}
      onMouseEnter={startScramble}
    >
      {displayText}
    </Component>
  );
};
