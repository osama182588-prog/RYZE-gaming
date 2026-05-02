import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function truncate(s: string, n = 120) {
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}

export function generateId(prefix = 'id') {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

export function getXpForLevel(level: number) {
  return Math.floor(100 * Math.pow(level, 1.6));
}

export function getLevelFromXp(xp: number) {
  let level = 1;
  while (xp >= getXpForLevel(level + 1)) level++;
  return level;
}

export function getLevelProgress(xp: number) {
  const level = getLevelFromXp(xp);
  const current = getXpForLevel(level);
  const next = getXpForLevel(level + 1);
  const pct = Math.min(100, Math.max(0, ((xp - current) / (next - current)) * 100));
  return { level, current, next, pct };
}
