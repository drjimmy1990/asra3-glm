'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, BarChart3, Clock, DollarSign, Users } from 'lucide-react';

const projects = [
  {
    title: 'SubscriptionFlow',
    category: 'SaaS Platform',
    description:
      'A complete subscription management platform with multi-tenant architecture, Stripe billing, usage analytics, and a customer portal. Built for a fintech startup from MVP to production.',
    image: '/project-1.jpg',
    metrics: [
      { icon: Users, value: '10K+', label: 'Active Users' },
      { icon: DollarSign, value: '$50K/mo', label: 'MRR' },
      { icon: Clock, value: '8 weeks', label: 'Build Time' },
    ],
    tags: ['Next.js', 'PostgreSQL', 'Stripe', 'AWS'],
    color: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    title: 'AutoPilot CRM',
    category: 'Automation System',
    description:
      'Intelligent CRM automation that captures leads from multiple channels, scores them with AI, and triggers personalized outreach sequences. Reduced manual work by 80%.',
    image: '/project-2.jpg',
    metrics: [
      { icon: Clock, value: '80%', label: 'Time Saved' },
      { icon: BarChart3, value: '3x', label: 'Conversion Rate' },
      { icon: Users, value: '25+', label: 'Teams Using' },
    ],
    tags: ['Node.js', 'Make', 'SendGrid', 'MongoDB'],
    color: 'from-teal-500/20 to-cyan-500/20',
  },
  {
    title: 'DataSync Hub',
    category: 'API Integration',
    description:
      'A real-time data synchronization platform connecting Shopify, HubSpot, and QuickBooks. Automated inventory, customer, and financial data sync across all platforms.',
    image: '/project-3.jpg',
    metrics: [
      { icon: Clock, value: '40hrs/mo', label: 'Manual Work Saved' },
      { icon: BarChart3, value: '99.9%', label: 'Uptime' },
      { icon: DollarSign, value: '$15K/yr', label: 'Cost Reduction' },
    ],
    tags: ['Python', 'REST APIs', 'Webhooks', 'Redis'],
    color: 'from-emerald-600/20 to-green-500/20',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Results() {
  return (
    <section id="results" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-3">
            Portfolio
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Real Projects.{' '}
            <span className="text-gradient">Real Results.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Here are some of the projects I&apos;ve delivered. Each one solved a real business problem
            and delivered measurable outcomes for the client.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={card}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="grid gap-0 lg:grid-cols-5">
                {/* Image / Visual */}
                <div className={`relative lg:col-span-2 min-h-[200px] bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                  <div className="text-6xl font-black text-primary/20 group-hover:text-primary/30 transition-colors">
                    {project.title.charAt(0)}
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 lg:col-span-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">{project.title}</h3>
                      <p className="mt-2 text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <div className="hidden sm:flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border/60 text-muted-foreground group-hover:text-primary group-hover:border-primary/30 transition-colors">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="mt-6 flex flex-wrap gap-4 sm:gap-6">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="flex items-center gap-2">
                        <metric.icon className="h-4 w-4 text-primary" />
                        <div>
                          <div className="text-sm font-semibold">{metric.value}</div>
                          <div className="text-xs text-muted-foreground">{metric.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs font-normal border-border/60"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
