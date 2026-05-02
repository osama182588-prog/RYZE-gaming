import { Suspense } from 'react';
import type { Metadata } from 'next';
import { LoginForm } from './form';

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your RYZE player account.',
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={<div className="ryze-container py-20 text-center text-white/50">Loading…</div>}
    >
      <LoginForm />
    </Suspense>
  );
}
