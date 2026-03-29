'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FolderKanban,
  MessageSquareQuote,
  Settings,
  HelpCircle,
  Loader2,
  TrendingUp,
  Mail,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useLocale } from '@/lib/i18n';

interface DashboardStats {
  projects: number;
  testimonials: number;
  services: number;
  faqs: number;
  contacts: number;
}

export default function AdminDashboardPage() {
  const { t } = useLocale();
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    testimonials: 0,
    services: 0,
    faqs: 0,
    contacts: 0,
  });
  const [loading, setLoading] = useState(true);

  const statCards: {
    key: keyof DashboardStats;
    labelKey: string;
    icon: React.ElementType;
    href: string;
    color: string;
    bgColor: string;
  }[] = [
    {
      key: 'projects',
      labelKey: 'admin_total_projects',
      icon: FolderKanban,
      href: '/admin/projects',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/50',
    },
    {
      key: 'testimonials',
      labelKey: 'admin_active_testimonials',
      icon: MessageSquareQuote,
      href: '/admin/testimonials',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/50',
    },
    {
      key: 'services',
      labelKey: 'admin_services',
      icon: Settings,
      href: '/admin/services',
      color: 'text-violet-600',
      bgColor: 'bg-violet-50 dark:bg-violet-950/50',
    },
    {
      key: 'faqs',
      labelKey: 'admin_faqs',
      icon: HelpCircle,
      href: '/admin/faqs',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 dark:bg-amber-950/50',
    },
    {
      key: 'contacts',
      labelKey: 'admin_messages',
      icon: Mail,
      href: '/admin/contacts',
      color: 'text-rose-600',
      bgColor: 'bg-rose-50 dark:bg-rose-950/50',
    },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, testimonialsRes, servicesRes, faqsRes, contactsRes] =
          await Promise.all([
            fetch('/api/admin/projects'),
            fetch('/api/admin/testimonials'),
            fetch('/api/admin/services'),
            fetch('/api/admin/faqs'),
            fetch('/api/admin/contacts'),
          ]);

        const [projects, testimonials, services, faqs, contacts] = await Promise.all([
          projectsRes.json(),
          testimonialsRes.json(),
          servicesRes.json(),
          faqsRes.json(),
          contactsRes.json(),
        ]);

        setStats({
          projects: Array.isArray(projects) ? projects.length : 0,
          testimonials: Array.isArray(testimonials) ? testimonials.length : 0,
          services: Array.isArray(services) ? services.length : 0,
          faqs: Array.isArray(faqs) ? faqs.length : 0,
          contacts: Array.isArray(contacts) ? contacts.length : 0,
        });
      } catch {
        // keep defaults
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <TrendingUp className="size-6 text-primary" />
          {t('admin_dashboard')}
        </h1>
        <p className="text-muted-foreground mt-1">
          {t('admin_dashboard_desc')}
        </p>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => (
            <Link key={card.key} href={card.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer group h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {t(card.labelKey as any)}
                  </CardTitle>
                  <div className={cn('rounded-lg p-2', card.bgColor)}>
                    <card.icon className={cn('size-4', card.color)} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold group-hover:text-primary transition-colors">
                    {stats[card.key]}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">{t('admin_quick_actions')}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => (
            <Link key={`action-${card.key}`} href={card.href}>
              <div className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                <card.icon className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium">{t('admin_manage')} {t(card.labelKey as any)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
