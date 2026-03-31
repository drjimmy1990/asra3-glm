import type { Metadata } from 'next';
import BlogListClient from './page-client';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://asra3.com';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  const title = isAr ? 'المدونة | asra3.com' : 'Blog | asra3.com';
  const description = isAr
    ? 'مقالات عن الأتمتة، الذكاء الاصطناعي، تطوير الساس، وأفضل الممارسات التقنية من asra3.com'
    : 'Articles about automation, AI, SaaS development, and tech best practices from asra3.com';

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog`,
      languages: {
        en: `${BASE_URL}/en/blog`,
        ar: `${BASE_URL}/ar/blog`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/blog`,
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

export default async function BlogPage({ params }: PageProps) {
  // Locale is read client-side by BlogListClient via useParams
  return <BlogListClient />;
}
