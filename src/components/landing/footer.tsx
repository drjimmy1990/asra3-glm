'use client';

import { usePathname } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { Zap, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { useLocale } from '@/lib/i18n';
import { Logo } from '@/components/ui/logo';

export function Footer() {
  const { t, isRTL } = useLocale();
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  // Prefix anchor links with '/' when not on homepage so they navigate back
  const href = (anchor: string) => isHomepage ? anchor : `/${anchor}`;

  const footerLinks = {
    services: [
      { label: t('footer_saas'), href: href('#services') },
      { label: t('footer_automation'), href: href('#services') },
      { label: t('footer_integrations'), href: href('#services') },
      { label: t('footer_mvp'), href: href('#services') },
    ],
    company: [
      { label: t('footer_process'), href: href('#process') },
      { label: t('footer_portfolio'), href: href('#results') },
      { label: t('footer_testimonials'), href: href('#testimonials') },
      { label: t('footer_advantages'), href: href('#advantages') },
    ],
    resources: [
      { label: t('footer_faq'), href: href('#faq') },
      { label: t('footer_contact'), href: href('#contact') },
      { label: isRTL ? 'المدونة' : 'Blog', href: '/blog' },
    ],
  };

  return (
    <footer className="border-t border-border/40 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <a href="/" className="flex items-center">
              <Logo />
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t('footer_brand_desc')}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">{t('footer_services')}</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">{t('footer_company')}</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">{t('footer_resources')}</h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-border/40" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {t('footer_copyright')}
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{t('footer_privacy')}</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{t('footer_terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
