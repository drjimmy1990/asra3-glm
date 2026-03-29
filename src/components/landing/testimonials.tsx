'use client';

import { motion } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { useSiteData, type Testimonial } from '@/hooks/use-site-data';
import { useLocale } from '@/lib/i18n';

export function Testimonials() {
  const { data } = useSiteData();
  const { t } = useLocale();
  const testimonials: Testimonial[] = data?.testimonials || [];

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  return (
    <section id="testimonials" className="relative py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-3">{t('testimonials_sub')}</p>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            {t('testimonials_heading')} <span className="text-gradient">{t('testimonials_heading_highlight')}</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t('testimonials_desc')}</p>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((tc) => (
            <motion.div key={tc.id} variants={item} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="group relative rounded-2xl border border-border/60 bg-card/50 p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: tc.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">&ldquo;{tc.content}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-border/60">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                    {tc.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{tc.name}</p>
                  <p className="text-xs text-muted-foreground">{tc.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
