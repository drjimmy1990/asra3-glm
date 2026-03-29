import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'en';

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

    // Localize projects
    const localizedProjects = projects.map(p => ({
      ...p,
      title: p[`title_${lang}` as keyof typeof p] || p.title || p.title_en || '',
      category: p[`category_${lang}` as keyof typeof p] || p.category || p.category_en || '',
      description: p[`description_${lang}` as keyof typeof p] || p.description || p.description_en || '',
      tags: p[`tags_${lang}` as keyof typeof p] || p.tags || p.tags_en || '[]',
    }));

    // Localize testimonials
    const localizedTestimonials = testimonials.map(t => ({
      ...t,
      name: t[`name_${lang}` as keyof typeof t] || t.name || t.name_en || '',
      role: t[`role_${lang}` as keyof typeof t] || t.role || t.role_en || '',
      content: t[`content_${lang}` as keyof typeof t] || t.content || t.content_en || '',
    }));

    // Localize services
    const localizedServices = services.map(s => ({
      ...s,
      title: s[`title_${lang}` as keyof typeof s] || s.title || s.title_en || '',
      description: s[`description_${lang}` as keyof typeof s] || s.description || s.description_en || '',
      features: s[`features_${lang}` as keyof typeof s] || s.features || s.features_en || '[]',
    }));

    // Localize FAQs
    const localizedFaqs = faqs.map(f => ({
      ...f,
      question: f[`question_${lang}` as keyof typeof f] || f.question || f.question_en || '',
      answer: f[`answer_${lang}` as keyof typeof f] || f.answer || f.answer_en || '',
    }));

    // Localize settings
    const localizedSettings: Record<string, string> = {};
    for (const [key, value] of Object.entries(settingsMap)) {
      if (key.endsWith('_en') || key.endsWith('_ar')) {
        localizedSettings[key] = value;
      } else {
        const langVal = settingsMap[`${key}_${lang}`];
        if (langVal !== undefined && langVal !== '') {
          localizedSettings[key] = langVal;
        } else {
          localizedSettings[key] = value;
        }
      }
    }

    return NextResponse.json({
      services: localizedServices,
      projects: localizedProjects,
      testimonials: localizedTestimonials,
      faqs: localizedFaqs,
      settings: localizedSettings,
    });
  } catch (error) {
    console.error('Content API error:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}
