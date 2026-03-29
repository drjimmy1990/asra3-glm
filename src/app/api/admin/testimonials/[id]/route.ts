import { db } from '@/lib/db';
import { verifySession } from '@/lib/admin-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const isValid = await verifySession();
  if (!isValid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await params;
    const body = await request.json();
    const item = await db.testimonial.update({
      where: { id },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.name_en !== undefined && { name_en: body.name_en }),
        ...(body.name_ar !== undefined && { name_ar: body.name_ar }),
        ...(body.role !== undefined && { role: body.role }),
        ...(body.role_en !== undefined && { role_en: body.role_en }),
        ...(body.role_ar !== undefined && { role_ar: body.role_ar }),
        ...(body.content !== undefined && { content: body.content }),
        ...(body.content_en !== undefined && { content_en: body.content_en }),
        ...(body.content_ar !== undefined && { content_ar: body.content_ar }),
        ...(body.rating !== undefined && { rating: body.rating }),
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
    await db.testimonial.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
