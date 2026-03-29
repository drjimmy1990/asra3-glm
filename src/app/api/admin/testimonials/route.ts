import { db } from '@/lib/db';
import { verifySession } from '@/lib/admin-auth';
import { NextRequest, NextResponse } from 'next/server';

const auth = async () => {
  const isValid = await verifySession();
  if (!isValid) return false;
  return true;
};

export async function GET() {
  if (!(await auth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const items = await db.testimonial.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await auth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await request.json();
    const item = await db.testimonial.create({
      data: {
        name: body.name,
        role: body.role,
        content: body.content,
        rating: body.rating ?? 5,
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
