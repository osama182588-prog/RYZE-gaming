'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Github, Instagram, Twitter, Youtube } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { BRAND } from '@/lib/brand';
import { useUi } from '@/store/ui';
import { CATEGORIES } from '@/data/categories';
import { t } from '@/i18n';

export function Footer() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const showToast = useUi((s) => s.showToast);

  async function onSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || t('errors.somethingGlitched'));
      showToast({
        title: t('toasts.lockedIn'),
        description: t('toasts.joinedWave'),
        tone: 'success',
      });
      setEmail('');
    } catch (err) {
      showToast({
        title: t('errors.somethingGlitched'),
        description: err instanceof Error ? err.message : t('errors.tryAgain'),
        tone: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <footer className="relative mt-32 border-t border-white/[0.06] pt-20 pb-10">
      <div className="absolute inset-x-0 top-0 h-px bg-neon-line opacity-60" />

      <div className="ryze-container">
        {/* Newsletter band */}
        <div className="glass-card relative overflow-hidden p-8 sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-1 bg-aurora opacity-40"
            style={{ filter: 'blur(40px)' }}
          />
          <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <span className="section-eyebrow">{t('footer.transmission')}</span>
              <h3 className="mt-4 font-display text-3xl font-black sm:text-4xl">
                {t('footer.getNextDrop')} <span className="neon-text-static">{t('footer.first')}</span>
              </h3>
              <p className="mt-3 text-white/60">
                {t('footer.joinSignal')}
              </p>
            </div>
            <form onSubmit={onSubscribe} className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="input flex-1"
              />
              <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-50">
                {submitting ? t('footer.sending') : (
                  <>
                    {t('footer.subscribe')} <ArrowLeft className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Link columns */}
        <div className="mt-16 grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <Logo size="md" />
            <p className="mt-4 max-w-sm text-sm text-white/60">{BRAND.ar.manifesto}</p>
            <div className="mt-6 flex items-center gap-2">
              {[
                { Icon: Twitter, href: BRAND.social.twitter, label: 'Twitter' },
                { Icon: Instagram, href: BRAND.social.instagram, label: 'Instagram' },
                { Icon: Youtube, href: BRAND.social.youtube, label: 'YouTube' },
                { Icon: Github, href: 'https://github.com/', label: 'GitHub' },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} className="btn-icon">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <FooterCol
            title={t('footer.shopTitle')}
            links={[
              { href: '/shop', label: t('footer.allGear') },
              ...CATEGORIES.slice(0, 5).map((c) => ({ href: `/shop/${c.slug}`, label: c.name })),
            ]}
          />
          <FooterCol
            title={t('footer.universeTitle')}
            links={[
              { href: '/drops', label: t('footer.limitedDrops') },
              { href: '/build-setup', label: t('footer.buildSetup') },
              { href: '/setups', label: t('footer.communitySetups') },
              { href: '/creators', label: t('footer.creatorsLink') },
              { href: '/about', label: t('footer.manifestoLink') },
            ]}
          />
          <FooterCol
            title={t('footer.supportTitle')}
            links={[
              { href: '/account', label: t('footer.myAccount') },
              { href: '/cart', label: t('footer.cartLink') },
              { href: '#', label: t('footer.shippingReturns') },
              { href: '#', label: t('footer.warranty') },
              { href: `mailto:${BRAND.contact.email}`, label: t('footer.contact') },
            ]}
          />
        </div>

        <div className="neon-divider mt-12" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-white/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {BRAND.ar.fullName}. {t('footer.allRights')}
          </p>
          <p className="font-mono">
            {BRAND.ar.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="mb-4 text-[10px] font-bold text-white/40">
        {title}
      </p>
      <ul className="flex flex-col gap-2">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link
              href={l.href}
              className="text-sm text-white/70 transition hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
