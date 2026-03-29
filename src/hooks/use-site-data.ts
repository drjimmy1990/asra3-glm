'use client';

import { useState, useEffect } from 'react';
import { useLocale } from '@/lib/i18n';

export interface SiteSettings {
  site_name: string;
  site_tagline: string;
  hero_title: string;
  hero_subtitle: string;
  hero_stat_1_value: string;
  hero_stat_1_label: string;
  hero_stat_2_value: string;
  hero_stat_2_label: string;
  hero_stat_3_value: string;
  hero_stat_3_label: string;
  hero_stat_4_value: string;
  hero_stat_4_label: string;
  contact_email: string;
  [key: string]: string;
}

export interface MetricItem {
  icon: string;
  value: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  metrics: string;
  tags: string;
  color: string;
  featured: boolean;
  order: number;
  active: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  active: boolean;
  order: number;
}

export interface Service {
  id: string;
  iconName: string;
  title: string;
  description: string;
  features: string;
  order: number;
  active: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
  active: boolean;
}

export interface SiteData {
  services: Service[];
  projects: Project[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  settings: SiteSettings;
}

export function useSiteData() {
  const [data, setData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const { locale } = useLocale();

  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch(`/api/content?lang=${locale}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error('Failed to fetch content:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, [locale]);

  return { data, loading };
}

export function parseJSON<T>(str: string, fallback: T): T {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}
