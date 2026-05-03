import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { subscribeNewsletter } from '@/lib/store';

const Schema = z.object({ email: z.string().email() });

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const parsed = Schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'يلزم إدخال بريد إلكتروني صالح.' }, { status: 400 });
  await subscribeNewsletter(parsed.data.email);
  return NextResponse.json({ ok: true });
}
