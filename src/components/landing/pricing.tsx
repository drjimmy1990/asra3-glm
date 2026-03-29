'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { useLocale } from '@/lib/i18n';

export function Pricing() {
  const { t, isRTL } = useLocale();

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const plans = [
    {
      name: t('pricing_starter'),
      description: t('pricing_starter_desc'),
      price: '$1,500',
      period: t('pricing_starter_period'),
      popular: false,
      features: [
        t('pricing_starter_features.0') as string,
        t('pricing_starter_features.1') as string,
        t('pricing_starter_features.2') as string,
        t('pricing_starter_features.3') as string,
        t('pricing_starter_features.4') as string,
        t('pricing_starter_features.5') as string,
      ],
    },
    {
      name: t('pricing_growth'),
      description: t('pricing_growth_desc'),
      price: '$5,000',
      period: t('pricing_growth_period'),
      popular: true,
      features: [
        t('pricing_growth_features.0') as string,
        t('pricing_growth_features.1') as string,
        t('pricing_growth_features.2') as string,
        t('pricing_growth_features.3') as string,
        t('pricing_growth_features.4') as string,
        t('pricing_growth_features.5') as string,
        t('pricing_growth_features.6') as string,
        t('pricing_growth_features.7') as string,
      ],
    },
    {
      name: t('pricing_enterprise'),
      description: t('pricing_enterprise_desc'),
      price: 'Custom',
      period: t('pricing_enterprise_period'),
      popular: false,
      features: [
        t('pricing_enterprise_features.0') as string,
        t('pricing_enterprise_features.1') as string,
        t('pricing_enterprise_features.2') as string,
        t('pricing_enterprise_features.3') as string,
        t('pricing_enterprise_features.4') as string,
        t('pricing_enterprise_features.5') as string,
        t('pricing_enterprise_features.6') as string,
        t('pricing_enterprise_features.7') as string,
      ],
    },
  ];

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-3">{t('pricing_sub')}</p>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            {t('pricing_heading')} <span className="text-gradient">{t('pricing_heading_highlight')}</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t('pricing_desc')}</p>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="grid gap-6 lg:grid-cols-3 items-start">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={item}
              className={`relative rounded-2xl border p-6 sm:p-8 transition-all hover:shadow-xl ${
                plan.popular
                  ? 'border-primary bg-gradient-to-b from-primary/5 to-card shadow-lg shadow-primary/10'
                  : 'border-border/60 bg-card/50 hover:border-primary/30 hover:shadow-primary/5'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 start-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Sparkles className="me-1.5 h-3 w-3" />
                    {t('pricing_popular')}
                  </Badge>
                </div>
              )}

              <div>
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">/{plan.period}</span>
              </div>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <a href="#contact" className="mt-8 block">
                <Button
                  className={`w-full h-11 ${
                    plan.popular
                      ? 'btn-glow bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'border-border/60 hover:border-primary/50 hover:bg-primary/5 bg-secondary text-secondary-foreground'
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.name === t('pricing_enterprise') ? t('pricing_contact') : t('pricing_get_started')}
                  <Arrow className="ms-2 h-4 w-4" />
                </Button>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
