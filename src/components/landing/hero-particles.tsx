'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useTheme } from 'next-themes';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseX: number;
  baseY: number;
  density: number;
  pulsePhase: number;
}

interface DataPacket {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
}

const COLORS = {
  dark: {
    node: 'rgba(16, 185, 129, 0.7)',       // emerald-500
    nodeGlow: 'rgba(16, 185, 129, 0.15)',
    connection: 'rgba(16, 185, 129, 0.12)',
    connectionActive: 'rgba(16, 185, 129, 0.35)',
    packet: 'rgba(52, 211, 153, 0.9)',      // emerald-400
    packetGlow: 'rgba(52, 211, 153, 0.3)',
  },
  light: {
    node: 'rgba(5, 150, 105, 0.5)',         // emerald-600
    nodeGlow: 'rgba(5, 150, 105, 0.08)',
    connection: 'rgba(5, 150, 105, 0.07)',
    connectionActive: 'rgba(5, 150, 105, 0.2)',
    packet: 'rgba(16, 185, 129, 0.8)',
    packetGlow: 'rgba(16, 185, 129, 0.2)',
  },
};

const CONNECTION_DISTANCE = 160;
const MOUSE_RADIUS = 200;
const RETURN_SPEED = 0.02;

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const packetsRef = useRef<DataPacket[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const dimensionsRef = useRef({ w: 0, h: 0 });
  const { resolvedTheme } = useTheme();
  const themeRef = useRef(resolvedTheme);

  // Keep theme ref current without re-creating animation loop
  useEffect(() => { themeRef.current = resolvedTheme; }, [resolvedTheme]);

  const initParticles = useCallback((w: number, h: number) => {
    // Scale particle count based on screen area, capped for performance
    const area = w * h;
    const isMobile = w < 768;
    const count = isMobile ? Math.min(40, Math.floor(area / 15000)) : Math.min(90, Math.floor(area / 8000));

    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1.5,
        baseX: x,
        baseY: y,
        density: Math.random() * 30 + 10,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;
    packetsRef.current = [];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      dimensionsRef.current = { w: rect.width, h: rect.height };
      initParticles(rect.width, rect.height);
    };

    resize();
    window.addEventListener('resize', resize);

    // Mouse tracking
    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    canvas.addEventListener('mousemove', handleMouse);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const animate = () => {
      const { w, h } = dimensionsRef.current;
      ctx.clearRect(0, 0, w, h);

      const isDark = themeRef.current === 'dark';
      const colors = isDark ? COLORS.dark : COLORS.light;
      const particles = particlesRef.current;
      const packets = packetsRef.current;
      const mouse = mouseRef.current;
      time += 0.016;

      // === UPDATE PARTICLES ===
      for (const p of particles) {
        if (!prefersReducedMotion) {
          // Mouse interaction — magnetic repulsion
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
            const angle = Math.atan2(dy, dx);
            p.x -= Math.cos(angle) * force * 3;
            p.y -= Math.sin(angle) * force * 3;
          }

          // Drift + return to base
          p.x += p.vx;
          p.y += p.vy;
          p.x += (p.baseX - p.x) * RETURN_SPEED;
          p.y += (p.baseY - p.y) * RETURN_SPEED;

          // Soft boundary bounce
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
          p.x = Math.max(0, Math.min(w, p.x));
          p.y = Math.max(0, Math.min(h, p.y));
        }

        // Pulse
        p.pulsePhase += 0.02;
      }

      // === DRAW CONNECTIONS ===
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const opacity = 1 - dist / CONNECTION_DISTANCE;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = opacity > 0.5 ? colors.connectionActive : colors.connection;
            ctx.lineWidth = opacity * 1.2;
            ctx.stroke();
          }
        }
      }

      // === DATA PACKETS (flowing dots along connections) ===
      if (!prefersReducedMotion) {
        // Spawn new packets occasionally
        if (Math.random() < 0.03 && packets.length < 8) {
          const fromIdx = Math.floor(Math.random() * particles.length);
          // Find a connected neighbor
          for (let j = 0; j < particles.length; j++) {
            if (j === fromIdx) continue;
            const dx = particles[fromIdx].x - particles[j].x;
            const dy = particles[fromIdx].y - particles[j].y;
            if (Math.sqrt(dx * dx + dy * dy) < CONNECTION_DISTANCE) {
              packets.push({
                fromIdx,
                toIdx: j,
                progress: 0,
                speed: 0.008 + Math.random() * 0.012,
              });
              break;
            }
          }
        }

        // Update & draw packets
        for (let i = packets.length - 1; i >= 0; i--) {
          const pkt = packets[i];
          pkt.progress += pkt.speed;
          if (pkt.progress >= 1) {
            packets.splice(i, 1);
            continue;
          }
          const from = particles[pkt.fromIdx];
          const to = particles[pkt.toIdx];
          const px = from.x + (to.x - from.x) * pkt.progress;
          const py = from.y + (to.y - from.y) * pkt.progress;

          // Glow
          ctx.beginPath();
          ctx.arc(px, py, 6, 0, Math.PI * 2);
          ctx.fillStyle = colors.packetGlow;
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = colors.packet;
          ctx.fill();
        }
      }

      // === DRAW NODES ===
      for (const p of particles) {
        const pulse = Math.sin(p.pulsePhase) * 0.3 + 0.7;
        const r = p.radius * pulse;

        // Outer glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, r + 4, 0, Math.PI * 2);
        ctx.fillStyle = colors.nodeGlow;
        ctx.fill();

        // Node core
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = colors.node;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouse);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ touchAction: 'none' }}
      aria-hidden="true"
    />
  );
}
