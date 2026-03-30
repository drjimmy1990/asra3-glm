'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, Zap, Sun, Moon, Globe, BookOpen } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useLocale } from '@/lib/i18n';
import Link from 'next/link';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { locale, setLocale, t, isRTL } = useLocale();
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    const timer = requestAnimationFrame(() => setMounted(true));
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(timer);
    };
  }, []);

  const navLinks = [
    { label: t('nav_services'), href: '#services' },
    { label: t('nav_process'), href: '#process' },
    { label: t('nav_results'), href: '#results' },
    { label: t('nav_testimonials'), href: '#testimonials' },
    { label: t('nav_advantages'), href: '#advantages' },
    { label: t('nav_faq'), href: '#faq' },
  ];

  const toggleLocale = () => setLocale(locale === 'en' ? 'ar' : 'en');

  return (
    <header
      className={`fixed top-0 start-0 end-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg shadow-primary/5' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-110">
            <Zap className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold">
            asra3<span className="text-primary">.com</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/blog"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent flex items-center gap-1.5"
          >
            <BookOpen className="size-3.5" />
            {isRTL ? 'المدونة' : 'Blog'}
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2">
          {mounted && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLocale}
                className="size-9 text-muted-foreground hover:text-foreground"
                aria-label="Toggle language"
              >
                <Globe className="size-4" />
                <span className="text-[10px] font-bold ms-1">{locale === 'ar' ? 'EN' : 'ع'}</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="size-9 text-muted-foreground hover:text-foreground"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </Button>
            </>
          )}
          <a href="#contact">
            <Button className="btn-glow bg-primary text-primary-foreground hover:bg-primary/90 px-6">
              {t('nav_cta')}
            </Button>
          </a>
        </div>

        {/* Mobile Nav */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side={isRTL ? 'left' : 'right'} className="w-72">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/blog"
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent flex items-center gap-2"
              >
                <BookOpen className="size-4" />
                {isRTL ? 'المدونة' : 'Blog'}
              </Link>
              <div className="flex items-center gap-2 mt-4">
                <Button variant="ghost" size="sm" onClick={toggleLocale} className="text-muted-foreground hover:text-foreground">
                  <Globe className="size-4 me-1" />
                  {locale === 'ar' ? 'English' : 'العربية'}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="text-muted-foreground hover:text-foreground">
                  {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
                </Button>
              </div>
              <a href="#contact" onClick={() => setMobileOpen(false)} className="mt-4">
                <Button className="btn-glow bg-primary text-primary-foreground hover:bg-primary/90 w-full">
                  {t('nav_cta')}
                </Button>
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}

