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

  // Stats use values from settings, and localized labels from settings (if provided) or fallbacks
  const stats = [
    { value: data?.settings?.hero_stat_1_value || '50+', label: data?.settings?.hero_stat_1_label || t('stat_projects') },
    { value: data?.settings?.hero_stat_2_value || '98%', label: data?.settings?.hero_stat_2_label || t('stat_satisfaction') },
    { value: data?.settings?.hero_stat_3_value || '3x', label: data?.settings?.hero_stat_3_label || t('stat_speed') },
    { value: data?.settings?.hero_stat_4_value || '$2M+', label: data?.settings?.hero_stat_4_label || t('stat_revenue') },
  ];

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 grid-bg" />
      {/* Colorful mesh background elements */}
      <div className="absolute top-0 start-0 w-[40rem] h-[40rem] bg-primary/15 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-70 animate-float" />
      <div className="absolute top-1/4 end-0 w-[35rem] h-[35rem] bg-amber-500/15 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-60 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-0 start-1/4 w-[45rem] h-[45rem] bg-blue-500/15 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-60 animate-float" style={{ animationDelay: '4s' }} />
      
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-0 hover:opacity-100" style={{ background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), oklch(0.55 0.17 163 / 0.15), transparent 40%)` }} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-start">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="text-5xl font-black tracking-tighter sm:text-7xl md:text-8xl">
              <span className="text-foreground leading-[1.1] block">{heroTitle}</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="mt-8 max-w-xl text-xl text-muted-foreground sm:text-2xl leading-relaxed font-medium">
              {heroSubtitle}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
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
          </div>

          <div className="lg:col-span-5">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, idx) => (
                <motion.div 
                  key={stat.label} 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  whileHover={{ y: -5, boxShadow: "0 20px 40px -15px oklch(0.55 0.17 163 / 0.1)" }}
                  transition={{ duration: 0.5, delay: 0.6 + (idx * 0.1), ease: [0.16, 1, 0.3, 1] }} 
                  className="group flex flex-col justify-center p-6 sm:p-8 rounded-2xl border-2 border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-colors cursor-default"
                >
                  <div className="text-4xl sm:text-5xl font-black text-foreground tracking-tighter">{stat.value}</div>
                  <div className="mt-2 text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 start-0 end-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
