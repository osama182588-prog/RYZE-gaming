'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, ShoppingCart, Sparkles, Crown, Zap, Star, Award } from 'lucide-react';
import type { Product } from '@/types';
import { TiltCard } from '@/components/ui/tilt-card';
import { Stars } from '@/components/ui/stars';
import { useCart } from '@/store/cart';
import { useUi } from '@/store/ui';
import { cn, formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const badgeIcons = {
  new: Sparkles,
  limited: Zap,
  bestseller: Star,
  pro: Crown,
  'staff-pick': Award,
} as const;

const badgeClass = {
  new: 'badge-new',
  limited: 'badge-limited',
  bestseller: 'badge-bestseller',
  pro: 'badge-pro',
  'staff-pick': 'badge-staff',
} as const;

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCart((s) => s.addItem);
  const showToast = useUi((s) => s.showToast);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.price,
      quantity: 1,
      variantIds: [],
    });
    showToast({
      title: 'Loaded into cart',
      description: product.name,
      tone: 'success',
    });
  }

  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard className="group h-full" intensity={8}>
        <Link
          href={`/product/${product.slug}`}
          className="glass-card relative flex h-full flex-col overflow-hidden p-3 transition-all duration-300 hover:border-neon-purple/50 hover:shadow-neon-purple"
        >
          {/* Image */}
          <div className="relative overflow-hidden rounded-xl bg-void-900">
            <div className="aspect-[4/5] w-full">
              <img
                src={product.images[0]}
                alt={product.name}
                loading="lazy"
                className="h-full w-full scale-100 object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-void-950/90 via-void-950/10 to-transparent" />

            {/* Badges */}
            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
              {product.badges?.map((b) => {
                const Icon = badgeIcons[b];
                return (
                  <span key={b} className={cn(badgeClass[b])}>
                    <Icon className="h-2.5 w-2.5" /> {b.replace('-', ' ')}
                  </span>
                );
              })}
              {discount > 0 && (
                <span className="badge text-neon-pink" style={{
                  background: 'rgba(255,79,216,0.12)',
                  border: '1px solid rgba(255,79,216,0.4)',
                }}>
                  -{discount}%
                </span>
              )}
            </div>

            {/* Quick actions */}
            <div className="absolute inset-x-3 bottom-3 flex translate-y-3 items-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <button
                type="button"
                onClick={handleAdd}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white/95 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-void hover:bg-white"
              >
                <ShoppingCart className="h-3.5 w-3.5" /> Add
              </button>
              <span
                className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur"
                aria-hidden
              >
                <Eye className="h-4 w-4" />
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="mt-3 flex flex-1 flex-col gap-1.5 px-1 pb-1 pt-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
              {product.category}
            </p>
            <h3 className="line-clamp-1 font-display text-base font-bold text-white">
              {product.name}
            </h3>
            <p className="line-clamp-1 text-xs text-white/55">{product.tagline}</p>
            <div className="mt-auto flex items-center justify-between pt-2">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-lg font-black text-white">
                  {formatPrice(product.price, product.currency)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-xs text-white/30 line-through">
                    {formatPrice(product.compareAtPrice, product.currency)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Stars value={product.rating} size={11} />
                <span className="text-[10px] text-white/40">({product.reviewCount})</span>
              </div>
            </div>
          </div>
        </Link>
      </TiltCard>
    </motion.div>
  );
}
