import type { Metadata } from 'next';
import Link from 'next/link';
import { CREATORS } from '@/data/community';
import { getProduct } from '@/data/products';
import { TiltCard } from '@/components/ui/tilt-card';
import { t } from '@/i18n';

export const metadata: Metadata = {
  title: 'المبدعون | RYZE',
  description: 'المحترفون والبثّاث والمبدعون الذين يعتمدون على RYZE في كل ساحة.',
};

export default function CreatorsPage() {
  return (
    <div className="ryze-container py-12">
      <div className="mb-12">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neon-pink">{t('creatorsPage.eyebrow')}</p>
        <h1 className="mt-3 font-display text-4xl font-black sm:text-6xl">{t('creatorsPage.title')}</h1>
        <p className="mt-3 max-w-2xl text-white/60">
          {t('creatorsPage.subtitle')}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {CREATORS.map((c) => {
          const sig = c.signature ? getProduct(c.signature) : undefined;
          return (
            <TiltCard key={c.id} intensity={6} className="h-full">
              <article className="glass-card relative overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img src={c.cover} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-void-900 to-transparent" />
                </div>
                <div className="-mt-12 flex items-end gap-4 px-5 pb-5">
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="h-20 w-20 rounded-full border-4 border-void-900 object-cover shadow-neon-purple"
                  />
                  <div className="pb-2">
                    <p className="font-display text-xl font-bold">{c.name}</p>
                    <p className="text-sm text-white/50">
                      {c.handle} · {c.followers}
                    </p>
                  </div>
                </div>
                <div className="px-5 pb-5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neon-blue">
                    {c.game}
                  </p>
                  <p className="mt-2 text-sm text-white/70">{c.bio}</p>
                  {sig && (
                    <Link
                      href={`/product/${sig.slug}`}
                      className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 hover:border-neon-purple/50"
                    >
                      <img src={sig.images[0]} alt="" className="h-12 w-12 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                          {t('creatorsPage.signatureGear')}
                        </p>
                        <p className="text-sm font-semibold">{sig.name}</p>
                      </div>
                    </Link>
                  )}
                </div>
              </article>
            </TiltCard>
          );
        })}
      </div>
    </div>
  );
}
