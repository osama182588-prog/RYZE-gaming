'use client';

import Link from 'next/link';
import { Heart, ArrowUpRight } from 'lucide-react';
import { SETUPS } from '@/data/community';
import { Reveal, RevealList, RevealItem } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

export function SetupsSection() {
  const featured = SETUPS.slice(0, 6);
  return (
    <section className="ryze-container py-24">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <SectionHeading
            eyebrow="Setup Inspiration"
            title="From the global RYZE collective."
            subtitle="Curated battlestations from players, streamers and pros across the world."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Link
            href="/setups"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white"
          >
            See all setups <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>

      <RevealList className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((s) => (
          <RevealItem key={s.id}>
            <div className="glass-card group relative overflow-hidden">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-void-950 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-display text-lg font-bold text-white">{s.title}</p>
                <div className="mt-1 flex items-center justify-between text-xs">
                  <p className="text-white/60">
                    by <span className="text-white/90">{s.ownerHandle}</span>
                  </p>
                  <span className="inline-flex items-center gap-1 text-white/80">
                    <Heart className="h-3.5 w-3.5 text-neon-pink" />
                    {s.likes.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealList>
    </section>
  );
}
