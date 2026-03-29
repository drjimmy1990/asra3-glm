'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, Users, Clock, DollarSign, BarChart3 } from 'lucide-react';
import { useSiteData, parseJSON, type Project, type MetricItem } from '@/hooks/use-site-data';
import { useLocale } from '@/lib/i18n';

const metricIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users, Clock, DollarSign, BarChart3,
};

export function Results() {
  const { data } = useSiteData();
  const { t } = useLocale();
  const projects: Project[] = data?.projects || [];

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const card = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <section id="results" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-3">{t('results_sub')}</p>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            {t('results_heading')} <span className="text-gradient">{t('results_heading_highlight')}</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t('results_desc')}</p>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="space-y-8">
          {projects.map((project) => {
            const metrics = parseJSON<MetricItem[]>(project.metrics, []);
            const tags = parseJSON<string[]>(project.tags, []);
            return (
              <motion.div key={project.id} variants={card} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                <div className="grid gap-0 lg:grid-cols-5">
                  <div className={`relative lg:col-span-2 min-h-[200px] bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                    <div className="text-6xl font-black text-primary/20 group-hover:text-primary/30 transition-colors">
                      {project.title.charAt(0)}
                    </div>
                    <div className="absolute top-4 start-4">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">{project.category}</Badge>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 lg:col-span-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold">{project.title}</h3>
                        <p className="mt-2 text-muted-foreground leading-relaxed">{project.description}</p>
                      </div>
                      <div className="hidden sm:flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border/60 text-muted-foreground group-hover:text-primary group-hover:border-primary/30 transition-colors">
                        <ArrowUpRight className="h-4 w-4 rtl:rotate-180" />
                      </div>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-4 sm:gap-6">
                      {metrics.map((metric) => {
                        const IconComp = metricIconMap[metric.icon] || BarChart3;
                        return (
                          <div key={metric.label} className="flex items-center gap-2">
                            <IconComp className="h-4 w-4 text-primary" />
                            <div>
                              <div className="text-sm font-semibold">{metric.value}</div>
                              <div className="text-xs text-muted-foreground">{metric.label}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs font-normal border-border/60">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
