'use client';

import { motion } from 'framer-motion';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import { useSiteData, type FAQItem } from '@/hooks/use-site-data';

export function FAQ() {
  const { data } = useSiteData();
  const faqs: FAQItem[] = data?.faqs || [];

  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-3">FAQ</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Everything you need to know about working together. Can&apos;t find what you&apos;re looking for? Reach out directly.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.id}
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
