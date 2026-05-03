'use client';

import { Layers, ArrowLeft, Cpu, Lightbulb, Mouse } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { t } from '@/i18n';

const STEPS = [
  { Icon: Mouse, title: t('buildSetup.step1Title'), text: t('buildSetup.step1Text') },
  { Icon: Cpu, title: t('buildSetup.step2Title'), text: t('buildSetup.step2Text') },
  { Icon: Lightbulb, title: t('buildSetup.step3Title'), text: t('buildSetup.step3Text') },
  { Icon: Layers, title: t('buildSetup.step4Title'), text: t('buildSetup.step4Text') },
];

export function BuildSetupSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-50"
        style={{
          background:
            'radial-gradient(60% 50% at 70% 50%, rgba(34,211,255,0.18) 0%, transparent 60%), radial-gradient(50% 60% at 20% 30%, rgba(155,92,255,0.16) 0%, transparent 60%)',
        }}
      />
      <div className="ryze-container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <SectionHeading
                eyebrow={t('buildSetup.eyebrow')}
                title={t('buildSetup.title')}
                subtitle={t('buildSetup.subtitle')}
              />
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {STEPS.map(({ Icon, title, text }, i) => (
                  <div key={title} className="glass-card flex items-start gap-3 p-4">
                    <div className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5">
                      <Icon className="h-4 w-4 text-neon-blue" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-white/40">
                        {t('buildSetup.step')} {i + 1}
                      </p>
                      <p className="font-display text-sm font-bold text-white">{title}</p>
                      <p className="text-xs text-white/50">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-3">
                <MagneticButton href="/build-setup" variant="primary">
                  {t('buildSetup.startBuilding')} <ArrowLeft className="h-4 w-4" />
                </MagneticButton>
                <Link
                  href="/setups"
                  className="text-sm font-semibold text-white/70 hover:text-white"
                >
                  {t('buildSetup.exploreSetups')} ←
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="gradient-border overflow-hidden">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=1200&q=80"
                  alt={t('buildSetup.previewAlt')}
                  className="aspect-[5/4] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void-950 via-void-950/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 gap-2 p-4 sm:p-6">
                  {[
                    [t('buildSetup.mousepad'), 'Voidweave XL'],
                    [t('buildSetup.headset'), 'Eclipse Pro'],
                    [t('buildSetup.lighting'), 'Orbital Bars'],
                  ].map(([k, v]) => (
                    <div key={k} className="glass rounded-xl p-3">
                      <p className="text-[10px] font-bold text-neon-blue">
                        {k}
                      </p>
                      <p className="mt-1 truncate text-sm font-semibold">{v}</p>
                    </div>
                  ))}
                </div>
                {/* hud corners */}
                <span className="absolute start-3 top-3 h-3 w-3 border-s border-t border-neon-purple" />
                <span className="absolute end-3 top-3 h-3 w-3 border-e border-t border-neon-blue" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
