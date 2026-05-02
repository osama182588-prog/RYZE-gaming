'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number; // degrees
  glow?: boolean;
}

/**
 * 3D tilt card with cursor-reactive light glow.
 * Built with framer-motion springs for buttery motion.
 */
export function TiltCard({ children, className, intensity = 12, glow = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const sx = useSpring(x, { stiffness: 200, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 20, mass: 0.4 });

  const rotateX = useTransform(sy, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(sx, [0, 1], [-intensity, intensity]);

  const glareX = useTransform(sx, [0, 1], ['0%', '100%']);
  const glareY = useTransform(sy, [0, 1], ['0%', '100%']);
  const glareBg = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(360px circle at ${gx} ${gy}, rgba(155,92,255,0.30), transparent 60%)`,
  );

  const [hovered, setHovered] = useState(false);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function onLeave() {
    x.set(0.5);
    y.set(0.5);
    setHovered(false);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={cn('relative will-change-transform', className)}
    >
      {children}
      {glow && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: glareBg,
          }}
        />
      )}
    </motion.div>
  );
}
