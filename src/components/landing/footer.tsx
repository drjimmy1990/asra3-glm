'use client';

import { Separator } from '@/components/ui/separator';
import { Zap } from 'lucide-react';
import { useLocale } from '@/lib/i18n';

export function Footer() {
  const { t } = useLocale();

  const footerLinks = {
    services: [
      { label: t('footer_saas'), href: '#services' },
      { label: t('footer_automation'), href: '#services' },
      { label: t('footer_integrations'), href: '#services' },
      { label: t('footer_mvp'), href: '#services' },
    ],
    company: [
      { label: t('footer_process'), href: '#process' },
      { label: t('footer_portfolio'), href: '#results' },
      { label: t('footer_testimonials'), href: '#testimonials' },
      { label: t('footer_advantages'), href: '#advantages' },
    ],
    resources: [
      { label: t('footer_faq'), href: '#faq' },
      { label: t('footer_contact'), href: '#contact' },
    ],
  };

  return (
    <footer className="border-t border-border/40 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <a href="#" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Zap className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold">
                asra3<span className="text-primary">.com</span>
              </span>
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
