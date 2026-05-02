export type CategorySlug =
  | 'accessories'
  | 'clothing'
  | 'rgb'
  | 'audio'
  | 'performance'
  | 'furniture'
  | 'bags';

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  accent: 'purple' | 'blue' | 'pink' | 'green';
  image: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  type: 'size' | 'color' | 'style' | 'switch';
  value: string;
  swatch?: string; // CSS color for color swatches
  priceDelta?: number;
  stock?: number;
}

export interface ProductReview {
  id: string;
  author: string;
  avatar?: string;
  rating: number; // 1..5
  title: string;
  body: string;
  date: string;
  verified?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  tagline: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  price: number;
  compareAtPrice?: number;
  currency: string;
  images: string[];
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
  stock: number;
  badges?: Array<'new' | 'limited' | 'bestseller' | 'staff-pick' | 'pro'>;
  tags: string[];
  related?: string[]; // product ids
}

export interface CartLine {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variantIds: string[];
  variantSummary?: string;
}

export interface Coupon {
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  minSubtotal?: number;
  description: string;
}

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'canceled';

export interface Order {
  id: string;
  userEmail: string;
  items: CartLine[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  shippingAddress: ShippingAddress;
  couponCode?: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone?: string;
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postal: string;
  country: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  passwordHash: string;
  role: 'user' | 'admin';
  createdAt: string;
  xp: number;
  achievements: string[]; // achievement ids
  referralCode: string;
  referredBy?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string; // lucide icon name
  xp: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Drop {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  releaseAt: string; // ISO
  endsAt?: string;
  productSlugs: string[];
  status: 'upcoming' | 'live' | 'ended';
  rarity: 'rare' | 'epic' | 'legendary';
}

export interface SetupShowcase {
  id: string;
  title: string;
  owner: string;
  ownerHandle: string;
  image: string;
  likes: number;
  tags: string[];
  productSlugs: string[];
}

export interface Creator {
  id: string;
  name: string;
  handle: string;
  game: string;
  avatar: string;
  cover: string;
  followers: string;
  bio: string;
  signature?: string; // signature product slug
}
