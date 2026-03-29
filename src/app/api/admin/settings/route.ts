import { db } from '@/lib/db';
import { verifySession } from '@/lib/admin-auth';
import { NextRequest, NextResponse } from 'next/server';

const auth = async () => await verifySession();

export async function GET() {
  if (!(await auth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const items = await db.siteSetting.findMany();
    const map: Record<string, string> = {};
    for (const s of items) map[s.key] = s.value;
    return NextResponse.json(map);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await auth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body: Record<string, string> = await request.json();
    const results = [];

    for (const [key, value] of Object.entries(body)) {
      const result = await db.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
      results.push(result);
    }

    return NextResponse.json({ success: true, count: results.length });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
