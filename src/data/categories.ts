import type { Category } from '@/types';

export const CATEGORIES: Category[] = [
  {
    slug: 'accessories',
    name: 'الإكسسوارات',
    tagline: 'مفارش فأرة. أغطية مفاتيح. أغلفة.',
    description:
      'معدات دقة لمسية مُصممة لميزة الميلي ثانية. أسطح ومفاتيح وأغلفة مبنية للمنافسة المستمرة.',
    accent: 'purple',
    image:
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1600&q=80',
  },
  {
    slug: 'clothing',
    name: 'الملابس',
    tagline: 'هوديات. تيشيرتات. أطقم رياضية إلكترونية.',
    description:
      'هوية قابلة للارتداء للطبقة التنافسية. أقمشة أداء، صور ظلية سايبر، إصدارات مميزة.',
    accent: 'pink',
    image:
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1600&q=80',
  },
  {
    slug: 'rgb',
    name: 'إضاءة RGB',
    tagline: 'أضئ غرفة الحرب.',
    description:
      'أنظمة RGB قابلة للبرمجة — شرائط وقضبان ولوحات وكرات متزامنة في محطة معركة سينمائية واحدة.',
    accent: 'blue',
    image:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80',
  },
  {
    slug: 'audio',
    name: 'الصوتيات',
    tagline: 'اسمع كل خطوة.',
    description:
      'سماعات بجودة الاستوديو ومايكروفونات البث. تصوير صوتي مضبوط للبطولات. وضوح صوت مبني للقيادة.',
    accent: 'purple',
    image:
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1600&q=80',
  },
  {
    slug: 'performance',
    name: 'الأداء',
    tagline: 'أغطية أصابع وقبضات.',
    description:
      'قبضات وأغطية وتقنية احتكاك مُصممة بدقة لحركات بلا هوادة وصفر إرهاق لليد.',
    accent: 'green',
    image:
      'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=1600&q=80',
  },
  {
    slug: 'furniture',
    name: 'الأثاث',
    tagline: 'محطات معارك وعروش.',
    description:
      'مكاتب وكراسي معمارية مُصممة حول العمود الفقري البشري والعقلية التنافسية.',
    accent: 'pink',
    image:
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1600&q=80',
  },
  {
    slug: 'bags',
    name: 'الحقائب والتقنية',
    tagline: 'أطقم حرب متنقلة.',
    description:
      'منظمات تكتيكية، أغلفة معيارية، أطقم جاهزة للبطولات. مبنية للسفر التنافسي والمهام اليومية.',
    accent: 'blue',
    image:
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1600&q=80',
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
