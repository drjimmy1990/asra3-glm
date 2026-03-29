import { db } from '@/lib/db';
import { verifySession } from '@/lib/admin-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isValid = await verifySession();
  if (!isValid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await request.json();
    const {
      title, title_en, title_ar,
      category, category_en, category_ar,
      description, description_en, description_ar,
      tags, tags_en, tags_ar,
      imageUrl, metrics, color, featured, order, active,
    } = body;

    const project = await db.project.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(title_en !== undefined && { title_en }),
        ...(title_ar !== undefined && { title_ar }),
        ...(category !== undefined && { category }),
        ...(category_en !== undefined && { category_en }),
        ...(category_ar !== undefined && { category_ar }),
        ...(description !== undefined && { description }),
        ...(description_en !== undefined && { description_en }),
        ...(description_ar !== undefined && { description_ar }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(metrics !== undefined && { metrics: typeof metrics === 'string' ? metrics : JSON.stringify(metrics) }),
        ...(tags !== undefined && { tags: typeof tags === 'string' ? tags : JSON.stringify(tags) }),
        ...(tags_en !== undefined && { tags_en: typeof tags_en === 'string' ? tags_en : JSON.stringify(tags_en) }),
        ...(tags_ar !== undefined && { tags_ar: typeof tags_ar === 'string' ? tags_ar : JSON.stringify(tags_ar) }),
        ...(color !== undefined && { color }),
        ...(featured !== undefined && { featured }),
        ...(order !== undefined && { order }),
        ...(active !== undefined && { active }),
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Update project error:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isValid = await verifySession();
  if (!isValid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    await db.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete project error:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
