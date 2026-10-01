import React, { useEffect, useRef, useState } from 'react';
import { animate, random } from 'animejs';
import './VideoLoader.css';

export interface LoadPageProps {
  onComplete?: () => void;
  fadeDuration?: number;
  maxDuration?: number;
  isMobile?: boolean;
}

const LoadPage: React.FC<LoadPageProps> = ({
  onComplete,
  fadeDuration = 900,
  maxDuration = 4500,
  isMobile = false,
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const sweeperRef = useRef<SVGGElement>(null);
  const crosshairRef = useRef<HTMLDivElement>(null);
  
  // Refs for fast-updating text to avoid excessive React re-renders
  const e64Ref = useRef<HTMLSpanElement>(null);
  const h32Ref = useRef<HTMLSpanElement>(null);
  const os5Ref = useRef<HTMLSpanElement>(null);
  const bottomGraphRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<'playing' | 'fading' | 'done'>('playing');

  useEffect(() => {
    if (!onComplete) return;

    const fadeTimer = setTimeout(() => {
      setPhase('fading');
    }, Math.max(1000, maxDuration - fadeDuration));

    const doneTimer = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, maxDuration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete, fadeDuration, maxDuration]);

  useEffect(() => {
    let animationFrameId: number;
    let time = 0;
    let rotation = 0;

    // 1. Animate the line graph
    const animateDraw = () => {
      time += 0.08;
      let d = `M 0 50 `;
      for (let x = 0; x <= 200; x += 5) {
        // Creates a chaotic sine wave with noise
        const noise = Math.random() * 10 - 5;
        const y = 50 + Math.sin(x * 0.06 + time) * 30 + noise;
        d += `L ${x} ${y} `;
      }
      if (pathRef.current) {
        pathRef.current.setAttribute('d', d);
      }

      // 2. Animate the radar sweeper mask
      rotation += 1.5;
      if (sweeperRef.current) {
        sweeperRef.current.setAttribute('transform', `rotate(${rotation} 150 150)`);
      }

      animationFrameId = requestAnimationFrame(animateDraw);
    };
    animateDraw();

    // 3. Animate numbers rapidly
    const intervalId = setInterval(() => {
      if (e64Ref.current) e64Ref.current.innerText = (Math.random() * 100).toFixed(14);
      if (h32Ref.current) h32Ref.current.innerText = (Math.random() * 10).toFixed(15);
      if (os5Ref.current) os5Ref.current.innerText = (Math.random() * 15).toFixed(14);
      if (bottomGraphRef.current) bottomGraphRef.current.innerText = (Math.random() * 10).toFixed(14);
    }, 75); // Updates every 75ms

    // 4. Animate crosshair using Anime.js
    let animeAnim: any = null;
    if (crosshairRef.current) {
      const runCrosshairAnim = () => {
        if (!crosshairRef.current) return;
        animeAnim = animate(crosshairRef.current, {
          translateX: () => random(-100, 100),
          translateY: () => random(-60, 60),
          duration: 800,
          ease: 'inOutQuad',
          onComplete: () => {
            runCrosshairAnim();
          },
        });
      };
      runCrosshairAnim();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(intervalId);
      if (animeAnim && typeof animeAnim.pause === 'function') {
        animeAnim.pause();
      }
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div className={`hud-container ${phase === 'fading' ? 'vl-fading' : ''} ${isMobile ? 'hud-mobile' : ''}`}>

      <div className="hud-overlay" />

      {/* Background Reticle / Frame markers */}
      <div className="cross-marker" style={{ top: '15%', left: '10%' }}>+</div>
      <div className="cross-marker" style={{ top: '15%', right: '10%' }}>+</div>
      <div className="cross-marker" style={{ bottom: '15%', left: '10%' }}>+</div>
      <div className="cross-marker" style={{ bottom: '15%', right: '10%' }}>+</div>
      <div style={{ position: 'absolute', top: '10%', left: '15%', color: '#1a5c2b', fontSize: '0.8rem' }}>270°</div>

      {/* Left Data Graph */}
      <div className="graph-box">
        <div style={{ position: 'absolute', top: '-25px', right: '0', color: '#1a5c2b' }}>7.35</div>
        <svg width="200" height="100" style={{ overflow: 'visible' }}>
          {/* Faint background grid/dots for graph */}
          <path d="M 0 50 L 200 50" stroke="rgba(36, 173, 74, 0.2)" strokeWidth="1" strokeDasharray="4 4" />
          {/* Main animated line */}
          <path ref={pathRef} fill="none" stroke="#33ff66" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 2px #33ff66)' }} />
        </svg>
        <div 
          ref={bottomGraphRef}
          style={{ position: 'absolute', bottom: '-25px', left: '0', color: '#1a5c2b', fontSize: '0.8rem' }}
        >
          0.00000000000000
        </div>
      </div>

      {/* Center Radar Scanner */}
      <div className="radar-container">
        {/* Frame Brackets around radar */}
        <div className="reticle-corner" style={{ top: '-40px', left: '-40px', borderTop: '1px solid', borderLeft: '1px solid' }} />
        <div className="reticle-corner" style={{ top: '-40px', right: '-40px', borderTop: '1px solid', borderRight: '1px solid' }} />
        <div className="reticle-corner" style={{ bottom: '-40px', left: '-40px', borderBottom: '1px solid', borderLeft: '1px solid' }} />
        <div className="reticle-corner" style={{ bottom: '-40px', right: '-40px', borderBottom: '1px solid', borderRight: '1px solid' }} />

        {/* Central SVG Scanner Area */}
        <svg width="300" height="300" viewBox="0 0 300 300">
          <defs>
            {/* The dot pattern base */}
            <pattern id="dotPattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="2.5" fill="#33ff66" />
            </pattern>
            
            {/* The sweeping mask */}
            <mask id="sweepMask">
              <g ref={sweeperRef} transform="rotate(0 150 150)">
                <path d="M 150 0 A 150 150 0 0 1 150 300 Z" fill="white" />
              </g>
            </mask>
          </defs>

          {/* Faded Background Dots */}
          <rect width="300" height="300" fill="url(#dotPattern)" opacity="0.15" />
          
          {/* Bright Revealed Dots bounded by mask */}
          <rect width="300" height="300" fill="url(#dotPattern)" mask="url(#sweepMask)" style={{ filter: 'drop-shadow(0 0 3px #33ff66)' }} />
          
          {/* Static Center Crosshairs in radar */}
          <line x1="150" y1="130" x2="150" y2="170" stroke="rgba(36, 173, 74, 0.4)" strokeWidth="1" />
          <line x1="130" y1="150" x2="170" y2="150" stroke="rgba(36, 173, 74, 0.4)" strokeWidth="1" />
        </svg>

        {/* The Moving Target (Erratic Crosshair animated by Anime.js) */}
        <div 
          ref={crosshairRef} 
          style={{ position: 'absolute', left: '50%', top: '50%', width: '30px', height: '30px', transform: 'translate(-50%, -50%)' }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, width: 8, height: 8, borderTop: '2px solid #33ff66', borderLeft: '2px solid #33ff66' }} />
          <div style={{ position: 'absolute', top: 0, right: 0, width: 8, height: 8, borderTop: '2px solid #33ff66', borderRight: '2px solid #33ff66' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: 8, height: 8, borderBottom: '2px solid #33ff66', borderLeft: '2px solid #33ff66' }} />
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: 8, height: 8, borderBottom: '2px solid #33ff66', borderRight: '2px solid #33ff66' }} />
          <div style={{ position: 'absolute', top: '13px', left: '13px', width: '4px', height: '4px', backgroundColor: '#33ff66', borderRadius: '50%' }} />
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: '15%', left: '50%', transform: 'translateX(-50%)', color: '#1a5c2b', fontSize: '0.9rem' }} className="blinking">
        Scanning...
      </div>

      {/* Right Data Lists */}
      <div className="stats-block text-glow">
        <div>e64: <span ref={e64Ref}>0.00000000000000</span></div>
        <div>h32: <span ref={h32Ref}>0.00000000000000</span></div>
        <div>os5: <span ref={os5Ref}>0.00000000000000</span></div>
      </div>
      
      {/* Top right circular decor UI */}
      <svg width="100" height="100" className="decor-circle" style={{ position: 'absolute', top: '15%', right: '10%', opacity: 0.2 }}>
         <circle cx="50" cy="50" r="40" fill="none" stroke="#24ad4a" strokeWidth="2" strokeDasharray="10 20" />
         <circle cx="50" cy="50" r="30" fill="none" stroke="#24ad4a" strokeWidth="1" />
      </svg>
      
    </div>
  );
};

export default LoadPage;
