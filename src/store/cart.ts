'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartLine, Coupon } from '@/types';

interface CartState {
  items: CartLine[];
  coupon: Coupon | null;
  isOpen: boolean;
  addItem: (line: CartLine) => void;
  removeItem: (productId: string, variantIds: string[]) => void;
  updateQty: (productId: string, variantIds: string[], qty: number) => void;
  clear: () => void;
  applyCoupon: (coupon: Coupon | null) => void;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  subtotal: () => number;
  discount: () => number;
  total: () => number;
  shipping: () => number;
  tax: () => number;
  count: () => number;
}

const lineKey = (productId: string, variantIds: string[]) =>
  `${productId}::${[...variantIds].sort().join(',')}`;

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      isOpen: false,
      addItem: (line) => {
        const items = [...get().items];
        const key = lineKey(line.productId, line.variantIds);
        const existing = items.find((i) => lineKey(i.productId, i.variantIds) === key);
        if (existing) existing.quantity += line.quantity;
        else items.push(line);
        set({ items, isOpen: true });
      },
      removeItem: (productId, variantIds) => {
        const key = lineKey(productId, variantIds);
        set({ items: get().items.filter((i) => lineKey(i.productId, i.variantIds) !== key) });
      },
      updateQty: (productId, variantIds, qty) => {
        const key = lineKey(productId, variantIds);
        set({
          items: get()
            .items.map((i) =>
              lineKey(i.productId, i.variantIds) === key
                ? { ...i, quantity: Math.max(1, Math.min(99, qty)) }
                : i,
            ),
        });
      },
      clear: () => set({ items: [], coupon: null }),
      applyCoupon: (coupon) => set({ coupon }),
      setOpen: (isOpen) => set({ isOpen }),
      toggle: () => set({ isOpen: !get().isOpen }),
      subtotal: () => get().items.reduce((s, i) => s + i.price * i.quantity, 0),
      discount: () => {
        const sub = get().subtotal();
        const c = get().coupon;
        if (!c) return 0;
        if (c.minSubtotal && sub < c.minSubtotal) return 0;
        return c.type === 'percent' ? Math.round(sub * (c.value / 100) * 100) / 100 : c.value;
      },
      shipping: () => {
        const sub = get().subtotal();
        if (sub === 0) return 0;
        return sub >= 99 ? 0 : 9.99;
      },
      tax: () => Math.round((get().subtotal() - get().discount()) * 0.07 * 100) / 100,
      total: () => {
        const t = get().subtotal() - get().discount() + get().shipping() + get().tax();
        return Math.max(0, Math.round(t * 100) / 100);
      },
      count: () => get().items.reduce((n, i) => n + i.quantity, 0),
    }),
    {
      name: 'ryze.cart',
      partialize: (s) => ({ items: s.items, coupon: s.coupon }),
    },
  ),
);
