import { useEffect, useState, useCallback } from 'react';

interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  totalSeconds: number;
}

const TARGET_DATE = new Date('2026-12-12T00:00:00+05:30').getTime(); // IST: Dec 12, 2026 00:00

export function useCountdown(targetDate: number = TARGET_DATE): CountdownResult {
  const calculate = useCallback(() => {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, totalSeconds: 0 };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isExpired: false, totalSeconds: Math.floor(diff / 1000) };
  }, [targetDate]);

  const [countdown, setCountdown] = useState<CountdownResult>(calculate);

  useEffect(() => {
    // Initial calculation
    setCountdown(calculate());

    // Use requestAnimationFrame for smooth updates
    let rafId: number;
    let lastUpdate = 0;

    const tick = (timestamp: number) => {
      // Throttle to ~1 second updates
      if (timestamp - lastUpdate >= 1000) {
        const next = calculate();
        setCountdown(next);
        lastUpdate = timestamp;

        if (next.isExpired) {
          return; // Stop updating when expired
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [calculate]);

  return countdown;
}

export function formatCountdownUnit(value: number): string {
  return value.toString().padStart(2, '0');
}