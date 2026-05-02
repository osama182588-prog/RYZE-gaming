'use client';

import { create } from 'zustand';
import type { User } from '@/types';

type SessionUser = Pick<User, 'id' | 'email' | 'username' | 'role' | 'xp' | 'achievements' | 'referralCode'>;

interface AuthState {
  user: SessionUser | null;
  loading: boolean;
  setUser: (user: SessionUser | null) => void;
  setLoading: (loading: boolean) => void;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }),
  setLoading: (loading) => set({ loading }),
  refresh: async () => {
    try {
      set({ loading: true });
      const res = await fetch('/api/auth/me', { cache: 'no-store' });
      if (!res.ok) {
        set({ user: null, loading: false });
        return;
      }
      const data = await res.json();
      set({ user: data.user ?? null, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },
  logout: async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    set({ user: null });
  },
}));
