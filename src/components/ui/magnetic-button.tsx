'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'ghost';
  strength?: number;
}

/**
 * Magnetic CTA — element subtly chases the cursor for a high-end feel.
 */
export function MagneticButton({
  children,
  href,
  variant = 'primary',
  strength = 0.35,
  className,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 14, mass: 0.4 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const classes = cn(variant === 'primary' ? 'btn-primary' : 'btn-ghost', className);

  const inner = (
    <motion.span style={{ x: sx, y: sy }} className={classes}>
      {children}
    </motion.span>
  );

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="inline-block"
    >
      {href ? (
        <Link href={href}>{inner}</Link>
      ) : (
        <button {...rest} className="contents">
          {inner}
        </button>
      )}
    </div>
  );
}
