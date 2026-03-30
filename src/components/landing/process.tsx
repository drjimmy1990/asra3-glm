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

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="relative max-w-4xl mx-auto">
          <div className="absolute start-8 md:start-1/2 top-0 bottom-0 hidden w-0.5 bg-border/50 md:block -translate-x-1/2" />
          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={step.number} 
                  variants={item} 
                  className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${isEven ? 'md:text-end' : 'md:text-start'}`}>
                    <div className={`flex items-center gap-4 mb-4 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="p-3 bg-primary/10 rounded-xl inline-block"
                      >
                        <step.icon className="h-6 w-6 text-primary" />
                      </motion.div>
                      <h3 className="text-2xl font-bold tracking-tight text-foreground transition-colors">{step.title}</h3>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed transition-colors">{step.description}</p>
                  </div>

                  <div className="relative flex-shrink-0 hidden md:flex items-center justify-center w-16">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="group/number flex h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground font-black text-xl z-10 relative transition-transform shadow-xl overflow-hidden cursor-default"
                    >
                      <motion.span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover/number:-translate-y-full">
                        {step.number}
                      </motion.span>
                      <motion.span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover/number:translate-y-0">
                        ✓
                      </motion.span>
                    </motion.div>
                  </div>

                  {/* Mobile Number Indicator */}
                  <div className="flex md:hidden items-center gap-4 text-primary font-black text-4xl opacity-20 absolute top-0 end-0">
                    {step.number}
                  </div>

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
