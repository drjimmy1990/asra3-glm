'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, useTransform, useScroll } from 'framer-motion';
import { ArrowRight, ArrowLeft, Play, Sparkles } from 'lucide-react';
import { type SiteData } from '@/hooks/use-site-data';
import { useLocale } from '@/lib/i18n';
import dynamic from 'next/dynamic';
import { useCounter } from '@/hooks/use-counter';

// Lazy load the 3D scene so it doesn't block initial render
const HeroScene = dynamic(() => import('./hero-scene'), { 
  ssr: false,
  loading: () => <div className="relative w-full h-full min-h-[400px] flex items-center justify-center animate-pulse"><div className="w-32 h-32 rounded-full border border-primary/20 opacity-50" /></div>
});

interface HeroProps {
  data?: SiteData | null;
}

// Staggered word animation component
function AnimatedText({ text, delayOffset = 0 }: { text: string; delayOffset?: number }) {
  const words = text.split(" ");
  const { isRTL } = useLocale();
  
  return (
    <span className="inline-block">
      {words.map((word, i) => (
        <span key={i} className={`inline-block overflow-hidden px-1 ${isRTL ? 'me-4 pt-4 pb-6 -mt-4' : 'me-3 pb-2'}`}>
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: delayOffset + (i * 0.1),
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Simplified Stat Value component
function StatValue({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const animatedValue = useCounter(value, ref);
  
  return (
    <div ref={ref} className="relative text-[var(--text-3xl)] sm:text-[var(--text-4xl)] lg:text-[var(--text-5xl)] font-black text-foreground tracking-tighter">
      {animatedValue}
    </div>
  );
}

export function Hero({ data }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const { t, isRTL } = useLocale();
  
  // Parallax Scroll Effects
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const yText = useTransform(scrollYProgress, [0, 1], [0, 100]); // Reduced distance
  const opacityText = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const y3D = useTransform(scrollYProgress, [0, 1], [0, 50]); // Reduced distance
  const opacity3D = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.2, 0]);

  // Subtle Mouse radial spotlight (reduced opacity from 0.12 to 0.08)
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

  const heroTitle = data?.settings?.hero_title || t('hero_title_fallback');
  const heroSubtitle = data?.settings?.hero_subtitle || t('hero_subtitle_fallback');

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-32 pb-20"
    >
      <div className="absolute inset-0 grid-bg opacity-50" />
      
      {/* Quieter Background: Removed the heavy multi-color blobs. Kept only the spotlight for subtle focus. */}
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-700 opacity-0 hover:opacity-100 hidden sm:block" style={{ background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), oklch(0.55 0.17 163 / 0.06), transparent 40%)` }} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-start w-full">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          
          {/* Left Column: Text & Stats */}
          <motion.div 
            className="relative lg:col-span-7 flex flex-col justify-center"
            style={{ y: yText, opacity: opacityText }}
          >
            
            <motion.h1 
              className="text-[var(--text-6xl)] lg:text-[var(--text-display)] font-black tracking-tighter rtl:tracking-normal text-foreground selection:bg-primary/20 leading-[1.1] sm:leading-[1] lg:leading-[0.9] rtl:leading-normal pb-4"
            >
              <AnimatedText text={heroTitle} delayOffset={0.1} />
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }} 
              className="mt-6 sm:mt-8 max-w-xl text-lg sm:text-[var(--text-lg)] text-muted-foreground leading-relaxed font-normal"
            >
              {heroSubtitle}
            </motion.div>

            {/* Buttons - Simplified, removed heavy shadows and extreme hover scales */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }} 
              className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5"
            >
              <a href="#contact" className="w-full sm:w-auto group">
                <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-semibold shadow-sm transition-all duration-300">
                  {t('hero_cta')}
                  <Arrow className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
              <a href="#results" className="w-full sm:w-auto group">
                <Button size="lg" variant="ghost" className="w-full sm:w-auto border border-border/50 hover:border-border hover:bg-secondary/50 px-8 py-6 text-base font-medium transition-all duration-300">
                  <Play className="me-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  {t('hero_cta_secondary')}
                </Button>
              </a>
            </motion.div>

            {/* Stats - Stripped of card borders, focusing on clean typography and rhythm */}
            <div className="mt-16 sm:mt-24 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
              {stats.map((stat, idx) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 + (idx * 0.1), ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex flex-col gap-1.5"
                >
                  <StatValue value={stat.value} />
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                </motion.div>
              ))}
            </div>

          </motion.div>

          {/* Right Column: 3D Scene */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ y: y3D, opacity: opacity3D }}
            className="relative lg:col-span-5 h-[400px] lg:h-[550px] w-full z-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none lg:hidden" />
            <HeroScene />
          </motion.div>

        </div>
      </div>

      <div className="absolute bottom-0 start-0 end-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </section>
  );
}


