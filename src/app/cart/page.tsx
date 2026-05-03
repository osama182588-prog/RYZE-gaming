'use client';

import Link from 'next/link';
import { Minus, Plus, ShoppingBag, Tag, Trash2, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/store/cart';
import { useUi } from '@/store/ui';
import { formatPrice } from '@/lib/utils';
import { t } from '@/i18n';

export default function CartPage() {
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const discount = useCart((s) => s.discount());
  const shipping = useCart((s) => s.shipping());
  const tax = useCart((s) => s.tax());
  const total = useCart((s) => s.total());
  const updateQty = useCart((s) => s.updateQty);
  const removeItem = useCart((s) => s.removeItem);
  const applyCoupon = useCart((s) => s.applyCoupon);
  const coupon = useCart((s) => s.coupon);
  const showToast = useUi((s) => s.showToast);
  const [code, setCode] = useState('');
  const [applying, setApplying] = useState(false);

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
      if (!res.ok) throw new Error(data.error || t('cartPage.invalidCode'));
      applyCoupon(data.coupon);
      showToast({ title: `${t('cartPage.codeApplied')} ${data.coupon.code}`, tone: 'success' });
      setCode('');
    } catch (err) {
      showToast({ title: t('cartPage.codeError'), description: err instanceof Error ? err.message : '', tone: 'error' });
    } finally {
      setApplying(false);
    }
  }

  return (
    <div className="ryze-container py-12">
      <h1 className="mb-8 font-display text-4xl font-black sm:text-5xl">{t('cartPage.title')}</h1>

      {items.length === 0 ? (
        <div className="glass-card grid place-items-center gap-3 py-20 text-center">
          <ShoppingBag className="h-12 w-12 text-white/20" />
          <p className="font-display text-2xl">{t('cartPage.empty')}</p>
          <Link href="/shop" className="btn-primary mt-2">
            {t('cartPage.browseArsenal')} <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <ul className="flex flex-col gap-3">
            {items.map((item) => (
              <li
                key={`${item.productId}::${item.variantIds.join(',')}`}
                className="glass-card flex gap-4 p-4"
              >
                <Link
                  href={`/product/${item.slug}`}
                  className="block h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-void-800"
                >
                  <img src={item.image} alt="" className="h-full w-full object-cover" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <Link
                    href={`/product/${item.slug}`}
                    className="font-display text-lg font-bold text-white hover:text-neon-blue"
                  >
                    {item.name}
                  </Link>
                  {item.variantSummary && (
                    <p className="text-xs text-white/40">{item.variantSummary}</p>
                  )}
                  <p className="mt-1 text-sm text-white/60">{formatPrice(item.price)}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5">
                      <button
                        type="button"
                        aria-label={t('cartPage.decreaseQty')}
                        onClick={() => updateQty(item.productId, item.variantIds, item.quantity - 1)}
                        className="grid h-9 w-9 place-items-center text-white/80 hover:text-white"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center font-mono text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        aria-label={t('cartPage.increaseQty')}
                        onClick={() => updateQty(item.productId, item.variantIds, item.quantity + 1)}
                        className="grid h-9 w-9 place-items-center text-white/80 hover:text-white"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="font-mono text-base font-bold">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.productId, item.variantIds)}
                  className="text-white/40 hover:text-neon-pink"
                  aria-label={t('cartPage.removeItem')}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>

          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="glass-card p-5">
              <p className="font-display text-lg font-bold">{t('cartPage.orderSummary')}</p>
              <form onSubmit={applyCode} className="mt-4 flex items-center gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute start-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder={coupon?.code ?? t('cartPage.promoCode')}
                    className="input ps-9"
                  />
                </div>
                <button
                  type="submit"
                  disabled={applying}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-3 text-xs font-bold uppercase tracking-wider hover:border-neon-purple"
                >
                  {t('cartPage.apply')}
                </button>
              </form>

              <dl className="mt-5 space-y-2 text-sm">
                <Row label={t('cartPage.subtotal')} value={formatPrice(subtotal)} />
                {discount > 0 && (
                  <Row label={`${t('cartPage.discount')} (${coupon?.code})`} value={`-${formatPrice(discount)}`} accent />
                )}
                <Row label={t('cartPage.shipping')} value={shipping === 0 ? t('cartPage.free') : formatPrice(shipping)} />
                <Row label={t('cartPage.tax')} value={formatPrice(tax)} />
              </dl>
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="font-display text-lg">{t('cartPage.total')}</span>
                <span className="font-display text-2xl font-black neon-text-static">
                  {formatPrice(total)}
                </span>
              </div>
              <Link href="/checkout" className="btn-primary mt-5 w-full justify-center">
                {t('cartPage.checkout')} <ArrowLeft className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-center text-[10px] uppercase tracking-widest text-white/40">
                {t('cartPage.freeShippingNote')}
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-white/60">{label}</dt>
      <dd className={accent ? 'font-mono text-neon-green' : 'font-mono text-white'}>{value}</dd>
    </div>
  );
}
