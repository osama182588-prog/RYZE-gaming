'use client';

import Link from 'next/link';
import { Zap, ArrowRight } from 'lucide-react';
import { DROPS } from '@/data/community';
import { Countdown } from '@/components/ui/countdown';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

export function DropsSection() {
  const featured = DROPS.find((d) => d.status === 'live') ?? DROPS[0];
  const upcoming = DROPS.filter((d) => d.id !== featured.id).slice(0, 2);

  return (
    <section className="ryze-container py-24">
      <Reveal>
        <SectionHeading
          eyebrow="Limited Drops"
          title="Time-locked. Numbered. Untouchable."
          subtitle="Capsule releases co-engineered with pro players. Once they're gone, they're gone."
        />
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {/* Featured drop */}
        <Reveal className="lg:col-span-2">
          <Link
            href={`/drops/${featured.slug}`}
            className="gradient-border group relative block overflow-hidden"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <div className="aspect-[16/10] w-full">
                <img
                  src={featured.image}
                  alt={featured.name}
                  className="h-full w-full scale-100 object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-void-950 via-void-950/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
                <div className="flex items-center gap-2">
                  <span className="badge-limited">
                    <Zap className="h-2.5 w-2.5" />
                    {featured.status === 'live' ? 'Live now' : 'Releasing soon'}
                  </span>
                  <span className="badge-pro">{featured.rarity}</span>
                </div>
                <h3 className="mt-4 font-display text-3xl font-black sm:text-5xl">
                  {featured.name}
                </h3>
                <p className="mt-2 max-w-xl text-sm text-white/70 sm:text-base">
                  {featured.tagline}
                </p>
                <div className="mt-6 flex flex-wrap items-end gap-6">
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/50">
                      {featured.status === 'live' ? 'Ends in' : 'Releases in'}
                    </p>
                    <Countdown
                      to={featured.status === 'live' && featured.endsAt ? featured.endsAt : featured.releaseAt}
                    />
                  </div>
                  <span className="btn-primary">
                    Reserve <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </Reveal>

        <div className="flex flex-col gap-6">
          {upcoming.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.1}>
              <Link
                href={`/drops/${d.slug}`}
                className="glass-card group flex h-full gap-4 overflow-hidden p-3 transition hover:border-neon-blue/50 hover:shadow-neon-blue"
              >
                <div className="h-32 w-32 shrink-0 overflow-hidden rounded-xl">
                  <img
                    src={d.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <span className="badge-new w-fit">{d.status}</span>
                  <h4 className="mt-2 font-display text-lg font-bold text-white">{d.name}</h4>
                  <p className="line-clamp-1 text-xs text-white/50">{d.tagline}</p>
                  <div className="mt-2">
                    <Countdown to={d.releaseAt} compact />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
