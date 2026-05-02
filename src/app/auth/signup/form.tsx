'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Lock, Mail, User } from 'lucide-react';
import { useAuth } from '@/store/auth';
import { useUi } from '@/store/ui';
import { Logo } from '@/components/ui/logo';

export function SignupForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const setUser = useAuth((s) => s.setUser);
  const showToast = useUi((s) => s.showToast);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const ref = sp.get('ref');
    if (ref) setReferralCode(ref);
  }, [sp]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, username, password, referralCode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Signup failed');
      setUser(data.user);
      showToast({ title: `Welcome to RYZE, ${data.user.username}`, tone: 'success' });
      router.push('/account');
    } catch (err) {
      showToast({ title: 'Signup failed', description: err instanceof Error ? err.message : '', tone: 'error' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="ryze-container grid min-h-[70vh] place-items-center py-12">
      <div className="glass-card w-full max-w-md p-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <Logo size="lg" href={null} />
          <h1 className="mt-4 font-display text-3xl font-black">Join the rise</h1>
          <p className="mt-1 text-sm text-white/60">Create your RYZE player account.</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="label" htmlFor="username">Player tag</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                id="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input pl-9"
                placeholder="phantom_22"
              />
            </div>
          </div>
          <div>
            <label className="label" htmlFor="email">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input pl-9"
              />
            </div>
          </div>
          <div>
            <label className="label" htmlFor="password">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                id="password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input pl-9"
                placeholder="At least 8 characters"
              />
            </div>
          </div>
          <div>
            <label className="label" htmlFor="ref">Referral code (optional)</label>
            <input
              id="ref"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              className="input"
              placeholder="RYZE-XXXX"
            />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary w-full justify-center">
            {submitting ? 'Creating…' : (
              <>
                Create account <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-white/50">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-neon-blue hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
