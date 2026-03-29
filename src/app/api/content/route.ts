import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [services, projects, testimonials, faqs, settings] = await Promise.all([
      db.service.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
      db.project.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
      db.testimonial.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
      db.fAQ.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
      db.siteSetting.findMany(),
    ]);

    const settingsMap: Record<string, string> = {};
    for (const s of settings) {
      settingsMap[s.key] = s.value;
    }

    return NextResponse.json({
      services,
      projects,
      testimonials,
      faqs,
      settings: settingsMap,
    });
  } catch (error) {
    console.error('Content API error:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}
