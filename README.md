# RYZE — Gaming Ecosystem

> **RISE. PLAY. DOMINATE.**
>
> A next-generation, cinematic gaming brand & e-commerce platform. Built with Next.js 15, TypeScript, Tailwind CSS and Framer Motion.

RYZE is a unified gaming brand combining products, identity and experience into one premium 2026-grade interface — cyberpunk-styled, glassmorphic, neon-lit, and fully interactive.

---

## ✨ Highlights

### Brand identity
- Centralized brand system in `src/lib/brand.ts` (palette, voice, taglines, manifesto, social).
- Custom logo (`<Logo />`) with neon glow.
- Cyberpunk + sci-fi visual language: deep void black + neon purple, electric blue, plasma pink.

### Cinematic UI/UX
- Animated **aurora background**, scan-line, particle field and grid overlay.
- **Custom cursor** with reactive glow & trail.
- **Sticky glass navbar** with scroll-state, mega-menu and live cart badge.
- Scroll-triggered reveals (`<Reveal />`, `<RevealList />`).
- **3D tilt** product cards with cursor-reactive light glare.
- **Magnetic buttons** that follow the cursor.
- Smooth page transitions, animated counters, neon countdown timers.
- Toast system, slide-out cart drawer, animated search overlay.
- Fully responsive (mobile-first).

### E-commerce
- **20+ products** across 7 categories (accessories, apparel, RGB, audio, performance, furniture, bags).
- Shop page with **smart filters** (category, price, badges, rating), sort and instant search.
- **Product detail** with image gallery + zoom, animated transitions, variant selector (size/color/style/switch), reviews, specs and related products.
- **Cart** with persisted state (Zustand + localStorage) and coupon engine.
- **Multi-step checkout** (shipping → payment → review → confirmation) with order summary.
- Coupon API (`RYZE10`, `WELCOME15`, `BLACKOUT25`, `RIDER50`).
- Discount, free-shipping threshold, tax calculation.

### Auth
- JWT session via `httpOnly` cookie (`jose` + `bcryptjs`).
- Sign up, sign in, sign out flows.
- `/api/auth/me` endpoint for session bootstrap.
- Protected `/account` and `/admin` pages.

### Gamification
- **XP & Level system** with per-level curve and progress bar.
- **Achievement badges** (rarity tiers: common → legendary).
- Auto-grant on first purchase, big spender, setup builds, referrals.
- Demo player & admin seeded for instant testing.

### Advanced gaming features
- **Limited Drops** with countdown timers (`/drops`, `/drops/[slug]`).
- **Build Your Setup** interactive configurator (`/build-setup`).
- **Setup Inspiration** community gallery (`/setups`).
- **Creators / Squad RYZE** influencer showcase (`/creators`).
- Animated stats counters (players, units, drops, countries).

### Admin dashboard
- Revenue, orders, users, subscribers metrics.
- Catalog overview, recent orders.
- Role-based access (`role: admin`).

### Marketing
- Newsletter capture API.
- Referral code system with shareable invite links.
- SEO-ready: per-page metadata + OpenGraph.

---

## 🏗 Tech stack

| Layer       | Tech |
|-------------|------|
| Framework   | Next.js 15 (App Router) |
| Language    | TypeScript |
| Styling     | Tailwind CSS + custom design tokens |
| Animation   | Framer Motion |
| State       | Zustand (cart, ui, auth) |
| Auth        | JWT (`jose`) + `bcryptjs` |
| Validation  | Zod |
| Icons       | Lucide React |
| Fonts       | Orbitron (display) + Inter (sans) + JetBrains Mono |

---

## 🚀 Getting started

```bash
npm install
npm run dev
# open http://localhost:3000
```

Production:

```bash
npm run build && npm start
```

Lint:

```bash
npm run lint
```

---

## 🔑 Demo credentials

| Role  | Email             | Password     |
|-------|-------------------|--------------|
| Admin | `admin@ryze.gg`   | `admin1234`  |
| User  | `player@ryze.gg`  | `player1234` |

Visit `/auth/login?demo=1` to autofill the player credentials.

### Demo coupon codes

| Code        | Effect                              |
|-------------|-------------------------------------|
| `RYZE10`    | 10% off                             |
| `WELCOME15` | 15% off (min $50 subtotal)          |
| `BLACKOUT25`| 25% off (min $150 subtotal)         |
| `RIDER50`   | $50 off (min $250 subtotal)         |

---

## 📁 Project structure

```
src/
  app/                        # Next.js App Router
    (pages)/                  # home, shop, product, cart, checkout, account, admin, drops, build-setup, setups, creators, about, auth/*
    api/                      # auth, products, orders, coupons, newsletter, referral, admin
    layout.tsx, globals.css   # cinematic global shell
  components/
    layout/                   # navbar, footer, search overlay
    sections/                 # hero, categories, bestsellers, drops, build-setup, stats, setups, creators
    product/                  # product card
    cart/                     # cart drawer
    ui/                       # logo, magnetic button, tilt card, reveal, countdown, stars, toast, animated counter, section heading
    effects/                  # custom cursor, particle field
  data/                       # categories, products, community (drops/setups/creators), coupons, achievements
  lib/                        # brand identity, auth (JWT), store (in-memory swappable for MongoDB), utils
  store/                      # Zustand stores (cart, ui, auth)
  types/                      # shared TypeScript types
```

---

## 🔌 Connecting MongoDB

The data layer (`src/lib/store.ts`) is a Promise-based in-memory store seeded with an admin & demo user. Every method (`createUser`, `verifyPassword`, `awardXp`, `createOrder`, `listOrders`, `subscribeNewsletter`, …) returns a Promise so it can be swapped 1:1 for a Mongo-backed implementation:

1. Add `mongodb` (or Mongoose / Prisma).
2. Re-implement each exported function in `src/lib/store.ts`.
3. No API routes need to change.

Set `JWT_SECRET` in production via env vars.

---

## 🧪 Quality

- ✅ `npm run build` — 43 routes prerendered/SSR.
- ✅ `npm run lint` — zero warnings.
- ✅ TypeScript `strict: true`.
- ✅ Mobile-first responsive across all pages.

---

## 🎮 Brand voice

> RYZE is not a brand. It is a movement. A high-voltage uprising of players who refuse the ordinary — engineered for those who play to dominate, not to participate.

— *RYZE Collective, 2026*
