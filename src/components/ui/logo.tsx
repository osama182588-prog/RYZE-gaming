import { cn } from '@/lib/utils';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  showWord?: boolean;
  size?: 'sm' | 'md' | 'lg';
  href?: string | null;
}

export function Logo({ className, showWord = true, size = 'md', href = '/' }: LogoProps) {
  const wordSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-xl';
  const markSize = size === 'sm' ? 'h-7 w-7' : size === 'lg' ? 'h-12 w-12' : 'h-9 w-9';

  const content = (
    <span className={cn('group inline-flex items-center gap-2.5', className)}>
      <span
        className={cn(
          markSize,
          'relative grid place-items-center rounded-lg',
          'transition-transform duration-300 group-hover:scale-110',
        )}
        style={{
          background:
            'conic-gradient(from 180deg at 50% 50%, #9b5cff 0deg, #22d3ff 120deg, #ff4fd8 240deg, #9b5cff 360deg)',
          padding: 1.5,
          boxShadow: '0 0 24px rgba(155, 92, 255, 0.55), 0 0 48px rgba(34, 211, 255, 0.3)',
        }}
        aria-hidden
      >
        <span className="grid h-full w-full place-items-center rounded-md bg-void">
          <svg
            viewBox="0 0 24 24"
            className="h-2/3 w-2/3"
            fill="none"
            stroke="url(#ryze-grad)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <defs>
              <linearGradient id="ryze-grad" x1="0" y1="0" x2="24" y2="24">
                <stop offset="0%" stopColor="#b884ff" />
                <stop offset="50%" stopColor="#22d3ff" />
                <stop offset="100%" stopColor="#ff4fd8" />
              </linearGradient>
            </defs>
            {/* Stylised "R" forged from a rising arrow */}
            <path d="M5 21V4h7a4 4 0 0 1 0 8H7" />
            <path d="M11 12l7 9" />
            <path d="M16 4l3 3-3 3" />
            <path d="M19 7H9" />
          </svg>
        </span>
      </span>
      {showWord && (
        <span className={cn('font-display font-black tracking-[0.18em] text-white', wordSize)}>
          R<span className="neon-text-static">Y</span>ZE
        </span>
      )}
    </span>
  );

  if (!href) return content;
  return (
    <Link href={href} aria-label="RYZE home">
      {content}
    </Link>
  );
}
