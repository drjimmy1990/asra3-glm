import { db } from '@/lib/db';
import { verifySession } from '@/lib/admin-auth';
import { NextRequest, NextResponse } from 'next/server';

async function checkAuth() {
  const isValid = await verifySession();
  if (!isValid) {
    return false;
  }
  return true;
}

export async function GET() {
  const isValid = await checkAuth();
  if (!isValid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const projects = await db.project.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const isValid = await checkAuth();
  if (!isValid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const {
      title, title_en, title_ar,
      category, category_en, category_ar,
      description, description_en, description_ar,
      tags, tags_en, tags_ar,
      imageUrl, metrics, color, featured, order, active,
    } = body;

    const project = await db.project.create({
      data: {
        title: title || title_en || '',
        title_en: title_en || '',
        title_ar: title_ar || '',
        category: category || category_en || '',
        category_en: category_en || '',
        category_ar: category_ar || '',
        description: description || description_en || '',
        description_en: description_en || '',
        description_ar: description_ar || '',
        imageUrl: imageUrl || '',
        metrics: typeof metrics === 'string' ? metrics : JSON.stringify(metrics || []),
        tags: tags || tags_en ? (typeof tags === 'string' ? tags : JSON.stringify(tags || [])) : (typeof tags_en === 'string' ? tags_en : JSON.stringify(tags_en || [])),
        tags_en: tags_en || (typeof tags === 'string' ? tags : JSON.stringify(tags || [])),
        tags_ar: tags_ar || '[]',
        color: color || 'from-emerald-500/20 to-teal-500/20',
        featured: featured ?? false,
        order: order ?? 0,
        active: active ?? true,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
