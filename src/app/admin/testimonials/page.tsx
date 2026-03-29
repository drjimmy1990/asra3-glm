'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  MessageSquareQuote,
  Star,
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

interface Testimonial {
  id: string;
  name: string;
  name_en: string;
  name_ar: string;
  role: string;
  role_en: string;
  role_ar: string;
  content: string;
  content_en: string;
  content_ar: string;
  rating: number;
  active: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const emptyForm = {
  name: '',
  name_en: '',
  name_ar: '',
  role: '',
  role_en: '',
  role_ar: '',
  content: '',
  content_en: '',
  content_ar: '',
  rating: 5,
  order: 0,
  active: true,
};

export default function AdminTestimonialsPage() {
  const { t, locale } = useLocale();
  const [items, setItems] = useState<Testimonial[]>([]);
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
      const res = await fetch('/api/admin/testimonials');
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

  const openEdit = (item: Testimonial) => {
    setEditingId(item.id);
    setForm({
      name: item.name ?? '',
      name_en: item.name_en ?? '',
      name_ar: item.name_ar ?? '',
      role: item.role ?? '',
      role_en: item.role_en ?? '',
      role_ar: item.role_ar ?? '',
      content: item.content ?? '',
      content_en: item.content_en ?? '',
      content_ar: item.content_ar ?? '',
      rating: item.rating ?? 5,
      order: item.order ?? 0,
      active: item.active ?? true,
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
        ? `/api/admin/testimonials/${editingId}`
        : '/api/admin/testimonials';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast({ title: t('admin_testimonials') + ' ' + (editingId ? t('admin_update').toLowerCase() : t('admin_create').toLowerCase()), description: t('admin_saved') });
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
      const res = await fetch(`/api/admin/testimonials/${deletingId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        toast({ title: t('admin_testimonials') + ' ' + t('admin_removed') });
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

  const renderStars = (rating: number) => (
    <div className="flex items-center justify-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`size-3.5 ${
            i <= rating
              ? 'text-amber-500 fill-amber-500'
              : 'text-muted-foreground/30'
          }`}
        />
      ))}
    </div>
  );

  const getDisplayName = (item: Testimonial) => {
    if (locale === 'ar') return item.name_ar || item.name || item.name_en;
    return item.name_en || item.name || item.name_ar;
  };

  const getDisplayRole = (item: Testimonial) => {
    if (locale === 'ar') return item.role_ar || item.role || item.role_en;
    return item.role_en || item.role || item.role_ar;
  };

  const getDisplayContent = (item: Testimonial) => {
    if (locale === 'ar') return item.content_ar || item.content || item.content_en;
    return item.content_en || item.content || item.content_ar;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <MessageSquareQuote className="size-6 text-primary" />
            {t('admin_testimonials')}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t('admin_testimonials_desc')}
          </p>
        </div>
        <Button onClick={openCreate} className="shrink-0">
          <Plus className="size-4 me-2" />
          {t('admin_add_testimonial')}
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
            <MessageSquareQuote className="size-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">{t('admin_no_testimonials')}</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[160px]">{t('admin_name')}</TableHead>
                <TableHead className="min-w-[140px]">{t('admin_role')}</TableHead>
                <TableHead className="min-w-[200px]">{t('admin_content')}</TableHead>
                <TableHead className="text-center">{t('admin_rating')}</TableHead>
                <TableHead className="text-center">{t('admin_active')}</TableHead>
                <TableHead className="text-center">{t('admin_order')}</TableHead>
                <TableHead className="text-end">{t('admin_actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{getDisplayName(item)}</TableCell>
                  <TableCell className="text-muted-foreground">{getDisplayRole(item)}</TableCell>
                  <TableCell className="max-w-[250px] truncate text-muted-foreground text-xs">
                    {getDisplayContent(item)}
                  </TableCell>
                  <TableCell>{renderStars(item.rating)}</TableCell>
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
                {editingId ? t('admin_edit_testimonial') : t('admin_add_testimonial')}
              </DialogTitle>
              <LanguageTabs activeTab={formTab} onTabChange={setFormTab} />
            </div>
            <DialogDescription>
              {editingId
                ? t('admin_update_testimonial_desc')
                : t('admin_create_testimonial_desc')}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            {formTab === 'en' ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name_en">{t('admin_name')} (English) *</Label>
                    <Input
                      id="name_en"
                      value={form.name_en ?? ''}
                      onChange={(e) => setForm({ ...form, name_en: e.target.value })}
                      placeholder="Client name"
                      dir="ltr"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role_en">{t('admin_role')} (English) *</Label>
                    <Input
                      id="role_en"
                      value={form.role_en ?? ''}
                      onChange={(e) => setForm({ ...form, role_en: e.target.value })}
                      placeholder="e.g. CEO, Acme Inc."
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content_en">{t('admin_content')} (English) *</Label>
                  <Textarea
                    id="content_en"
                    value={form.content_en ?? ''}
                    onChange={(e) => setForm({ ...form, content_en: e.target.value })}
                    placeholder="What the client said about your work..."
                    rows={4}
                    dir="ltr"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name_ar">{t('admin_name')} (العربية) *</Label>
                    <Input
                      id="name_ar"
                      value={form.name_ar ?? ''}
                      onChange={(e) => setForm({ ...form, name_ar: e.target.value })}
                      placeholder="اسم العميل"
                      dir="rtl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role_ar">{t('admin_role')} (العربية) *</Label>
                    <Input
                      id="role_ar"
                      value={form.role_ar ?? ''}
                      onChange={(e) => setForm({ ...form, role_ar: e.target.value })}
                      placeholder="مثال: المدير التنفيذي، شركة إكس"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content_ar">{t('admin_content')} (العربية) *</Label>
                  <Textarea
                    id="content_ar"
                    value={form.content_ar ?? ''}
                    onChange={(e) => setForm({ ...form, content_ar: e.target.value })}
                    placeholder="ما قاله العميل عن عملك..."
                    rows={4}
                    dir="rtl"
                  />
                </div>
              </>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="rating">{t('admin_rating')}</Label>
                <Input
                  id="rating"
                  type="number"
                  min={1}
                  max={5}
                  value={form.rating}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      rating: Math.min(5, Math.max(1, parseInt(e.target.value) || 1)),
                    })
                  }
                />
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
              disabled={saving || !form.name_en || !form.content_en}
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
            <AlertDialogTitle>{t('admin_delete_testimonial')}</AlertDialogTitle>
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
