'use client';

import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex max-w-3xl flex-col gap-4',
        align === 'center' && 'mx-auto items-center text-center',
        className,
      )}
    >
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h2 className="font-display text-3xl font-black leading-[1.05] sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="text-base text-white/60 sm:text-lg">{subtitle}</p>}
    </div>
  );
}
