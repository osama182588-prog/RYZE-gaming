'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Award,
  Crown,
  Flame,
  LayoutGrid as Layers,
  LogOut,
  Package,
  Share2,
  Trophy,
  UserPlus,
  Zap,
  Copy,
  ArrowLeft,
} from 'lucide-react';
import { useAuth } from '@/store/auth';
import { ACHIEVEMENTS } from '@/data/community';
import { useUi } from '@/store/ui';
import { cn, formatPrice } from '@/lib/utils';
import { t } from '@/i18n';
import type { Order } from '@/types';

const ICONS: Record<string, typeof Trophy> = {
  Trophy,
  Crown,
  Layers,
  UserPlus,
  Zap,
  Flame,
  Award,
};

const RARITY: Record<string, string> = {
  common: 'text-white/80',
  rare: 'text-neon-blue',
  epic: 'text-neon-purple',
  legendary: 'text-neon-pink',
};

function levelFromXp(xp: number) {
  // Each level = 250 + 50*(level) xp
  let level = 1;
  let needed = 250;
  let cur = xp;
  while (cur >= needed) {
    cur -= needed;
    level += 1;
    needed = 250 + 50 * (level - 1);
  }
  return { level, intoLevel: cur, levelSize: needed };
}

export default function AccountPage() {
  const router = useRouter();
  const user = useAuth((s) => s.user);
  const loading = useAuth((s) => s.loading);
  const refresh = useAuth((s) => s.refresh);
  const logout = useAuth((s) => s.logout);
  const showToast = useUi((s) => s.showToast);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (!loading && !user) router.replace('/auth/login');
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    fetch('/api/orders')
      .then((r) => r.json())
      .then((d) => setOrders(d.orders ?? []))
      .catch(() => {});
  }, [user]);

  const lvl = useMemo(() => (user ? levelFromXp(user.xp) : { level: 0, intoLevel: 0, levelSize: 100 }), [user]);
  const pct = lvl.levelSize > 0 ? (lvl.intoLevel / lvl.levelSize) * 100 : 0;

  if (loading || !user) {
    return (
      <div className="ryze-container py-20 text-center text-white/50">{t('accountPage.loading')}</div>
    );
  }

  function copyReferral() {
    if (!user) return;
    navigator.clipboard.writeText(user.referralCode || '').catch(() => {});
    showToast({ title: t('accountPage.referralCodeCopied'), tone: 'success' });
  }

  return (
    <div className="ryze-container py-12">
      {/* Header card */}
      <div className="glass-card relative overflow-hidden p-6 sm:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-1 opacity-50"
          style={{
            background:
              'radial-gradient(40% 60% at 30% 50%, rgba(155,92,255,0.18) 0%, transparent 60%), radial-gradient(40% 60% at 80% 50%, rgba(34,211,255,0.18) 0%, transparent 60%)',
            filter: 'blur(40px)',
          }}
        />
        <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neon-blue">{t('accountPage.playerProfile')}</p>
            <h1 className="mt-2 font-display text-4xl font-black sm:text-5xl">
              <span className="neon-text-static">{user.username}</span>
            </h1>
            <p className="mt-1 text-sm text-white/60">{user.email}</p>
          </div>
          <div className="flex items-center gap-2">
            {user.role === 'admin' && (
              <Link href="/admin" className="btn-ghost">
                {t('nav.admin')}
              </Link>
            )}
            <button
              type="button"
              onClick={async () => {
                await logout();
                router.push('/');
              }}
              className="btn-ghost"
            >
              <LogOut className="h-4 w-4" /> {t('accountPage.signOut')}
            </button>
          </div>
        </div>

        {/* Level bar */}
        <div className="relative mt-8">
          <div className="mb-2 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">{t('accountPage.level')}</p>
              <p className="font-display text-3xl font-black">
                <span className="neon-text-static">{lvl.level.toString().padStart(2, '0')}</span>
                <span className="me-2 text-base text-white/40">/ XP {user.xp.toLocaleString()}</span>
              </p>
            </div>
            <p className="text-xs text-white/50">
              {lvl.intoLevel} / {lvl.levelSize} {t('accountPage.xpToLevel')} {lvl.level + 1}
            </p>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-l from-neon-purple via-neon-blue to-neon-pink transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Achievements */}
        <section className="glass-card p-6 lg:col-span-2">
          <h2 className="mb-5 font-display text-xl font-bold">{t('accountPage.achievements')}</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {ACHIEVEMENTS.map((a) => {
              const unlocked = user.achievements?.includes(a.id);
              const Icon = ICONS[a.icon] ?? Trophy;
              return (
                <div
                  key={a.id}
                  className={cn(
                    'glass relative flex flex-col items-start gap-2 rounded-xl p-4 transition',
                    unlocked ? '' : 'opacity-50 grayscale',
                  )}
                >
                  <div className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5">
                    <Icon className={cn('h-4 w-4', RARITY[a.rarity])} />
                  </div>
                  <p className={cn('font-display text-sm font-bold', RARITY[a.rarity])}>
                    {a.name}
                  </p>
                  <p className="text-xs text-white/50">{a.description}</p>
                  <p className="mt-auto text-[10px] font-mono uppercase tracking-widest text-white/40">
                    +{a.xp} XP
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Referral */}
        <section className="glass-card p-6">
          <h2 className="mb-3 font-display text-xl font-bold">{t('accountPage.referral')}</h2>
          <p className="text-sm text-white/60">
            {t('accountPage.referralDesc')}
          </p>
          <div className="mt-4 flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-mono">
            <span className="text-neon-blue">{user.referralCode}</span>
            <button
              type="button"
              onClick={copyReferral}
              className="text-white/60 hover:text-white"
              aria-label={t('accountPage.copy')}
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              const url = `${window.location.origin}/auth/signup?ref=${user.referralCode}`;
              navigator.clipboard.writeText(url).catch(() => {});
              showToast({ title: t('accountPage.referralLinkCopied'), tone: 'success' });
            }}
            className="btn-ghost mt-3 w-full justify-center"
          >
            <Share2 className="h-4 w-4" /> {t('accountPage.copyInviteLink')}
          </button>
        </section>
      </div>

      {/* Orders */}
      <section className="glass-card mt-8 p-6">
        <h2 className="mb-5 flex items-center gap-2 font-display text-xl font-bold">
          <Package className="h-5 w-5 text-neon-blue" /> {t('accountPage.orders')}
        </h2>
        {orders.length === 0 ? (
          <p className="text-sm text-white/50">
            {t('accountPage.noOrdersYet')} <Link href="/shop" className="text-neon-blue hover:underline">{t('accountPage.startFirstLoadout')}</Link>
          </p>
        ) : (
          <div className="space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="glass flex flex-wrap items-center justify-between gap-3 rounded-xl p-4">
                <div>
                  <p className="font-mono text-xs text-white/50">{o.id}</p>
                  <p className="font-display text-base font-bold">{o.items.length} {t('accountPage.items')}</p>
                  <p className="text-xs text-white/40">{new Date(o.createdAt).toLocaleString()}</p>
                </div>
                <div className="text-start">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neon-green">
                    {o.status}
                  </p>
                  <p className="font-display text-lg font-black">{formatPrice(o.total)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
