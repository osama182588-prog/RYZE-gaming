import type { Drop, SetupShowcase, Creator, Achievement } from '@/types';

export const DROPS: Drop[] = [
  {
    id: 'd_neon_phantom',
    slug: 'neon-phantom-edition',
    name: 'إصدار Neon Phantom',
    tagline: '500 قطعة محدودة · تشطيب متوهج حيوياً',
    description:
      'تعاون مميز مع VEXR. تشطيب متوهج حيوياً يتفاعل مع الإضاءة المحيطة. مرقّم، مسجّل، لا يُمس.',
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
    name: 'دروب Storm Protocol',
    tagline: 'متاح الآن · 72 ساعة فقط',
    description:
      'مجموعة ملابس تكتيكية مستوحاة من نهائيات الرياضات الإلكترونية العالمية. لمسات عاكسة، خياطات مقاومة للطقس، شعار RYZE مخفي.',
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
    name: 'كبسولة Aurora',
    tagline: 'قريباً',
    description:
      'منظومة RGB بتشطيب أورورا مع تأثيرات لونية متزامنة عبر الأشرطة والكرات.',
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
    title: 'الفولت البنفسجي',
    owner: 'NovaStrike',
    ownerHandle: '@novastrike',
    image:
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1600&q=80',
    likes: 12482,
    tags: ['بنفسجي', 'fps', 'بسيط'],
    productSlugs: ['voidweave-xl-mousepad', 'eclipse-pro-headset', 'apex-battlestation-desk'],
  },
  {
    id: 's2',
    title: 'كاتدرائية السيان',
    owner: 'Kira_07',
    ownerHandle: '@kira',
    image:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80',
    likes: 9882,
    tags: ['سيان', 'ستريمر'],
    productSlugs: ['orbital-rgb-bar-pair', 'broadcast-condenser-mic', 'throne-x1-chair'],
  },
  {
    id: 's3',
    title: 'بروتوكول الوردي',
    owner: 'VEXR',
    ownerHandle: '@vexr',
    image:
      'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?auto=format&fit=crop&w=1600&q=80',
    likes: 8721,
    tags: ['وردي', 'سايبربنك'],
    productSlugs: ['signal-tech-hoodie', 'nova-rgb-orb'],
  },
  {
    id: 's4',
    title: 'الأسود الخفي',
    owner: 'GhostFrame',
    ownerHandle: '@ghostframe',
    image:
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1600&q=80',
    likes: 7320,
    tags: ['أسود', 'محترف'],
    productSlugs: ['apex-battlestation-desk', 'throne-x1-chair'],
  },
  {
    id: 's5',
    title: 'موجة الأورورا',
    owner: 'Lunara',
    ownerHandle: '@lunara',
    image:
      'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1600&q=80',
    likes: 6580,
    tags: ['أورورا', 'rgb'],
    productSlugs: ['pulse-rgb-strip-3m', 'nova-rgb-orb'],
  },
  {
    id: 's6',
    title: 'جهاز البطولات',
    owner: 'Apex_Wraith',
    ownerHandle: '@apexwraith',
    image:
      'https://images.unsplash.com/photo-1622445275576-721325763afe?auto=format&fit=crop&w=1600&q=80',
    likes: 5910,
    tags: ['رياضات إلكترونية', 'بطولات'],
    productSlugs: ['pro-esports-jersey', 'eclipse-pro-headset'],
  },
];

export const CREATORS: Creator[] = [
  {
    id: 'c1',
    name: 'NovaStrike',
    handle: '@novastrike',
    game: 'Valorant · رادينت',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    cover:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80',
    followers: '2.4M',
    bio: 'بطل Valorant العالمي مرتين. يعيش على حافة 240 هرتز.',
    signature: 'voidweave-xl-mousepad',
  },
  {
    id: 'c2',
    name: 'Kira_07',
    handle: '@kira',
    game: 'Apex Legends · بريداتور',
    avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=400&q=80',
    cover:
      'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=1600&q=80',
    followers: '1.8M',
    bio: 'مهندسة-ستريمرز. تبني سيتأباتها للبطولات على البث.',
    signature: 'broadcast-condenser-mic',
  },
  {
    id: 'c3',
    name: 'VEXR',
    handle: '@vexr',
    game: 'Tekken 8 · #3 عالمياً',
    avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80',
    cover:
      'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?auto=format&fit=crop&w=1600&q=80',
    followers: '980K',
    bio: 'ركيزة مجتمع FGC. تنفيذ مثالي للفريمات تحت أي ضغط.',
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
    bio: 'AWPer مع أثبت كروس هير في الساحة.',
    signature: 'eclipse-pro-headset',
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'a_first_purchase',
    name: 'الدم الأول',
    description: 'أتممت أول عملية شراء من RYZE.',
    icon: 'Trophy',
    xp: 100,
    rarity: 'common',
  },
  {
    id: 'a_top_gamer',
    name: 'قيمر نخبة',
    description: 'وصلت للمستوى 10 في برنامج RYZE.',
    icon: 'Crown',
    xp: 500,
    rarity: 'epic',
  },
  {
    id: 'a_setup_built',
    name: 'المهندس',
    description: 'بنيت وحفظت سيتأب مخصص.',
    icon: 'Layers',
    xp: 150,
    rarity: 'rare',
  },
  {
    id: 'a_referral',
    name: 'المُجنّد',
    description: 'أحلت أول لاعب.',
    icon: 'UserPlus',
    xp: 200,
    rarity: 'rare',
  },
  {
    id: 'a_drop_hunter',
    name: 'صياد الدروبات',
    description: 'حصلت على دروب محدود خلال الساعة الأولى.',
    icon: 'Zap',
    xp: 300,
    rarity: 'epic',
  },
  {
    id: 'a_legend',
    name: 'أسطورة RYZE',
    description: 'وصلت للمستوى 25. قليلون سيصلون لهذا.',
    icon: 'Flame',
    xp: 1000,
    rarity: 'legendary',
  },
];

export function getAchievement(id: string) {
  return ACHIEVEMENTS.find((a) => a.id === id);
}
