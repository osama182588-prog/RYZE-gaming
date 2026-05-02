import { NextRequest, NextResponse } from 'next/server';
import { findCoupon } from '@/data/coupons';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const code: string = body.code ?? '';
  const subtotal: number = Number(body.subtotal ?? 0);
  const coupon = findCoupon(code);
  if (!coupon) return NextResponse.json({ error: 'Code not recognized.' }, { status: 404 });
  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) {
    return NextResponse.json(
      { error: `Spend $${coupon.minSubtotal.toFixed(0)}+ to use this code.` },
      { status: 400 },
    );
  }
  return NextResponse.json({ coupon });
}
