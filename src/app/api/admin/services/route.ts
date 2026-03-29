import { db } from '@/lib/db';
import { verifySession } from '@/lib/admin-auth';
import { NextRequest, NextResponse } from 'next/server';

const auth = async () => {
  const isValid = await verifySession();
  return isValid;
};

export async function GET() {
  if (!(await auth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const items = await db.service.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await auth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await request.json();
    const item = await db.service.create({
      data: {
        iconName: body.iconName || 'Code2',
        title: body.title || body.title_en || '',
        title_en: body.title_en || '',
        title_ar: body.title_ar || '',
        description: body.description || body.description_en || '',
        description_en: body.description_en || '',
        description_ar: body.description_ar || '',
        features: body.features || body.features_en ? (typeof body.features === 'string' ? body.features : JSON.stringify(body.features || [])) : (typeof body.features_en === 'string' ? body.features_en : JSON.stringify(body.features_en || [])),
        features_en: body.features_en || (typeof body.features === 'string' ? body.features : JSON.stringify(body.features || [])),
        features_ar: body.features_ar || '[]',
        order: body.order ?? 0,
        active: body.active ?? true,
      },
    });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
  }
}
