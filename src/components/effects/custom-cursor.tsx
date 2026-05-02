'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Custom animated cursor — main glow ring + soft trailing dot.
 * Reacts to interactive elements (buttons, links) and respects touch devices.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none)').matches) {
      setEnabled(false);
      return;
    }

    const ring = ringRef.current;
    const trail = trailRef.current;
    if (!ring || !trail) return;

    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    let tx = rx;
    let ty = ry;
    let mx = rx;
    let my = ry;
    let raf = 0;

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      const target = e.target as HTMLElement | null;
      const isInteractive = !!target?.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]',
      );
      ring!.classList.toggle('is-hover', isInteractive);
    }

    function tick() {
      // ease toward mouse for ring
      rx += (mx - rx) * 0.28;
      ry += (my - ry) * 0.28;
      // slower trail
      tx += (mx - tx) * 0.12;
      ty += (my - ty) * 0.12;
      ring!.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      trail!.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    }

    document.documentElement.style.cursor = 'none';
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      document.documentElement.style.cursor = '';
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={trailRef} className="cursor-trail" aria-hidden />
      <div ref={ringRef} className="cursor-glow" aria-hidden />
    </>
  );
}
