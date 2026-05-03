'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Lock, Mail } from 'lucide-react';
import { useAuth } from '@/store/auth';
import { useUi } from '@/store/ui';
import { Logo } from '@/components/ui/logo';
import { t } from '@/i18n';

export function LoginForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const setUser = useAuth((s) => s.setUser);
  const showToast = useUi((s) => s.showToast);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (sp.get('demo') === '1') {
      setEmail('player@ryze.gg');
      setPassword('player1234');
    }
  }, [sp]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t('authPage.signInFailed'));
      setUser(data.user);
      showToast({ title: `${t('authPage.welcomeBack')}، ${data.user.username}`, tone: 'success' });
      router.push(sp.get('next') || '/account');
    } catch (err) {
      showToast({
        title: t('authPage.signInFailed'),
        description: err instanceof Error ? err.message : '',
        tone: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="ryze-container grid min-h-[70vh] place-items-center py-12">
      <div className="glass-card w-full max-w-md p-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <Logo size="lg" href={null} />
          <h1 className="mt-4 font-display text-3xl font-black">{t('authPage.welcomeBack')}</h1>
          <p className="mt-1 text-sm text-white/60">{t('authPage.signInToAccess')}</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="label" htmlFor="email">{t('authPage.email')}</label>
            <div className="relative">
              <Mail className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input ps-9"
                placeholder="you@ryze.gg"
              />
            </div>
          </div>
          <div>
            <label className="label" htmlFor="password">{t('authPage.password')}</label>
            <div className="relative">
              <Lock className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input ps-9"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button type="submit" disabled={submitting} className="btn-primary w-full justify-center">
            {submitting ? t('authPage.signingIn') : (
              <>
                {t('authPage.signIn')} <ArrowLeft className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-white/50">
          {t('authPage.newHere')}{' '}
          <Link href="/auth/signup" className="text-neon-blue hover:underline">
            {t('authPage.createAccount')}
          </Link>
        </p>
        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-3 text-center text-[11px] text-white/50">
          {t('authPage.demoPlayer')}{' '}
          <button
            type="button"
            onClick={() => {
              setEmail('player@ryze.gg');
              setPassword('player1234');
            }}
            className="font-mono text-neon-blue hover:underline"
          >
            player@ryze.gg / player1234
          </button>
        </div>
      </div>
    </div>
  );
}
