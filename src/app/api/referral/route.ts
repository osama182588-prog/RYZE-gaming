import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getCurrentUser } from '@/lib/auth';
import { awardXp, grantAchievement } from '@/lib/store';

const Schema = z.object({ code: z.string().min(2) });

/**
 * Mock referral redeem: adds XP and grants Recruiter achievement when a user
 * "uses" a referral code. In a real system this would happen on signup of the
 * invited friend; we expose this endpoint for demo / share-link flows.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const parsed = Schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'رمز غير صالح' }, { status: 400 });

  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'سجّل الدخول لاستبدال الرمز.' }, { status: 401 });

  await awardXp(user.id, 200);
  await grantAchievement(user.id, 'a_referral');
  return NextResponse.json({ ok: true, xp: 200 });
}
