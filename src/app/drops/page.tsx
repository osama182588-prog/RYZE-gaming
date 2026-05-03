import Link from 'next/link';
import type { Metadata } from 'next';
import { DROPS } from '@/data/community';
import { Countdown } from '@/components/ui/countdown';
import { ArrowLeft, Zap } from 'lucide-react';
import { t } from '@/i18n';

export const metadata: Metadata = {
  title: 'إصدارات محدودة | RYZE',
  description: 'كبسولات مرقّمة ومقيّدة بالوقت.',
};

export default function DropsPage() {
  return (
    <div className="ryze-container py-12">
      <div className="mb-12">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neon-pink">{t('dropsPage.eyebrow')}</p>
        <h1 className="mt-3 font-display text-4xl font-black sm:text-6xl">{t('dropsPage.title')}</h1>
        <p className="mt-3 max-w-2xl text-white/60">
          {t('dropsPage.subtitle')}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {DROPS.map((d) => (
          <Link
            key={d.id}
            href={`/drops/${d.slug}`}
            className="group relative block overflow-hidden rounded-2xl border border-white/10"
          >
            <div className="aspect-[16/10] w-full overflow-hidden">
              <img
                src={d.image}
                alt={d.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-void-950 via-void-950/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="flex items-center gap-2">
                <span className="badge-limited">
                  <Zap className="h-2.5 w-2.5" /> {d.status === 'live' ? t('dropsPage.live') : d.status === 'upcoming' ? t('dropsPage.upcoming') : t('dropsPage.sold')}
                </span>
                <span className="badge-pro">{d.rarity}</span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-black text-white sm:text-3xl">{d.name}</h3>
              <p className="text-sm text-white/60">{d.tagline}</p>
              <div className="mt-4 flex items-center justify-between">
                <Countdown
                  to={d.status === 'live' && d.endsAt ? d.endsAt : d.releaseAt}
                  compact
                />
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-white/80 group-hover:text-white">
                  {t('dropsPage.open')} <ArrowLeft className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
