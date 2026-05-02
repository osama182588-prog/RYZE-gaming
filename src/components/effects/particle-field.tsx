'use client';

import { useEffect, useRef } from 'react';

interface ParticleFieldProps {
  density?: number;
  className?: string;
  opacity?: number;
}

/**
 * Lightweight canvas particle field — high-FPS, no external lib.
 * Particles drift slowly upward and twinkle with neon hues.
 */
export function ParticleField({ density = 80, className, opacity = 0.65 }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = ['#9b5cff', '#22d3ff', '#ff4fd8', '#ffffff'];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.scale(dpr, dpr);
    }
    resize();

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const particles = Array.from({ length: density }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.4,
      vy: -(Math.random() * 0.25 + 0.05),
      vx: (Math.random() - 0.5) * 0.1,
      a: Math.random() * 0.8 + 0.2,
      ph: Math.random() * Math.PI * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function frame(t: number) {
      ctx!.clearRect(0, 0, width, height);
      for (const p of particles) {
        if (!reduced) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -4) {
            p.y = height + 4;
            p.x = Math.random() * width;
          }
          if (p.x < -4) p.x = width + 4;
          if (p.x > width + 4) p.x = -4;
        }
        const tw = 0.5 + 0.5 * Math.sin(t * 0.001 + p.ph);
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r * (0.8 + tw * 0.6), 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = p.a * tw * opacity;
        ctx!.shadowColor = p.color;
        ctx!.shadowBlur = 8;
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
      ctx!.shadowBlur = 0;
      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [density, opacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ pointerEvents: 'none', position: 'absolute', inset: 0 }}
    />
  );
}
