'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Lightbulb, Code, Rocket } from 'lucide-react';
import { useLocale } from '@/lib/i18n';

export function Process() {
  const { t, isRTL } = useLocale();

  const steps = [
    { icon: MessageSquare, number: '01', title: t('process_1_title'), description: t('process_1_desc') },
    { icon: Lightbulb, number: '02', title: t('process_2_title'), description: t('process_2_desc') },
    { icon: Code, number: '03', title: t('process_3_title'), description: t('process_3_desc') },
    { icon: Rocket, number: '04', title: t('process_4_title'), description: t('process_4_desc') },
  ];

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const item = { hidden: { opacity: 0, x: isRTL ? 20 : -20 }, show: { opacity: 1, x: 0, transition: { duration: 0.5 } } };

  return (
    <section id="process" className="relative py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-3">{t('process_sub')}</p>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            {t('process_heading')} <span className="text-gradient">{t('process_heading_highlight')}</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t('process_desc')}</p>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="relative">
          <div className="absolute start-6 top-0 bottom-0 hidden w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent md:block" />
          <div className="space-y-8 md:space-y-12">
            {steps.map((step) => (
              <motion.div key={step.number} variants={item} className="relative flex gap-6 md:gap-10">
                <div className="relative flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-background text-primary font-bold text-sm z-10 relative">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1 rounded-2xl border border-border/60 bg-card/50 p-6 sm:p-8 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                  <div className="flex items-center gap-3 mb-3">
                    <step.icon className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
