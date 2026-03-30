'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/lib/i18n';

const tools = [
  { name: 'Next.js', icon: '⚡' },
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Stripe', icon: '💳' },
  { name: 'Make', icon: '🔧' },
  { name: 'Zapier', icon: '⚡' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Python', icon: '🐍' },
  { name: 'Supabase', icon: '🔥' },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

export function TrustedBy() {
  const { t } = useLocale();

  return (
    <section className="relative py-16 border-y border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-muted-foreground mb-8 tracking-wider uppercase">
          {t('trusted_heading')}
        </p>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="relative flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.name}
              variants={item}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-colors cursor-default"
            >
              <span className="text-base">{tool.icon}</span>
              {tool.name}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
