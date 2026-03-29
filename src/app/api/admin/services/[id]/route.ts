import { db } from '@/lib/db';
import { verifySession } from '@/lib/admin-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const isValid = await verifySession();
  if (!isValid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await params;
    const body = await request.json();
    const item = await db.service.update({
      where: { id },
      data: {
        ...(body.iconName !== undefined && { iconName: body.iconName }),
        ...(body.title !== undefined && { title: body.title }),
        ...(body.title_en !== undefined && { title_en: body.title_en }),
        ...(body.title_ar !== undefined && { title_ar: body.title_ar }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.description_en !== undefined && { description_en: body.description_en }),
        ...(body.description_ar !== undefined && { description_ar: body.description_ar }),
        ...(body.features !== undefined && { features: typeof body.features === 'string' ? body.features : JSON.stringify(body.features) }),
        ...(body.features_en !== undefined && { features_en: typeof body.features_en === 'string' ? body.features_en : JSON.stringify(body.features_en) }),
        ...(body.features_ar !== undefined && { features_ar: typeof body.features_ar === 'string' ? body.features_ar : JSON.stringify(body.features_ar) }),
        ...(body.order !== undefined && { order: body.order }),
        ...(body.active !== undefined && { active: body.active }),
      },
    });
    return NextResponse.json(item);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const isValid = await verifySession();
  if (!isValid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await params;
    await db.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
