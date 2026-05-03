'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BarChart3, Box, DollarSign, Mail, Package, ShieldAlert, Users } from 'lucide-react';
import { useAuth } from '@/store/auth';
import { CATEGORIES } from '@/data/categories';
import { PRODUCTS } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { t } from '@/i18n';
import type { Order } from '@/types';

interface Stats {
  revenue: number;
  orderCount: number;
  userCount: number;
  subscriberCount: number;
  recentOrders: Order[];
}

export default function AdminPage() {
  const router = useRouter();
  const user = useAuth((s) => s.user);
  const loading = useAuth((s) => s.loading);
  const refresh = useAuth((s) => s.refresh);
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/auth/login?next=/admin');
      return;
    }
    if (user.role !== 'admin') {
      setError(t('adminPage.adminRoleRequired'));
      return;
    }
    fetch('/api/admin/stats')
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then(setStats)
      .catch(() => setError(t('errors.serverError')));
  }, [loading, user, router]);

  if (loading || !user) {
    return <div className="ryze-container py-20 text-center text-white/50">{t('adminPage.loading')}</div>;
  }

  if (user.role !== 'admin') {
    return (
      <div className="ryze-container py-20">
        <div className="glass-card mx-auto max-w-md p-8 text-center">
          <ShieldAlert className="mx-auto mb-3 h-10 w-10 text-neon-pink" />
          <h1 className="font-display text-2xl font-bold">{t('adminPage.accessDenied')}</h1>
          <p className="mt-2 text-sm text-white/60">{error ?? t('adminPage.adminRoleRequired')}</p>
          <Link href="/" className="btn-ghost mt-5">{t('adminPage.backToSafety')}</Link>
        </div>
      </div>
    );
  }

  const productsByCategory = CATEGORIES.map((c) => ({
    category: c,
    count: PRODUCTS.filter((p) => p.category === c.slug).length,
  }));

  return (
    <div className="ryze-container py-12">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neon-pink">{t('adminPage.commandCenter')}</p>
          <h1 className="mt-3 font-display text-4xl font-black sm:text-5xl">{t('adminPage.admin')}</h1>
        </div>
        <p className="text-xs text-white/50">
          {t('adminPage.signedInAs')} <span className="text-white">{user.username}</span>
        </p>
      </div>

      {!stats ? (
        <p className="text-white/50">{t('adminPage.loadingMetrics')}</p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat Icon={DollarSign} label={t('adminPage.revenue')} value={formatPrice(stats.revenue)} accent="text-neon-green" />
            <Stat Icon={Package} label={t('adminPage.ordersLabel')} value={stats.orderCount.toLocaleString()} accent="text-neon-blue" />
            <Stat Icon={Users} label={t('adminPage.users')} value={stats.userCount.toLocaleString()} accent="text-neon-purple" />
            <Stat Icon={Mail} label={t('adminPage.subscribers')} value={stats.subscriberCount.toLocaleString()} accent="text-neon-pink" />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <section className="glass-card p-6 lg:col-span-2">
              <h2 className="mb-5 flex items-center gap-2 font-display text-lg font-bold">
                <Package className="h-5 w-5 text-neon-blue" /> {t('adminPage.recentOrders')}
              </h2>
              {stats.recentOrders.length === 0 ? (
                <p className="text-sm text-white/50">{t('adminPage.noOrdersYet')}</p>
              ) : (
                <ul className="space-y-2">
                  {stats.recentOrders.map((o) => (
                    <li
                      key={o.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-sm"
                    >
                      <div>
                        <p className="font-mono text-xs text-white/50">{o.id}</p>
                        <p className="text-white/80">{o.userEmail}</p>
                      </div>
                      <p className="text-white/50">
                        {o.items.length} {t('adminPage.items')} · {new Date(o.createdAt).toLocaleString()}
                      </p>
                      <p className="font-display text-base font-bold">{formatPrice(o.total)}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="glass-card p-6">
              <h2 className="mb-5 flex items-center gap-2 font-display text-lg font-bold">
                <Box className="h-5 w-5 text-neon-purple" /> {t('adminPage.catalog')}
              </h2>
              <ul className="space-y-2 text-sm">
                {productsByCategory.map(({ category, count }) => (
                  <li
                    key={category.slug}
                    className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-white/5"
                  >
                    <span className="text-white/80">{category.name}</span>
                    <span className="font-mono text-white">{count}</span>
                  </li>
                ))}
                <li className="mt-2 flex items-center justify-between border-t border-white/10 px-3 pt-3 font-display font-bold">
                  <span>{t('adminPage.totalLabel')}</span>
                  <span className="neon-text-static">{PRODUCTS.length}</span>
                </li>
              </ul>
            </section>
          </div>

          <section className="glass-card mt-8 p-6">
            <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-bold">
              <BarChart3 className="h-5 w-5 text-neon-blue" /> {t('adminPage.notes')}
            </h2>
            <p className="text-sm text-white/60">
              {t('adminPage.notesDesc')}
              <code className="mx-1 rounded bg-white/10 px-1 py-0.5 font-mono text-xs">src/lib/store.ts</code>
            </p>
          </section>
        </>
      )}
    </div>
  );
}

function Stat({
  Icon,
  label,
  value,
  accent,
}: {
  Icon: typeof DollarSign;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="glass-card p-5">
      <div className="mb-3 grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5">
        <Icon className={`h-4 w-4 ${accent}`} />
      </div>
      <p className="font-display text-2xl font-black">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">{label}</p>
    </div>
  );
}
