import React, { useEffect, useRef, useState } from 'react';
import { animate, svg } from 'animejs';

interface WireConfig {
  id: string;
  d: string;
  endX: number;
  endY: number;
  padRadius: number;
}

const CIRCUIT_WIRES: WireConfig[] = [
  // Top quadrant wires
  { id: 'c-wire-0', d: 'M 160,120 L 160,90 L 120,50 L 40,50', endX: 40, endY: 50, padRadius: 4 },
  { id: 'c-wire-1', d: 'M 180,120 L 180,70 L 220,30 L 340,30', endX: 340, endY: 30, padRadius: 4 },
  { id: 'c-wire-2', d: 'M 200,120 L 200,90 L 240,50 L 320,50', endX: 320, endY: 50, padRadius: 3.5 },

  // Left quadrant wires
  { id: 'c-wire-3', d: 'M 140,140 L 100,140 L 60,100 L 30,100', endX: 30, endY: 100, padRadius: 3.5 },
  { id: 'c-wire-4', d: 'M 140,160 L 80,160 L 40,160 L 20,180 L 20,240', endX: 20, endY: 240, padRadius: 4 },
  { id: 'c-wire-5', d: 'M 140,180 L 100,180 L 60,220 L 30,220', endX: 30, endY: 220, padRadius: 3.5 },
  { id: 'c-wire-6', d: 'M 140,200 L 80,200 L 50,230 L 50,290 L 100,310', endX: 100, endY: 310, padRadius: 4 },

  // Bottom quadrant wires
  { id: 'c-wire-7', d: 'M 160,220 L 160,250 L 120,290 L 50,290', endX: 50, endY: 290, padRadius: 3.5 },
  { id: 'c-wire-8', d: 'M 180,220 L 180,270 L 200,290 L 200,320', endX: 200, endY: 320, padRadius: 4 },
  { id: 'c-wire-9', d: 'M 220,220 L 220,270 L 260,310 L 330,310', endX: 330, endY: 310, padRadius: 4 },

  // Right quadrant wires
  { id: 'c-wire-10', d: 'M 240,140 L 280,140 L 330,90 L 360,90', endX: 360, endY: 90, padRadius: 3.5 },
  { id: 'c-wire-11', d: 'M 240,160 L 300,160 L 340,160 L 360,180 L 360,240', endX: 360, endY: 240, padRadius: 4 },
  { id: 'c-wire-12', d: 'M 240,180 L 280,180 L 320,220 L 350,220', endX: 350, endY: 220, padRadius: 3.5 },
  { id: 'c-wire-13', d: 'M 240,200 L 300,200 L 330,230 L 330,270', endX: 330, endY: 270, padRadius: 3.5 },
];

const PACKET_COUNT = 6;

export const CircuitBoard: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeWiresRef = useRef<Set<number>>(new Set());
  const packetPoolIndexRef = useRef<number>(0);
  const activateWireRef = useRef<((idx: number) => void) | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const isPausedRef = useRef<boolean>(false);
  const [pauseMessage, setPauseMessage] = useState<string | null>(null);

  // Manage pause sequence and warning message popups
  useEffect(() => {
    isPausedRef.current = isPaused;

    if (!isPaused) {
      setPauseMessage(null);
      return;
    }

    // 1. Clear all active wires and reset strokes/packets immediately
    activeWiresRef.current.clear();
    const container = containerRef.current;
    if (container) {
      container.querySelectorAll<SVGPathElement>('.circuit-wires-base path').forEach((el) => {
        el.style.stroke = 'rgba(0, 255, 65, 0.22)';
        el.style.strokeWidth = '1.6px';
      });
      container.querySelectorAll<SVGPathElement>('.circuit-wires-active path').forEach((el) => {
        el.style.opacity = '0';
      });
      container.querySelectorAll<HTMLElement>('.circuit-packet').forEach((el) => {
        el.style.opacity = '0';
      });
    }

    // Step 1: "Pausing HackZ Main Core ........." (wait 3 sec)
    setPauseMessage('Pausing HackZ Main Core .........');

    // Step 2: "Energy Overload ........" (wait 2 sec)
    const timer1 = window.setTimeout(() => {
      setPauseMessage('Energy Overload ........');
    }, 3000);

    // Step 3: "Error: Failed to Stop HackZ ..." (wait 2 sec then disappears and auto plays)
    const timer2 = window.setTimeout(() => {
      setPauseMessage('Error: Failed to Stop HackZ .......');
    }, 5000);
    const timer3 = window.setTimeout(() => {
      setPauseMessage('Reinitailizing HackZ Main Core .......');
    }, 7000);
    // After 7 seconds total (3 + 2 + 2), message disappears and animation resumes
    const timer4 = window.setTimeout(() => {
      setPauseMessage(null);
      setIsPaused(false);
    }, 9000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isPaused]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isDestroyed = false;
    let timerId: number | undefined;

    // Animate central chip heartbeat LED
    const chipLed = container.querySelector('#chip-heartbeat-led');
    if (chipLed) {
      animate(chipLed, {
        opacity: [0.35, 1, 0.35],
        r: [2.5, 3.8, 2.5],
        ease: 'inOutQuad',
        duration: 1400,
        loop: true,
      });
    }

    // Function to activate a specific random circuit wire using animejs createMotionPath & createDrawable
    const activateWire = (wireIdx: number) => {
      if (isDestroyed || isPausedRef.current) return;
      if (activeWiresRef.current.has(wireIdx)) return;

      activeWiresRef.current.add(wireIdx);

      const wire = CIRCUIT_WIRES[wireIdx];
      const baseWireEl = container.querySelector<SVGPathElement>(`#${wire.id}`);
      const activeTraceEl = container.querySelector<SVGPathElement>(`#${wire.id}-active`);
      const padEl = container.querySelector<SVGCircleElement>(`#pad-${wire.id}`);

      // Allocate one of the reusable packet pulse elements
      const packetIdx = packetPoolIndexRef.current;
      packetPoolIndexRef.current = (packetPoolIndexRef.current + 1) % PACKET_COUNT;
      const packetEl = container.querySelector<HTMLElement>(`#circuit-packet-${packetIdx}`);

      if (!baseWireEl || !activeTraceEl) {
        activeWiresRef.current.delete(wireIdx);
        return;
      }

      const duration = 850 + Math.floor(Math.random() * 850);

      // Function to execute the return trace back to starting point after 0.5s pause
      const startReturnTrace = () => {
        if (isDestroyed || isPausedRef.current) {
          activeWiresRef.current.delete(wireIdx);
          return;
        }

        // 1. Light up base wire on return
        animate(baseWireEl, {
          stroke: ['rgba(0, 255, 65, 0.22)', '#39ff14', 'rgba(0, 255, 65, 0.22)'],
          strokeWidth: [1.6, 2.4, 1.6],
          duration,
          ease: 'linear',
        });

        // 2. Line drawing animation tracing back from endpoint to start
        activeTraceEl.style.opacity = '1';
        try {
          const drawables = svg.createDrawable(activeTraceEl);
          animate(drawables, {
            draw: ['1 1', '0 1'],
            duration,
            ease: 'linear',
            onComplete: () => {
              activeTraceEl.style.opacity = '0';
            },
          });
        } catch {
          animate(activeTraceEl, {
            opacity: [1, 0],
            duration,
            ease: 'linear',
          });
        }

        // 3. Move packet in reverse back to starting point
        if (packetEl) {
          packetEl.style.opacity = '1';
          try {
            animate(packetEl, {
              ...svg.createMotionPath(baseWireEl),
              reversed: true,
              duration,
              ease: 'linear',
              onComplete: () => {
                if (isDestroyed) return;
                packetEl.style.opacity = '0';
                activeTraceEl.style.opacity = '0';
                activeWiresRef.current.delete(wireIdx);
              },
            });
          } catch {
            packetEl.style.opacity = '0';
            activeTraceEl.style.opacity = '0';
            activeWiresRef.current.delete(wireIdx);
          }
        } else {
          setTimeout(() => {
            if (isDestroyed) return;
            activeTraceEl.style.opacity = '0';
            activeWiresRef.current.delete(wireIdx);
          }, duration);
        }
      };

      // ── Step 1: Forward transmission to endpoint ──
      // 1. Light up base wire
      animate(baseWireEl, {
        stroke: ['rgba(0, 255, 65, 0.22)', '#39ff14'],
        strokeWidth: [1.6, 2.4],
        duration,
        ease: 'linear',
      });

      // 2. Line drawing forward from start to endpoint
      activeTraceEl.style.opacity = '1';
      try {
        const drawables = svg.createDrawable(activeTraceEl);
        animate(drawables, {
          draw: ['0 0', '0 1'],
          duration,
          ease: 'linear',
        });
      } catch {
        animate(activeTraceEl, {
          opacity: [0, 1],
          duration,
          ease: 'linear',
        });
      }

      // 3. Move packet forward to endpoint
      if (packetEl) {
        packetEl.style.opacity = '1';
        try {
          animate(packetEl, {
            ...svg.createMotionPath(baseWireEl),
            duration,
            ease: 'linear',
            onComplete: () => {
              if (isDestroyed) return;

              // Reached endpoint: hide green line and packet immediately
              activeTraceEl.style.opacity = '0';
              packetEl.style.opacity = '0';

              // Dim base wire back to idle
              animate(baseWireEl, {
                stroke: 'rgba(0, 255, 65, 0.22)',
                strokeWidth: 1.6,
                duration: 150,
                ease: 'linear',
              });

              // Pulse terminal pad on arrival
              if (padEl) {
                animate(padEl, {
                  r: [wire.padRadius, wire.padRadius * 1.7, wire.padRadius],
                  fill: ['#00ff41', '#ffffff', '#39ff14', '#00ff41'],
                  duration: 400,
                  ease: 'outBack',
                });
              }

              // Wait 0.5 second before tracing back to start
              setTimeout(startReturnTrace, 800);
            },
          });
        } catch {
          activeTraceEl.style.opacity = '0';
          packetEl.style.opacity = '0';
          setTimeout(startReturnTrace, 800);
        }
      } else {
        setTimeout(() => {
          activeTraceEl.style.opacity = '0';
          if (isDestroyed)
            {
              
              return;
            } 
          setTimeout(startReturnTrace, 800);
        }, duration);
      }
    };

    activateWireRef.current = activateWire;

    // Trigger random wire activations at random time intervals
    const scheduleNextActivation = () => {
      if (isDestroyed || isPausedRef.current) return;

      // Random delay between 400ms and 1100ms
      const delay = 450 + Math.random() * 650;

      timerId = window.setTimeout(() => {
        if (isDestroyed || isPausedRef.current) return;

        // Choose 1 or 2 random wires that are not currently active
        const availableWires = CIRCUIT_WIRES.map((_, i) => i).filter(
          (i) => !activeWiresRef.current.has(i)
        );

        if (availableWires.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableWires.length);
          activateWire(availableWires[randomIndex]);

          // 40% probability of simultaneous parallel transmission on another wire
          if (Math.random() < 0.4 && availableWires.length > 1) {
            const secondIndex = (randomIndex + 1 + Math.floor(Math.random() * (availableWires.length - 1))) % availableWires.length;
            setTimeout(() => {
              if (!isDestroyed && !isPausedRef.current) activateWire(availableWires[secondIndex]);
            }, 120);
          }
        }

        scheduleNextActivation();
      }, delay);
    };

    // Initial burst of activations
    setTimeout(() => activateWire(0), 300);
    setTimeout(() => activateWire(4), 250);
    setTimeout(() => activateWire(10), 500);

    scheduleNextActivation();

    return () => {
      isDestroyed = true;
      if (timerId) clearTimeout(timerId);
    };
  }, [isPaused]);

  return (
    <div
      className={`bg-black relative w-full max-w-[420px] mx-auto flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* HUD Telemetry Sub-badge */}
      {/* <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: 'var(--accent-green-bright)',
          letterSpacing: '0.12em',
          backgroundColor: 'rgba(0, 20, 10, 0.75)',
          border: '1px solid rgba(0, 255, 65, 0.3)',
          padding: '3px 10px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          marginBottom: '16px',
          alignSelf: 'flex-start',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: '6px',
            height: '6px',
            backgroundColor: '#39ff14',
            boxShadow: '0 0 6px #39ff14',
          }}
        />
        <span>CIRCUIT TELEMETRY // {activeWireCount > 0 ? `BUS_${activeWireCount}_ACTIVE` : 'STANDBY'}</span>
      </div>

      {/* SVG Motion Path Stage with exact 1:1 coordinate alignment */}
      <div
        ref={containerRef}
        id="svg-createmotionpath"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '380px',
          aspectRatio: '380 / 340',
        }}
      >
        <svg
          viewBox="0 0 380 340"
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            stroke: 'var(--accent-green)',
            fill: 'none',
            overflow: 'visible',
          }}
          aria-label="Interactive animated circuit board illustration"
        >
        <defs>
          {/* Intense neon green glow for active sparks & packets */}
          <filter id="circuit-pulse-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Intense red glow for paused LED & chip */}
          <filter id="circuit-pulse-glow-red" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Wire active aura */}
          <filter id="wire-neon-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Radial gradient for central microcontroller */}
          <radialGradient id="chip-bg-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#082212" />
            <stop offset="100%" stopColor="#020a05" />
          </radialGradient>

          {/* Radial gradient for central microcontroller when paused (red) */}
          <radialGradient id="chip-bg-gradient-red" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2e0a0a" />
            <stop offset="100%" stopColor="#0d0202" />
          </radialGradient>
        </defs>

        {/* ── Base Circuit Wires (Idle layer) ─────────────────────────────────── */}
        <g className="circuit-wires-base">
          {CIRCUIT_WIRES.map((wire, idx) => (
            <path
              key={wire.id}
              id={wire.id}
              d={wire.d}
              stroke="rgba(0, 255, 65, 0.22)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              style={{ transition: 'stroke 0.2s ease, stroke-width 0.2s ease', cursor: 'pointer' }}
              onMouseEnter={() => activateWireRef.current?.(idx)}
            />
          ))}
        </g>

        {/* ── Active Glow Wires Layer (Anime.js createDrawable target) ──────── */}
        <g className="circuit-wires-active" filter="url(#wire-neon-glow)">
          {CIRCUIT_WIRES.map((wire) => (
            <path
              key={`${wire.id}-active`}
              id={`${wire.id}-active`}
              d={wire.d}
              stroke="#39ff14"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0"
            />
          ))}
        </g>

        {/* ── Central Microcontroller Package ────────────────────────────────── */}
        <g
          className="central-mcu-chip"
          style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
          onClick={() => {
            setIsPaused((prev) => !prev);
          }}
        >
          {/* Outer ceramic casing */}
          <rect
            x="140"
            y="120"
            width="100"
            height="100"
            fill={isPaused ? 'url(#chip-bg-gradient-red)' : 'url(#chip-bg-gradient)'}
            stroke={isPaused ? '#ff3344' : 'var(--accent-green)'}
            strokeWidth="2"
            style={{ transition: 'stroke 0.3s ease, fill 0.3s ease' }}
          />

          {/* Inner silicon die border */}
          <rect
            x="155"
            y="135"
            width="70"
            height="70"
            fill={isPaused ? '#180303' : '#030d06'}
            stroke={isPaused ? '#ff3344' : 'var(--accent-green)'}
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.8"
            style={{ transition: 'stroke 0.3s ease, fill 0.3s ease' }}
          />

          {/* Chip Center Branding */}
          <text
            x="190"
            y="168"
            textAnchor="middle"
            fill={isPaused ? '#ff3344' : 'var(--accent-green)'}
            fontFamily="var(--font-mono)"
            fontSize="10"
            fontWeight="800"
            letterSpacing="0.12em"
            style={{ transition: 'fill 0.3s ease' }}
          >
            HACKZ
          </text>
          <text
            x="190"
            y="182"
            textAnchor="middle"
            fill={isPaused ? '#ff6677' : 'var(--accent-green-bright)'}
            fontFamily="var(--font-mono)"
            fontSize="8"
            fontWeight="600"
            letterSpacing="0.16em"
            opacity="0.9"
            style={{ transition: 'fill 0.3s ease' }}
          >
            {isPaused ? 'PAUSED' : 'MAIN_CORE'}
          </text>

          {/* Pin 1 Notch Index Indicator */}
          <circle
            cx="147"
            cy="127"
            r="2.5"
            fill={isPaused ? '#ff3344' : 'var(--accent-green-bright)'}
            style={{ transition: 'fill 0.3s ease' }}
          />

          {/* Status Heartbeat LED */}
          <circle
            id="chip-heartbeat-led"
            cx="190"
            cy="195"
            r="3"
            fill={isPaused ? '#ff0033' : '#39ff14'}
            filter={isPaused ? 'url(#circuit-pulse-glow-red)' : 'url(#circuit-pulse-glow)'}
            style={{ transition: 'fill 0.3s ease' }}
          />

          {/* Ground & Power corner vias */}
          <circle
            cx="152"
            cy="142"
            r="1.8"
            fill={isPaused ? 'rgba(255, 60, 60, 0.5)' : 'var(--accent-green-dim)'}
          />
          <circle
            cx="228"
            cy="142"
            r="1.8"
            fill={isPaused ? 'rgba(255, 60, 60, 0.5)' : 'var(--accent-green-dim)'}
          />
          <circle
            cx="152"
            cy="198"
            r="1.8"
            fill={isPaused ? 'rgba(255, 60, 60, 0.5)' : 'var(--accent-green-dim)'}
          />
          <circle
            cx="228"
            cy="198"
            r="1.8"
            fill={isPaused ? 'rgba(255, 60, 60, 0.5)' : 'var(--accent-green-dim)'}
          />
        </g>

        {/* ── Surface Mount Components & Peripheral Capacitors ─────────────── */}
        <g className="smt-components" stroke="var(--accent-green-dim)" fill="#041208">
          <rect x="70" y="70" width="24" height="13" strokeWidth="1.2" />
          <rect x="290" y="100" width="20" height="11" strokeWidth="1.2" />
          <rect x="80" y="250" width="22" height="13" strokeWidth="1.2" />
          <rect x="280" y="250" width="26" height="13" strokeWidth="1.2" />

          {/* Tiny SMT decoupling capacitors */}
          <rect x="110" y="115" width="10" height="6" strokeWidth="1" />
          <rect x="260" y="115" width="10" height="6" strokeWidth="1" />
          <rect x="110" y="220" width="10" height="6" strokeWidth="1" />
          <rect x="260" y="220" width="10" height="6" strokeWidth="1" />
        </g>

        {/* ── Via Test Point Grid Arrays ────────────────────────────────────── */}
        <g className="via-arrays" fill="var(--accent-green-dim)">
          <circle cx="120" cy="108" r="1.8" />
          <circle cx="128" cy="108" r="1.8" />
          <circle cx="120" cy="116" r="1.8" />
          <circle cx="128" cy="116" r="1.8" />

          <circle cx="255" cy="108" r="1.8" />
          <circle cx="263" cy="108" r="1.8" />
          <circle cx="255" cy="116" r="1.8" />
          <circle cx="263" cy="116" r="1.8" />

          <circle cx="120" cy="225" r="1.8" />
          <circle cx="128" cy="225" r="1.8" />
          <circle cx="255" cy="225" r="1.8" />
          <circle cx="263" cy="225" r="1.8" />
        </g>

        {/* ── Terminal Pad Contacts (Circles at Wire Ends) ──────────────────── */}
        <g className="terminal-pads">
          {CIRCUIT_WIRES.map((wire) => (
            <g key={`pad-group-${wire.id}`}>
              {/* Outer ring */}
              <circle
                cx={wire.endX}
                cy={wire.endY}
                r={wire.padRadius + 2.5}
                stroke="rgba(0, 255, 65, 0.25)"
                strokeWidth="1"
                fill="none"
              />
              {/* Inner contact pad */}
              <circle
                id={`pad-${wire.id}`}
                cx={wire.endX}
                cy={wire.endY}
                r={wire.padRadius}
                fill="var(--accent-green)"
                stroke="#051008"
                strokeWidth="1"
              />
            </g>
          ))}
        </g>
      </svg>

      {/* ── Motion Path Signal Packets (HTML elements following Anime.js createMotionPath reference) ─ */}
      {Array.from({ length: PACKET_COUNT }).map((_, idx) => (
        <div
          key={`packet-${idx}`}
          id={`circuit-packet-${idx}`}
          className="circuit-packet"
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            left: '-5px',
            top: '-5px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            border: '2px solid #39ff14',
            boxShadow: '0 0 10px #39ff14, 0 0 20px #00ff41, 0 0 30px #39ff14',
            opacity: 0,
            pointerEvents: 'none',
            zIndex: 20,
          }}
        />
      ))}

      {/* ── Warning & Telemetry Speech Popup Bubble ───────────────────────── */}
      {pauseMessage && (
        <div
          className="pointer-events-none transition-all duration-300 animate-bounce"
          style={{
            position: 'absolute',
            top: '27%',
            left: '50%',
            transform: 'translate(-50%, -100%)',
            zIndex: 40,
            backgroundColor: 'rgba(20, 3, 5, 0.94)',
            border: '1px solid #ff3344',
            borderRadius: '6px',
            padding: '5px 10px',
            boxShadow: '0 0 16px rgba(255, 0, 50, 0.5), inset 0 0 8px rgba(255, 50, 50, 0.2)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#ff0033',
              boxShadow: '0 0 8px #ff0033',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '10px',
              fontWeight: '700',
              color: '#ff4455',
              letterSpacing: '0.04em',
            }}
          >
            {pauseMessage}
          </span>

          {/* Bubble pointer beak pointing down to MCU chip */}
          <div
            style={{
              position: 'absolute',
              bottom: '-5px',
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: '8px',
              height: '8px',
              backgroundColor: 'rgba(20, 3, 5, 0.94)',
              borderRight: '1px solid #ff3344',
              borderBottom: '1px solid #ff3344',
            }}
          />
        </div>
      )}
      </div>
    </div>
  );
};

export default CircuitBoard;
