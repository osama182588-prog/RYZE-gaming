'use client';

import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { filterProducts, type ProductFilters } from '@/data/products';
import { ProductCard } from '@/components/product/product-card';
import { cn } from '@/lib/utils';

const SORTS: { value: NonNullable<ProductFilters['sort']>; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price ↑' },
  { value: 'price-desc', label: 'Price ↓' },
  { value: 'rating', label: 'Top rated' },
];

const BADGES = ['new', 'limited', 'bestseller', 'pro', 'staff-pick'] as const;
const PRICE_PRESETS = [
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50–$150', min: 50, max: 150 },
  { label: '$150–$500', min: 150, max: 500 },
  { label: '$500+', min: 500, max: 5000 },
];

interface Props {
  initialCategory?: string;
}

export function ShopPageClient({ initialCategory }: Props) {
  const [q, setQ] = useState('');
  const [category, setCategory] = useState<string | undefined>(initialCategory);
  const [sort, setSort] = useState<NonNullable<ProductFilters['sort']>>('featured');
  const [pricePreset, setPricePreset] = useState<number | null>(null);
  const [badges, setBadges] = useState<string[]>([]);
  const [rating, setRating] = useState<number | undefined>();
  const [showFilters, setShowFilters] = useState(false);

  const products = useMemo(() => {
    const preset = pricePreset !== null ? PRICE_PRESETS[pricePreset] : null;
    return filterProducts({
      q,
      category,
      sort,
      badges: badges.length ? badges : undefined,
      minPrice: preset?.min,
      maxPrice: preset?.max,
      rating,
    });
  }, [q, category, sort, pricePreset, badges, rating]);

  const toggleBadge = (b: string) =>
    setBadges((cur) => (cur.includes(b) ? cur.filter((x) => x !== b) : [...cur, b]));

  const clearAll = () => {
    setQ('');
    setCategory(undefined);
    setSort('featured');
    setPricePreset(null);
    setBadges([]);
    setRating(undefined);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* Filters */}
      <aside
        className={cn(
          'lg:sticky lg:top-28 lg:h-fit',
          showFilters ? 'block' : 'hidden lg:block',
        )}
      >
        <div className="glass-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-display text-sm font-bold uppercase tracking-widest">
              Filter
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="text-xs text-white/50 hover:text-white"
            >
              Clear
            </button>
          </div>

          <div className="relative mb-5">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search gear…"
              className="input pl-9"
            />
          </div>

          <FilterGroup title="Category">
            <div className="flex flex-col gap-1">
              <FilterChip
                active={!category}
                onClick={() => setCategory(undefined)}
                label="All"
              />
              {CATEGORIES.map((c) => (
                <FilterChip
                  key={c.slug}
                  active={category === c.slug}
                  onClick={() => setCategory(c.slug)}
                  label={c.name}
                />
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Price">
            <div className="flex flex-col gap-1">
              {PRICE_PRESETS.map((p, i) => (
                <FilterChip
                  key={p.label}
                  active={pricePreset === i}
                  onClick={() => setPricePreset(pricePreset === i ? null : i)}
                  label={p.label}
                />
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Tag">
            <div className="flex flex-wrap gap-1.5">
              {BADGES.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => toggleBadge(b)}
                  className={cn(
                    'rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest transition',
                    badges.includes(b)
                      ? 'border-neon-purple/60 bg-neon-purple/15 text-white'
                      : 'border-white/10 bg-white/5 text-white/60 hover:border-white/30',
                  )}
                >
                  {b.replace('-', ' ')}
                </button>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Rating">
            <div className="flex flex-col gap-1">
              {[5, 4, 3].map((r) => (
                <FilterChip
                  key={r}
                  active={rating === r}
                  onClick={() => setRating(rating === r ? undefined : r)}
                  label={`${r}★ & up`}
                />
              ))}
            </div>
          </FilterGroup>
        </div>
      </aside>

      {/* Grid */}
      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/80 lg:hidden"
          >
            {showFilters ? <X className="h-3.5 w-3.5" /> : <SlidersHorizontal className="h-3.5 w-3.5" />}
            Filters
          </button>

          <p className="text-sm text-white/50">
            <span className="font-mono text-white">{products.length}</span> results
          </p>

          <div className="ml-auto flex items-center gap-2">
            <label className="text-xs text-white/50" htmlFor="sort">Sort</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as NonNullable<ProductFilters['sort']>)}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white outline-none focus:border-neon-purple"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value} className="bg-void-900">
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="glass-card grid place-items-center p-12 text-center">
            <p className="font-display text-xl">No matches.</p>
            <p className="mt-1 text-sm text-white/50">Try clearing filters or using broader keywords.</p>
            <button onClick={clearAll} className="btn-ghost mt-4">Reset</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 last:mb-0">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/40">{title}</p>
      {children}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition',
        active
          ? 'bg-neon-purple/15 text-white shadow-[inset_0_0_0_1px_rgba(155,92,255,0.4)]'
          : 'text-white/70 hover:bg-white/5 hover:text-white',
      )}
    >
      <span>{label}</span>
      {active && <span className="text-neon-purple">●</span>}
    </button>
  );
}
