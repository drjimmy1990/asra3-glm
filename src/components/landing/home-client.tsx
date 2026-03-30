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
import { useSiteData, type SiteData } from '@/hooks/use-site-data';
import { useEffect } from 'react';

interface HomeClientProps {
  initialData: SiteData;
  initialLocale: string;
}

/**
 * Client-side shell for the homepage.
 * Receives SSR-fetched data as props so content is available immediately.
 * Also uses useSiteData() which can re-fetch on locale change.
 */
export function HomeClient({ initialData, initialLocale }: HomeClientProps) {
  const { data: clientData } = useSiteData(initialData);
  const data = clientData || initialData;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero data={data} />
        <TrustedBy />
        <Services data={data} />
        <Process />
        <Results data={data} />
        <Testimonials data={data} />
        <Advantages />
        <FAQ data={data} />
        <Contact data={data} />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
