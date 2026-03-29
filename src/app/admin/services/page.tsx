'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Cog,
  Code2,
  Workflow,
  Puzzle,
  Rocket,
  Database,
  Globe,
  Shield,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { useLocale } from '@/lib/i18n';
import { LanguageTabs } from '@/components/admin/language-tabs';

interface Service {
  id: string;
  iconName: string;
  title: string;
  title_en: string;
  title_ar: string;
  description: string;
  description_en: string;
  description_ar: string;
  features: string;
  features_en: string;
  features_ar: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

const iconOptions = [
  { value: 'Code2', label: 'Code', icon: Code2 },
  { value: 'Workflow', label: 'Workflow', icon: Workflow },
  { value: 'Puzzle', label: 'Puzzle', icon: Puzzle },
  { value: 'Rocket', label: 'Rocket', icon: Rocket },
  { value: 'Database', label: 'Database', icon: Database },
  { value: 'Globe', label: 'Globe', icon: Globe },
  { value: 'Shield', label: 'Shield', icon: Shield },
  { value: 'Layers', label: 'Layers', icon: Layers },
];

const emptyForm = {
  iconName: 'Code2',
  title: '',
  title_en: '',
  title_ar: '',
  description: '',
  description_en: '',
  description_ar: '',
  features: '[]',
  features_en: '[]',
  features_ar: '[]',
  order: 0,
  active: true,
};

export default function AdminServicesPage() {
  const { t, locale } = useLocale();
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [formTab, setFormTab] = useState<'en' | 'ar'>('en');

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/services');
      if (res.ok) {
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      }
    } catch {
      toast({ title: t('admin_error_generic'), description: t('admin_error_fetch'), variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormTab('en');
    setDialogOpen(true);
  };

  const openEdit = (item: Service) => {
    setEditingId(item.id);
    setForm({
      iconName: item.iconName,
      title: item.title,
      title_en: item.title_en,
      title_ar: item.title_ar,
      description: item.description,
      description_en: item.description_en,
      description_ar: item.description_ar,
      features: item.features,
      features_en: item.features_en,
      features_ar: item.features_ar,
      order: item.order,
      active: item.active,
    });
    setFormTab('en');
    setDialogOpen(true);
  };

  const openDelete = (id: string) => {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = editingId
        ? `/api/admin/services/${editingId}`
        : '/api/admin/services';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast({ title: t('admin_services') + ' ' + (editingId ? t('admin_update').toLowerCase() : t('admin_create').toLowerCase()), description: t('admin_saved') });
        setDialogOpen(false);
        fetchItems();
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

  const handleDelete = async () => {
    if (!deletingId) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/services/${deletingId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        toast({ title: t('admin_services') + ' ' + t('admin_removed') });
        setDeleteDialogOpen(false);
        setDeletingId(null);
        fetchItems();
      } else {
        toast({ title: t('admin_error_generic'), description: t('admin_error_delete'), variant: 'destructive' });
      }
    } catch {
      toast({ title: t('admin_error_generic'), description: t('admin_error_generic'), variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const getIconComponent = (iconName: string) => {
    const found = iconOptions.find((o) => o.value === iconName);
    if (found) {
      const IconComp = found.icon;
      return <IconComp className="size-4" />;
    }
    return <Cog className="size-4" />;
  };

  const getDisplayTitle = (item: Service) => {
    if (locale === 'ar') return item.title_ar || item.title || item.title_en;
    return item.title_en || item.title || item.title_ar;
  };

  const getDisplayDescription = (item: Service) => {
    if (locale === 'ar') return item.description_ar || item.description || item.description_en;
    return item.description_en || item.description || item.description_ar;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Cog className="size-6 text-primary" />
            {t('admin_services')}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t('admin_services_desc')}
          </p>
        </div>
        <Button onClick={openCreate} className="shrink-0">
          <Plus className="size-4 me-2" />
          {t('admin_add_service')}
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg bg-background">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Cog className="size-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">{t('admin_no_services')}</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[180px]">{t('admin_title')}</TableHead>
                <TableHead>{t('admin_icon')}</TableHead>
                <TableHead className="min-w-[200px]">{t('admin_description')}</TableHead>
                <TableHead className="text-center">{t('admin_active')}</TableHead>
                <TableHead className="text-center">{t('admin_order')}</TableHead>
                <TableHead className="text-end">{t('admin_actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{getDisplayTitle(item)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getIconComponent(item.iconName)}
                      <span className="text-xs text-muted-foreground">{item.iconName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[250px] truncate text-muted-foreground text-xs">
                    {getDisplayDescription(item)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={item.active ? 'default' : 'outline'}>
                      {item.active ? t('admin_active') : t('admin_inactive')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground">
                    {item.order}
                  </TableCell>
                  <TableCell className="text-end">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        onClick={() => openEdit(item)}
                      >
                        <Pencil className="size-3.5" />
                        <span className="sr-only">{t('admin_edit')}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-destructive hover:text-destructive"
                        onClick={() => openDelete(item.id)}
                      >
                        <Trash2 className="size-3.5" />
                        <span className="sr-only">{t('admin_delete')}</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>
                {editingId ? t('admin_edit_service') : t('admin_add_service')}
              </DialogTitle>
              <LanguageTabs activeTab={formTab} onTabChange={setFormTab} />
            </div>
            <DialogDescription>
              {editingId
                ? t('admin_update_service_desc')
                : t('admin_create_service_desc')}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="iconName">{t('admin_icon')}</Label>
                <Select
                  value={form.iconName}
                  onValueChange={(value) => setForm({ ...form, iconName: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        <span className="flex items-center gap-2">
                          <opt.icon className="size-4" />
                          {opt.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">{t('admin_order')}</Label>
                <Input
                  id="order"
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            {formTab === 'en' ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="title_en">{t('admin_title')} (English) *</Label>
                  <Input
                    id="title_en"
                    value={form.title_en}
                    onChange={(e) => setForm({ ...form, title_en: e.target.value })}
                    placeholder="Service title"
                    dir="ltr"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description_en">{t('admin_description')} (English) *</Label>
                  <Textarea
                    id="description_en"
                    value={form.description_en}
                    onChange={(e) => setForm({ ...form, description_en: e.target.value })}
                    placeholder="Service description"
                    rows={3}
                    dir="ltr"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="features_en">{t('admin_features')} (English)</Label>
                  <Textarea
                    id="features_en"
                    value={form.features_en}
                    onChange={(e) => setForm({ ...form, features_en: e.target.value })}
                    placeholder='["Custom SaaS Development", "API Integration"]'
                    rows={3}
                    className="font-mono text-xs"
                    dir="ltr"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="title_ar">{t('admin_title')} (العربية) *</Label>
                  <Input
                    id="title_ar"
                    value={form.title_ar}
                    onChange={(e) => setForm({ ...form, title_ar: e.target.value })}
                    placeholder="عنوان الخدمة"
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description_ar">{t('admin_description')} (العربية) *</Label>
                  <Textarea
                    id="description_ar"
                    value={form.description_ar}
                    onChange={(e) => setForm({ ...form, description_ar: e.target.value })}
                    placeholder="وصف الخدمة"
                    rows={3}
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="features_ar">{t('admin_features')} (العربية)</Label>
                  <Textarea
                    id="features_ar"
                    value={form.features_ar}
                    onChange={(e) => setForm({ ...form, features_ar: e.target.value })}
                    placeholder='["تطوير SaaS مخصص", "تكامل API"]'
                    rows={3}
                    className="font-mono text-xs"
                    dir="rtl"
                  />
                </div>
              </>
            )}

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{t('admin_active')}</Label>
                <p className="text-xs text-muted-foreground">
                  {t('admin_show_public')}
                </p>
              </div>
              <Switch
                checked={form.active}
                onCheckedChange={(checked) => setForm({ ...form, active: checked })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              {t('admin_cancel')}
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving || !form.title_en || !form.description_en}
            >
              {saving ? (
                <>
                  <Loader2 className="size-4 animate-spin me-2" />
                  {t('admin_saving')}
                </>
              ) : editingId ? (
                t('admin_update')
              ) : (
                t('admin_create')
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('admin_delete_service')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('admin_delete_confirm')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('admin_cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={saving}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {saving ? (
                <>
                  <Loader2 className="size-4 animate-spin me-2" />
                  {t('admin_deleting')}
                </>
              ) : (
                t('admin_delete')
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
