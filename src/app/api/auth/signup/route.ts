import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createUser, grantAchievement } from '@/lib/store';
import { setSessionCookie, signSession } from '@/lib/auth';

const Schema = z.object({
  email: z.string().email(),
  username: z.string().min(2).max(24).regex(/^[a-zA-Z0-9_-]+$/, 'Use letters, numbers, _ or -'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  referralCode: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? 'Invalid input';
    return NextResponse.json({ error: first }, { status: 400 });
  }
  try {
    const user = await createUser({
      email: parsed.data.email,
      username: parsed.data.username,
      password: parsed.data.password,
      referredBy: parsed.data.referralCode,
    });
    const token = await signSession({
      uid: user.id,
      role: user.role,
      email: user.email,
      username: user.username,
    });
    await setSessionCookie(token);
    // gamification: nothing on signup, but unlock when first purchase happens
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        xp: user.xp,
        achievements: user.achievements,
        referralCode: user.referralCode,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Signup failed' },
      { status: 400 },
    );
  }
}

// Stop unused import warning if grantAchievement isn't called above
void grantAchievement;
