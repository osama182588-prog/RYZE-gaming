'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CreditCard, Lock, Package, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '@/store/cart';
import { useAuth } from '@/store/auth';
import { useUi } from '@/store/ui';
import { cn, formatPrice } from '@/lib/utils';
import { t } from '@/i18n';

const STEPS = ['shipping', 'payment', 'review'] as const;
type Step = (typeof STEPS)[number];

const STEP_LABELS: Record<Step, string> = {
  shipping: 'الشحن',
  payment: 'الدفع',
  review: 'مراجعة',
};

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const discount = useCart((s) => s.discount());
  const shipping = useCart((s) => s.shipping());
  const tax = useCart((s) => s.tax());
  const total = useCart((s) => s.total());
  const coupon = useCart((s) => s.coupon);
  const clear = useCart((s) => s.clear);
  const user = useAuth((s) => s.user);
  const refresh = useAuth((s) => s.refresh);
  const showToast = useUi((s) => s.showToast);

  const [step, setStep] = useState<Step>('shipping');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{ id: string; total: number } | null>(null);
  const [form, setForm] = useState({
    fullName: user?.username ?? '',
    email: user?.email ?? '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    region: '',
    postal: '',
    country: 'SA',
    cardName: '',
    cardNumber: '',
    cardExp: '',
    cardCvc: '',
  });

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        fullName: f.fullName || user.username,
        email: f.email || user.email,
      }));
    }
  }, [user]);

  // If cart is empty and we haven't placed an order, bounce to /cart
  useEffect(() => {
    if (items.length === 0 && !done) {
      router.replace('/cart');
    }
  }, [items.length, done, router]);

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm({ ...form, [k]: v });
  }

  async function placeOrder() {
    setSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          items,
          subtotal,
          discount,
          shipping,
          tax,
          total,
          couponCode: coupon?.code,
          shippingAddress: {
            fullName: form.fullName,
            email: form.email,
            phone: form.phone,
            line1: form.line1,
            line2: form.line2,
            city: form.city,
            region: form.region,
            postal: form.postal,
            country: form.country,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t('checkoutPage.couldNotPlace'));
      setDone({ id: data.order.id, total: data.order.total });
      clear();
      showToast({ title: t('checkoutPage.orderConfirmed'), description: data.order.id, tone: 'success' });
    } catch (err) {
      showToast({
        title: t('checkoutPage.orderFailed'),
        description: err instanceof Error ? err.message : t('checkoutPage.tryAgain'),
        tone: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="ryze-container py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card mx-auto max-w-xl p-10 text-center"
        >
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-neon-green/15 text-neon-green shadow-neon-purple">
            <Check className="h-8 w-8" />
          </div>
          <h1 className="font-display text-3xl font-black">{t('checkoutPage.orderConfirmedTitle')}</h1>
          <p className="mt-2 text-white/60">
            {t('checkoutPage.orderLabel')} <span className="font-mono text-white">{done.id}</span> · {t('checkoutPage.totalLabel')}{' '}
            <span className="font-mono text-white">{formatPrice(done.total)}</span>
          </p>
          <p className="mt-4 text-sm text-white/60">
            {t('checkoutPage.gearPrepping')} {form.email}.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/account" className="btn-primary">
              {t('checkoutPage.viewAccount')}
            </Link>
            <Link href="/shop" className="btn-ghost">
              {t('checkoutPage.keepShopping')}
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const stepIdx = STEPS.indexOf(step);

  return (
    <div className="ryze-container py-12">
      <h1 className="mb-8 font-display text-4xl font-black sm:text-5xl">{t('checkoutPage.title')}</h1>

      {/* Stepper */}
      <ol className="mb-10 flex flex-wrap items-center gap-3">
        {STEPS.map((s, i) => (
          <li key={s} className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => i < stepIdx && setStep(s)}
              className={cn(
                'flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition',
                i === stepIdx
                  ? 'border-neon-purple/60 bg-neon-purple/15 text-white shadow-neon-purple'
                  : i < stepIdx
                  ? 'border-neon-green/40 text-neon-green'
                  : 'border-white/10 text-white/40',
              )}
            >
              <span className="font-mono">{i + 1}.</span> {STEP_LABELS[s]}
            </button>
            {i < STEPS.length - 1 && <span className="text-white/20">←</span>}
          </li>
        ))}
      </ol>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="glass-card p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {step === 'shipping' && (
              <motion.section
                key="shipping"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-6 flex items-center gap-2">
                  <Truck className="h-5 w-5 text-neon-blue" />
                  <h2 className="font-display text-xl font-bold">{t('checkoutPage.shippingAddress')}</h2>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label={t('checkoutPage.fullName')} value={form.fullName} onChange={(v) => set('fullName', v)} />
                  <Field label={t('checkoutPage.emailLabel')} type="email" value={form.email} onChange={(v) => set('email', v)} />
                  <Field label={t('checkoutPage.phone')} value={form.phone} onChange={(v) => set('phone', v)} />
                  <Field label={t('checkoutPage.country')} value={form.country} onChange={(v) => set('country', v)} />
                  <div className="sm:col-span-2">
                    <Field label={t('checkoutPage.addressLine1')} value={form.line1} onChange={(v) => set('line1', v)} />
                  </div>
                  <div className="sm:col-span-2">
                    <Field label={t('checkoutPage.addressLine2')} value={form.line2} onChange={(v) => set('line2', v)} />
                  </div>
                  <Field label={t('checkoutPage.city')} value={form.city} onChange={(v) => set('city', v)} />
                  <Field label={t('checkoutPage.region')} value={form.region} onChange={(v) => set('region', v)} />
                  <Field label={t('checkoutPage.postalCode')} value={form.postal} onChange={(v) => set('postal', v)} />
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep('payment')}
                    disabled={!form.fullName || !form.email || !form.line1 || !form.city || !form.postal}
                    className="btn-primary disabled:opacity-50"
                  >
                    {t('checkoutPage.continueToPayment')}
                  </button>
                </div>
              </motion.section>
            )}

            {step === 'payment' && (
              <motion.section
                key="payment"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-6 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-neon-blue" />
                  <h2 className="font-display text-xl font-bold">{t('checkoutPage.payment')}</h2>
                </div>
                <p className="mb-4 inline-flex items-center gap-1 text-xs text-white/50">
                  <Lock className="h-3 w-3" /> {t('checkoutPage.demoCheckout')}
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Field label={t('checkoutPage.nameOnCard')} value={form.cardName} onChange={(v) => set('cardName', v)} />
                  </div>
                  <div className="sm:col-span-2">
                    <Field
                      label={t('checkoutPage.cardNumber')}
                      value={form.cardNumber}
                      onChange={(v) => set('cardNumber', v.replace(/[^0-9 ]/g, '').slice(0, 19))}
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>
                  <Field
                    label={t('checkoutPage.expiry')}
                    value={form.cardExp}
                    onChange={(v) => set('cardExp', v.replace(/[^0-9/]/g, '').slice(0, 5))}
                    placeholder="12/29"
                  />
                  <Field
                    label={t('checkoutPage.cvc')}
                    value={form.cardCvc}
                    onChange={(v) => set('cardCvc', v.replace(/[^0-9]/g, '').slice(0, 4))}
                    placeholder="123"
                  />
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <button type="button" onClick={() => setStep('shipping')} className="text-sm text-white/60 hover:text-white">
                    {t('checkoutPage.back')} →
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep('review')}
                    disabled={!form.cardName || !form.cardNumber || !form.cardExp || !form.cardCvc}
                    className="btn-primary disabled:opacity-50"
                  >
                    {t('checkoutPage.reviewOrder')}
                  </button>
                </div>
              </motion.section>
            )}

            {step === 'review' && (
              <motion.section
                key="review"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-6 flex items-center gap-2">
                  <Package className="h-5 w-5 text-neon-blue" />
                  <h2 className="font-display text-xl font-bold">{t('checkoutPage.reviewAndPlace')}</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <ReviewBlock title={t('checkoutPage.shipTo')}>
                    <p>{form.fullName}</p>
                    <p>{form.line1} {form.line2}</p>
                    <p>{form.city}، {form.region} {form.postal}</p>
                    <p>{form.country}</p>
                    <p className="text-white/50">{form.email}</p>
                  </ReviewBlock>
                  <ReviewBlock title={t('checkoutPage.payWith')}>
                    <p>{form.cardName}</p>
                    <p className="font-mono">**** **** **** {form.cardNumber.slice(-4)}</p>
                    <p className="text-white/50">{t('checkoutPage.exp')} {form.cardExp}</p>
                  </ReviewBlock>
                </div>
                <div className="mt-6 space-y-2">
                  {items.map((i) => (
                    <div
                      key={`${i.productId}::${i.variantIds.join(',')}`}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-white/80">{i.name} × {i.quantity}</span>
                      <span className="font-mono">{formatPrice(i.price * i.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <button type="button" onClick={() => setStep('payment')} className="text-sm text-white/60 hover:text-white">
                    {t('checkoutPage.back')} →
                  </button>
                  <button
                    type="button"
                    onClick={placeOrder}
                    disabled={submitting}
                    className="btn-primary disabled:opacity-50"
                  >
                    {submitting ? t('checkoutPage.processing') : (
                      <>
                        <Lock className="h-4 w-4" /> {t('checkoutPage.placeOrder')} — {formatPrice(total)}
                      </>
                    )}
                  </button>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="glass-card p-5">
            <p className="font-display text-lg font-bold">{t('checkoutPage.summary')}</p>
            <ul className="mt-4 space-y-3">
              {items.map((i) => (
                <li key={`${i.productId}::${i.variantIds.join(',')}`} className="flex items-center gap-3">
                  <img src={i.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="line-clamp-1 text-sm font-semibold">{i.name}</p>
                    <p className="text-xs text-white/40">{t('checkoutPage.qty')} {i.quantity}</p>
                  </div>
                  <span className="font-mono text-sm">{formatPrice(i.price * i.quantity)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm">
              <div className="flex justify-between"><dt className="text-white/60">{t('checkoutPage.subtotal')}</dt><dd className="font-mono">{formatPrice(subtotal)}</dd></div>
              {discount > 0 && <div className="flex justify-between"><dt className="text-white/60">{t('checkoutPage.discount')}</dt><dd className="font-mono text-neon-green">-{formatPrice(discount)}</dd></div>}
              <div className="flex justify-between"><dt className="text-white/60">{t('checkoutPage.shippingLabel')}</dt><dd className="font-mono">{shipping === 0 ? t('checkoutPage.free') : formatPrice(shipping)}</dd></div>
              <div className="flex justify-between"><dt className="text-white/60">{t('checkoutPage.tax')}</dt><dd className="font-mono">{formatPrice(tax)}</dd></div>
            </dl>
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="font-display text-lg">{t('checkoutPage.total')}</span>
              <span className="font-display text-2xl font-black neon-text-static">{formatPrice(total)}</span>
            </div>
            <p className="mt-4 inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-white/40">
              <ShieldCheck className="h-3 w-3 text-neon-green" /> {t('checkoutPage.encrypted')}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input"
      />
    </label>
  );
}

function ReviewBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-xl p-4 text-sm text-white/80">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/40">{title}</p>
      {children}
    </div>
  );
}
