import type { Coupon } from '@/types';

export const COUPONS: Coupon[] = [
  { code: 'WELCOME10', type: 'percent', value: 10, description: '10% off your first order' },
  { code: 'RYZE15', type: 'percent', value: 15, minSubtotal: 100, description: '15% off orders over $100' },
  { code: 'NEONFREE', type: 'fixed', value: 25, minSubtotal: 200, description: '$25 off when you spend $200+' },
  { code: 'PROGAMER', type: 'percent', value: 20, minSubtotal: 250, description: '20% off the elite kit' },
];

export function findCoupon(code: string): Coupon | undefined {
  return COUPONS.find((c) => c.code.toLowerCase() === code.toLowerCase());
}
