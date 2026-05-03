'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useUi } from '@/store/ui';
import { CheckCircle2, Info, XCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { t } from '@/i18n';

export function ToastHost() {
  const toast = useUi((s) => s.toast);
  const dismiss = useUi((s) => s.dismissToast);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-[88px] z-[80] flex justify-center px-4">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'pointer-events-auto flex items-start gap-3 glass-card max-w-md px-4 py-3 shadow-neon-purple',
            )}
          >
            <div className="mt-0.5">
              {toast.tone === 'success' && <CheckCircle2 className="h-5 w-5 text-neon-green" />}
              {toast.tone === 'error' && <XCircle className="h-5 w-5 text-neon-pink" />}
              {(!toast.tone || toast.tone === 'info') && (
                <Info className="h-5 w-5 text-neon-blue" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">{toast.title}</p>
              {toast.description && (
                <p className="mt-0.5 text-xs text-white/60">{toast.description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={dismiss}
              aria-label={t('toast.dismiss')}
              className="text-white/50 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
