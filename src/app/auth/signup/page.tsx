import { Suspense } from 'react';
import type { Metadata } from 'next';
import { SignupForm } from './form';

export const metadata: Metadata = {
  title: 'Create account',
  description: 'Join the RYZE collective.',
};

export default function SignupPage() {
  return (
    <Suspense
      fallback={<div className="ryze-container py-20 text-center text-white/50">Loading…</div>}
    >
      <SignupForm />
    </Suspense>
  );
}
