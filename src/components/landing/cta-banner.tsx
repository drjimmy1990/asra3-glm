'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';

export function CTABanner() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Orbs */}
      <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <Zap className="h-3.5 w-3.5" />
            Ready to Start?
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Let&apos;s Turn Your Vision Into{' '}
            <span className="text-gradient">Reality</span>
          </h2>

          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Whether you have a detailed spec or just a rough idea — I&apos;m here to help you
            build, automate, and scale. Book a free discovery call and let&apos;s explore
            what&apos;s possible.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact">
              <Button
                size="lg"
                className="btn-glow bg-primary text-primary-foreground hover:bg-primary/90 px-8 text-base font-semibold h-12"
              >
                Book Free Discovery Call
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            No commitment required. 100% confidential.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
