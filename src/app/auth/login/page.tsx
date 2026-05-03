import { Suspense } from 'react';
import type { Metadata } from 'next';
import { LoginForm } from './form';
import { t } from '@/i18n';

export const metadata: Metadata = {
  title: t('authPage.signIn'),
  description: t('authPage.signInToAccess'),
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={<div className="ryze-container py-20 text-center text-white/50">{t('authPage.loading')}</div>}
    >
      <LoginForm />
    </Suspense>
  );
}
