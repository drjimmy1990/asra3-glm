import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

// GET all blog posts (admin)
export async function GET() {
  try {
    const posts = await db.blogPost.findMany({
      orderBy: { order: 'asc' },
      include: { project: { select: { id: true, title_en: true, title_ar: true, title: true } } },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Blog GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

// POST create blog post
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const slug = body.slug || body.title_en
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const post = await db.blogPost.create({
      data: {
        slug,
        title_en: body.title_en || '',
        title_ar: body.title_ar || '',
        excerpt_en: body.excerpt_en || '',
        excerpt_ar: body.excerpt_ar || '',
        content_en: body.content_en || '',
        content_ar: body.content_ar || '',
        coverImage: body.coverImage || '',
        projectId: body.projectId || null,
        tags: body.tags || '[]',
        published: body.published ?? false,
        order: body.order ?? 0,
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error: unknown) {
    console.error('Blog POST error:', error);
    const msg = error instanceof Error && error.message.includes('Unique constraint')
      ? 'A post with this slug already exists'
      : 'Failed to create blog post';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
