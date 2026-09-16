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
    const bitChars = ['0', '1', '0', '1', '1', '0', '0', '1'];
    const symbolChars = ['#', '$', '*', '+', '-', '<', '>', '/', '\\', '=', '&', '%', '^', '~', '!', '?', '|', '{', '}', '[', ']', '@', ':'];
    const hexChars = ['A', 'B', 'C', 'D', 'E', 'F', 'X', 'Z'];
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

    const handleMouseMove = (e: MouseEvent) => {
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
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
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
