'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Play, Sparkles } from 'lucide-react';
import { type SiteData } from '@/hooks/use-site-data';
import { useLocale } from '@/lib/i18n';

interface HeroProps {
  data?: SiteData | null;
}

export function Hero({ data }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const { t, isRTL } = useLocale();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      heroRef.current.style.setProperty('--mouse-x', `${x}%`);
      heroRef.current.style.setProperty('--mouse-y', `${y}%`);
    };
    const el = heroRef.current;
    if (el) el.addEventListener('mousemove', handleMouseMove);
    return () => { if (el) el.removeEventListener('mousemove', handleMouseMove); };
  }, []);

  // The API already returns localized content via useSiteData's lang parameter
  const heroTitle = data?.settings?.hero_title || t('hero_title_fallback');
  const heroSubtitle = data?.settings?.hero_subtitle || t('hero_subtitle_fallback');

  // Stats labels use i18n translations (UI chrome), values come from settings
  const stats = [
    { value: data?.settings?.hero_stat_1_value || '50+', label: t('stat_projects') },
    { value: data?.settings?.hero_stat_2_value || '98%', label: t('stat_satisfaction') },
    { value: data?.settings?.hero_stat_3_value || '3x', label: t('stat_speed') },
    { value: data?.settings?.hero_stat_4_value || '$2M+', label: t('stat_revenue') },
  ];

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-1/4 start-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 end-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 end-1/3 h-48 w-48 rounded-full bg-primary/8 blur-2xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-0 hover:opacity-100" style={{ background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), oklch(0.55 0.17 163 / 0.06), transparent 40%)` }} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium border border-primary/20 bg-primary/5 text-primary">
            <Sparkles className="me-2 h-3.5 w-3.5" />
            {t('hero_badge')}
          </Badge>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="mx-auto max-w-5xl text-5xl font-black tracking-tighter sm:text-7xl md:text-8xl">
          <span className="text-foreground leading-[1.1] block">{heroTitle}</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="mx-auto mt-8 max-w-2xl text-xl text-muted-foreground sm:text-2xl leading-relaxed font-medium">
          {heroSubtitle}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a href="#contact">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-7 text-lg font-bold shadow-xl">
                {t('hero_cta')}
                <Arrow className="ms-3 h-5 w-5" />
              </Button>
            </motion.div>
          </a>
          <a href="#results">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" className="border-2 border-border hover:border-primary hover:bg-primary/5 px-10 py-7 text-lg font-bold shadow-sm">
                <Play className="me-3 h-5 w-5 text-primary" />
                {t('hero_cta_secondary')}
              </Button>
            </motion.div>
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }} className="mt-20 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4 mx-auto max-w-4xl border-t-2 border-border/50 pt-12">
          {stats.map((stat, idx) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 + (idx * 0.1), ease: [0.16, 1, 0.3, 1] }} className="text-center group flex flex-col items-center">
              <div className="text-4xl sm:text-5xl font-black text-foreground tracking-tighter group-hover:scale-110 transition-transform duration-300 inline-block">{stat.value}</div>
              <div className="mt-3 text-sm sm:text-base font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 start-0 end-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
