'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CREATORS } from '@/data/community';
import { Reveal, RevealItem, RevealList } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

export function CreatorsSection() {
  return (
    <section className="ryze-container py-24">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <SectionHeading
            eyebrow="Squad RYZE"
            title="Backed by the world's elite."
            subtitle="Pro players, streamers and creators who run RYZE on every stage."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Link href="/creators" className="group inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white">
            Meet the squad <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>

      <RevealList className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {CREATORS.map((c) => (
          <RevealItem key={c.id}>
            <Link
              href="/creators"
              className="glass-card group block overflow-hidden p-0 transition hover:border-neon-purple/40 hover:shadow-neon-purple"
            >
              <div className="relative h-32 overflow-hidden">
                <img
                  src={c.cover}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void-900 via-void-900/40 to-transparent" />
              </div>
              <div className="-mt-10 flex flex-col items-center px-4 pb-5 text-center">
                <img
                  src={c.avatar}
                  alt={c.name}
                  loading="lazy"
                  className="h-16 w-16 rounded-full border-2 border-void-900 object-cover shadow-neon-purple"
                />
                <p className="mt-3 font-display text-base font-bold">{c.name}</p>
                <p className="text-xs text-white/50">{c.handle}</p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-neon-blue">
                  {c.game}
                </p>
                <p className="mt-1 text-xs text-white/60">{c.followers} followers</p>
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealList>
    </section>
  );
}
