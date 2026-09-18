import { useEffect, useRef, ElementType, ComponentPropsWithoutRef } from 'react';
import { animate, scrambleText } from 'animejs';

export interface ScrambleTextProps<T extends ElementType = 'span'> {
  text: string;
  chars?: string;
  from?: 'left' | 'right' | 'center' | 'random';
  duration?: number;
  easing?: string;
  as?: T;
  className?: string;
  triggerKey?: unknown;
  threshold?: number;
}

export default function ScrambleText<T extends ElementType = 'span'>({
  text,
  chars = 'a-zA-Z0-9!@#$',
  from = 'left',
  duration = 1200,
  easing = 'easeInOutQuad',
  as,
  className = '',
  triggerKey,
  threshold = 0.2,
  ...props
}: ScrambleTextProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ScrambleTextProps<T>>) {
  const Tag = as || 'span';
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    let anim: ReturnType<typeof animate> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          anim = animate(el, {
            innerHTML: scrambleText({ text, chars, from }),
            duration,
            easing,
            perturbation:0.2
          });
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (anim) {
        anim.pause();
      }
    };
  }, [text, chars, from, duration, easing, triggerKey, threshold]);

  return (
    <Tag ref={elementRef} className={className} {...props}>
      {text}
    </Tag>
  );
}