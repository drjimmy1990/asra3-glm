'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { Settings, Loader2, Globe, BarChart3, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLocale } from '@/lib/i18n';

interface SiteSettings {
  site_name: string;
  site_tagline: string;
  hero_title: string;
  hero_subtitle: string;
  contact_email: string;
  hero_stat_1_value: string;
  hero_stat_1_label: string;
  hero_stat_2_value: string;
  hero_stat_2_label: string;
  hero_stat_3_value: string;
  hero_stat_3_label: string;
  hero_stat_4_value: string;
  hero_stat_4_label: string;
  admin_password: string;
}

const defaultSettings: SiteSettings = {
  site_name: '',
  site_tagline: '',
  hero_title: '',
  hero_subtitle: '',
  contact_email: '',
  hero_stat_1_value: '',
  hero_stat_1_label: '',
  hero_stat_2_value: '',
  hero_stat_2_label: '',
  hero_stat_3_value: '',
  hero_stat_3_label: '',
  hero_stat_4_value: '',
  hero_stat_4_label: '',
  admin_password: '',
};

export default function AdminSettingsPage() {
  const { t } = useLocale();
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings({ ...defaultSettings, ...data });
      }
    } catch {
      toast({ title: t('admin_error_generic'), description: t('admin_error_fetch'), variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        toast({ title: t('admin_settings') + ' ' + t('admin_saved').toLowerCase(), description: t('admin_saved') });
      } else {
        const data = await res.json();
        toast({ title: t('admin_error_generic'), description: data.error || t('admin_error_save'), variant: 'destructive' });
      }
    } catch {
      toast({ title: t('admin_error_generic'), description: t('admin_error_generic'), variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key: keyof SiteSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Settings className="size-6 text-primary" />
            {t('admin_settings')}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t('admin_settings_desc')}
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="shrink-0">
          {saving ? (
            <>
              <Loader2 className="size-4 animate-spin me-2" />
              {t('admin_saving')}
            </>
          ) : (
            t('admin_save')
          )}
        </Button>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="size-4 text-primary" />
            <CardTitle className="text-base">{t('admin_general')}</CardTitle>
          </div>
          <CardDescription>
            {t('admin_general_desc')}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="site_name">{t('admin_site_name')}</Label>
              <Input
                id="site_name"
                value={settings.site_name}
                onChange={(e) => updateSetting('site_name', e.target.value)}
                placeholder="asra3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site_tagline">{t('admin_site_tagline')}</Label>
              <Input
                id="site_tagline"
                value={settings.site_tagline}
                onChange={(e) => updateSetting('site_tagline', e.target.value)}
                placeholder="SaaS & Automation Solutions"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact_email">{t('admin_contact_email')}</Label>
            <Input
              id="contact_email"
              type="email"
              value={settings.contact_email}
              onChange={(e) => updateSetting('contact_email', e.target.value)}
              placeholder="hello@example.com"
            />
          </div>
        </CardContent>
      </Card>

      {/* Hero Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="size-4 text-primary" />
            <CardTitle className="text-base">{t('admin_hero_section')}</CardTitle>
          </div>
          <CardDescription>
            {t('admin_hero_section_desc')}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="hero_title">{t('admin_hero_title')}</Label>
            <Input
              id="hero_title"
              value={settings.hero_title}
              onChange={(e) => updateSetting('hero_title', e.target.value)}
              placeholder="Build Smarter. Ship Faster. Scale Better."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero_subtitle">{t('admin_hero_subtitle')}</Label>
            <Input
              id="hero_subtitle"
              value={settings.hero_subtitle}
              onChange={(e) => updateSetting('hero_subtitle', e.target.value)}
              placeholder="I transform your ideas into powerful SaaS products..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="size-4 text-primary" />
            <CardTitle className="text-base">{t('admin_hero_stats')}</CardTitle>
          </div>
          <CardDescription>
            {t('admin_hero_stats_desc')}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`hero_stat_${i}_value`}>{t('admin_stat_value')} {i}</Label>
                  <Input
                    id={`hero_stat_${i}_value`}
                    value={(settings as Record<string, string>)[`hero_stat_${i}_value`] || ''}
                    onChange={(e) =>
                      updateSetting(`hero_stat_${i}_value` as keyof SiteSettings, e.target.value)
                    }
                    placeholder="50+"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`hero_stat_${i}_label`}>{t('admin_stat_label')} {i}</Label>
                  <Input
                    id={`hero_stat_${i}_label`}
                    value={(settings as Record<string, string>)[`hero_stat_${i}_label`] || ''}
                    onChange={(e) =>
                      updateSetting(`hero_stat_${i}_label` as keyof SiteSettings, e.target.value)
                    }
                    placeholder="Projects Delivered"
                  />
                </div>
              </div>
              {i < 4 && <Separator className="mt-6" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="size-4 text-primary" />
            <CardTitle className="text-base">{t('admin_security')}</CardTitle>
          </div>
          <CardDescription>
            {t('admin_security_desc')}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2 max-w-md">
            <Label htmlFor="admin_password">{t('admin_password')}</Label>
            <Input
              id="admin_password"
              type="password"
              value={settings.admin_password}
              onChange={(e) => updateSetting('admin_password', e.target.value)}
              placeholder="Leave blank to keep current password"
            />
            <p className="text-xs text-muted-foreground">
              {t('admin_password_hint')}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Save */}
      <div className="flex justify-end pb-4">
        <Button onClick={handleSave} disabled={saving} size="lg">
          {saving ? (
            <>
              <Loader2 className="size-4 animate-spin me-2" />
              {t('admin_saving')}
            </>
          ) : (
            t('admin_save_all')
          )}
        </Button>
      </div>
    </div>
  );
}
