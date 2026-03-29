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
    const { title, category, description, imageUrl, metrics, tags, color, featured, order, active } = body;

    const project = await db.project.create({
      data: {
        title,
        category,
        description,
        imageUrl: imageUrl || '',
        metrics: typeof metrics === 'string' ? metrics : JSON.stringify(metrics || []),
        tags: typeof tags === 'string' ? tags : JSON.stringify(tags || []),
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
