import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { createHash, timingSafeEqual } from 'crypto';

const SESSION_COOKIE = 'asra3_admin_session';
const SESSION_MAX_AGE = 86400; // 24 hours

function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
}

export async function createSession(): Promise<string> {
  const token = generateToken();
  const hashed = hashToken(token);
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, hashed, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });

  return token;
}

export async function verifySession(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  return !!session?.value;
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function verifyPassword(password: string): Promise<boolean> {
  const setting = await db.siteSetting.findUnique({
    where: { key: 'admin_password' },
  });

  if (!setting) return false;

  const storedHash = createHash('sha256').update(setting.value).digest('hex');
  const inputHash = createHash('sha256').update(password).digest('hex');

  return timingSafeEqual(
    Buffer.from(storedHash),
    Buffer.from(inputHash)
  );
}
