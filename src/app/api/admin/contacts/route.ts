import { db } from '@/lib/db';
import { verifySession } from '@/lib/admin-auth';
import { NextRequest, NextResponse } from 'next/server';

const auth = async () => await verifySession();

export async function GET() {
  if (!(await auth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const rows = await db.$queryRawUnsafe(
      'SELECT * FROM ContactSubmission ORDER BY createdAt DESC'
    );
    const items = (rows as Record<string, unknown>[]).map((r: Record<string, unknown>) => ({
      ...r,
      read: Boolean(r.read),
    }));
    return NextResponse.json(items);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
