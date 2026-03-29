'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for small automations and quick fixes.',
    price: '$1,500',
    period: 'per project',
    popular: false,
    features: [
      'Single automation workflow',
      'Up to 3 tool integrations',
      'Basic documentation',
      '1 round of revisions',
      'Email support',
      '2-week delivery',
    ],
  },
  {
    name: 'Growth',
    description: 'Ideal for MVPs and multi-step automations.',
    price: '$5,000',
    period: 'per project',
    popular: true,
    features: [
      'Complete SaaS MVP or automation suite',
      'Up to 10 tool integrations',
      'Full API development',
      'Authentication & billing setup',
      '3 rounds of revisions',
      'Priority Slack support',
      '4-6 week delivery',
      '30-day post-launch support',
    ],
  },
  {
    name: 'Enterprise',
    description: 'Full-scale product development and maintenance.',
    price: 'Custom',
    period: 'monthly retainer',
    popular: false,
    features: [
      'Full product development',
      'Unlimited integrations',
      'Custom architecture design',
      'CI/CD pipeline setup',
      'Performance optimization',
      'Dedicated Slack channel',
      'Weekly strategy calls',
      'Ongoing maintenance & support',
    ],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-3">
            Pricing
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Transparent Pricing.{' '}
            <span className="text-gradient">No Surprises.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Choose a package that fits your needs, or let&apos;s create a custom scope.
            Every project includes a detailed proposal with clear deliverables and timelines.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-6 lg:grid-cols-3 items-start"
        >
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
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Sparkles className="mr-1.5 h-3 w-3" />
                    Most Popular
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
                      : 'border-border/60 hover:border-primary/50 hover:bg-primary/5'
                  } ${!plan.popular ? 'bg-secondary text-secondary-foreground' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.name === 'Enterprise' ? 'Contact Me' : 'Get Started'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
