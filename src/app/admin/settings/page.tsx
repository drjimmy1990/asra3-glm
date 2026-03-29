'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { Settings, Loader2, Globe, BarChart3, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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
      toast({ title: 'Error', description: 'Failed to fetch settings', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, []);

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
        toast({ title: 'Settings saved', description: 'Your changes have been saved successfully.' });
      } else {
        const data = await res.json();
        toast({ title: 'Error', description: data.error || 'Failed to save settings', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Error', description: 'Something went wrong', variant: 'destructive' });
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
            Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Configure your site settings and preferences
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="shrink-0">
          {saving ? (
            <>
              <Loader2 className="size-4 animate-spin mr-2" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="size-4 text-primary" />
            <CardTitle className="text-base">General</CardTitle>
          </div>
          <CardDescription>
            Basic site information displayed across all pages
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="site_name">Site Name</Label>
              <Input
                id="site_name"
                value={settings.site_name}
                onChange={(e) => updateSetting('site_name', e.target.value)}
                placeholder="asra3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site_tagline">Site Tagline</Label>
              <Input
                id="site_tagline"
                value={settings.site_tagline}
                onChange={(e) => updateSetting('site_tagline', e.target.value)}
                placeholder="SaaS & Automation Solutions"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact_email">Contact Email</Label>
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
            <CardTitle className="text-base">Hero Section</CardTitle>
          </div>
          <CardDescription>
            Main headline and subtitle shown on the homepage hero
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="hero_title">Hero Title</Label>
            <Input
              id="hero_title"
              value={settings.hero_title}
              onChange={(e) => updateSetting('hero_title', e.target.value)}
              placeholder="Build Smarter. Ship Faster. Scale Better."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero_subtitle">Hero Subtitle</Label>
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
            <CardTitle className="text-base">Hero Stats</CardTitle>
          </div>
          <CardDescription>
            Statistics displayed in the hero section bar
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`hero_stat_${i}_value`}>Stat {i} Value</Label>
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
                  <Label htmlFor={`hero_stat_${i}_label`}>Stat {i} Label</Label>
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
            <CardTitle className="text-base">Security</CardTitle>
          </div>
          <CardDescription>
            Change your admin password
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2 max-w-md">
            <Label htmlFor="admin_password">Admin Password</Label>
            <Input
              id="admin_password"
              type="password"
              value={settings.admin_password}
              onChange={(e) => updateSetting('admin_password', e.target.value)}
              placeholder="Leave blank to keep current password"
            />
            <p className="text-xs text-muted-foreground">
              Enter a new password to change it. Leave blank to keep the current one.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Save */}
      <div className="flex justify-end pb-4">
        <Button onClick={handleSave} disabled={saving} size="lg">
          {saving ? (
            <>
              <Loader2 className="size-4 animate-spin mr-2" />
              Saving...
            </>
          ) : (
            'Save All Settings'
          )}
        </Button>
      </div>
    </div>
  );
}
