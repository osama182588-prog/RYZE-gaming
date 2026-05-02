import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { findUserById } from './store';
import type { User } from '@/types';

const COOKIE_NAME = 'ryze_session';
const ALG = 'HS256';

function getSecret(): Uint8Array {
  const secret =
    process.env.JWT_SECRET ||
    'ryze-dev-secret-do-not-use-in-production-min-32-chars-please-rotate';
  return new TextEncoder().encode(secret);
}

export interface SessionPayload {
  uid: string;
  role: 'user' | 'admin';
  email: string;
  username: string;
}

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setIssuer('ryze')
    .setExpirationTime('30d')
    .sign(getSecret());
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret(), { issuer: 'ryze' });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string) {
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function getSession(): Promise<SessionPayload | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}

export async function getCurrentUser(): Promise<User | null> {
  const session = await getSession();
  if (!session) return null;
  return (await findUserById(session.uid)) ?? null;
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
