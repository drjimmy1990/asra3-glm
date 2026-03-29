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

interface DashboardStats {
  projects: number;
  testimonials: number;
  services: number;
  faqs: number;
  contacts: number;
}

const statCards: {
  key: keyof DashboardStats;
  label: string;
  icon: React.ElementType;
  href: string;
  color: string;
  bgColor: string;
}[] = [
  {
    key: 'projects',
    label: 'Total Projects',
    icon: FolderKanban,
    href: '/admin/projects',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    key: 'testimonials',
    label: 'Active Testimonials',
    icon: MessageSquareQuote,
    href: '/admin/testimonials',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    key: 'services',
    label: 'Services',
    icon: Settings,
    href: '/admin/services',
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
  },
  {
    key: 'faqs',
    label: 'FAQs',
    icon: HelpCircle,
    href: '/admin/faqs',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  {
    key: 'contacts',
    label: 'Messages',
    icon: Mail,
    href: '/admin/contacts',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
  },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    testimonials: 0,
    services: 0,
    faqs: 0,
    contacts: 0,
  });
  const [loading, setLoading] = useState(true);

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
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Overview of your site content
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
                    {card.label}
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
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => (
            <Link key={`action-${card.key}`} href={card.href}>
              <div className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                <card.icon className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium">Manage {card.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
