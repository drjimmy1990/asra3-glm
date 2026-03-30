'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, Users, Clock, DollarSign, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { parseJSON, type Project, type MetricItem, type SiteData } from '@/hooks/use-site-data';
import { useLocale } from '@/lib/i18n';

const metricIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users, Clock, DollarSign, BarChart3,
};

interface ResultsProps {
  data?: SiteData | null;
}

export function Results({ data }: ResultsProps) {
  const { t } = useLocale();
  const projects: Project[] = data?.projects || [];

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const card = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <section id="results" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-bold text-primary tracking-[0.2em] uppercase mb-4">{t('results_sub')}</p>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            {t('results_heading')} <span className="text-primary">{t('results_heading_highlight')}</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t('results_desc')}</p>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="space-y-8">
          {projects.map((project) => {
            const metrics = parseJSON<MetricItem[]>(project.metrics, []);
            const tags = parseJSON<string[]>(project.tags, []);
            const blogSlug = project.blogPosts?.[0]?.slug;

            const cardContent = (
              <div className="grid gap-0 lg:grid-cols-5">
                <div className={`relative lg:col-span-2 min-h-[240px] bg-gradient-to-br ${project.color} flex items-center justify-center overflow-hidden`}>
                  {project.imageUrl ? (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                    </motion.div>
                  ) : (
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 2 }}
                      className="text-6xl font-black text-primary/20 group-hover:text-primary/30 transition-colors"
                    >
                      {project.title.charAt(0)}
                    </motion.div>
                  )}
                  <div className="absolute top-4 start-4">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">{project.category}</Badge>
                  </div>
                </div>
                <div className="p-8 sm:p-10 lg:col-span-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">{project.title}</h3>
                      <p className="mt-3 text-base text-muted-foreground leading-relaxed">{project.description}</p>
                    </div>
                    {blogSlug && (
                      <div className="hidden sm:flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border-2 border-border/80 text-muted-foreground group-hover:text-primary group-hover:border-primary/80 group-hover:bg-primary/10 transition-all">
                        <ArrowUpRight className="h-5 w-5 rtl:rotate-180" />
                      </div>
                    )}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-6 sm:gap-8">
                    {metrics.map((metric) => {
                      const IconComp = metricIconMap[metric.icon] || BarChart3;
                      return (
                        <motion.div 
                          key={metric.label} 
                          whileHover={{ y: -2 }}
                          className="flex items-center gap-3 cursor-default group/metric"
                        >
                          <motion.div 
                            whileHover={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.4 }}
                            className="p-2 bg-primary/10 rounded-lg group-hover/metric:bg-primary/20 transition-colors"
                          >
                            <IconComp className="h-5 w-5 text-primary" />
                          </motion.div>
                          <div>
                            <div className="text-xl font-bold tracking-tight">{metric.value}</div>
                            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{metric.label}</div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="px-3 py-1 font-medium">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            );

            return (
              <motion.div 
                key={project.id} 
                variants={card} 
                whileHover={{ 
                  y: -8, 
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } 
                }} 
                className="group relative overflow-hidden rounded-2xl border-2 border-border/80 bg-card transition-all hover:border-primary/80 hover:shadow-2xl"
              >
                {blogSlug ? (
                  <Link href={`/blog/${blogSlug}`} className="block w-full h-full">
                    {cardContent}
                  </Link>
                ) : (
                  <div className="block w-full h-full">
                    {cardContent}
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
