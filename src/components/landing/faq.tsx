'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What types of SaaS projects do you work on?',
    answer:
      'I work on a wide range of SaaS projects, from early-stage MVPs for startups to scaling production applications. This includes subscription-based platforms, marketplace applications, analytics dashboards, internal tools, and B2B/B2C products. I typically build with modern stacks like Next.js, Node.js, PostgreSQL, and cloud services. Whether you need a complete product built from scratch or want to enhance an existing application, I can help.',
  },
  {
    question: 'How do your automation projects work?',
    answer:
      'My automation projects typically start with a thorough analysis of your current workflows to identify bottlenecks and repetitive tasks. I then design and implement automated solutions using tools like Make, Zapier, custom scripts, and API integrations. Common automations include lead routing, data synchronization between tools, automated email sequences, report generation, and CRM workflows. Everything is documented and easy for your team to manage going forward.',
  },
  {
    question: 'What is your typical project timeline?',
    answer:
      'Timelines vary based on project scope. A simple automation workflow can be delivered in 1-2 weeks. An MVP SaaS product typically takes 4-8 weeks. Larger, more complex projects with custom features, integrations, and advanced functionality can take 8-16 weeks. During our discovery call, I will provide a detailed timeline with clear milestones so you know exactly what to expect at every stage of the project.',
  },
  {
    question: 'Do you provide ongoing support after launch?',
    answer:
      'Yes, absolutely. All my projects come with post-launch support. The Starter package includes 1 week of support, Growth includes 30 days, and Enterprise includes ongoing maintenance as part of the retainer. I also offer separate support packages for clients who need long-term maintenance, feature additions, performance monitoring, and technical consulting beyond the initial project scope.',
  },
  {
    question: 'How do payments and contracts work?',
    answer:
      'I work with a simple, transparent process. After our discovery call and project scoping, I provide a detailed proposal with clear deliverables, timeline, and cost breakdown. Payment is typically structured in milestones — 40% upfront to begin work, 30% at the midpoint review, and 30% upon project completion and delivery. For longer engagements, we can set up monthly billing. All projects include a clear scope document to ensure we are aligned.',
  },
  {
    question: 'Can you work with my existing tech stack?',
    answer:
      'In most cases, yes. I am proficient in a wide range of technologies and frameworks including React, Next.js, Node.js, Python, PostgreSQL, MongoDB, AWS, Google Cloud, and more. If you have an existing codebase, I can review it and work within your architecture. During the discovery phase, I will assess your current setup and recommend the best approach — whether that means working with your existing stack or suggesting improvements for better scalability and maintainability.',
  },
  {
    question: 'What does the discovery call include?',
    answer:
      'The discovery call is a free 30-minute consultation where we discuss your business goals, project requirements, and technical needs. I will ask questions about your target users, current challenges, desired features, timeline, and budget. By the end of the call, you will have a clear understanding of how I can help, what the recommended approach would be, and approximate timeline and cost estimates. There is no obligation to proceed.',
  },
  {
    question: 'Do you sign NDAs?',
    answer:
      'Yes, I am happy to sign NDAs and any other confidentiality agreements before we discuss your project details. I take data security and client confidentiality very seriously. All project communications, code repositories, and documentation are handled with strict privacy measures. I am also experienced working with enterprise clients who require additional security protocols and compliance measures.',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

export function FAQ() {
  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-3">
            FAQ
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Frequently Asked{' '}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Everything you need to know about working together.
            Can&apos;t find what you&apos;re looking for? Reach out directly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-xl border border-border/60 bg-card/50 px-6 transition-colors data-[state=open]:border-primary/30 data-[state=open]:bg-primary/5"
              >
                <AccordionTrigger className="text-left text-sm sm:text-base font-semibold hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
