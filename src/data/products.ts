import type { Product } from '@/types';

const stockReviews = [
  {
    id: 'r1',
    author: 'NovaStrike',
    rating: 5,
    title: 'مستوى آخر بصراحة',
    body: 'جودة البناء خيالية. تحس إنه معدات من فيلم خيال علمي. APM ارتفع بين ليلة وضحاها.',
    date: '2026-02-14',
    verified: true,
  },
  {
    id: 'r2',
    author: 'Kira_07',
    rating: 5,
    title: 'يستاهل كل ريال',
    body: 'التغليف لوحده خلّى صاحبي يغار. الأداء جنوني — صفر ندم.',
    date: '2026-02-21',
    verified: true,
  },
  {
    id: 'r3',
    author: 'VEXR',
    rating: 4,
    title: 'اختيار ممتاز',
    body: 'المواد فاخرة والتصميم مميز. الشحن كان سريع.',
    date: '2026-03-02',
    verified: true,
  },
];

export const PRODUCTS: Product[] = [
  // ================== ACCESSORIES ==================
  {
    id: 'p_pad_void',
    slug: 'voidweave-xl-mousepad',
    name: 'ماوس باد Voidweave XL',
    category: 'accessories',
    tagline: 'انزلاق بطولات. سطح تفاعلي.',
    description:
      'سطح مُهندس بسماكة 4 ملم من مواد الفضاء لأجهزة الاستشعار الهجينة. يوفر Voidweave انزلاقاً منخفض الاحتكاك مع طبقة فرملة دقيقة للتحكم في الحركات السريعة.',
    features: [
      'سطح نسيج دقيق تفاعلي منخفض الاحتكاك',
      'قاعدة نتريل مانعة للانزلاق بنمط قفل هوائي',
      'حواف نيون مخيطة',
      'طلاء نانو مقاوم للسوائل',
      'مقاس بطولات 900 × 400 × 4 ملم',
    ],
    specs: {
      'المقاس': '900 × 400 × 4 ملم',
      'السطح': 'Voidweave تفاعلي',
      'القاعدة': 'نتريل بقفل هوائي',
      'الوزن': '720 جم',
      'الضمان': 'سنتان',
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
    name: 'طقم أغطية مفاتيح Synth — PBT',
    category: 'accessories',
    tagline: 'شفافية مضيئة. طباعة سايبر.',
    description:
      'طقم PBT مزدوج الحقن من 142 مفتاحاً مع أحرف مضيئة وخط سايبربنك مخصص. متوافق مع MX والمفاتيح المنخفضة.',
    features: [
      'PBT مزدوج الحقن — لا يبهت أبداً',
      'أحرف سايبر مضيئة',
      'خيارات بروفايل OEM و Cherry و XDA',
      '142 مفتاحاً شاملة ISO وإضافات الماكرو',
      'توافق شامل مع MX والمنخفضة',
    ],
    specs: {
      'المادة': 'PBT مزدوج الحقن',
      'المفاتيح': '142',
      'البروفايل': 'OEM / Cherry / XDA',
      'التوافق': 'MX والمنخفضة',
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
    name: 'غلاف لابتوب Aero Skin',
    category: 'accessories',
    tagline: 'تشطيب سائل. بدون بقايا.',
    description:
      'أغلفة فينيل فاخرة من 3M مطبوعة بشعارات RYZE النيون. تطبيق بدون فقاعات، إزالة بدون بقايا.',
    features: ['فينيل 3M فاخر', 'قنوات بدون فقاعات', 'إزالة بدون بقايا', 'حبر مقاوم للأشعة فوق البنفسجية'],
    specs: { 'المادة': 'فينيل 3M فاخر', 'التشطيب': 'مات سائل' },
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
    name: 'هودي Signal Tech',
    category: 'clothing',
    tagline: 'سيلويت سايبر. درع يومي.',
    description:
      'هودي أداء ثقيل الوزن 480 جم/م² مع خطوط نيون عاكسة، جيب كنغر غير متماثل وجيب هاتف مخفي.',
    features: [
      'خليط قطن-بوليستر 480 جم/م²',
      'خطوط نيون عاكسة',
      'جيب هاتف مخفي',
      'مغسول مسبقاً للنعومة',
    ],
    specs: { 'المادة': 'قطن 70% / بوليستر 30%', 'الوزن': '480 جم/م²', 'القصة': 'واسعة' },
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
    name: 'تيشيرت Glitch الجرافيكي',
    category: 'clothing',
    tagline: 'مُشوّه. متمرد. يومي.',
    description:
      'تيشيرت متوسط الوزن 220 جم/م² مع طباعة غليتش عالية الكثافة على الصدر. نسيج أنبوبي بدون خياطات جانبية.',
    features: ['قطن مغزول حلقياً 220 جم/م²', 'طباعة عالية الكثافة', 'نسيج أنبوبي', 'مغسول مسبقاً'],
    specs: { 'المادة': 'قطن مغزول حلقياً', 'الوزن': '220 جم/م²', 'القصة': 'مربعة' },
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
    name: 'جيرسي البطولات الاحترافي',
    category: 'clothing',
    tagline: 'قماش بطولات. قصة منصة.',
    description:
      'جيرسي شبكي مطبوع بالتسامي مع تقنية امتصاص الرطوبة وألواح تهوية تحت الذراعين وحلقة مشبك مايك مخفية.',
    features: ['رسومات مطبوعة بالتسامي — لا تتقشر', 'ظهر شبكي ماص للرطوبة', 'حلقة مشبك مايك', 'قصة رياضية للمنصة'],
    specs: { 'المادة': 'بوليستر 100% (معاد تدويره)', 'الوزن': '160 جم/م²' },
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
    name: 'شريط Orbital RGB — زوج',
    category: 'rgb',
    tagline: 'إضاءة ستوديو لمحطة القتال.',
    description:
      'أشرطة RGB قابلة للبرمجة مع 16.8 مليون لون، 32 مشهداً تفاعلياً ووضع محيطي متزامن مع الشاشة.',
    features: ['16.8 مليون لون', 'تزامن محيطي مع الشاشة', '32 مشهداً سينمائياً', 'تشغيل USB-C'],
    specs: { 'الطاقة': 'USB-C 5V', 'الطول': '420 ملم', 'التحكم': 'تطبيق + ريموت' },
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
    name: 'شريط Pulse RGB 3 متر',
    category: 'rgb',
    tagline: 'نيون سائل لأي سطح.',
    description:
      'شريط RGB قابل للعنونة بطول 3 أمتار مع 144 LED/متر، تثبيت مغناطيسي ولاصق ووضع تفاعلي مع الموسيقى.',
    features: ['144 LED / متر', 'تفاعل مع الموسيقى', 'مغناطيسي + لاصق 3M', 'قابل للقص كل 6 سم'],
    specs: { 'الطول': '3 متر', 'عدد LED': '432', 'الطاقة': 'USB-C 5V' },
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
    name: 'كرة Nova RGB',
    category: 'rgb',
    tagline: 'نواة محيطية لأي غرفة.',
    description:
      'نواة RGB عائمة مع انتشار 360° وتحكم بالإيماءات و80 ساعة من عمر البطارية.',
    features: ['انتشار 360°', 'تحكم بالإيماءات واللمس', 'بطارية 80 ساعة', 'قاعدة شحن لاسلكية'],
    specs: { 'البطارية': '80 ساعة', 'الشحن': 'قاعدة لاسلكية', 'القطر': '180 ملم' },
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
    name: 'سماعة Eclipse Pro',
    category: 'audio',
    tagline: 'اسمع الخطوات قبل ما تصير.',
    description:
      'درايفر تيتانيوم 50 ملم مضبوط للبطولات، تصوير مكاني 360° ومايك قابل للفصل بجودة بث. وسائد ذاكرة إسفنجية.',
    features: ['درايفر تيتانيوم 50 ملم', 'تصوير مكاني 360°', 'مايك بث قابل للفصل', '40 ساعة لاسلكي'],
    specs: { 'الدرايفر': 'تيتانيوم 50 ملم', 'البطارية': '40 ساعة', 'التأخير': '<22 مللي ثانية' },
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
    name: 'مايك Broadcast الكوندنسر',
    category: 'audio',
    tagline: 'صوت ستوديو. حضور منصة.',
    description:
      'كوندنسر USB-C / XLR مزدوج الوضع مع DSP مدمج، كتم صوت هاردوير ومنفذ سماعات للمراقبة الفورية.',
    features: ['وضع مزدوج USB-C + XLR', 'DSP مدمج', 'كتم بنقرة', 'نمط كارديويد ستوديو'],
    specs: { 'التوصيل': 'USB-C / XLR', 'النمط': 'كارديويد', 'العينة': '24-bit / 96kHz' },
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
    name: 'سماعات Flux Pro الداخلية',
    category: 'audio',
    tagline: 'عزل بطولات داخل الأذن.',
    description:
      'سماعات IEM ثلاثية الدرايفر هجينة مع عزل سلبي -32dB وكيبل مضفر قابل للفصل. مصممة لـ LAN.',
    features: ['درايفر هجين ثلاثي', 'عزل -32dB', 'كيبل مضفر قابل للفصل', 'رؤوس إسفنج ذاكرة'],
    specs: { 'الدرايفر': '2x BA + 1x ديناميكي', 'المقاومة': '24 Ω', 'الكيبل': '1.2 متر مضفر' },
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
    name: 'قفازات أصابع Phantom',
    category: 'performance',
    tagline: 'احتكاك صفر. ردة فعل لا نهائية.',
    description:
      'قفازات من ألياف الفضة المحبوكة مع أطراف عالية التوصيل، شبك قابل للتنفس وتشطيب بدون سحب للموبايل وألعاب FPS.',
    features: ['ألياف فضة عالية التوصيل', 'شبك قابل للتنفس', 'مضاد للميكروبات', '4 مقاسات للملاءمة المثالية'],
    specs: { 'المادة': 'ألياف فضة محبوكة', 'الطقم': '6 قفازات', 'المقاسات': 'S/M/L/XL' },
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
    name: 'شريط قبضة ماوس Titan',
    category: 'performance',
    tagline: 'قبضة محكمة. تحكم كامل.',
    description:
      'شريط قبضة مقصوص مسبقاً مع قنوات عرق متوافق مع أكثر من 60 موديل ماوس. استبدال في 30 ثانية.',
    features: ['توافق مع 60+ ماوس', 'قنوات عرق', 'سماكة 0.5 ملم منخفضة', 'بدون بقايا'],
    specs: { 'السماكة': '0.5 ملم', 'التوافق': '60+ موديل' },
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
    name: 'مسند معصم Recoil',
    category: 'performance',
    tagline: 'تحمّل لجلسات الريد الطويلة.',
    description:
      'مسند معصم من إسفنج الذاكرة مع جل تبريد وقاعدة نانو مانعة للانزلاق. متوفر للكيبورد الكاملة و TKL.',
    features: ['جل تبريد', 'إسفنج ذاكرة', 'قاعدة نانو مانعة للانزلاق', 'مقاسات TKL وكاملة'],
    specs: { 'المادة': 'جل تبريد + إسفنج ذاكرة' },
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
    name: 'مكتب Apex Battlestation',
    category: 'furniture',
    tagline: 'مركز قيادة معماري.',
    description:
      'إطار قائم-جالس آلي مع سطح كربون، عمود كيبلات مدمج، إضاءة RGB سفلية، ذراع سماعات و4 منافذ USB-C.',
    features: [
      'رفع آلي 4 مراحل (60-125 سم)',
      'سطح كربون (160×80 سم)',
      'عمود كيبلات مدمج',
      'إضاءة RGB سفلية',
      'ذراع سماعات + 4× USB-C',
    ],
    specs: { 'السطح': '160 × 80 سم', 'الرفع': '60-125 سم', 'الحمولة': '120 كجم' },
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
    name: 'كرسي Throne X1 للقيمنق',
    category: 'furniture',
    tagline: 'تحمّل 12 ساعة. محاذاة فقرية نخبة.',
    description:
      'عرش إرغونومي بإطار ألمنيوم مع ديناميكية قطنية تكيفية، شبك Tech-Mesh قابل للتنفس ومساند ذراعين 5D.',
    features: [
      'ديناميكية قطنية تكيفية',
      'إطار ألمنيوم',
      'تنجيد Tech-Mesh قابل للتنفس',
      'مساند ذراعين 5D',
      'إمالة 4D حتى 165°',
    ],
    specs: { 'الإطار': 'ألمنيوم طيران', 'الشبك': 'Tech-Mesh', 'الإمالة': 'حتى 165°' },
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
    name: 'حقيبة Loadout التكتيكية',
    category: 'bags',
    tagline: 'معدات حرب متنقلة. جاهزة لـ LAN.',
    description:
      'حقيبة ظهر تكتيكية 32 لتر معيارية مع جيب لابتوب مدرع، غطاء مقاوم للطقس، شبكة توسيع MOLLE وجيب سماعات سريع الوصول.',
    features: [
      'جيب لابتوب 17 بوصة مدرع',
      'غطاء مقاوم للطقس',
      'شبكة توسيع MOLLE',
      'جيب سماعات سريع الوصول',
      'سحابات مضادة للسرقة',
    ],
    specs: { 'السعة': '32 لتر', 'المادة': 'نايلون باليستي 1000D' },
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
    name: 'منظم تقني معياري',
    category: 'bags',
    tagline: 'كيبلات. بطاقات. فوضى محلولة.',
    description:
      'منظم متعدد الطبقات بهيكل EVA مع فواصل مغناطيسية، جيب حجب RFID وحلقات مطاطية لكل الأساسيات.',
    features: ['هيكل EVA', 'فواصل مغناطيسية', 'جيب RFID', 'حلقات كيبلات × 18'],
    specs: { 'المادة': 'EVA + نايلون 600D' },
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
