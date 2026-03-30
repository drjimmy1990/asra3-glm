import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

// GET published blog posts (public)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'en';
  const slug = searchParams.get('slug');

  try {
    // Single post by slug
    if (slug) {
      const post = await db.blogPost.findUnique({
        where: { slug },
        include: { project: { select: { id: true, title_en: true, title_ar: true, title: true, category_en: true, category_ar: true } } },
      });

      if (!post || !post.published) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }

      return NextResponse.json({
        ...post,
        title: lang === 'ar' ? (post.title_ar || post.title_en) : post.title_en,
        excerpt: lang === 'ar' ? (post.excerpt_ar || post.excerpt_en) : post.excerpt_en,
        content: lang === 'ar' ? (post.content_ar || post.content_en) : post.content_en,
      });
    }

    // All published posts
    const posts = await db.blogPost.findMany({
      where: { published: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      include: { project: { select: { id: true, title_en: true, title_ar: true, title: true } } },
    });

    const localizedPosts = posts.map((post) => ({
      ...post,
      title: lang === 'ar' ? (post.title_ar || post.title_en) : post.title_en,
      excerpt: lang === 'ar' ? (post.excerpt_ar || post.excerpt_en) : post.excerpt_en,
    }));

    return NextResponse.json(localizedPosts);
  } catch (error) {
    console.error('Blog API error:', error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}
