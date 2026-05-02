'use client';

import { useEffect, useState } from 'react';

interface CountdownProps {
  to: string | Date;
  onEnd?: () => void;
  compact?: boolean;
}

function calc(to: Date) {
  const diff = Math.max(0, to.getTime() - Date.now());
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s, done: diff === 0 };
}

export function Countdown({ to, onEnd, compact }: CountdownProps) {
  const target = typeof to === 'string' ? new Date(to) : to;
  const [t, setT] = useState(() => calc(target));

  useEffect(() => {
    setT(calc(target));
    const i = setInterval(() => {
      const next = calc(target);
      setT(next);
      if (next.done) {
        clearInterval(i);
        onEnd?.();
      }
    }, 1000);
    return () => clearInterval(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.getTime()]);

  const pad = (n: number) => n.toString().padStart(2, '0');

  if (compact) {
    return (
      <span className="font-mono text-sm tabular-nums text-white/90">
        {pad(t.d)}:{pad(t.h)}:{pad(t.m)}:{pad(t.s)}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {[
        { v: t.d, label: 'Days' },
        { v: t.h, label: 'Hrs' },
        { v: t.m, label: 'Min' },
        { v: t.s, label: 'Sec' },
      ].map((u, i) => (
        <div
          key={u.label}
          className="glass-card flex flex-col items-center px-3 py-2 sm:px-4 sm:py-3"
          style={{ minWidth: 60 }}
        >
          <span className="font-display text-2xl font-black tabular-nums text-white sm:text-3xl">
            {pad(u.v)}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
            {u.label}
          </span>
          {i < 3 && null}
        </div>
      ))}
    </div>
  );
}
