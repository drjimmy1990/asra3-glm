import type { Metadata } from 'next';
import { getSiteData } from '@/lib/get-site-data';
import { HomeClient } from '@/components/landing/home-client';
import { PersonSchema } from '@/components/seo/person-schema';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://asra3.com';

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomeProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  const title = isAr
    ? 'asra3.com | حلول SaaS والأتمتة الذكية'
    : 'asra3.com | SaaS & Automation Solutions';

  const description = isAr
    ? 'أبني منتجات SaaS عالية الأداء وحلول أتمتة ذكية توفر وقت عملك وتقلل التكاليف وتحقق نمواً قابلاً للتوسع.'
    : 'I build high-performance SaaS products and intelligent automation solutions that save your business time, reduce costs, and drive scalable growth.';

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        en: `${BASE_URL}/en`,
        ar: `${BASE_URL}/ar`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}`,
      type: 'website',
      locale: isAr ? 'ar_SA' : 'en_US',
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/og-image.png`],
    },
  };
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  const validLocale = locale === 'ar' ? 'ar' : 'en';
  const data = await getSiteData(validLocale);

  return (
    <>
      <PersonSchema />
      <HomeClient initialData={data} initialLocale={validLocale} />
    </>
  );
}
