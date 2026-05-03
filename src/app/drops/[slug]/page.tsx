import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Zap } from 'lucide-react';
import { DROPS } from '@/data/community';
import { getProduct } from '@/data/products';
import { Countdown } from '@/components/ui/countdown';
import { ProductCard } from '@/components/product/product-card';
import { t } from '@/i18n';

export function generateStaticParams() {
  return DROPS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = DROPS.find((x) => x.slug === slug);
  return d ? { title: d.name, description: d.tagline } : {};
}

export default async function DropPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const drop = DROPS.find((d) => d.slug === slug);
  if (!drop) notFound();

  const products = drop.productSlugs.map(getProduct).filter(Boolean) as NonNullable<
    ReturnType<typeof getProduct>
  >[];

  return (
    <div className="ryze-container py-12">
      <Link
        href="/drops"
        className="mb-6 inline-flex items-center gap-2 text-sm text-white/60 hover:text-white"
      >
        <ArrowRight className="h-4 w-4" /> {t('dropsPage.allDrops')}
      </Link>

      <div className="gradient-border overflow-hidden">
        <div className="relative overflow-hidden rounded-2xl">
          <img src={drop.image} alt={drop.name} className="aspect-[21/9] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-void-950 via-void-950/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12">
            <div className="flex items-center gap-2">
              <span className="badge-limited">
                <Zap className="h-2.5 w-2.5" /> {drop.status === 'live' ? t('dropsPage.live') : drop.status === 'upcoming' ? t('dropsPage.upcoming') : t('dropsPage.sold')}
              </span>
              <span className="badge-pro">{drop.rarity}</span>
            </div>
            <h1 className="mt-3 font-display text-4xl font-black sm:text-6xl">{drop.name}</h1>
            <p className="mt-2 max-w-2xl text-white/70">{drop.description}</p>
            <div className="mt-6">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/50">
                {drop.status === 'live' ? t('dropsPage.endsIn') : t('dropsPage.releasesIn')}
              </p>
              <Countdown
                to={drop.status === 'live' && drop.endsAt ? drop.endsAt : drop.releaseAt}
              />
            </div>
          </div>
        </div>
      </div>

      <h2 className="mb-6 mt-12 font-display text-2xl font-bold">{t('dropsPage.inThisDrop')}</h2>
      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </div>
  );
}
