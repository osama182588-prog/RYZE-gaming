'use client';

import Link from 'next/link';
import { ArrowUpLeft } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { TiltCard } from '@/components/ui/tilt-card';
import { Reveal, RevealItem, RevealList } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { t } from '@/i18n';

const accentMap = {
  purple: { glow: 'shadow-neon-purple', text: 'text-neon-purple', bar: 'from-neon-purple' },
  blue: { glow: 'shadow-neon-blue', text: 'text-neon-blue', bar: 'from-neon-blue' },
  pink: { glow: 'shadow-neon-pink', text: 'text-neon-pink', bar: 'from-neon-pink' },
  green: { glow: 'shadow-neon-purple', text: 'text-neon-green', bar: 'from-neon-green' },
} as const;

export function CategoriesSection() {
  return (
    <section className="ryze-container py-24 sm:py-32">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <SectionHeading
            eyebrow={t('categories.eyebrow')}
            title={t('categories.title')}
            subtitle={t('categories.subtitle')}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white"
          >
            {t('categories.browseAll')}
            <ArrowUpLeft className="h-4 w-4 transition group-hover:translate-y-0.5 group-hover:-translate-x-0.5" />
          </Link>
        </Reveal>
      </div>

      <RevealList className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((c) => {
          const accent = accentMap[c.accent];
          return (
            <RevealItem key={c.slug}>
              <TiltCard intensity={10} className="h-full">
                <Link
                  href={`/shop/${c.slug}`}
                  className={`group relative block h-full overflow-hidden rounded-2xl border border-white/10 bg-void-900 transition-all hover:border-white/20 hover:${accent.glow}`}
                >
                  <div className="aspect-[3/4] w-full overflow-hidden">
                    <img
                      src={c.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full scale-100 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-void-950/95 via-void-950/40 to-transparent" />
                  <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${accent.bar} via-transparent`} />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <p className={`text-[10px] font-bold ${accent.text}`}>
                      {c.tagline}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-black text-white sm:text-2xl">
                      {c.name}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-white/60 transition group-hover:text-white">
                      {t('categories.enter')} <ArrowUpLeft className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  {/* corner brackets */}
                  <span className="absolute start-2 top-2 h-2 w-2 border-s border-t border-white/40" />
                  <span className="absolute end-2 top-2 h-2 w-2 border-e border-t border-white/40" />
                </Link>
              </TiltCard>
            </RevealItem>
          );
        })}
      </RevealList>
    </section>
  );
}
