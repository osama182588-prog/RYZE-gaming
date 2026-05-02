'use client';

import { Users, ShoppingBag, Zap, Globe } from 'lucide-react';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { Reveal } from '@/components/ui/reveal';

const STATS = [
  { Icon: Users, value: 184320, suffix: '+', label: 'Active Players' },
  { Icon: ShoppingBag, value: 612000, suffix: '+', label: 'Units Shipped' },
  { Icon: Zap, value: 38, label: 'Limited Drops' },
  { Icon: Globe, value: 64, label: 'Countries' },
];

export function StatsSection() {
  return (
    <section className="ryze-container py-16 sm:py-20">
      <Reveal>
        <div className="glass-card relative overflow-hidden p-6 sm:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-1 opacity-50"
            style={{
              background:
                'radial-gradient(40% 60% at 30% 50%, rgba(155,92,255,0.18) 0%, transparent 60%), radial-gradient(40% 60% at 80% 50%, rgba(34,211,255,0.18) 0%, transparent 60%)',
              filter: 'blur(40px)',
            }}
          />
          <div className="relative grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map(({ Icon, value, suffix, label }) => (
              <div key={label} className="flex flex-col items-center text-center">
                <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
                  <Icon className="h-4 w-4 text-neon-blue" />
                </div>
                <p className="font-display text-3xl font-black neon-text-static sm:text-4xl">
                  <AnimatedCounter value={value} suffix={suffix ?? ''} />
                </p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/50">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
