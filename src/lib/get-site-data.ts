import { db } from '@/lib/db';
import { cache } from 'react';

export interface SiteSettings {
  [key: string]: string;
}

export interface SiteData {
  services: any[];
  projects: any[];
  testimonials: any[];
  faqs: any[];
  settings: SiteSettings;
}

/**
 * Server-side data fetching for the homepage.
 * Uses React's `cache()` to deduplicate within a single request.
 * This replaces the client-side `useSiteData()` hook for SSR pages.
 */
export const getSiteData = cache(async (lang: string = 'en'): Promise<SiteData> => {
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
    title: (p as any)[`title_${lang}`] || (p as any).title || (p as any).title_en || '',
    category: (p as any)[`category_${lang}`] || (p as any).category || (p as any).category_en || '',
    description: (p as any)[`description_${lang}`] || (p as any).description || (p as any).description_en || '',
    tags: (p as any)[`tags_${lang}`] || (p as any).tags || (p as any).tags_en || '[]',
  }));

  // Localize testimonials
  const localizedTestimonials = testimonials.map(t => ({
    ...t,
    name: (t as any)[`name_${lang}`] || (t as any).name || (t as any).name_en || '',
    role: (t as any)[`role_${lang}`] || (t as any).role || (t as any).role_en || '',
    content: (t as any)[`content_${lang}`] || (t as any).content || (t as any).content_en || '',
  }));

  // Localize services
  const localizedServices = services.map(s => ({
    ...s,
    title: (s as any)[`title_${lang}`] || (s as any).title || (s as any).title_en || '',
    description: (s as any)[`description_${lang}`] || (s as any).description || (s as any).description_en || '',
    features: (s as any)[`features_${lang}`] || (s as any).features || (s as any).features_en || '[]',
  }));

  // Localize FAQs
  const localizedFaqs = faqs.map(f => ({
    ...f,
    question: (f as any)[`question_${lang}`] || (f as any).question || (f as any).question_en || '',
    answer: (f as any)[`answer_${lang}`] || (f as any).answer || (f as any).answer_en || '',
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

  // Serialize dates for client components (Next.js can't pass Date objects to client)
  const serialize = (obj: any) => JSON.parse(JSON.stringify(obj));

  return {
    services: serialize(localizedServices),
    projects: serialize(localizedProjects),
    testimonials: serialize(localizedTestimonials),
    faqs: serialize(localizedFaqs),
    settings: localizedSettings,
  };
});
