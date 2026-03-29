'use client';

import { Navbar } from '@/components/landing/navbar';
import { Hero } from '@/components/landing/hero';
import { TrustedBy } from '@/components/landing/trusted-by';
import { Services } from '@/components/landing/services';
import { Process } from '@/components/landing/process';
import { Results } from '@/components/landing/results';
import { Testimonials } from '@/components/landing/testimonials';
import { Advantages } from '@/components/landing/pricing';
import { FAQ } from '@/components/landing/faq';
import { Contact } from '@/components/landing/contact';
import { CTABanner } from '@/components/landing/cta-banner';
import { Footer } from '@/components/landing/footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustedBy />
        <Services />
        <Process />
        <Results />
        <Testimonials />
        <Advantages />
        <FAQ />
        <Contact />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
