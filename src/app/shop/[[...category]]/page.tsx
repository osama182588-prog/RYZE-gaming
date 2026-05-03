import type { Metadata } from 'next';
import { ShopPageClient } from './shop-client';
import { CATEGORIES } from '@/data/categories';
import { PRODUCTS } from '@/data/products';
import { t } from '@/i18n';

export const metadata: Metadata = {
  title: 'المتجر | RYZE',
  description: 'تصفّح ترسانة RYZE الكاملة.',
};

interface PageProps {
  params: Promise<{ category?: string[] }>;
}

export default async function ShopPage({ params }: PageProps) {
  const { category } = await params;
  const slug = category?.[0];
  const cat = slug ? CATEGORIES.find((c) => c.slug === slug) : undefined;

  return (
    <div className="ryze-container py-12">
      <div className="mb-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neon-blue">
          {cat ? cat.tagline : t('shopPage.fullArsenal')}
        </p>
        <h1 className="mt-3 font-display text-4xl font-black sm:text-5xl">
          {cat ? cat.name : t('shopPage.title')}
        </h1>
        <p className="mt-3 max-w-2xl text-white/60">
          {cat ? cat.description : `${PRODUCTS.length} ${t('shopPage.productsCount')}`}
        </p>
      </div>
      <ShopPageClient initialCategory={slug} />
    </div>
  );
}
