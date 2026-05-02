'use client';

import { Layers, ArrowRight, Cpu, Lightbulb, Mouse } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { MagneticButton } from '@/components/ui/magnetic-button';

const STEPS = [
  { Icon: Mouse, title: 'Surface', text: 'Choose your glide.' },
  { Icon: Cpu, title: 'Core', text: 'Pick your weapon.' },
  { Icon: Lightbulb, title: 'Lighting', text: 'Set the mood.' },
  { Icon: Layers, title: 'Stack', text: 'Save & share.' },
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
                eyebrow="Build Your Setup"
                title="Modular. Reactive. Yours."
                subtitle="A live configurator that turns your dream battlestation into a click-and-checkout build."
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
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                        Step {i + 1}
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
                  Start Building <ArrowRight className="h-4 w-4" />
                </MagneticButton>
                <Link
                  href="/setups"
                  className="text-sm font-semibold text-white/70 hover:text-white"
                >
                  Or explore setups →
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="gradient-border overflow-hidden">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=1200&q=80"
                  alt="RYZE setup configurator preview"
                  className="aspect-[5/4] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void-950 via-void-950/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 gap-2 p-4 sm:p-6">
                  {[
                    ['Mousepad', 'Voidweave XL'],
                    ['Headset', 'Eclipse Pro'],
                    ['Lighting', 'Orbital Bars'],
                  ].map(([k, v]) => (
                    <div key={k} className="glass rounded-xl p-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-neon-blue">
                        {k}
                      </p>
                      <p className="mt-1 truncate text-sm font-semibold">{v}</p>
                    </div>
                  ))}
                </div>
                {/* hud corners */}
                <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-neon-purple" />
                <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-neon-blue" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
