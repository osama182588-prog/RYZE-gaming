'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, X, ArrowLeft } from 'lucide-react';
import { useUi } from '@/store/ui';
import { searchSuggestions } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { formatPrice } from '@/lib/utils';
import { t } from '@/i18n';

export function SearchOverlay() {
  const setOpen = useUi((s) => s.setSearchOpen);
  const [q, setQ] = useState('');
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setOpen]);

  const results = useMemo(() => searchSuggestions(q, 8), [q]);
  const trending = ['مفرش فأرة', 'هودي', 'RGB', 'سماعات', 'مكتب'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[70] bg-void-950/90 backdrop-blur-xl"
      onClick={() => setOpen(false)}
    >
      <motion.div
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="ryze-container mt-24"
      >
        <div className="glass-card overflow-hidden">
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
            <Search className="h-5 w-5 text-white/60" />
            <input
              ref={ref}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('search.placeholder')}
              className="flex-1 bg-transparent text-lg text-white placeholder:text-white/30 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="btn-icon"
              aria-label={t('search.close')}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
            <div className="border-b border-white/5 p-5 md:border-b-0 md:border-s">
              <p className="mb-3 text-[10px] font-bold text-white/50">
                {t('search.categories')}
              </p>
              <ul className="flex flex-col gap-1">
                {CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/shop/${c.slug}`}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between rounded-lg px-2 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white"
                    >
                      <span>{c.name}</span>
                      <ArrowLeft className="h-3.5 w-3.5 opacity-0 transition group-hover:-translate-x-1 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2 p-5">
              {q.trim() === '' ? (
                <>
                  <p className="mb-3 text-[10px] font-bold text-white/50">
                    {t('search.trending')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {trending.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setQ(item)}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:border-neon-purple hover:text-white"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </>
              ) : results.length === 0 ? (
                <p className="text-sm text-white/50">{t('search.noMatches')}</p>
              ) : (
                <ul className="flex flex-col gap-1">
                  {results.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/product/${p.slug}`}
                        onClick={() => setOpen(false)}
                        className="group flex items-center gap-3 rounded-xl p-2 hover:bg-white/5"
                      >
                        <img
                          src={p.images[0]}
                          alt=""
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-white">{p.name}</p>
                          <p className="truncate text-xs text-white/50">{p.tagline}</p>
                        </div>
                        <span className="text-sm font-mono text-neon-blue">
                          {formatPrice(p.price)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
