import { NextRequest, NextResponse } from 'next/server';
import { findCoupon } from '@/data/coupons';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const code: string = body.code ?? '';
  const subtotal: number = Number(body.subtotal ?? 0);
  const coupon = findCoupon(code);
  if (!coupon) return NextResponse.json({ error: 'الرمز غير صالح.' }, { status: 404 });
  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) {
    return NextResponse.json(
      { error: `يجب إنفاق ${coupon.minSubtotal.toFixed(0)}$ على الأقل لاستخدام هذا الرمز.` },
      { status: 400 },
    );
  }
  return NextResponse.json({ coupon });
}
