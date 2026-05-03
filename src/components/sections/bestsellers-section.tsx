'use client';

import Link from 'next/link';
import { getBestSellers } from '@/data/products';
import { ProductCard } from '@/components/product/product-card';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { ArrowUpLeft } from 'lucide-react';
import { t } from '@/i18n';

export function BestSellersSection() {
  const products = getBestSellers(8);
  return (
    <section className="ryze-container py-16 sm:py-24">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <SectionHeading
            eyebrow={t('bestsellers.eyebrow')}
            title={t('bestsellers.title')}
            subtitle={t('bestsellers.subtitle')}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Link href="/shop" className="group inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white">
            {t('bestsellers.seeAll')} <ArrowUpLeft className="h-4 w-4 transition group-hover:translate-y-0.5 group-hover:-translate-x-0.5" />
          </Link>
        </Reveal>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
