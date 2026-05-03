import { Suspense } from 'react';
import type { Metadata } from 'next';
import { SignupForm } from './form';
import { t } from '@/i18n';

export const metadata: Metadata = {
  title: t('authPage.createAccount'),
  description: t('authPage.createYourAccount'),
};

export default function SignupPage() {
  return (
    <Suspense
      fallback={<div className="ryze-container py-20 text-center text-white/50">{t('authPage.loading')}</div>}
    >
      <SignupForm />
    </Suspense>
  );
}
