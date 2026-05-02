'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, Search, ShoppingBag, User2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/ui/logo';
import { useCart } from '@/store/cart';
import { useUi } from '@/store/ui';
import { useAuth } from '@/store/auth';
import { CATEGORIES } from '@/data/categories';
import { cn } from '@/lib/utils';
import { SearchOverlay } from './search-overlay';

const NAV = [
  { href: '/shop', label: 'Shop' },
  { href: '/drops', label: 'Drops' },
  { href: '/build-setup', label: 'Build' },
  { href: '/setups', label: 'Setups' },
  { href: '/creators', label: 'Creators' },
  { href: '/about', label: 'Manifesto' },
];

export function Navbar() {
  const pathname = usePathname();
  const cartCount = useCart((s) => s.count());
  const setOpen = useCart((s) => s.setOpen);
  const setSearchOpen = useUi((s) => s.setSearchOpen);
  const searchOpen = useUi((s) => s.searchOpen);
  const menuOpen = useUi((s) => s.menuOpen);
  const setMenuOpen = useUi((s) => s.setMenuOpen);
  const user = useAuth((s) => s.user);
  const refresh = useAuth((s) => s.refresh);
  const [scrolled, setScrolled] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled ? 'py-2' : 'py-4',
        )}
      >
        <div className="ryze-container">
          <div
            className={cn(
              'flex items-center gap-3 rounded-2xl border px-3 py-2 transition-all duration-500 sm:px-4',
              scrolled
                ? 'border-white/10 bg-void-900/70 shadow-[0_8px_32px_rgba(2,4,18,0.55)] backdrop-blur-xl'
                : 'border-white/[0.06] bg-white/[0.02] backdrop-blur-md',
            )}
          >
            <Logo size="sm" />

            <nav className="ml-4 hidden items-center gap-1 lg:flex">
              <div
                className="relative"
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
              >
                <Link
                  href="/shop"
                  className={cn(
                    'inline-flex items-center rounded-full px-3 py-2 text-sm font-medium transition-colors',
                    pathname.startsWith('/shop')
                      ? 'text-white'
                      : 'text-white/65 hover:text-white',
                  )}
                >
                  Shop
                </Link>
                <AnimatePresence>
                  {shopOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-0 top-full pt-2"
                    >
                      <div className="glass-card grid w-[560px] grid-cols-2 gap-1 p-3 shadow-neon-purple">
                        {CATEGORIES.map((c) => (
                          <Link
                            key={c.slug}
                            href={`/shop/${c.slug}`}
                            className="group flex items-start gap-3 rounded-xl p-3 transition-all hover:bg-white/5"
                          >
                            <span
                              className="mt-1 h-2 w-2 rounded-full"
                              style={{
                                background:
                                  c.accent === 'purple'
                                    ? '#9b5cff'
                                    : c.accent === 'blue'
                                    ? '#22d3ff'
                                    : c.accent === 'pink'
                                    ? '#ff4fd8'
                                    : '#5eff9c',
                                boxShadow: `0 0 12px currentColor`,
                                color:
                                  c.accent === 'purple'
                                    ? '#9b5cff'
                                    : c.accent === 'blue'
                                    ? '#22d3ff'
                                    : c.accent === 'pink'
                                    ? '#ff4fd8'
                                    : '#5eff9c',
                              }}
                            />
                            <div>
                              <p className="text-sm font-semibold text-white group-hover:neon-text-static">
                                {c.name}
                              </p>
                              <p className="text-xs text-white/50">{c.tagline}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {NAV.slice(1).map((n) => {
                const active = pathname === n.href || pathname.startsWith(n.href + '/');
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    className={cn(
                      'relative rounded-full px-3 py-2 text-sm font-medium transition-colors',
                      active ? 'text-white' : 'text-white/65 hover:text-white',
                    )}
                  >
                    {n.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-2 -bottom-0.5 h-px bg-gradient-to-r from-neon-purple via-neon-blue to-neon-pink"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
                className="btn-icon"
              >
                <Search className="h-4 w-4" />
              </button>

              <Link
                href={user ? '/account' : '/auth/login'}
                aria-label={user ? 'Account' : 'Sign in'}
                className="btn-icon"
              >
                <User2 className="h-4 w-4" />
              </Link>

              <button
                type="button"
                aria-label="Cart"
                onClick={() => setOpen(true)}
                className="btn-icon relative"
              >
                <ShoppingBag className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-5 min-w-[20px] place-items-center rounded-full bg-neon-pink px-1 text-[10px] font-bold text-void shadow-neon-pink">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                aria-label="Toggle menu"
                onClick={() => setMenuOpen(!menuOpen)}
                className="btn-icon lg:hidden"
              >
                {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-void-950/80 backdrop-blur-xl lg:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="ryze-container mt-24 flex flex-col gap-1"
            >
              {[
                { href: '/shop', label: 'Shop' },
                ...CATEGORIES.map((c) => ({ href: `/shop/${c.slug}`, label: `· ${c.name}` })),
                ...NAV.slice(1),
                user ? { href: '/account', label: 'Account' } : { href: '/auth/login', label: 'Sign in' },
              ].map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className="glass-card px-5 py-4 text-base font-semibold text-white"
                >
                  {item.label}
                </Link>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {searchOpen && <SearchOverlay />}
    </>
  );
}
