'use client';

import { motion } from 'framer-motion';
import { Check, Zap, Rocket, Shield } from 'lucide-react';
import { useLocale } from '@/lib/i18n';
import { translations } from '@/lib/translations';

export function Advantages() {
  const { t, locale } = useLocale();
  const tr = translations[locale];

  const tiers = [
    {
      icon: Zap,
      name: t('adv_tier_quick'),
      description: t('adv_tier_quick_desc'),
      features: tr.adv_quick_features as readonly string[],
    },
    {
      icon: Rocket,
      name: t('adv_tier_full'),
      description: t('adv_tier_full_desc'),
      features: tr.adv_full_features as readonly string[],
    },
    {
      icon: Shield,
      name: t('adv_tier_enterprise'),
      description: t('adv_tier_enterprise_desc'),
      features: tr.adv_enterprise_features as readonly string[],
    },
  ];

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <section id="advantages" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-3">{t('adv_sub')}</p>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            {t('adv_heading')} <span className="text-primary">{t('adv_heading_highlight')}</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t('adv_desc')}</p>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="grid gap-8 lg:grid-cols-3 items-start">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.name}
                variants={item}
                className="relative rounded-2xl border border-border/60 bg-card/50 p-6 sm:p-8 transition-all hover:shadow-xl hover:border-primary/30 hover:shadow-primary/5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{tier.name}</h3>
                    <p className="text-xs text-muted-foreground">{tier.description}</p>
                  </div>
                </div>

                <ul className="space-y-3 mt-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
