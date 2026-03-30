import { getSiteData } from '@/lib/get-site-data';
import { cookies } from 'next/headers';
import { HomeClient } from '@/components/landing/home-client';

export default async function Home() {
  // Read locale from cookie or default to 'en'
  const cookieStore = await cookies();
  const locale = cookieStore.get('asra3-locale')?.value || 'en';

  // Fetch both languages for client-side switching, but prioritize current locale
  const data = await getSiteData(locale);

  return <HomeClient initialData={data} initialLocale={locale} />;
}
