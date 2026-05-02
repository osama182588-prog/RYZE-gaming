import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { awardXp, createOrder, grantAchievement, listOrdersForUser } from '@/lib/store';
import { getCurrentUser } from '@/lib/auth';

const AddressSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  line1: z.string().min(2),
  line2: z.string().optional(),
  city: z.string().min(2),
  region: z.string().min(1),
  postal: z.string().min(2),
  country: z.string().min(2),
});

const LineSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  name: z.string(),
  image: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
  variantIds: z.array(z.string()),
  variantSummary: z.string().optional(),
});

const Schema = z.object({
  items: z.array(LineSchema).min(1),
  subtotal: z.number().nonnegative(),
  discount: z.number().nonnegative(),
  shipping: z.number().nonnegative(),
  tax: z.number().nonnegative(),
  total: z.number().nonnegative(),
  couponCode: z.string().optional(),
  shippingAddress: AddressSchema,
});

export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ orders: [] });
  const orders = await listOrdersForUser(user.email);
  return NextResponse.json({ orders });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid order payload.' }, { status: 400 });
  }
  const user = await getCurrentUser();
  const userEmail = user?.email ?? parsed.data.shippingAddress.email;
  const order = await createOrder({
    userEmail,
    items: parsed.data.items,
    subtotal: parsed.data.subtotal,
    discount: parsed.data.discount,
    shipping: parsed.data.shipping,
    tax: parsed.data.tax,
    total: parsed.data.total,
    couponCode: parsed.data.couponCode,
    shippingAddress: parsed.data.shippingAddress,
  });

  if (user) {
    // Award XP based on order total: 1 XP per dollar
    await awardXp(user.id, Math.round(parsed.data.total));
    await grantAchievement(user.id, 'a_first_purchase');
  }

  return NextResponse.json({ order });
}
