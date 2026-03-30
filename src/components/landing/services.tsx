'use client';

import { motion } from 'framer-motion';
import { 
  Code2, 
  Workflow, 
  Puzzle, 
  Rocket, 
  ArrowRight, 
  ArrowLeft,
  Bot,
  Brain,
  Database,
  Globe,
  Shield,
  ShieldCheck,
  Layers,
  Cpu,
  Cloud,
  Terminal,
  Server,
  Zap,
  Users,
  MessageCircle,
  Heart,
  Star,
  Activity,
  Mail,
  Package,
  LayoutDashboard,
  Cog
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { parseJSON, type Service, type SiteData } from '@/hooks/use-site-data';
import { useLocale } from '@/lib/i18n';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2, 
  Workflow, 
  Puzzle, 
  Rocket, 
  Database, 
  Globe, 
  Shield, 
  Layers,
  Bot,
  Brain,
  ShieldCheck,
  Cpu,
  Cloud,
  Terminal,
  Server,
  Zap,
  Users,
  MessageCircle,
  Heart,
  Star,
  Activity,
  Mail,
  Package,
  LayoutDashboard,
  Cog
};

interface ServicesProps {
  data?: SiteData | null;
}

export function Services({ data }: ServicesProps) {
  const { t, isRTL } = useLocale();
  const services: Service[] = data?.services || [];

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const card = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-bold text-primary tracking-[0.2em] uppercase mb-4">{t('services_sub')}</p>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            {t('services_heading')} <span className="text-primary">{t('services_heading_highlight')}</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t('services_desc')}</p>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {services.map((service) => {
            const IconComp = iconMap[service.iconName] || Code2;
            const features = parseJSON<string[]>(service.features, []);
            return (
              <motion.div 
                key={service.id} 
                variants={card} 
                whileHover={{ 
                  y: -8, 
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } 
                }} 
                className="group relative rounded-2xl border-2 border-border/80 bg-card p-8 sm:p-10 transition-all hover:border-primary/80 hover:shadow-2xl overflow-hidden"
              >
                <div className="absolute top-0 end-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <IconComp className="w-32 h-32" />
                </div>
                
                <motion.div 
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  className="relative flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg"
                >
                  <IconComp className="h-8 w-8" />
                </motion.div>
                
                <h3 className="mt-8 text-2xl font-bold tracking-tight">{service.title}</h3>
                <p className="mt-4 text-base text-muted-foreground leading-relaxed">{service.description}</p>
                <ul className="mt-8 space-y-3">
                  {features.map((feature, idx) => (
                    <motion.li 
                      key={`${service.id}-${idx}`} 
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1, x: isRTL ? -4 : 4 }}
                      className="flex items-center gap-3 text-base font-medium text-foreground transition-all"
                    >
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-12 text-center">
          <a href="#contact">
            <Button variant="outline" size="lg" className="border-border/60 hover:border-primary/50 hover:bg-primary/5">
              {t('services_cta')} <Arrow className="ms-2 h-4 w-4" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
