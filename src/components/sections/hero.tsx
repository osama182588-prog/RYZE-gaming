'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ParticleField } from '@/components/effects/particle-field';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { BRAND } from '@/lib/brand';

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Particle layer */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <ParticleField density={90} opacity={0.7} />
      </div>

      {/* Light streaks */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {[
          { left: '10%', delay: 0, color: '#9b5cff' },
          { left: '40%', delay: 1.2, color: '#22d3ff' },
          { left: '70%', delay: 2.4, color: '#ff4fd8' },
          { left: '85%', delay: 3.5, color: '#9b5cff' },
        ].map((s, i) => (
          <motion.span
            key={i}
            initial={{ y: '-30%', opacity: 0 }}
            animate={{ y: '120%', opacity: [0, 0.8, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: s.delay,
              ease: 'linear',
            }}
            style={{
              left: s.left,
              background: `linear-gradient(180deg, transparent, ${s.color}, transparent)`,
            }}
            className="absolute top-0 h-[40vh] w-px"
          />
        ))}
      </div>

      <div className="ryze-container relative pb-28 pt-12 sm:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-neon-purple/40 bg-neon-purple/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-white/85"
            >
              <Sparkles className="h-3 w-3 text-neon-blue" />
              Established 2026 · Global Drop Live
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]"
            >
              <span className="block">RISE.</span>
              <span className="block neon-text">PLAY.</span>
              <span className="relative block">
                DOMINATE.
                <span
                  aria-hidden
                  className="absolute -inset-x-2 bottom-2 h-3 -z-10 blur-2xl"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(155,92,255,0.5), rgba(34,211,255,0.5), rgba(255,79,216,0.5))',
                  }}
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-base text-white/70 sm:text-lg"
            >
              {BRAND.manifesto} Engineered gear, engineered identity, engineered to win.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <MagneticButton href="/shop" variant="primary">
                Enter the Arsenal <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton href="/drops" variant="ghost">
                Live Drops
              </MagneticButton>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-white/5 pt-6"
            >
              {[
                { label: 'Players', value: '180K+' },
                { label: 'Pro Teams', value: '24' },
                { label: 'Countries', value: '60+' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-xl font-black neon-text-static">{s.value}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Floating product hero card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-aurora opacity-70 blur-2xl" />
            <div className="gradient-border overflow-hidden">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1200&q=80"
                  alt="RYZE flagship gear"
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void-950 via-void-950/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neon-blue">
                    Featured · Voidweave
                  </p>
                  <p className="mt-1 font-display text-2xl font-black text-white">
                    Tournament Series 01
                  </p>
                  <Link
                    href="/product/voidweave-xl-mousepad"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white/80 hover:text-white"
                  >
                    Inspect gear <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                {/* corner ticks */}
                <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-neon-purple" />
                <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-neon-blue" />
                <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-neon-pink" />
                <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-neon-purple" />
              </div>
            </div>

            {/* floating badges */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="glass-card absolute -left-8 top-12 hidden px-3 py-2 text-xs font-bold sm:block"
            >
              <span className="text-neon-green">●</span> 1284 reviews
            </motion.div>
            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="glass-card absolute -right-6 bottom-16 hidden px-3 py-2 text-xs font-bold sm:block"
            >
              <span className="text-neon-blue">⚡</span> Pro-tested
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scrolling marquee */}
      <div className="relative overflow-hidden border-y border-white/5 bg-void-900/50">
        <div className="flex animate-marquee whitespace-nowrap gap-12 py-4 font-display text-sm font-bold uppercase tracking-[0.3em] text-white/30">
          {Array.from({ length: 6 }).flatMap((_, i) => [
            <span key={`a${i}`}>RISE</span>,
            <span key={`b${i}`} className="text-neon-purple">★</span>,
            <span key={`c${i}`}>PLAY</span>,
            <span key={`d${i}`} className="text-neon-blue">★</span>,
            <span key={`e${i}`}>DOMINATE</span>,
            <span key={`f${i}`} className="text-neon-pink">★</span>,
            <span key={`g${i}`}>RYZE</span>,
            <span key={`h${i}`} className="text-neon-purple">★</span>,
          ])}
        </div>
      </div>
    </section>
  );
}
