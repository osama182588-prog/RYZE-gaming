import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyPassword } from '@/lib/store';
import { setSessionCookie, signSession } from '@/lib/auth';

const Schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'بيانات الاعتماد غير صحيحة.' }, { status: 400 });
  }
  const user = await verifyPassword(parsed.data.email, parsed.data.password);
  if (!user) {
    return NextResponse.json({ error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' }, { status: 401 });
  }
  const token = await signSession({
    uid: user.id,
    role: user.role,
    email: user.email,
    username: user.username,
  });
  await setSessionCookie(token);
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
}
