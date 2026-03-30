'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion, useTransform, useScroll } from 'framer-motion';
import { ArrowRight, ArrowLeft, Play } from 'lucide-react';
import { type SiteData } from '@/hooks/use-site-data';
import { useLocale } from '@/lib/i18n';
import { useCounter } from '@/hooks/use-counter';
import dynamic from 'next/dynamic';

// Lazy load the particle canvas — it's not critical for first paint
const HeroParticles = dynamic(() => import('./hero-particles'), {
  ssr: false,
  loading: () => null,
});

interface HeroProps {
  data?: SiteData | null;
}

// Staggered character animation for the hero heading
function AnimatedHeading({ text, delayOffset = 0 }: { text: string; delayOffset?: number }) {
  const words = text.split(' ');
  const { isRTL } = useLocale();

  return (
    <>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden">
          <motion.span
            className={`inline-block ${isRTL ? 'me-3 pt-3 pb-5 -mt-3' : 'me-3 pb-2'}`}
            initial={{ y: '110%', opacity: 0, rotateX: 40 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{
              duration: 0.7,
              delay: delayOffset + wi * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </>
  );
}

// Spring-animated stat counter
function StatValue({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const animatedValue = useCounter(value, ref);

  return (
    <div
      ref={ref}
      className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground dark:text-white tracking-tighter tabular-nums"
    >
      {animatedValue}
    </div>
  );
}

export function Hero({ data }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const { t, isRTL } = useLocale();

  // Parallax scroll
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacityText = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.3, 0]);

  // Magnetic cursor spotlight
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--mouse-x', `${x}%`);
      el.style.setProperty('--mouse-y', `${y}%`);
    };
    el.addEventListener('mousemove', handleMouseMove);
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const heroTitle = data?.settings?.hero_title || t('hero_title_fallback');
  const heroSubtitle = data?.settings?.hero_subtitle || t('hero_subtitle_fallback');
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const stats = [
    { value: data?.settings?.hero_stat_1_value || '50+', label: data?.settings?.hero_stat_1_label || t('stat_projects') },
    { value: data?.settings?.hero_stat_2_value || '98%', label: data?.settings?.hero_stat_2_label || t('stat_satisfaction') },
    { value: data?.settings?.hero_stat_3_value || '3x', label: data?.settings?.hero_stat_3_label || t('stat_speed') },
    { value: data?.settings?.hero_stat_4_value || '$2M+', label: data?.settings?.hero_stat_4_label || t('stat_revenue') },
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden pt-16 sm:pt-24 pb-12"
    >
      {/* === BACKGROUND LAYERS === */}

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Radial gradient mesh — slow ambient animation */}
      <div
        className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 70% 40%, oklch(0.55 0.17 163 / 0.15), transparent),
            radial-gradient(ellipse 60% 80% at 30% 60%, oklch(0.6 0.12 200 / 0.1), transparent)
          `,
        }}
      />

      {/* Cursor spotlight — only on desktop */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 opacity-0 hover:opacity-100 hidden lg:block"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), oklch(0.55 0.17 163 / 0.06), transparent 40%)`,
        }}
      />

      {/* Interactive particle network — fills entire hero background */}
      <div className="absolute inset-0 z-0">
        <HeroParticles />
      </div>

      {/* === CONTENT === */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          className="relative max-w-4xl mx-auto text-center"
          style={{ y: yText, opacity: opacityText }}
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              {isRTL ? 'متاح للمشاريع الجديدة' : 'Available for new projects'}
            </span>
          </motion.div>

          {/* Main heading */}
          <h1 className="text-[var(--text-5xl)] lg:text-[var(--text-display)] font-black tracking-tighter rtl:tracking-normal text-foreground leading-[0.95] rtl:leading-[1.3] pb-2 [text-wrap:balance] mx-auto">
            <AnimatedHeading text={heroTitle} delayOffset={0.15} />
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-5 sm:mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed"
          >
            {heroSubtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4"
          >
            <a href="#contact" className="group">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              >
                {t('hero_cta')}
                <Arrow className="ms-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Button>
            </a>
            <a href="#results" className="group">
              <Button
                size="lg"
                variant="ghost"
                className="w-full sm:w-auto border border-border/50 hover:border-primary/30 hover:bg-primary/5 px-8 py-6 text-base font-medium transition-all duration-300"
              >
                <Play className="me-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                {t('hero_cta_secondary')}
              </Button>
            </a>
          </motion.div>

          {/* Stats row */}
          <div className="mt-12 sm:mt-14 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 border-t border-border/40 pt-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.65 + idx * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="flex flex-col items-center gap-1"
              >
                <StatValue value={stat.value} />
                <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 start-0 end-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none z-[5]" />
    </section>
  );
}
