'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/lib/i18n';
import type { SiteData } from '@/hooks/use-site-data';

const tools = [
  { name: 'Next.js', icon: '⚡' },
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Python', icon: '🐍' },
  { name: 'n8n', icon: '🔗' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Supabase', icon: '🔥' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'Redis', icon: '🔴' },
  { name: 'Prisma', icon: '💎' },
  { name: 'OpenAI', icon: '🤖' },
  { name: 'Stripe', icon: '💳' },
  { name: 'Make', icon: '🔧' },
  { name: 'Zapier', icon: '⚡' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Vercel', icon: '▲' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Tailwind CSS', icon: '🎨' },
  { name: 'Framer Motion', icon: '🎞️' },
  { name: 'Figma', icon: '🖌️' },
  { name: 'GitHub', icon: '🐙' },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 12, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1 } };

interface TrustedByProps {
  data?: SiteData;
}

export function TrustedBy({ data }: TrustedByProps) {
  const { t, locale } = useLocale();
  const settings = data?.settings || {};
  
  const heading = locale === 'ar' 
    ? (settings.trusted_heading_ar || t('trusted_heading'))
    : (settings.trusted_heading_en || settings.trusted_heading || t('trusted_heading'));

  return (
    <section className="relative py-20 border-y border-border/40 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading with gradient accent */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            {heading}
          </h3>
          <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-primary/60 via-primary to-primary/60" />
        </motion.div>

        {/* Tech grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="relative flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.name}
              variants={item}
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 hover:shadow-[0_0_20px_-5px_var(--primary)] transition-all duration-300 cursor-default"
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
