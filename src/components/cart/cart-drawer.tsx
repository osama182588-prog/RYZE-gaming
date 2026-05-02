'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { Minus, Plus, ShoppingBag, Trash2, X, ArrowRight, Tag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCart } from '@/store/cart';
import { useUi } from '@/store/ui';
import { formatPrice } from '@/lib/utils';

export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const setOpen = useCart((s) => s.setOpen);
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const discount = useCart((s) => s.discount());
  const total = useCart((s) => s.total());
  const updateQty = useCart((s) => s.updateQty);
  const removeItem = useCart((s) => s.removeItem);
  const applyCoupon = useCart((s) => s.applyCoupon);
  const coupon = useCart((s) => s.coupon);
  const showToast = useUi((s) => s.showToast);
  const [code, setCode] = useState('');
  const [applying, setApplying] = useState(false);

  // Close on escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, setOpen]);

  async function applyCode(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    setApplying(true);
    try {
      const res = await fetch('/api/coupons', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ code, subtotal }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid code');
      applyCoupon(data.coupon);
      showToast({ title: `Code ${data.coupon.code} applied`, description: data.coupon.description, tone: 'success' });
      setCode('');
    } catch (err) {
      showToast({
        title: 'Could not apply code',
        description: err instanceof Error ? err.message : 'Try again',
        tone: 'error',
      });
    } finally {
      setApplying(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-void-950/80 backdrop-blur-md"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 240, damping: 28 }}
            className="fixed right-0 top-0 z-[61] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-void-900/95 shadow-[-30px_0_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl"
            role="dialog"
            aria-label="Cart"
          >
            <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-neon-purple" />
                <h2 className="font-display text-lg font-bold">Your Loadout</h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="btn-icon"
                aria-label="Close cart"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <ShoppingBag className="h-12 w-12 text-white/20" />
                  <p className="font-display text-xl">Loadout is empty</p>
                  <p className="text-sm text-white/50">Equip your kit. The arsenal awaits.</p>
                  <Link
                    href="/shop"
                    onClick={() => setOpen(false)}
                    className="btn-primary mt-3"
                  >
                    Browse Gear <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <ul className="flex flex-col gap-3">
                  {items.map((item) => (
                    <li
                      key={`${item.productId}::${item.variantIds.join(',')}`}
                      className="glass flex gap-3 rounded-xl p-3"
                    >
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={() => setOpen(false)}
                        className="block h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-void-800"
                      >
                        <img src={item.image} alt="" className="h-full w-full object-cover" />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={() => setOpen(false)}
                          className="line-clamp-1 text-sm font-semibold text-white hover:text-neon-blue"
                        >
                          {item.name}
                        </Link>
                        {item.variantSummary && (
                          <p className="text-xs text-white/40">{item.variantSummary}</p>
                        )}
                        <div className="mt-auto flex items-center justify-between">
                          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() =>
                                updateQty(item.productId, item.variantIds, item.quantity - 1)
                              }
                              className="grid h-7 w-7 place-items-center text-white/70 hover:text-white"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-7 text-center text-xs tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() =>
                                updateQty(item.productId, item.variantIds, item.quantity + 1)
                              }
                              className="grid h-7 w-7 place-items-center text-white/70 hover:text-white"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="font-mono text-sm text-white">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId, item.variantIds)}
                        className="text-white/40 hover:text-neon-pink"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="border-t border-white/10 px-5 py-4">
                <form onSubmit={applyCode} className="mb-3 flex items-center gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
                    <input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder={coupon?.code ?? 'Promo code'}
                      className="input pl-9"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={applying}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-3 text-xs font-bold uppercase tracking-wider hover:border-neon-purple hover:text-white"
                  >
                    Apply
                  </button>
                </form>

                <div className="flex items-center justify-between text-sm text-white/60">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="mt-1 flex items-center justify-between text-sm text-neon-green">
                    <span>Discount{coupon ? ` (${coupon.code})` : ''}</span>
                    <span className="font-mono">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-display text-lg">Total</span>
                  <span className="font-display text-2xl font-black neon-text-static">
                    {formatPrice(total)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setOpen(false)}
                  className="btn-primary mt-4 w-full justify-center"
                >
                  Checkout <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="mt-2 block text-center text-xs text-white/50 hover:text-white"
                >
                  View full cart →
                </Link>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
