'use client';

import { motion } from 'framer-motion';
import { Code2, Workflow, Puzzle, Rocket, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSiteData, parseJSON, type Service } from '@/hooks/use-site-data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2, Workflow, Puzzle, Rocket, Database: Code2, Globe: Workflow, Shield: Puzzle, Layers: Rocket,
};

export function Services() {
  const { data } = useSiteData();
  const services: Service[] = data?.services || [];

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const card = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-3">What I Do</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            End-to-End Solutions for <span className="text-gradient">Modern Businesses</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Whether you need a complete SaaS platform, process automation, or a custom integration — I deliver production-grade solutions that work reliably at scale.
          </p>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {services.map((service) => {
            const IconComp = iconMap[service.iconName] || Code2;
            const features = parseJSON<string[]>(service.features, []);
            return (
              <motion.div key={service.id} variants={card} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="group relative rounded-2xl border border-border/60 bg-card/50 p-6 sm:p-8 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <IconComp className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{service.description}</p>
                <ul className="mt-5 space-y-2">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-12 text-center">
          <a href="#contact">
            <Button variant="outline" size="lg" className="border-border/60 hover:border-primary/50 hover:bg-primary/5">
              Discuss Your Project <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
