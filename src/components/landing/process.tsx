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
          <p className="text-sm font-bold text-primary tracking-[0.2em] uppercase mb-4">{t('process_sub')}</p>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            {t('process_heading')} <span className="text-primary">{t('process_heading_highlight')}</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t('process_desc')}</p>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="relative">
          <div className="absolute start-6 top-0 bottom-0 hidden w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent md:block" />
          <div className="space-y-8 md:space-y-12">
            {steps.map((step) => (
              <motion.div 
                key={step.number} 
                variants={item} 
                whileHover={{ x: isRTL ? -12 : 12 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative flex gap-6 md:gap-10 group"
              >
                <div className="relative flex-shrink-0">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-primary bg-background text-primary font-black text-lg z-10 relative transition-colors group-hover:bg-primary group-hover:text-primary-foreground shadow-lg"
                  >
                    {step.number}
                  </motion.div>
                </div>
                <div className="flex-1 rounded-2xl border-2 border-border/80 bg-card p-8 sm:p-10 transition-all hover:border-primary/80 hover:shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-4">
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="p-3 bg-primary/10 rounded-xl"
                      >
                        <step.icon className="h-6 w-6 text-primary" />
                      </motion.div>
                      <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">{step.title}</h3>
                    </div>
                    <p className="text-base text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
