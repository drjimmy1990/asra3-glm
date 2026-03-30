import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

// GET single blog post
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const post = await db.blogPost.findUnique({
      where: { id },
      include: { project: { select: { id: true, title_en: true, title_ar: true, title: true } } },
    });
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(post);
  } catch (error) {
    console.error('Blog GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 });
  }
}

// PUT update blog post
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const post = await db.blogPost.update({
      where: { id },
      data: {
        slug: body.slug,
        title_en: body.title_en,
        title_ar: body.title_ar,
        excerpt_en: body.excerpt_en,
        excerpt_ar: body.excerpt_ar,
        content_en: body.content_en,
        content_ar: body.content_ar,
        coverImage: body.coverImage,
        projectId: body.projectId || null,
        tags: body.tags,
        published: body.published,
        order: body.order,
      },
    });
    return NextResponse.json(post);
  } catch (error: unknown) {
    console.error('Blog PUT error:', error);
    const msg = error instanceof Error && error.message.includes('Unique constraint')
      ? 'A post with this slug already exists'
      : 'Failed to update blog post';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

// DELETE blog post
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await db.blogPost.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Blog DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}
