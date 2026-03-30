'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, type Locale, type TranslationKey } from './translations';

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

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const saved = localStorage.getItem('asra3-locale') as Locale | null;
    if (saved === 'ar' || saved === 'en') {
      // Defer state update to avoid synchronous setState in effect
      const timer = requestAnimationFrame(() => setLocaleState(saved));
      return () => cancelAnimationFrame(timer);
    }
  }, []);

  useEffect(() => {
    const dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = locale;
    localStorage.setItem('asra3-locale', locale);
    // Also set a cookie so Server Components can read the locale
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
