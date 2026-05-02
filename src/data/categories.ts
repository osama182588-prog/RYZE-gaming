import type { Category } from '@/types';

export const CATEGORIES: Category[] = [
  {
    slug: 'accessories',
    name: 'Accessories',
    tagline: 'Mousepads. Keycaps. Skins.',
    description:
      'Tactile precision gear engineered for millisecond advantage. Surfaces, switches and skins built for relentless competition.',
    accent: 'purple',
    image:
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1600&q=80',
  },
  {
    slug: 'clothing',
    name: 'Apparel',
    tagline: 'Hoodies. Tees. Esports kits.',
    description:
      'Wearable identity for the competitive class. Performance fabrics, cyber silhouettes, signature drops.',
    accent: 'pink',
    image:
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1600&q=80',
  },
  {
    slug: 'rgb',
    name: 'RGB Lighting',
    tagline: 'Light your war room.',
    description:
      'Programmable RGB ecosystems — strips, bars, panels and orbs synced into one cinematic battlestation.',
    accent: 'blue',
    image:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80',
  },
  {
    slug: 'audio',
    name: 'Audio',
    tagline: 'Hear every footstep.',
    description:
      'Studio-grade headsets and broadcast mics. Tournament-tuned imaging. Voice clarity built for shotcalling.',
    accent: 'purple',
    image:
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1600&q=80',
  },
  {
    slug: 'performance',
    name: 'Performance',
    tagline: 'Finger sleeves & grips.',
    description:
      'Micro-engineered grips, sleeves and friction tech for unrelenting flicks and zero hand fatigue.',
    accent: 'green',
    image:
      'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=1600&q=80',
  },
  {
    slug: 'furniture',
    name: 'Furniture',
    tagline: 'Battlestations & thrones.',
    description:
      'Architectural desks and thrones designed around the human spine and the competitive mindset.',
    accent: 'pink',
    image:
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1600&q=80',
  },
  {
    slug: 'bags',
    name: 'Bags & Tech',
    tagline: 'Mobile war kits.',
    description:
      'Tactical organizers, modular sleeves, LAN-ready loadouts. Built for tournament travel and daily missions.',
    accent: 'blue',
    image:
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1600&q=80',
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
