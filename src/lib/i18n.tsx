'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, type Locale, type TranslationKey } from './translations';

export type { Locale };

interface LocaleContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: TranslationKey) => string;
  dir: 'ltr' | 'rtl';
  isRTL: boolean;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: 'en',
  setLocale: () => {},
  t: (key) => key,
  dir: 'ltr',
  isRTL: false,
});

export function useLocale() {
  return useContext(LocaleContext);
}

export function LocaleProvider({
  children,
  defaultLocale,
}: {
  children: React.ReactNode;
  defaultLocale?: Locale;
}) {
  // Initialize with URL-provided locale (from [locale] segment) if available,
  // otherwise fall back to 'en'
  const [locale, setLocaleState] = useState<Locale>(defaultLocale || 'en');

  useEffect(() => {
    // If a defaultLocale was provided by the URL, trust it and persist it
    if (defaultLocale) {
      setLocaleState(defaultLocale);
      localStorage.setItem('asra3-locale', defaultLocale);
      document.cookie = `asra3-locale=${defaultLocale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
      return;
    }
    // Fallback: read from localStorage for pages without locale segment
    const saved = localStorage.getItem('asra3-locale') as Locale | null;
    if (saved === 'ar' || saved === 'en') {
      const timer = requestAnimationFrame(() => setLocaleState(saved));
      return () => cancelAnimationFrame(timer);
    }
  }, [defaultLocale]);

  useEffect(() => {
    const dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = locale;
    localStorage.setItem('asra3-locale', locale);
    document.cookie = `asra3-locale=${locale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
  }, []);

  const t = useCallback((key: TranslationKey): string => {
    const val = translations[locale][key];
    if (typeof val === 'string') return val;
    return key;
  }, [locale]);

  const dir = locale === 'ar' ? 'rtl' as const : 'ltr' as const;
  const isRTL = locale === 'ar';

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, dir, isRTL }}>
      {children}
    </LocaleContext.Provider>
  );
}
