import type { Product } from '@/types';

const stockReviews = [
  {
    id: 'r1',
    author: 'NovaStrike',
    rating: 5,
    title: 'Genuinely next-level',
    body: 'Build quality is unreal. Feels like equipment from a sci-fi armory. My APM jumped overnight.',
    date: '2026-02-14',
    verified: true,
  },
  {
    id: 'r2',
    author: 'Kira_07',
    rating: 5,
    title: 'Worth every credit',
    body: 'Packaging alone made my flatmate jealous. Performance is ridiculous — zero regrets.',
    date: '2026-02-21',
    verified: true,
  },
  {
    id: 'r3',
    author: 'VEXR',
    rating: 4,
    title: 'Solid pickup',
    body: 'Materials are premium and the design is unmistakable. Shipping was fast.',
    date: '2026-03-02',
    verified: true,
  },
];

export const PRODUCTS: Product[] = [
  // ================== ACCESSORIES ==================
  {
    id: 'p_pad_void',
    slug: 'voidweave-xl-mousepad',
    name: 'Voidweave XL Mousepad',
    category: 'accessories',
    tagline: 'Tournament-grade glide. Reactive surface.',
    description:
      'A 4mm aerospace-bonded surface engineered for hybrid sensors. Voidweave gives consistent low-friction glide with a stop-on-demand microbraking layer for elite flick control.',
    features: [
      'Reactive low-friction microweave surface',
      'Anti-slip nitrile base with vacuum-lock pattern',
      'Stitched neon-pulse edges',
      'Spill-proof nano coating',
      '900 × 400 × 4mm tournament size',
    ],
    specs: {
      Size: '900 × 400 × 4 mm',
      Surface: 'Voidweave Reactive',
      Base: 'Vacuum-Lock Nitrile',
      Weight: '720 g',
      Warranty: '2 years',
    },
    price: 49,
    compareAtPrice: 69,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80',
    ],
    variants: [
      { id: 'v_pad_size_l', name: 'Large', type: 'size', value: 'L (900×400)' },
      { id: 'v_pad_size_xl', name: 'XL', type: 'size', value: 'XL (1200×600)', priceDelta: 20 },
      { id: 'v_pad_color_void', name: 'Void Black', type: 'color', value: 'Void Black', swatch: '#08091a' },
      { id: 'v_pad_color_neon', name: 'Neon Pulse', type: 'color', value: 'Neon Pulse', swatch: '#9b5cff' },
    ],
    rating: 4.9,
    reviewCount: 1284,
    reviews: stockReviews,
    stock: 184,
    badges: ['bestseller', 'staff-pick'],
    tags: ['mousepad', 'fps', 'tournament'],
    related: ['p_keys_synth', 'p_skin_aero', 'p_grip_phantom'],
  },
  {
    id: 'p_keys_synth',
    slug: 'synth-keycap-set-pbt',
    name: 'Synth Keycap Set — PBT',
    category: 'accessories',
    tagline: 'Translucent shine-through. Cyber type.',
    description:
      'A 142-key PBT double-shot set with shine-through legends and a custom cyberpunk typeface. MX & low-profile compatible.',
    features: [
      'Double-shot PBT — never fades',
      'Shine-through cyber legends',
      'OEM, Cherry & XDA profile options',
      '142 keys including ISO + macro extras',
      'Universal MX and low-profile compatibility',
    ],
    specs: {
      Material: 'Double-shot PBT',
      Keys: '142',
      Profile: 'OEM / Cherry / XDA',
      Compatibility: 'MX & Low-profile',
    },
    price: 79,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1595044426077-d36d9236d44e?auto=format&fit=crop&w=1600&q=80',
    ],
    variants: [
      { id: 'v_keys_oem', name: 'OEM', type: 'style', value: 'OEM' },
      { id: 'v_keys_cherry', name: 'Cherry', type: 'style', value: 'Cherry' },
      { id: 'v_keys_xda', name: 'XDA', type: 'style', value: 'XDA', priceDelta: 10 },
      { id: 'v_keys_color_violet', name: 'Violet Pulse', type: 'color', value: 'Violet', swatch: '#9b5cff' },
      { id: 'v_keys_color_cyan', name: 'Cyan Drift', type: 'color', value: 'Cyan', swatch: '#22d3ff' },
    ],
    rating: 4.8,
    reviewCount: 612,
    reviews: stockReviews,
    stock: 230,
    badges: ['new'],
    tags: ['keycaps', 'pbt', 'rgb'],
    related: ['p_pad_void', 'p_audio_eclipse'],
  },
  {
    id: 'p_skin_aero',
    slug: 'aero-skin-laptop-wrap',
    name: 'Aero Skin — Laptop Wrap',
    category: 'accessories',
    tagline: 'Liquid-finish vinyl. Zero residue.',
    description:
      'Premium 3M-grade vinyl wraps with neon-printed RYZE motifs. Bubble-free application, residue-free removal.',
    features: ['3M premium vinyl', 'Bubble-free channels', 'Residue-free removal', 'UV-resistant ink'],
    specs: { Material: '3M premium vinyl', Finish: 'Liquid Matte' },
    price: 29,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1600&q=80',
    ],
    variants: [
      { id: 'v_skin_13', name: '13"', type: 'size', value: '13"' },
      { id: 'v_skin_15', name: '15"', type: 'size', value: '15"' },
      { id: 'v_skin_16', name: '16"', type: 'size', value: '16"' },
    ],
    rating: 4.6,
    reviewCount: 188,
    reviews: stockReviews,
    stock: 410,
    tags: ['skin', 'wrap'],
    related: ['p_pad_void', 'p_keys_synth'],
  },

  // ================== CLOTHING ==================
  {
    id: 'p_hoodie_signal',
    slug: 'signal-tech-hoodie',
    name: 'Signal Tech Hoodie',
    category: 'clothing',
    tagline: 'Cyber silhouette. All-day armor.',
    description:
      'A heavyweight 480gsm performance hoodie with reflective neon piping, asymmetric kangaroo pocket and concealed phone sleeve.',
    features: [
      '480gsm cotton-poly performance blend',
      'Reflective neon piping',
      'Concealed phone sleeve',
      'Pre-shrunk, washed for softness',
    ],
    specs: { Material: 'Cotton 70% / Polyester 30%', Weight: '480 gsm', Fit: 'Oversized' },
    price: 89,
    compareAtPrice: 109,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1600&q=80',
    ],
    variants: [
      { id: 'v_h_xs', name: 'XS', type: 'size', value: 'XS' },
      { id: 'v_h_s', name: 'S', type: 'size', value: 'S' },
      { id: 'v_h_m', name: 'M', type: 'size', value: 'M' },
      { id: 'v_h_l', name: 'L', type: 'size', value: 'L' },
      { id: 'v_h_xl', name: 'XL', type: 'size', value: 'XL' },
      { id: 'v_h_2xl', name: '2XL', type: 'size', value: '2XL' },
      { id: 'v_h_color_black', name: 'Void Black', type: 'color', value: 'Void Black', swatch: '#0d0f25' },
      { id: 'v_h_color_violet', name: 'Violet', type: 'color', value: 'Violet', swatch: '#9b5cff' },
    ],
    rating: 4.9,
    reviewCount: 904,
    reviews: stockReviews,
    stock: 320,
    badges: ['bestseller'],
    tags: ['hoodie', 'apparel'],
    related: ['p_tee_glitch', 'p_jersey_pro'],
  },
  {
    id: 'p_tee_glitch',
    slug: 'glitch-graphic-tee',
    name: 'Glitch Graphic Tee',
    category: 'clothing',
    tagline: 'Distorted. Defiant. Daily.',
    description:
      'Mid-weight 220gsm tee with high-density screen-printed glitch graphic across the chest. Tubular knit for zero side seams.',
    features: ['220gsm ringspun cotton', 'High-density print', 'Tubular knit', 'Pre-washed'],
    specs: { Material: 'Ringspun Cotton', Weight: '220 gsm', Fit: 'Boxy' },
    price: 39,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1600&q=80',
    ],
    variants: [
      { id: 'v_t_s', name: 'S', type: 'size', value: 'S' },
      { id: 'v_t_m', name: 'M', type: 'size', value: 'M' },
      { id: 'v_t_l', name: 'L', type: 'size', value: 'L' },
      { id: 'v_t_xl', name: 'XL', type: 'size', value: 'XL' },
      { id: 'v_t_color_black', name: 'Black', type: 'color', value: 'Black', swatch: '#0d0f25' },
      { id: 'v_t_color_white', name: 'White', type: 'color', value: 'White', swatch: '#f1f1ff' },
    ],
    rating: 4.7,
    reviewCount: 433,
    reviews: stockReviews,
    stock: 540,
    tags: ['tee', 'apparel'],
  },
  {
    id: 'p_jersey_pro',
    slug: 'pro-esports-jersey',
    name: 'Pro Esports Jersey',
    category: 'clothing',
    tagline: 'Tournament fabric. Stage-ready cut.',
    description:
      'Sublimated mesh-back jersey with tournament-grade moisture wicking, breathable underarm panels, and concealed mic clip loop.',
    features: ['Sublimated graphics — no peel', 'Moisture-wicking mesh back', 'Mic clip loop', 'Athletic stage cut'],
    specs: { Material: '100% Polyester (Recycled)', Weight: '160 gsm' },
    price: 99,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1622445275576-721325763afe?auto=format&fit=crop&w=1600&q=80',
    ],
    variants: [
      { id: 'v_j_s', name: 'S', type: 'size', value: 'S' },
      { id: 'v_j_m', name: 'M', type: 'size', value: 'M' },
      { id: 'v_j_l', name: 'L', type: 'size', value: 'L' },
      { id: 'v_j_xl', name: 'XL', type: 'size', value: 'XL' },
    ],
    rating: 4.8,
    reviewCount: 211,
    reviews: stockReviews,
    stock: 90,
    badges: ['pro'],
    tags: ['jersey', 'esports'],
  },

  // ================== RGB ==================
  {
    id: 'p_rgb_orbital',
    slug: 'orbital-rgb-bar-pair',
    name: 'Orbital RGB Bar — Pair',
    category: 'rgb',
    tagline: 'Studio lighting for your battlestation.',
    description:
      'Programmable RGB bars with 16.8M colors, 32 reactive scenes and software-synced ambient mode that mirrors your screen.',
    features: ['16.8M colors', 'Ambient screen sync', '32 cinematic scenes', 'USB-C powered'],
    specs: { Power: 'USB-C 5V', Length: '420 mm', Control: 'App + remote' },
    price: 119,
    compareAtPrice: 149,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1560415755-bd80d06eda60?auto=format&fit=crop&w=1600&q=80',
    ],
    variants: [
      { id: 'v_rgb_pair', name: 'Pair', type: 'style', value: '2x bars' },
      { id: 'v_rgb_quad', name: 'Quad', type: 'style', value: '4x bars', priceDelta: 110 },
    ],
    rating: 4.9,
    reviewCount: 740,
    reviews: stockReviews,
    stock: 150,
    badges: ['staff-pick'],
    tags: ['rgb', 'lighting'],
  },
  {
    id: 'p_rgb_strip',
    slug: 'pulse-rgb-strip-3m',
    name: 'Pulse RGB Strip 3m',
    category: 'rgb',
    tagline: 'Liquid neon for any surface.',
    description:
      '3-meter addressable RGB strip with 144 LEDs/m, magnetic & adhesive mounting and music-reactive mode.',
    features: ['144 LEDs / meter', 'Music reactive', 'Magnetic + 3M adhesive', 'Cuttable every 6cm'],
    specs: { Length: '3 m', LEDs: '432', Power: 'USB-C 5V' },
    price: 49,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1522444195799-478538b28823?auto=format&fit=crop&w=1600&q=80',
    ],
    variants: [
      { id: 'v_strip_3', name: '3m', type: 'size', value: '3m' },
      { id: 'v_strip_5', name: '5m', type: 'size', value: '5m', priceDelta: 20 },
    ],
    rating: 4.7,
    reviewCount: 552,
    reviews: stockReviews,
    stock: 800,
    tags: ['rgb', 'strip'],
  },
  {
    id: 'p_rgb_orb',
    slug: 'nova-rgb-orb',
    name: 'Nova RGB Orb',
    category: 'rgb',
    tagline: 'Ambient nucleus for any room.',
    description:
      'A floating RGB nucleus with 360° diffusion, gesture control and 80 hours of battery life.',
    features: ['360° diffusion', 'Gesture & touch control', '80h battery', 'Wireless charging base'],
    specs: { Battery: '80 hours', Charge: 'Wireless base', Diameter: '180 mm' },
    price: 139,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=1600&q=80',
    ],
    variants: [],
    rating: 4.8,
    reviewCount: 312,
    reviews: stockReviews,
    stock: 60,
    badges: ['new', 'limited'],
    tags: ['rgb', 'orb'],
  },

  // ================== AUDIO ==================
  {
    id: 'p_audio_eclipse',
    slug: 'eclipse-pro-headset',
    name: 'Eclipse Pro Headset',
    category: 'audio',
    tagline: 'Hear footsteps before they happen.',
    description:
      'Tournament-tuned 50mm titanium drivers, 360° spatial imaging and broadcast-grade detachable mic. Memory-foam eclipse cups.',
    features: ['50mm titanium drivers', '360° spatial imaging', 'Broadcast detachable mic', '40h wireless'],
    specs: { Drivers: '50mm Titanium', Battery: '40h', Latency: '<22 ms' },
    price: 199,
    compareAtPrice: 249,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=1600&q=80',
    ],
    variants: [
      { id: 'v_a_wired', name: 'Wired', type: 'style', value: 'Wired' },
      { id: 'v_a_wireless', name: 'Wireless', type: 'style', value: 'Wireless', priceDelta: 60 },
      { id: 'v_a_color_black', name: 'Void Black', type: 'color', value: 'Void Black', swatch: '#0d0f25' },
      { id: 'v_a_color_violet', name: 'Violet', type: 'color', value: 'Violet', swatch: '#9b5cff' },
    ],
    rating: 4.9,
    reviewCount: 1502,
    reviews: stockReviews,
    stock: 220,
    badges: ['bestseller', 'pro'],
    tags: ['headset', 'audio'],
  },
  {
    id: 'p_audio_mic',
    slug: 'broadcast-condenser-mic',
    name: 'Broadcast Condenser Mic',
    category: 'audio',
    tagline: 'Studio voice. Stage presence.',
    description:
      'A USB-C / XLR dual-mode condenser with onboard DSP, hardware mute and tap-to-monitor headphone jack.',
    features: ['USB-C + XLR dual mode', 'Onboard DSP', 'Tap-to-mute', 'Studio cardioid pattern'],
    specs: { Connection: 'USB-C / XLR', Pattern: 'Cardioid', Sample: '24-bit / 96kHz' },
    price: 159,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1600&q=80',
    ],
    variants: [],
    rating: 4.8,
    reviewCount: 401,
    reviews: stockReviews,
    stock: 130,
    tags: ['microphone', 'streaming'],
  },
  {
    id: 'p_audio_iem',
    slug: 'flux-pro-iem',
    name: 'Flux Pro In-Ear Monitors',
    category: 'audio',
    tagline: 'Tournament-grade in-ear isolation.',
    description:
      'Triple-driver hybrid IEMs with -32dB passive isolation and braided detachable cable. Built for LAN.',
    features: ['Triple-driver hybrid', '-32dB isolation', 'Detachable braided cable', 'Memory-foam tips'],
    specs: { Drivers: '2x BA + 1x dynamic', Impedance: '24 Ω', Cable: '1.2m braided' },
    price: 129,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1600&q=80',
    ],
    variants: [],
    rating: 4.7,
    reviewCount: 222,
    reviews: stockReviews,
    stock: 75,
    tags: ['iem', 'audio'],
  },

  // ================== PERFORMANCE ==================
  {
    id: 'p_grip_phantom',
    slug: 'phantom-finger-sleeves',
    name: 'Phantom Finger Sleeves',
    category: 'performance',
    tagline: 'Friction zero. Reaction infinite.',
    description:
      'Silver-fiber knit sleeves with high-conductivity tips, breathable mesh and zero-drag finish for mobile and PC FPS.',
    features: ['High-conductivity silver fiber', 'Breathable mesh', 'Anti-microbial', '4 sizes for perfect fit'],
    specs: { Material: 'Silver-fiber knit', Pack: '6 sleeves', Sizes: 'S/M/L/XL' },
    price: 14,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=1600&q=80',
    ],
    variants: [
      { id: 'v_g_s', name: 'S', type: 'size', value: 'S' },
      { id: 'v_g_m', name: 'M', type: 'size', value: 'M' },
      { id: 'v_g_l', name: 'L', type: 'size', value: 'L' },
      { id: 'v_g_xl', name: 'XL', type: 'size', value: 'XL' },
    ],
    rating: 4.6,
    reviewCount: 1820,
    reviews: stockReviews,
    stock: 1500,
    badges: ['bestseller'],
    tags: ['sleeves', 'mobile'],
  },
  {
    id: 'p_grip_titan',
    slug: 'titan-mouse-grip-tape',
    name: 'Titan Mouse Grip Tape',
    category: 'performance',
    tagline: 'Locked grip. Total control.',
    description:
      'Pre-cut, sweat-channel grip tape compatible with 60+ mouse models. Replace in 30 seconds.',
    features: ['60+ mouse compatibility', 'Sweat channels', '0.5mm low-profile', 'Residue-free'],
    specs: { Thickness: '0.5 mm', Compatibility: '60+ models' },
    price: 12,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1600&q=80',
    ],
    variants: [],
    rating: 4.7,
    reviewCount: 980,
    reviews: stockReviews,
    stock: 2200,
    tags: ['grip', 'mouse'],
  },
  {
    id: 'p_perf_wrist',
    slug: 'recoil-wrist-rest',
    name: 'Recoil Memory Wrist Rest',
    category: 'performance',
    tagline: 'Endurance for marathon raids.',
    description:
      'Cooling-gel-infused memory foam wrist rest with non-slip nano base. Available for full and TKL boards.',
    features: ['Cooling gel', 'Memory foam', 'Non-slip nano base', 'TKL & full sizes'],
    specs: { Material: 'Cooling gel + memory foam' },
    price: 29,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1600&q=80',
    ],
    variants: [
      { id: 'v_w_tkl', name: 'TKL', type: 'size', value: 'TKL' },
      { id: 'v_w_full', name: 'Full', type: 'size', value: 'Full', priceDelta: 6 },
    ],
    rating: 4.5,
    reviewCount: 311,
    reviews: stockReviews,
    stock: 410,
    tags: ['wrist', 'comfort'],
  },

  // ================== FURNITURE ==================
  {
    id: 'p_desk_battlestation',
    slug: 'apex-battlestation-desk',
    name: 'Apex Battlestation Desk',
    category: 'furniture',
    tagline: 'Architectural command center.',
    description:
      'Motorized sit-stand frame with carbon-weave top, integrated cable spine, RGB underglow, headphone arm and 4 USB-C ports.',
    features: [
      'Motorized 4-stage lift (60-125cm)',
      'Carbon-weave top (160×80cm)',
      'Integrated cable spine',
      'RGB underglow',
      'Headphone arm + 4× USB-C',
    ],
    specs: { Top: '160 × 80 cm', Lift: '60-125 cm', Capacity: '120 kg' },
    price: 899,
    compareAtPrice: 1099,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=1600&q=80',
    ],
    variants: [
      { id: 'v_d_160', name: '160 cm', type: 'size', value: '160 × 80 cm' },
      { id: 'v_d_180', name: '180 cm', type: 'size', value: '180 × 80 cm', priceDelta: 120 },
    ],
    rating: 4.9,
    reviewCount: 188,
    reviews: stockReviews,
    stock: 24,
    badges: ['staff-pick'],
    tags: ['desk', 'furniture'],
  },
  {
    id: 'p_chair_throne',
    slug: 'throne-x1-chair',
    name: 'Throne X1 Gaming Chair',
    category: 'furniture',
    tagline: '12-hour stamina. Elite spinal alignment.',
    description:
      'Aluminum-frame ergonomic throne with adaptive lumbar dynamics, breathable Tech-Mesh and 5D armrests.',
    features: [
      'Adaptive lumbar dynamics',
      'Aluminum frame',
      'Tech-Mesh breathable upholstery',
      '5D armrests',
      '4D recline up to 165°',
    ],
    specs: { Frame: 'Aircraft Aluminum', Mesh: 'Tech-Mesh', Recline: 'up to 165°' },
    price: 549,
    compareAtPrice: 699,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    ],
    variants: [
      { id: 'v_c_color_black', name: 'Void Black', type: 'color', value: 'Void Black', swatch: '#0d0f25' },
      { id: 'v_c_color_violet', name: 'Violet', type: 'color', value: 'Violet', swatch: '#9b5cff' },
    ],
    rating: 4.8,
    reviewCount: 423,
    reviews: stockReviews,
    stock: 56,
    badges: ['bestseller'],
    tags: ['chair', 'furniture'],
  },

  // ================== BAGS ==================
  {
    id: 'p_bag_loadout',
    slug: 'loadout-tactical-backpack',
    name: 'Loadout Tactical Backpack',
    category: 'bags',
    tagline: 'Mobile war kit. LAN-ready.',
    description:
      'Modular 32L tactical backpack with armored laptop sleeve, weather-sealed top, MOLLE expansion and headphone bay.',
    features: [
      'Armored 17" laptop sleeve',
      'Weather-sealed top',
      'MOLLE expansion grid',
      'Quick-access headphone bay',
      'Anti-theft zips',
    ],
    specs: { Capacity: '32 L', Material: 'Ballistic Nylon 1000D' },
    price: 149,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1600&q=80',
    ],
    variants: [
      { id: 'v_b_color_black', name: 'Black', type: 'color', value: 'Black', swatch: '#0d0f25' },
      { id: 'v_b_color_violet', name: 'Violet', type: 'color', value: 'Violet', swatch: '#9b5cff' },
    ],
    rating: 4.8,
    reviewCount: 295,
    reviews: stockReviews,
    stock: 110,
    badges: ['new'],
    tags: ['bag', 'backpack'],
  },
  {
    id: 'p_bag_organizer',
    slug: 'modular-tech-organizer',
    name: 'Modular Tech Organizer',
    category: 'bags',
    tagline: 'Cables. Cards. Chaos solved.',
    description:
      'Multi-layer EVA-shell organizer with magnetic dividers, RFID-blocking pocket and elastic loops for every essential.',
    features: ['EVA shell', 'Magnetic dividers', 'RFID pocket', 'Cable loops × 18'],
    specs: { Material: 'EVA + 600D Nylon' },
    price: 39,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1633113088432-8e54e8c0a3ee?auto=format&fit=crop&w=1600&q=80',
    ],
    variants: [],
    rating: 4.6,
    reviewCount: 142,
    reviews: stockReviews,
    stock: 320,
    tags: ['organizer', 'travel'],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getRelatedProducts(slug: string, limit = 4): Product[] {
  const product = getProduct(slug);
  if (!product) return [];
  if (product.related && product.related.length) {
    return product.related
      .map((id) => PRODUCTS.find((p) => p.id === id))
      .filter(Boolean)
      .slice(0, limit) as Product[];
  }
  return PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(
    0,
    limit,
  );
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getBestSellers(limit = 6): Product[] {
  return [...PRODUCTS].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, limit);
}

export function getNewArrivals(limit = 6): Product[] {
  return PRODUCTS.filter((p) => p.badges?.includes('new')).slice(0, limit);
}

export interface ProductFilters {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  badges?: string[];
  sort?: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export function filterProducts(filters: ProductFilters): Product[] {
  let list = [...PRODUCTS];
  if (filters.q) {
    const q = filters.q.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }
  if (filters.category) list = list.filter((p) => p.category === filters.category);
  if (typeof filters.minPrice === 'number') list = list.filter((p) => p.price >= filters.minPrice!);
  if (typeof filters.maxPrice === 'number') list = list.filter((p) => p.price <= filters.maxPrice!);
  if (filters.rating) list = list.filter((p) => p.rating >= filters.rating!);
  if (filters.badges?.length) {
    list = list.filter((p) => p.badges?.some((b) => filters.badges!.includes(b)));
  }
  switch (filters.sort) {
    case 'price-asc':
      list.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      list.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      list.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      list.sort((a, b) => (b.badges?.includes('new') ? 1 : 0) - (a.badges?.includes('new') ? 1 : 0));
      break;
    default:
      list.sort((a, b) => b.reviewCount - a.reviewCount);
  }
  return list;
}

export function searchSuggestions(q: string, limit = 6) {
  if (!q.trim()) return [];
  const term = q.toLowerCase();
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(term) ||
      p.tags.some((t) => t.toLowerCase().includes(term)) ||
      p.category.includes(term),
  ).slice(0, limit);
}
