'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Zap } from 'lucide-react';
import { useLocale } from '@/lib/i18n';

export function CTABanner() {
  const { t, isRTL } = useLocale();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-0 start-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-0 end-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <Zap className="h-3.5 w-3.5" />
            {t('cta_badge')}
          </div>

          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            {t('cta_heading')} <span className="text-gradient">{t('cta_heading_highlight')}</span>
          </h2>

          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">{t('cta_desc')}</p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact">
              <Button size="lg" className="btn-glow bg-primary text-primary-foreground hover:bg-primary/90 px-8 text-base font-semibold h-12">
                {t('cta_button')}
                <Arrow className="ms-2 h-4 w-4" />
              </Button>
            </a>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">{t('cta_note')}</p>
        </motion.div>
      </div>
    </section>
  );
}
