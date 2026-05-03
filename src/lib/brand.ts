/**
 * RYZE Brand Identity System
 * Centralized brand constants used across the experience.
 */

export const BRAND = {
  name: 'RYZE',
  fullName: 'RYZE Gaming',
  domain: 'ryze.gg',
  established: 2026,
  tagline: 'RISE. PLAY. DOMINATE.',
  taglines: [
    'RISE. PLAY. DOMINATE.',
    'GEAR FORGED FOR THE NEXT ERA.',
    'BUILT FOR THOSE WHO REFUSE TO LOSE.',
    'NEON FUEL FOR ELITE GAMEPLAY.',
    'A GAMING UNIVERSE WITHOUT LIMITS.',
  ],
  manifesto:
    'RYZE is not a brand. It is a movement. A high-voltage uprising of players who refuse the ordinary — engineered for those who play to dominate, not to participate.',
  // Arabic localized brand content
  ar: {
    tagline: 'انهض. العب. سيطر.',
    taglines: [
      'انهض. العب. سيطر.',
      'معدات مُصاغة للعصر القادم.',
      'مبنية لمن يرفضون الخسارة.',
      'وقود نيون للّعب النخبوي.',
      'عالم ألعاب بلا حدود.',
    ],
    manifesto:
      'RYZE ليست علامة تجارية. إنها حركة. انتفاضة عالية الجهد للاعبين الذين يرفضون العادية — مُصممة لمن يلعبون للسيطرة، لا للمشاركة.',
    fullName: 'RYZE للألعاب',
  },
  voice: {
    personality: ['aggressive', 'futuristic', 'elite', 'competitive', 'cinematic'],
    do: ['Be bold', 'Use short, punchy sentences', 'Speak to elite players', 'Use precise tech language'],
    dont: ['Be apologetic', 'Use filler words', 'Sound corporate', 'Over-explain'],
  },
  palette: {
    void: '#05060a',
    purple: '#9b5cff',
    blue: '#22d3ff',
    pink: '#ff4fd8',
    green: '#5eff9c',
  },
  social: {
    twitter: 'https://twitter.com/ryze',
    instagram: 'https://instagram.com/ryze',
    youtube: 'https://youtube.com/@ryze',
    tiktok: 'https://tiktok.com/@ryze',
    discord: 'https://discord.gg/ryze',
    twitch: 'https://twitch.tv/ryze',
  },
  contact: {
    email: 'support@ryze.gg',
    press: 'press@ryze.gg',
  },
} as const;

export type BrandConfig = typeof BRAND;
