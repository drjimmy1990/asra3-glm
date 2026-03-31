import { notFound } from 'next/navigation';
import { type Locale, LocaleProvider } from '@/lib/i18n';

const LOCALES: Locale[] = ['en', 'ar'];

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale — return 404 for unknown locales (/de, /fr, etc.)
  if (!LOCALES.includes(locale as Locale)) {
    notFound();
  }

  return (
    <LocaleProvider defaultLocale={locale as Locale}>
      {children}
    </LocaleProvider>
  );
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
