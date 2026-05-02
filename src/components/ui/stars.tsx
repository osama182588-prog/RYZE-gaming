'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Stars({
  value,
  size = 14,
  className,
}: {
  value: number;
  size?: number;
  className?: string;
}) {
  const filled = Math.round(value);
  return (
    <span className={cn('inline-flex items-center gap-0.5', className)} aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          width={size}
          height={size}
          className={cn(
            i < filled ? 'fill-neon-yellow text-neon-yellow' : 'text-white/15',
          )}
        />
      ))}
    </span>
  );
}
