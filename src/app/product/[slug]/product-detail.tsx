'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Heart, Minus, Plus, ShieldCheck, ShoppingCart, Truck, Zap } from 'lucide-react';
import type { Product, ProductVariant } from '@/types';
import { Stars } from '@/components/ui/stars';
import { useCart } from '@/store/cart';
import { useUi } from '@/store/ui';
import { cn, formatPrice } from '@/lib/utils';
import { t } from '@/i18n';

interface Props {
  product: Product;
}

const TAB_LABELS = {
  description: 'الوصف',
  specs: 'المواصفات',
  reviews: 'التقييمات',
} as const;

export function ProductDetail({ product }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [zoom, setZoom] = useState({ x: 50, y: 50, on: false });
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [selected, setSelected] = useState<Record<string, string>>({});
  const addItem = useCart((s) => s.addItem);
  const setOpen = useCart((s) => s.setOpen);
  const showToast = useUi((s) => s.showToast);

  const variantTypes = useMemo(() => {
    const types = new Map<ProductVariant['type'], ProductVariant[]>();
    for (const v of product.variants) {
      const arr = types.get(v.type) ?? [];
      arr.push(v);
      types.set(v.type, arr);
    }
    return types;
  }, [product.variants]);

  const selectedVariants = useMemo(
    () =>
      Object.entries(selected)
        .map(([type, id]) => product.variants.find((v) => v.id === id && v.type === type))
        .filter(Boolean) as ProductVariant[],
    [selected, product.variants],
  );

  const priceDelta = selectedVariants.reduce((s, v) => s + (v.priceDelta ?? 0), 0);
  const finalPrice = product.price + priceDelta;
  const variantSummary = selectedVariants.map((v) => v.name).join(' · ');

  function handleAdd() {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: finalPrice,
      quantity: qty,
      variantIds: selectedVariants.map((v) => v.id),
      variantSummary,
    });
    setOpen(true);
    showToast({ title: t('productDetail.lockedLoaded'), description: product.name, tone: 'success' });
  }

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      {/* Gallery */}
      <div>
        <div
          className="gradient-border relative overflow-hidden"
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setZoom({
              x: ((e.clientX - r.left) / r.width) * 100,
              y: ((e.clientY - r.top) / r.height) * 100,
              on: true,
            });
          }}
          onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
        >
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-void-900">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={product.images[activeImage]}
                alt={product.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="h-full w-full object-cover transition-transform duration-300"
                style={{
                  transform: zoom.on ? 'scale(1.6)' : 'scale(1)',
                  transformOrigin: `${zoom.x}% ${zoom.y}%`,
                }}
              />
            </AnimatePresence>
            <span className="absolute start-3 top-3 h-3 w-3 border-s border-t border-neon-purple" />
            <span className="absolute end-3 top-3 h-3 w-3 border-e border-t border-neon-blue" />
            <span className="absolute bottom-3 start-3 h-3 w-3 border-b border-s border-neon-pink" />
            <span className="absolute bottom-3 end-3 h-3 w-3 border-b border-e border-neon-purple" />
          </div>
        </div>
        {product.images.length > 1 && (
          <div className="mt-3 grid grid-cols-5 gap-2">
            {product.images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveImage(i)}
                className={cn(
                  'aspect-square overflow-hidden rounded-lg border transition',
                  i === activeImage
                    ? 'border-neon-purple shadow-neon-purple'
                    : 'border-white/10 hover:border-white/30',
                )}
                aria-label={`${t('productDetail.viewImage')} ${i + 1}`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neon-blue">
            {product.category}
          </p>
          <h1 className="mt-2 font-display text-4xl font-black sm:text-5xl">{product.name}</h1>
          <p className="mt-2 text-white/60">{product.tagline}</p>

          <div className="mt-3 flex items-center gap-3">
            <Stars value={product.rating} />
            <span className="text-xs text-white/60">
              {product.rating.toFixed(1)} · {product.reviewCount.toLocaleString()} {t('productDetail.reviews')}
            </span>
          </div>
        </div>

        <div className="flex items-baseline gap-3">
          <span className="font-display text-4xl font-black neon-text-static">
            {formatPrice(finalPrice, product.currency)}
          </span>
          {product.compareAtPrice && (
            <span className="text-base text-white/40 line-through">
              {formatPrice(product.compareAtPrice, product.currency)}
            </span>
          )}
        </div>

        {/* Variants */}
        {Array.from(variantTypes.entries()).map(([type, variants]) => (
          <div key={type}>
            <p className="label">
              {type}
              {selected[type] && (
                <span className="ms-2 font-mono text-white/80">
                  {variants.find((v) => v.id === selected[type])?.name}
                </span>
              )}
            </p>
            <div className="flex flex-wrap gap-2">
              {variants.map((v) => {
                const isActive = selected[type] === v.id;
                if (v.type === 'color') {
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelected({ ...selected, [type]: v.id })}
                      title={v.name}
                      aria-label={v.name}
                      className={cn(
                        'relative h-9 w-9 rounded-full border-2 transition',
                        isActive ? 'border-white shadow-neon-purple' : 'border-white/20 hover:border-white/50',
                      )}
                      style={{ background: v.swatch ?? '#fff' }}
                    >
                      {isActive && (
                        <Check className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow" />
                      )}
                    </button>
                  );
                }
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelected({ ...selected, [type]: v.id })}
                    className={cn(
                      'rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-widest transition',
                      isActive
                        ? 'border-neon-purple/60 bg-neon-purple/15 text-white shadow-neon-purple'
                        : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:text-white',
                    )}
                  >
                    {v.name}
                    {v.priceDelta ? (
                      <span className="ms-1 text-white/40">+${v.priceDelta}</span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Qty + CTA */}
        <div className="mt-2 flex items-center gap-3">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5">
            <button
              type="button"
              aria-label={t('productDetail.decreaseQty')}
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="grid h-11 w-11 place-items-center text-white/80 hover:text-white"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-10 text-center font-mono">{qty}</span>
            <button
              type="button"
              aria-label={t('productDetail.increaseQty')}
              onClick={() => setQty(Math.min(99, qty + 1))}
              className="grid h-11 w-11 place-items-center text-white/80 hover:text-white"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <button type="button" onClick={handleAdd} className="btn-primary flex-1">
            <ShoppingCart className="h-4 w-4" /> {t('productDetail.addToLoadout')}
          </button>
          <button
            type="button"
            aria-label={t('productDetail.wishlist')}
            className="btn-icon h-11 w-11"
            onClick={() => showToast({ title: t('productDetail.savedToWishlist'), tone: 'success' })}
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>

        {/* Trust */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { Icon: Truck, label: t('productDetail.freeShip') },
            { Icon: ShieldCheck, label: t('productDetail.warranty') },
            { Icon: Zap, label: t('productDetail.proTested') },
          ].map(({ Icon, label }) => (
            <div key={label} className="glass flex items-center gap-2 rounded-xl p-3 text-xs">
              <Icon className="h-4 w-4 text-neon-blue" />
              <span className="text-white/80">{label}</span>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mt-4 border-t border-white/10 pt-6">
          <div className="mb-4 flex gap-2">
            {(['description', 'specs', 'reviews'] as const).map((tabKey) => (
              <button
                key={tabKey}
                type="button"
                onClick={() => setTab(tabKey)}
                className={cn(
                  'rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest transition',
                  tab === tabKey
                    ? 'bg-white text-void'
                    : 'text-white/60 hover:text-white',
                )}
              >
                {tabKey === 'reviews' ? `${TAB_LABELS[tabKey]} (${product.reviewCount})` : TAB_LABELS[tabKey]}
              </button>
            ))}
          </div>

          {tab === 'description' && (
            <div className="space-y-4 text-sm leading-relaxed text-white/70">
              <p>{product.description}</p>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-purple shadow-neon-purple" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tab === 'specs' && (
            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specs).map(([k, v], i) => (
                    <tr
                      key={k}
                      className={cn('text-white/80', i % 2 === 0 ? 'bg-white/[0.02]' : '')}
                    >
                      <th className="w-1/3 px-4 py-2 text-start text-xs font-bold uppercase tracking-widest text-white/50">
                        {k}
                      </th>
                      <td className="px-4 py-2 font-mono">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'reviews' && (
            <div className="space-y-4">
              {product.reviews.map((r) => (
                <div key={r.id} className="glass-card p-4">
                  <div className="mb-1 flex items-center justify-between">
                    <p className="font-display text-sm font-bold">{r.author}</p>
                    <Stars value={r.rating} />
                  </div>
                  <p className="text-sm font-semibold">{r.title}</p>
                  <p className="mt-1 text-sm text-white/60">{r.body}</p>
                  <p className="mt-2 text-[10px] uppercase tracking-widest text-white/40">
                    {r.verified && <span className="text-neon-green">{t('productDetail.verifiedBuyer')} · </span>}
                    {new Date(r.date).toLocaleDateString('ar-SA')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
