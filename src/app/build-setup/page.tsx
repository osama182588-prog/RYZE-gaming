'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Layers, RotateCcw, ShoppingCart, Sparkles } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/store/cart';
import { useUi } from '@/store/ui';
import { cn, formatPrice } from '@/lib/utils';

// Steps map to category slugs in build order
const STEP_SLUGS = ['accessories', 'audio', 'rgb', 'furniture', 'clothing'] as const;

export default function BuildSetupPage() {
  const steps = useMemo(
    () =>
      STEP_SLUGS.map((slug) => ({
        category: CATEGORIES.find((c) => c.slug === slug)!,
        products: PRODUCTS.filter((p) => p.category === slug),
      })).filter((s) => s.products.length > 0),
    [],
  );

  const [activeStep, setActiveStep] = useState(0);
  const [picks, setPicks] = useState<Record<string, string>>({});
  const addItem = useCart((s) => s.addItem);
  const setOpen = useCart((s) => s.setOpen);
  const showToast = useUi((s) => s.showToast);

  const currentStep = steps[activeStep];
  const totalPicked = Object.values(picks).filter(Boolean).length;

  const subtotal = useMemo(
    () =>
      Object.values(picks).reduce((s, id) => {
        const p = PRODUCTS.find((x) => x.id === id);
        return s + (p?.price ?? 0);
      }, 0),
    [picks],
  );

  function selectProduct(productId: string) {
    setPicks({ ...picks, [currentStep.category.slug]: productId });
    if (activeStep < steps.length - 1) {
      setTimeout(() => setActiveStep(activeStep + 1), 350);
    }
  }

  function addBuildToCart() {
    const items = Object.values(picks)
      .map((id) => PRODUCTS.find((p) => p.id === id))
      .filter(Boolean) as (typeof PRODUCTS)[number][];
    if (items.length === 0) {
      showToast({ title: 'Pick at least one item', tone: 'info' });
      return;
    }
    items.forEach((p) =>
      addItem({
        productId: p.id,
        slug: p.slug,
        name: p.name,
        image: p.images[0],
        price: p.price,
        quantity: 1,
        variantIds: [],
      }),
    );
    setOpen(true);
    showToast({
      title: 'Build added to loadout',
      description: `${items.length} pieces`,
      tone: 'success',
    });
  }

  function reset() {
    setPicks({});
    setActiveStep(0);
  }

  return (
    <div className="ryze-container py-12">
      <div className="mb-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neon-blue">Build Your Setup</p>
        <h1 className="mt-3 font-display text-4xl font-black sm:text-5xl">
          The interactive <span className="neon-text-static">configurator.</span>
        </h1>
        <p className="mt-3 max-w-2xl text-white/60">
          Move through each layer and assemble a battlestation that&apos;s 100% you.
        </p>
      </div>

      {/* Step nav */}
      <div className="mb-6 flex flex-wrap gap-2">
        {steps.map((s, i) => {
          const picked = picks[s.category.slug];
          const active = i === activeStep;
          return (
            <button
              key={s.category.slug}
              type="button"
              onClick={() => setActiveStep(i)}
              className={cn(
                'flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition',
                active
                  ? 'border-neon-purple/60 bg-neon-purple/15 text-white shadow-neon-purple'
                  : picked
                  ? 'border-neon-green/40 text-neon-green'
                  : 'border-white/10 text-white/50 hover:text-white',
              )}
            >
              <span className="font-mono">{i + 1}.</span> {s.category.name}
              {picked && <Check className="h-3 w-3" />}
            </button>
          );
        })}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Picker */}
        <div className="glass-card p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-neon-blue">
                Step {activeStep + 1} / {steps.length}
              </p>
              <h2 className="font-display text-xl font-bold">{currentStep.category.name}</h2>
            </div>
            <Sparkles className="h-5 w-5 text-neon-purple" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {currentStep.products.map((p) => {
              const picked = picks[currentStep.category.slug] === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => selectProduct(p.id)}
                  className={cn(
                    'group flex gap-3 rounded-xl border p-3 text-left transition',
                    picked
                      ? 'border-neon-purple/60 bg-neon-purple/10 shadow-neon-purple'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/5',
                  )}
                >
                  <img
                    src={p.images[0]}
                    alt=""
                    className="h-20 w-20 shrink-0 rounded-lg object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <p className="line-clamp-1 font-display text-sm font-bold">{p.name}</p>
                    <p className="line-clamp-1 text-xs text-white/50">{p.tagline}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="font-mono text-sm">{formatPrice(p.price)}</span>
                      {picked ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-neon-green">
                          <Check className="h-3 w-3" /> Equipped
                        </span>
                      ) : (
                        <span className="text-xs text-white/40 group-hover:text-white">
                          Equip →
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className="text-sm text-white/60 hover:text-white disabled:opacity-30"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
              disabled={activeStep === steps.length - 1}
              className="btn-ghost disabled:opacity-30"
            >
              Skip <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Build summary */}
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="glass-card p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-display text-lg font-bold">Your Build</p>
              <button
                type="button"
                onClick={reset}
                className="text-white/40 hover:text-white"
                aria-label="Reset build"
                title="Reset"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
            {totalPicked === 0 ? (
              <div className="grid place-items-center gap-2 py-8 text-center">
                <Layers className="h-8 w-8 text-white/20" />
                <p className="text-sm text-white/50">No pieces yet. Pick one to begin.</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {steps.map((s) => {
                  const id = picks[s.category.slug];
                  const product = id ? PRODUCTS.find((p) => p.id === id) : null;
                  if (!product) return null;
                  return (
                    <li key={s.category.slug} className="flex items-center gap-3">
                      <img src={product.images[0]} alt="" className="h-10 w-10 rounded-md object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                          {s.category.name}
                        </p>
                        <p className="line-clamp-1 text-sm font-semibold">{product.name}</p>
                      </div>
                      <span className="font-mono text-sm">{formatPrice(product.price)}</span>
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="font-display text-sm">Total</span>
              <span className="font-display text-2xl font-black neon-text-static">
                {formatPrice(subtotal)}
              </span>
            </div>

            <button
              type="button"
              onClick={addBuildToCart}
              className="btn-primary mt-4 w-full justify-center"
            >
              <ShoppingCart className="h-4 w-4" /> Add build
            </button>
            <Link
              href="/cart"
              className="mt-2 block text-center text-xs text-white/50 hover:text-white"
            >
              View cart →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
