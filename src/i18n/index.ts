/**
 * RYZE i18n System — Lightweight dictionary-based translations
 */

import { ar, type ArTranslations } from './ar';

export const locale = 'ar' as const;
export const dir = 'rtl' as const;

/**
 * Dotted path lookup into the Arabic translation dictionary.
 * Returns the key itself if the path is not found (makes missing strings visible).
 * 
 * @example
 * t('nav.shop') // => 'المتجر'
 * t('nav.missing') // => 'nav.missing'
 */
export function t(key: string): string {
  const parts = key.split('.');
  let current: unknown = ar;
  
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      // Key not found — return the key itself for visibility
      return key;
    }
  }
  
  if (typeof current === 'string') {
    return current;
  }
  
  // If we got an object instead of a string, return the key
  return key;
}

/**
 * Get a nested translation object for batch access
 */
export function tGroup<K extends keyof ArTranslations>(group: K): ArTranslations[K] {
  return ar[group];
}

export { ar };
