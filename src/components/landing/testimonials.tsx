'use client';

import { motion } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'CEO, TechForward',
    initials: 'SM',
    content:
      'Working with this developer was a game-changer for our startup. They built our entire SaaS platform from scratch in just 8 weeks — authentication, billing, dashboards, everything. The code quality is exceptional and the architecture is scalable enough for our next phase of growth. We went from idea to paying customers faster than we ever thought possible.',
    rating: 5,
  },
  {
    name: 'James Rodriguez',
    role: 'COO, ScaleOps',
    initials: 'JR',
    content:
      'The automation workflows they built saved our operations team over 40 hours per week. From lead routing to data sync across our CRM and accounting tools, everything runs seamlessly now. The ROI was visible within the first month. I highly recommend them for any automation project — they truly understand how businesses operate.',
    rating: 5,
  },
  {
    name: 'Emily Chen',
    role: 'Founder, GrowthLab',
    initials: 'EC',
    content:
      'We needed a custom API integration between Shopify, HubSpot, and our internal systems. The solution was delivered ahead of schedule, with thorough documentation and clean, maintainable code. Communication was excellent throughout — always responsive and proactive with suggestions. A truly professional experience from start to finish.',
    rating: 5,
  },
  {
    name: 'Michael Foster',
    role: 'CTO, DataPipe',
    initials: 'MF',
    content:
      'I\'ve worked with many freelancers over the years, and this developer stands out. Their technical expertise is deep, their communication is clear, and they deliver on time every single sprint. They built our data pipeline automation that processes millions of records daily without a hitch. Will definitely work together again on future projects.',
    rating: 5,
  },
  {
    name: 'Lisa Park',
    role: 'VP Product, NovaPay',
    initials: 'LP',
    content:
      'From the initial discovery call to the final launch, the process was smooth and transparent. They took our messy requirements and turned them into a clear, well-structured project plan. The MVP they delivered exceeded our expectations and helped us secure our Series A funding. Exceptional work and a pleasure to collaborate with.',
    rating: 5,
  },
  {
    name: 'David Kim',
    role: 'Founder, AutomateHQ',
    initials: 'DK',
    content:
      'They built a complete workflow automation platform for our agency that handles client onboarding, project tracking, invoicing, and reporting. It replaced 5 different tools we were using. The attention to detail and understanding of our business needs was remarkable. This is not just a coder — this is a true technology partner.',
    rating: 5,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Trusted by{' '}
            <span className="text-gradient">Founders & Teams</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Don&apos;t just take my word for it — hear from the founders, executives,
            and teams I&apos;ve helped build and grow their products.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={item}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl border border-border/60 bg-card/50 p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-border/60">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
