import React, { useEffect, useRef } from 'react';

interface NodeNetworkProps {
  opacity?: number;
  className?: string;
  maxNodes?: number;
}

interface NetworkNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isHub: boolean;
  pulsePhase: number;
}

interface DataPacket {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
}

export const NodeNetwork: React.FC<NodeNetworkProps> = ({
  opacity = 0.35,
  className = '',
  maxNodes = 55,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let nodes: NetworkNode[] = [];
    let packets: DataPacket[] = [];
    let mouseX = -2000;
    let mouseY = -2000;
    let isMouseOnScreen = false;

    const connectionDist = 135;
    const connectionDistSq = connectionDist * connectionDist;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Node count scaled for device width
      const isMobile = width < 768;
      const count = isMobile ? Math.min(24, Math.floor(maxNodes * 0.45)) : maxNodes;

      nodes = [];
      packets = [];

      for (let i = 0; i < count; i++) {
        const isHub = Math.random() < 0.18;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (isHub ? 0.25 : 0.45),
          vy: (Math.random() - 0.5) * (isHub ? 0.25 : 0.45),
          radius: isHub ? 3 : Math.random() * 1.5 + 1.5,
          isHub,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    resize();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseOnScreen = true;
    };

    const handleMouseLeave = () => {
      isMouseOnScreen = false;
      mouseX = -2000;
      mouseY = -2000;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    let lastPacketSpawn = performance.now();

    const render = (time: number) => {
      animId = requestAnimationFrame(render);

      ctx.clearRect(0, 0, width, height);

      const activeConnections: { i: number; j: number }[] = [];

      // 1. Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        node.x += node.vx;
        node.y += node.vy;

        // Bounce off screen boundaries with soft wrap
        if (node.x < -20) node.x = width + 20;
        else if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        else if (node.y > height + 20) node.y = -20;

        // Gentle cursor gravitation
        if (isMouseOnScreen) {
          const dx = mouseX - node.x;
          const dy = mouseY - node.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 180 * 180 && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const pull = (1 - dist / 180) * 0.12;
            node.x += (dx / dist) * pull;
            node.y += (dy / dist) * pull;
          }
        }

        // Draw node
        node.pulsePhase += 0.02;
        const pulse = Math.sin(node.pulsePhase) * 0.3 + 0.7;

        if (node.isHub) {
          // Hub nodes: Diamond node with outer telemetry ring
          ctx.strokeStyle = `rgba(0, 255, 65, ${0.45 * pulse})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 3, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Standard node
          ctx.fillStyle = `rgba(0, 255, 65, ${0.75 * pulse})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Draw connections between nearby nodes
      ctx.lineWidth = 0.8;
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionDistSq) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / connectionDist) * 0.35;

            ctx.strokeStyle = `rgba(0, 255, 65, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();

            activeConnections.push({ i, j });
          }
        }

        // Connect node to cursor if nearby
        if (isMouseOnScreen) {
          const dxMouse = mouseX - nodeA.x;
          const dyMouse = mouseY - nodeA.y;
          const mouseDistSq = dxMouse * dxMouse + dyMouse * dyMouse;
          if (mouseDistSq < 150 * 150) {
            const mouseDist = Math.sqrt(mouseDistSq);
            const mouseAlpha = (1 - mouseDist / 150) * 0.4;
            ctx.strokeStyle = `rgba(0, 255, 65, ${mouseAlpha})`;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
          }
        }
      }

      // 3. Spawn and animate data packets across active edges
      if (time - lastPacketSpawn > 400 && activeConnections.length > 0 && packets.length < 12) {
        lastPacketSpawn = time;
        const conn = activeConnections[Math.floor(Math.random() * activeConnections.length)];
        packets.push({
          fromIdx: conn.i,
          toIdx: conn.j,
          progress: 0,
          speed: Math.random() * 0.025 + 0.015,
        });
      }

      for (let p = packets.length - 1; p >= 0; p--) {
        const packet = packets[p];
        packet.progress += packet.speed;

        if (packet.progress >= 1) {
          packets.splice(p, 1);
          continue;
        }

        const from = nodes[packet.fromIdx];
        const to = nodes[packet.toIdx];
        if (!from || !to) {
          packets.splice(p, 1);
          continue;
        }

        const packetX = from.x + (to.x - from.x) * packet.progress;
        const packetY = from.y + (to.y - from.y) * packet.progress;

        // Draw bright data packet
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#00ff41';
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(packetX, packetY, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [maxNodes]);

  return (
    <canvas
      ref={canvasRef}
      className={`node-network-canvas ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        opacity,
      }}
      aria-hidden="true"
    />
  );
};

export default NodeNetwork;
