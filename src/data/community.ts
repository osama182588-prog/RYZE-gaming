import type { Drop, SetupShowcase, Creator, Achievement } from '@/types';

export const DROPS: Drop[] = [
  {
    id: 'd_neon_phantom',
    slug: 'neon-phantom-edition',
    name: 'Neon Phantom Edition',
    tagline: 'Limited 500 units · Bio-luminescent finish',
    description:
      'A signature collaboration with VEXR. Reactive bio-luminescent finish that glows with ambient light. Numbered, registered, untouchable.',
    image:
      'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?auto=format&fit=crop&w=1600&q=80',
    releaseAt: new Date(Date.now() + 1000 * 60 * 60 * 36).toISOString(),
    productSlugs: ['voidweave-xl-mousepad', 'eclipse-pro-headset'],
    status: 'upcoming',
    rarity: 'legendary',
  },
  {
    id: 'd_storm_protocol',
    slug: 'storm-protocol',
    name: 'Storm Protocol Drop',
    tagline: 'Live now · 72 hours only',
    description:
      'Tactical apparel collection inspired by global esports finals. Reflective accents, weather-sealed seams, hidden RYZE crest.',
    image:
      'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=1600&q=80',
    releaseAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 60).toISOString(),
    productSlugs: ['signal-tech-hoodie', 'pro-esports-jersey'],
    status: 'live',
    rarity: 'epic',
  },
  {
    id: 'd_aurora_capsule',
    slug: 'aurora-capsule',
    name: 'Aurora Capsule',
    tagline: 'Coming soon',
    description:
      'Aurora-finish RGB ecosystem with synchronized chromatic effects across bars, strips and orbs.',
    image:
      'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1600&q=80',
    releaseAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    productSlugs: ['orbital-rgb-bar-pair', 'nova-rgb-orb'],
    status: 'upcoming',
    rarity: 'rare',
  },
];

export const SETUPS: SetupShowcase[] = [
  {
    id: 's1',
    title: 'Violet Voltage',
    owner: 'NovaStrike',
    ownerHandle: '@novastrike',
    image:
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1600&q=80',
    likes: 12482,
    tags: ['violet', 'fps', 'minimal'],
    productSlugs: ['voidweave-xl-mousepad', 'eclipse-pro-headset', 'apex-battlestation-desk'],
  },
  {
    id: 's2',
    title: 'Cyan Cathedral',
    owner: 'Kira_07',
    ownerHandle: '@kira',
    image:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80',
    likes: 9882,
    tags: ['cyan', 'streamer'],
    productSlugs: ['orbital-rgb-bar-pair', 'broadcast-condenser-mic', 'throne-x1-chair'],
  },
  {
    id: 's3',
    title: 'Pink Protocol',
    owner: 'VEXR',
    ownerHandle: '@vexr',
    image:
      'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?auto=format&fit=crop&w=1600&q=80',
    likes: 8721,
    tags: ['pink', 'cyberpunk'],
    productSlugs: ['signal-tech-hoodie', 'nova-rgb-orb'],
  },
  {
    id: 's4',
    title: 'Stealth Black',
    owner: 'GhostFrame',
    ownerHandle: '@ghostframe',
    image:
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1600&q=80',
    likes: 7320,
    tags: ['black', 'pro'],
    productSlugs: ['apex-battlestation-desk', 'throne-x1-chair'],
  },
  {
    id: 's5',
    title: 'Aurora Wave',
    owner: 'Lunara',
    ownerHandle: '@lunara',
    image:
      'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1600&q=80',
    likes: 6580,
    tags: ['aurora', 'rgb'],
    productSlugs: ['pulse-rgb-strip-3m', 'nova-rgb-orb'],
  },
  {
    id: 's6',
    title: 'Tournament Rig',
    owner: 'Apex_Wraith',
    ownerHandle: '@apexwraith',
    image:
      'https://images.unsplash.com/photo-1622445275576-721325763afe?auto=format&fit=crop&w=1600&q=80',
    likes: 5910,
    tags: ['esports', 'tournament'],
    productSlugs: ['pro-esports-jersey', 'eclipse-pro-headset'],
  },
];

export const CREATORS: Creator[] = [
  {
    id: 'c1',
    name: 'NovaStrike',
    handle: '@novastrike',
    game: 'Valorant · Radiant',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    cover:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80',
    followers: '2.4M',
    bio: 'Two-time global Valorant champion. Lives on the edge of 240 Hz.',
    signature: 'voidweave-xl-mousepad',
  },
  {
    id: 'c2',
    name: 'Kira_07',
    handle: '@kira',
    game: 'Apex Legends · Predator',
    avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=400&q=80',
    cover:
      'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=1600&q=80',
    followers: '1.8M',
    bio: 'Streamer-engineer. Builds her own tournament setups on stream.',
    signature: 'broadcast-condenser-mic',
  },
  {
    id: 'c3',
    name: 'VEXR',
    handle: '@vexr',
    game: 'Tekken 8 · World #3',
    avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80',
    cover:
      'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?auto=format&fit=crop&w=1600&q=80',
    followers: '980K',
    bio: 'FGC mainstay. Frame-perfect execution under any pressure.',
    signature: 'signal-tech-hoodie',
  },
  {
    id: 'c4',
    name: 'Apex_Wraith',
    handle: '@apexwraith',
    game: 'CS2 · Global Elite',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    cover:
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1600&q=80',
    followers: '1.1M',
    bio: 'AWPer with the steadiest crosshair on the circuit.',
    signature: 'eclipse-pro-headset',
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'a_first_purchase',
    name: 'First Blood',
    description: 'Made your first RYZE purchase.',
    icon: 'Trophy',
    xp: 100,
    rarity: 'common',
  },
  {
    id: 'a_top_gamer',
    name: 'Top Gamer',
    description: 'Reached level 10 in the RYZE program.',
    icon: 'Crown',
    xp: 500,
    rarity: 'epic',
  },
  {
    id: 'a_setup_built',
    name: 'Architect',
    description: 'Built and saved a custom setup.',
    icon: 'Layers',
    xp: 150,
    rarity: 'rare',
  },
  {
    id: 'a_referral',
    name: 'Recruiter',
    description: 'Referred your first player.',
    icon: 'UserPlus',
    xp: 200,
    rarity: 'rare',
  },
  {
    id: 'a_drop_hunter',
    name: 'Drop Hunter',
    description: 'Claimed a Limited Drop within the first hour.',
    icon: 'Zap',
    xp: 300,
    rarity: 'epic',
  },
  {
    id: 'a_legend',
    name: 'RYZE Legend',
    description: 'Reached level 25. Few will ever touch this.',
    icon: 'Flame',
    xp: 1000,
    rarity: 'legendary',
  },
];

export function getAchievement(id: string) {
  return ACHIEVEMENTS.find((a) => a.id === id);
}
