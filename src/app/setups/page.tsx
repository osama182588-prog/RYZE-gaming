import type { Metadata } from 'next';
import { Heart } from 'lucide-react';
import { SETUPS } from '@/data/community';

export const metadata: Metadata = {
  title: 'Setup Inspiration',
  description: 'Battlestations from the global RYZE community.',
};

export default function SetupsPage() {
  return (
    <div className="ryze-container py-12">
      <div className="mb-12">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neon-blue">Community</p>
        <h1 className="mt-3 font-display text-4xl font-black sm:text-6xl">Setup Inspiration</h1>
        <p className="mt-3 max-w-2xl text-white/60">
          Real battlestations from real players. Tap to see the gear, tag what inspires you, build your own.
        </p>
      </div>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {SETUPS.map((s) => (
          <div
            key={s.id}
            className="glass-card group relative mb-4 overflow-hidden break-inside-avoid"
          >
            <img
              src={s.image}
              alt={s.title}
              className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void-950 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="font-display text-lg font-bold">{s.title}</p>
              <div className="mt-1 flex items-center justify-between text-xs">
                <p className="text-white/60">
                  by <span className="text-white/90">{s.ownerHandle}</span>
                </p>
                <span className="inline-flex items-center gap-1 text-white/80">
                  <Heart className="h-3.5 w-3.5 text-neon-pink" />
                  {s.likes.toLocaleString()}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-widest text-white/60"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
