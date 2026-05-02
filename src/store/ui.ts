'use client';

import { create } from 'zustand';

interface UiState {
  searchOpen: boolean;
  menuOpen: boolean;
  toast: { id: string; title: string; description?: string; tone: 'info' | 'success' | 'error' } | null;
  setSearchOpen: (v: boolean) => void;
  setMenuOpen: (v: boolean) => void;
  showToast: (t: { title: string; description?: string; tone?: 'info' | 'success' | 'error' }) => void;
  dismissToast: () => void;
}

export const useUi = create<UiState>((set) => ({
  searchOpen: false,
  menuOpen: false,
  toast: null,
  setSearchOpen: (searchOpen) => set({ searchOpen }),
  setMenuOpen: (menuOpen) => set({ menuOpen }),
  showToast: (t) => {
    const id = Math.random().toString(36).slice(2);
    set({ toast: { id, title: t.title, description: t.description, tone: t.tone ?? 'info' } });
    setTimeout(() => {
      const cur = (useUi.getState().toast)?.id;
      if (cur === id) set({ toast: null });
    }, 4000);
  },
  dismissToast: () => set({ toast: null }),
}));
