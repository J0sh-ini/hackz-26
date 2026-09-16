import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ItemConfig {
  text: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  fontSize?: string;
  duration?: number;
  delay?: number;
}

interface FloatingDecorationsProps {
  items?: ItemConfig[];
  className?: string;
}

const DEFAULT_ITEMS: ItemConfig[] = [
  { text: '0x4861636B5A', top: '15%', left: '4%', fontSize: '13px', duration: 9 },
  { text: '01001000 01100001', top: '75%', left: '8%', fontSize: '11px', duration: 11, delay: 1 },
  { text: 'FF A3 00 2B C7', top: '25%', right: '5%', fontSize: '12px', duration: 10, delay: 0.5 },
  { text: '192.168.0.1:443', top: '65%', right: '6%', fontSize: '12px', duration: 12, delay: 2 },
  { text: '$ whoami // root', top: '45%', left: '48%', fontSize: '11px', duration: 8, delay: 1.5 },
];

export const FloatingDecorations: React.FC<FloatingDecorationsProps> = ({
  items = DEFAULT_ITEMS,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const elements = containerRef.current.querySelectorAll('.floating-item');

    const tweens: gsap.core.Tween[] = [];

    elements.forEach((el, index) => {
      const config = items[index] || {};
      const duration = config.duration || 8 + (index % 4) * 2;
      const delay = config.delay || (index % 3) * 0.7;

      const tween = gsap.to(el, {
        y: -30,
        duration,
        delay,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
      tweens.push(tween);
    });

    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, [items]);

  return (
    <div
      ref={containerRef}
      className={`floating-decorations-container ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      {items.map((item, idx) => (
        <span
          key={idx}
          className="floating-item"
          style={{
            position: 'absolute',
            top: item.top,
            bottom: item.bottom,
            left: item.left,
            right: item.right,
            fontFamily: 'var(--font-mono)',
            fontSize: item.fontSize || '12px',
            color: 'var(--accent-green)',
            opacity: 0.05,
            letterSpacing: '0.1em',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {item.text}
        </span>
      ))}
    </div>
  );
};
