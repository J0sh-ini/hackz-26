import React, { useEffect, useRef } from 'react';

interface MatrixCanvasProps {
  opacity?: number;
}

export const MatrixCanvas: React.FC<MatrixCanvasProps> = ({ opacity = 0.85 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Characters array heavily featuring bits (0, 1) and hacker symbols (#, $, *, etc.)
    const bitChars = ['0', '1', '0', '1', '1', '0', '0', '1','✡'];
    const symbolChars = ['#', '$', '*', '+', '-', '<', '>', '/', '\\', '=', '&', '%', '^', '~', '!', '?', '|', '{', '}', '[', ']', '@', ':'];
    const hexChars = ['A', 'H', 'C', 'K', 'Z','LS','JI','26'];
    const matrixKatakana = ['ｦ', 'ｱ', 'ｳ', 'ｴ', 'ｵ', 'ｶ', 'ｷ', 'ｹ', 'ｺ', 'ｻ', 'ｼ', 'ｽ', 'ｾ', 'ｿ', 'ﾀ', 'ﾂ', 'ﾃ', 'ﾅ', 'ﾆ', 'ﾇ', 'ﾈ', 'ﾊ', 'ﾋ', 'ﾎ', 'ﾏ', 'ﾐ', 'ﾑ', 'ﾒ', 'ﾓ', 'ﾔ', 'ﾕ', 'ﾗ', 'ﾘ', 'ﾜ'];

    // Weighted pool: ~45% bits (0, 1), ~30% symbols (#, $, *, etc.), ~15% katakana, ~10% hex
    const allChars = [
      ...bitChars,
      ...bitChars,
      ...bitChars,
      ...symbolChars,
      ...symbolChars,
      ...matrixKatakana,
      ...hexChars,
    ];

    const getRandomChar = () => allChars[Math.floor(Math.random() * allChars.length)];

    interface Stream {
      x: number;
      y: number;
      speed: number;
      length: number;
      chars: string[];
      fontSize: number;
      layer: 'fg' | 'mg' | 'bg'; // Depth layering
      opacityMultiplier: number;
      changeRate: number; // Probability of glyph mutation
    }

    let streams: Stream[] = [];
    let width = 0;
    let height = 0;

    const setupDimensionsAndStreams = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      const isMobile = width < 768;

      // Layered columns configuration
      // Background layer: small font (11px), high density, dimmer, slow
      // Midground layer: standard font (15px), crisp, medium speed
      // Foreground layer: larger font (18px), fast, bright
      streams = [];

      const bgColWidth = isMobile ? 22 : 14;
      const mgColWidth = isMobile ? 26 : 18;
      const fgColWidth = isMobile ? 38 : 28;

      const bgCols = Math.floor(width / bgColWidth);
      const mgCols = Math.floor(width / mgColWidth);
      const fgCols = Math.floor(width / fgColWidth);

      // 1. Background Streams (Subtle atmospheric depth)
      for (let i = 0; i < bgCols; i++) {
        const len = Math.floor(Math.random() * 18) + 12;
        const colChars = Array.from({ length: len }, () => getRandomChar());
        streams.push({
          x: i * bgColWidth + (Math.random() * 4 - 2),
          y: Math.random() * -120,
          speed: Math.random() * 0.35 + 0.25,
          length: len,
          chars: colChars,
          fontSize: isMobile ? 11 : 12,
          layer: 'bg',
          opacityMultiplier: 0.35,
          changeRate: 0.08,
        });
      }

      // 2. Midground Streams (Core matrix rain)
      for (let i = 0; i < mgCols; i++) {
        const len = Math.floor(Math.random() * 22) + 14;
        const colChars = Array.from({ length: len }, () => getRandomChar());
        streams.push({
          x: i * mgColWidth + (Math.random() * 6 - 3),
          y: Math.random() * -100,
          speed: Math.random() * 0.55 + 0.4,
          length: len,
          chars: colChars,
          fontSize: isMobile ? 14 : 16,
          layer: 'mg',
          opacityMultiplier: 0.75,
          changeRate: 0.12,
        });
      }

      // 3. Foreground Streams (High-impact prominent streams)
      const fgCount = isMobile ? Math.floor(fgCols * 0.4) : Math.floor(fgCols * 0.65);
      for (let i = 0; i < fgCount; i++) {
        const len = Math.floor(Math.random() * 26) + 16;
        const colChars = Array.from({ length: len }, () => getRandomChar());
        streams.push({
          x: (i * (width / fgCount)) + (Math.random() * 12 - 6),
          y: Math.random() * -80,
          speed: Math.random() * 0.85 + 0.65,
          length: len,
          chars: colChars,
          fontSize: isMobile ? 17 : 20,
          layer: 'fg',
          opacityMultiplier: 1.0,
          changeRate: 0.15,
        });
      }
    };

    setupDimensionsAndStreams();

    const handleResize = () => {
      setupDimensionsAndStreams();
    };

    window.addEventListener('resize', handleResize);

    let lastTime = performance.now();
    const targetFps = width < 768 ? 40 : 60;
    const frameInterval = 1000 / targetFps;

    // Mouse Parallax & Repulsion state
    let targetMouseX = -2000;
    let targetMouseY = -2000;
    let mouseX = -2000;
    let mouseY = -2000;
    let isMouseActive = false;
    let lastTouchTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Discard synthetic mousemove events triggered by mobile touch taps
      if (performance.now() - lastTouchTime < 1200 || window.innerWidth < 768) {
        isMouseActive = false;
        return;
      }
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
      isMouseActive = true;
    };

    const handleMouseLeave = () => {
      isMouseActive = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // ── Droplet Burst (Click/Tap Event) System ────────────────────────
    interface DropletParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      char: string;
      fontSize: number;
      life: number;
      maxLife: number;
      gravityThreshold: number; // Duration of initial outward radiating burst
      gravity: number;
      drag: number;
      changeRate: number;
      isHighEnergy: boolean;
    }

    interface Shockwave {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
    }

    let droplets: DropletParticle[] = [];
    let shockwaves: Shockwave[] = [];

    const spawnBurst = (x: number, y: number) => {
      const isMobile = width < 768 || window.innerWidth < 768;

      // 1. Shatter nearby digital rain streams
      const shatterRadius = isMobile ? 50 : 70;
      for (let i = 0; i < streams.length; i++) {
        const stream = streams[i];
        const distX = Math.abs(stream.x - x);
        if (distX < shatterRadius) {
          // Scramble stream characters near the impact into erratic fragments
          for (let j = 0; j < stream.length; j++) {
            const charY = (stream.y - j) * stream.fontSize;
            if (Math.abs(charY - y) < shatterRadius) {
              stream.chars[j] = Math.random() < 0.7 ? (Math.random() < 0.5 ? '1' : '0') : getRandomChar();
            }
          }
          // Velocity perturbation (glitch stutter)
          if (Math.random() < 0.35) {
            stream.speed = Math.min(stream.speed * 1.5, 2.8);
          }
        }
      }

      // 2. Spawn digital explosion shockwave ripple
      if (shockwaves.length >= (isMobile ? 2 : 3)) {
        shockwaves.shift();
      }
      shockwaves.push({
        x,
        y,
        radius: 3,
        maxRadius: Math.min(width * 0.14, isMobile ? 60 : 85),
        opacity: 0.85,
      });

      // 3. Limit on new droplets formed by tap and total displayed on screen
      const MAX_SCREEN_DROPLETS = isMobile ? 25 : 60;
      const count = isMobile
        ? Math.floor(Math.random() * 3) + 8   // 8-10 droplets per tap on mobile
        : Math.floor(Math.random() * 5) + 12; // 12-16 droplets per click on desktop

      // Ensure active droplets on screen never exceed the maximum ceiling
      while (droplets.length + count > MAX_SCREEN_DROPLETS) {
        droplets.shift();
      }

      for (let i = 0; i < count; i++) {
        // Horizontal and diagonal splash explosion trajectory
        let angle: number;
        if (i % 2 === 0) {
          // Omnidirectional radial blast
          angle = Math.random() * Math.PI * 2;
        } else {
          // Strong horizontal / diagonal splash wings
          const baseAngle = Math.random() < 0.5 ? 0 : Math.PI;
          angle = baseAngle + (Math.random() - 0.5) * (Math.PI * 0.7);
        }

        const speed = Math.random() * 7 + 4;
        const upwardBias = Math.random() * 2 + 0.5; // Subtle splash lift

        droplets.push({
          x: x + (Math.random() * 10 - 5),
          y: y + (Math.random() * 10 - 5),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - upwardBias,
          char: getRandomChar(),
          fontSize: Math.floor(Math.random() * 4) + (isMobile ? 12 : 14),
          life: 0,
          maxLife: Math.floor(Math.random() * 25) + (isMobile ? 45 : 60), // Shorter life on mobile for quick turnover
          gravityThreshold: Math.floor(Math.random() * 8) + 10, // ~160ms - 300ms radiating before dropping
          gravity: Math.random() * 0.22 + 0.38,
          drag: Math.random() * 0.03 + 0.94,
          changeRate: 0.15,
          isHighEnergy: Math.random() < 0.35,
        });
      }
    };

    let lastTapTime = 0;
    const MOBILE_TAP_THROTTLE_MS = 380; // Minimum interval between mobile taps

    const triggerBurst = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        spawnBurst(x, y);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Discard synthetic mousedown triggered after mobile touches
      if (performance.now() - lastTouchTime < 1200) return;

      if (e.button === 0) {
        const now = performance.now();
        if (now - lastTapTime < 250) return;
        lastTapTime = now;
        triggerBurst(e.clientX, e.clientY);
      }
    };

    const resetTouchRepulsion = () => {
      lastTouchTime = performance.now();
      isMouseActive = false;
      targetMouseX = -2000;
      targetMouseY = -2000;
      mouseX = -2000;
      mouseY = -2000;
    };

    const handleTouchStart = (e: TouchEvent) => {
      resetTouchRepulsion();
      const now = performance.now();

      // Throttle mobile taps to prevent spamming
      if (now - lastTapTime < MOBILE_TAP_THROTTLE_MS) return;
      lastTapTime = now;

      // Trigger burst only for the primary touch point
      if (e.changedTouches.length > 0) {
        const touch = e.changedTouches[0];
        triggerBurst(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = () => {
      resetTouchRepulsion();
    };

    const handleTouchCancel = () => {
      resetTouchRepulsion();
    };

    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchCancel, { passive: true });

    const render = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(render);

      const deltaTime = currentTime - lastTime;
      if (deltaTime < frameInterval) return;
      lastTime = currentTime - (deltaTime % frameInterval);

      // Smooth mouse position interpolation (lerp)
      if (isMouseActive) {
        if (mouseX < -1000) {
          mouseX = targetMouseX;
          mouseY = targetMouseY;
        } else {
          mouseX += (targetMouseX - mouseX) * 0.14;
          mouseY += (targetMouseY - mouseY) * 0.14;
        }
      } else {
        mouseX += (-2000 - mouseX) * 0.06;
        mouseY += (-2000 - mouseY) * 0.06;
      }

      // Parallax ratio from viewport center (-1 to +1)
      const centerX = width / 2;
      const centerY = height / 2;
      const normMouseX = isMouseActive ? (mouseX - centerX) / (centerX || 1) : 0;
      const normMouseY = isMouseActive ? (mouseY - centerY) / (centerY || 1) : 0;

      const repelRadius = 120;
      const repelRadiusSq = repelRadius * repelRadius;

      // Clear previous frame with subtle trail persistence
      ctx.fillStyle = 'rgba(5, 5, 5, 0.22)';
      ctx.fillRect(0, 0, width, height);

      // Render streams ordered by depth layer: bg -> mg -> fg
      for (let i = 0; i < streams.length; i++) {
        const stream = streams[i];

        ctx.font = `${stream.fontSize}px 'JetBrains Mono', monospace`;

        // 3D Parallax offset based on layer depth
        const parallaxDepthX = stream.layer === 'fg' ? 24 : stream.layer === 'mg' ? 12 : 5;
        const parallaxDepthY = stream.layer === 'fg' ? 8 : stream.layer === 'mg' ? 4 : 2;
        const streamBaseX = stream.x + (normMouseX * parallaxDepthX);
        const streamParallaxY = normMouseY * parallaxDepthY;

        // Efficient column proximity check to minimize math when cursor is far
        const colDistX = streamBaseX - mouseX;
        const isColNearCursor = isMouseActive && Math.abs(colDistX) < repelRadius;

        // In-stream character mutations (flickering bits & symbols)
        if (Math.random() < stream.changeRate) {
          const randIdx = Math.floor(Math.random() * stream.length);
          stream.chars[randIdx] = getRandomChar();
        }

        // Draw each character in the stream
        for (let j = 0; j < stream.length; j++) {
          const charBaseY = (stream.y - j) * stream.fontSize + streamParallaxY;
          if (charBaseY < -stream.fontSize || charBaseY > height + stream.fontSize) continue;

          let drawX = streamBaseX;
          let drawY = charBaseY;

          // Apply slight organic cursor repulsion
          if (isColNearCursor) {
            const dy = charBaseY - mouseY;
            const distSq = colDistX * colDistX + dy * dy;

            if (distSq < repelRadiusSq) {
              const dist = Math.sqrt(distSq) || 1;
              // Smooth quadratic repulsion curve
              const force = Math.pow(1 - dist / repelRadius, 1.6) * 32;
              drawX += (colDistX / dist) * force;
              drawY += (dy / dist) * (force * 0.4); // Subtle vertical parting
            }
          }

          const char = stream.chars[j];

          if (j === 0) {
            // Head glyph: Brilliant pure white with intense electric green neon aura
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#00ff41';
            ctx.shadowBlur = stream.layer === 'fg' ? 10 : 5;
            ctx.fillText(char, drawX, drawY);
            ctx.shadowBlur = 0; // Reset blur for following chars
          } else if (j === 1) {
            // Immediately behind the head: Bright neon green-white
            ctx.fillStyle = '#a8ffb2';
            ctx.fillText(char, drawX, drawY);
          } else if (j < 4) {
            // Upper stream: Pure vibrant matrix green
            ctx.fillStyle = `rgba(0, 255, 65, ${0.9 * stream.opacityMultiplier})`;
            ctx.fillText(char, drawX, drawY);
          } else {
            // Tail fading exponentially
            const progress = (j - 4) / (stream.length - 4);
            const tailOpacity = Math.max(0.02, (1 - progress) * 0.7 * stream.opacityMultiplier);
            
            // Subtle color shift towards deeper cyber-green in tails
            ctx.fillStyle = `rgba(0, 215, 55, ${tailOpacity})`;
            ctx.fillText(char, drawX, drawY);
          }
        }

        // Advance stream down the screen
        stream.y += stream.speed;

        // Reset stream once it falls past screen bottom
        if (stream.y * stream.fontSize - stream.length * stream.fontSize > height) {
          if (Math.random() > 0.96) {
            stream.y = -Math.random() * 30;
            stream.speed = stream.layer === 'fg'
              ? Math.random() * 0.85 + 0.65
              : stream.layer === 'mg'
              ? Math.random() * 0.55 + 0.4
              : Math.random() * 0.35 + 0.25;
            
            // Randomize glyphs for the new drop
            for (let k = 0; k < stream.length; k++) {
              stream.chars[k] = getRandomChar();
            }
          }
        }
      }

      // ── Render Expanding Digital Shockwaves ────────────────────────
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += 3.8;
        sw.opacity *= 0.88;

        if (sw.radius >= sw.maxRadius || sw.opacity <= 0.02) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(57, 255, 20, ${sw.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = '#00ff41';
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.restore();
      }

      // ── Render Droplet Burst Particles ───────────────────────────
      for (let i = droplets.length - 1; i >= 0; i--) {
        const p = droplets[i];
        p.life++;

        if (p.life >= p.maxLife || p.y > height + 60) {
          droplets.splice(i, 1);
          continue;
        }

        // Phase 1: Radiating outward (burst / splash explosion)
        if (p.life <= p.gravityThreshold) {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= p.drag;
          p.vy *= p.drag;
        } else {
          // Phase 2: Dropping down after threshold time
          p.vy += p.gravity;
          p.vx *= 0.97; // Horizontal velocity smoothly transitions to vertical fall
          p.x += p.vx;
          p.y += p.vy;
        }

        // Occasional glyph flickering/mutation
        if (Math.random() < p.changeRate) {
          p.char = getRandomChar();
        }

        ctx.font = `bold ${p.fontSize}px 'JetBrains Mono', monospace`;

        if (p.life < 8) {
          // Initial explosive burst: Blazing white core with neon electric green aura
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#00ff41';
          ctx.shadowBlur = 12;
          ctx.fillText(p.char, p.x, p.y);
          ctx.shadowBlur = 0;
        } else if (p.life <= p.gravityThreshold) {
          // Radiating phase: High-voltage lime mint
          ctx.fillStyle = '#a8ffb2';
          ctx.shadowColor = '#39ff14';
          ctx.shadowBlur = 6;
          ctx.fillText(p.char, p.x, p.y);
          ctx.shadowBlur = 0;
        } else {
          // Dropping phase: Cascading matrix green with smooth fade-out
          const progress = (p.life - p.gravityThreshold) / (p.maxLife - p.gravityThreshold);
          const alpha = Math.max(0.04, (1 - progress) * 0.95);
          ctx.fillStyle = `rgba(0, 255, 65, ${alpha})`;
          if (p.isHighEnergy && progress < 0.6) {
            ctx.shadowColor = '#00ff41';
            ctx.shadowBlur = 5;
            ctx.fillText(p.char, p.x, p.y);
            ctx.shadowBlur = 0;
          } else {
            ctx.fillText(p.char, p.x, p.y);
          }
        }
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchCancel);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        opacity,
        pointerEvents: 'none',
        maskImage: 'linear-gradient(to bottom, black 55%, rgba(0,0,0,0.3) 85%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 55%, rgba(0,0,0,0.3) 85%, transparent 100%)',
      }}
      aria-hidden="true"
    />
  );
};
