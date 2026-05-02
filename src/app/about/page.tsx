import type { Metadata } from 'next';
import { BRAND } from '@/lib/brand';
import { Reveal } from '@/components/ui/reveal';

export const metadata: Metadata = {
  title: 'Manifesto',
  description: BRAND.manifesto,
};

const PILLARS = [
  {
    title: 'Engineered to Win',
    text: 'Every product begins in the hands of pros — friction-tested, latency-tested, ego-tested.',
  },
  {
    title: 'Identity over Inventory',
    text: 'RYZE is a flag, not a catalog. Wear it, mount it, stream from inside it.',
  },
  {
    title: 'Drops, not Deluges',
    text: 'Numbered capsules. Time locks. We choose scarcity over sameness.',
  },
  {
    title: 'Players First',
    text: 'No paid placements, no fake influencers, no compromises. The community is the brand.',
  },
];

export default function AboutPage() {
  return (
    <div className="ryze-container py-12">
      <Reveal>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neon-pink">Manifesto</p>
        <h1 className="mt-3 font-display text-5xl font-black leading-none sm:text-7xl">
          We don&apos;t sell gear.<br />
          <span className="neon-text-static">We arm players.</span>
        </h1>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-8 max-w-2xl text-lg text-white/70">{BRAND.manifesto}</p>
      </Reveal>

      <div className="mt-20 grid gap-6 sm:grid-cols-2">
        {PILLARS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <div className="glass-card h-full p-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                Pillar 0{i + 1}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-white/60">{p.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-20">
        <Reveal>
          <div className="glass-card relative overflow-hidden p-8 sm:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-1 opacity-40"
              style={{
                background:
                  'radial-gradient(60% 60% at 50% 50%, rgba(155,92,255,0.18) 0%, transparent 60%)',
                filter: 'blur(50px)',
              }}
            />
            <p className="relative font-display text-3xl font-black leading-tight sm:text-5xl">
              {BRAND.tagline}
            </p>
            <p className="relative mt-3 text-white/50">— RYZE Collective, 2026</p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
