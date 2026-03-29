'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  FolderKanban,
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

interface Project {
  id: string;
  title: string;
  title_en: string;
  title_ar: string;
  category: string;
  category_en: string;
  category_ar: string;
  description: string;
  description_en: string;
  description_ar: string;
  imageUrl: string;
  metrics: string;
  tags: string;
  tags_en: string;
  tags_ar: string;
  color: string;
  featured: boolean;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

const emptyForm = {
  title: '',
  title_en: '',
  title_ar: '',
  category: '',
  category_en: '',
  category_ar: '',
  description: '',
  description_en: '',
  description_ar: '',
  imageUrl: '',
  metrics: '[]',
  tags: '[]',
  tags_en: '[]',
  tags_ar: '[]',
  color: 'from-emerald-500/20 to-teal-500/20',
  featured: false,
  order: 0,
  active: true,
};

export default function AdminProjectsPage() {
  const { t, locale } = useLocale();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [formTab, setFormTab] = useState<'en' | 'ar'>('en');

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      }
    } catch {
      toast({ title: t('admin_error_generic'), description: t('admin_error_fetch'), variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormTab('en');
    setDialogOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditingId(project.id);
    setForm({
      title: project.title ?? '',
      title_en: project.title_en ?? '',
      title_ar: project.title_ar ?? '',
      category: project.category ?? '',
      category_en: project.category_en ?? '',
      category_ar: project.category_ar ?? '',
      description: project.description ?? '',
      description_en: project.description_en ?? '',
      description_ar: project.description_ar ?? '',
      imageUrl: project.imageUrl ?? '',
      metrics: project.metrics ?? '[]',
      tags: project.tags ?? '[]',
      tags_en: project.tags_en ?? '[]',
      tags_ar: project.tags_ar ?? '[]',
      color: project.color ?? 'from-emerald-500/20 to-teal-500/20',
      featured: project.featured ?? false,
      order: project.order ?? 0,
      active: project.active ?? true,
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
        ? `/api/admin/projects/${editingId}`
        : '/api/admin/projects';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast({ title: t('admin_projects') + ' ' + (editingId ? t('admin_update').toLowerCase() : t('admin_create').toLowerCase()), description: t('admin_saved') });
        setDialogOpen(false);
        fetchProjects();
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
      const res = await fetch(`/api/admin/projects/${deletingId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        toast({ title: t('admin_projects') + ' ' + t('admin_removed') });
        setDeleteDialogOpen(false);
        setDeletingId(null);
        fetchProjects();
      } else {
        toast({ title: t('admin_error_generic'), description: t('admin_error_delete'), variant: 'destructive' });
      }
    } catch {
      toast({ title: t('admin_error_generic'), description: t('admin_error_generic'), variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const getDisplayTitle = (project: Project) => {
    if (locale === 'ar') return project.title_ar || project.title || project.title_en;
    return project.title_en || project.title || project.title_ar;
  };

  const getDisplayCategory = (project: Project) => {
    if (locale === 'ar') return project.category_ar || project.category || project.category_en;
    return project.category_en || project.category || project.category_ar;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <FolderKanban className="size-6 text-primary" />
            {t('admin_projects')}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t('admin_projects_desc')}
          </p>
        </div>
        <Button onClick={openCreate} className="shrink-0">
          <Plus className="size-4 me-2" />
          {t('admin_add_project')}
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg bg-background">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <FolderKanban className="size-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">{t('admin_no_projects')}</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[180px]">{t('admin_title')}</TableHead>
                <TableHead>{t('admin_category')}</TableHead>
                <TableHead className="text-center">{t('admin_featured')}</TableHead>
                <TableHead className="text-center">{t('admin_active')}</TableHead>
                <TableHead className="text-center">{t('admin_order')}</TableHead>
                <TableHead className="text-end">{t('admin_actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{getDisplayTitle(project)}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{getDisplayCategory(project)}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {project.featured && (
                      <Star className="size-4 text-amber-500 mx-auto fill-amber-500" />
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={project.active ? 'default' : 'outline'}>
                      {project.active ? t('admin_active') : t('admin_inactive')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground">
                    {project.order}
                  </TableCell>
                  <TableCell className="text-end">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        onClick={() => openEdit(project)}
                      >
                        <Pencil className="size-3.5" />
                        <span className="sr-only">{t('admin_edit')}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-destructive hover:text-destructive"
                        onClick={() => openDelete(project.id)}
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>
                {editingId ? t('admin_edit_project') : t('admin_add_project')}
              </DialogTitle>
              <LanguageTabs activeTab={formTab} onTabChange={setFormTab} />
            </div>
            <DialogDescription>
              {editingId
                ? t('admin_update_project_desc')
                : t('admin_create_project_desc')}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            {formTab === 'en' ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title_en">{t('admin_title')} (English) *</Label>
                    <Input
                      id="title_en"
                      value={form.title_en ?? ''}
                      onChange={(e) => setForm({ ...form, title_en: e.target.value })}
                      placeholder="Project title"
                      dir="ltr"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category_en">{t('admin_category')} (English) *</Label>
                    <Input
                      id="category_en"
                      value={form.category_en ?? ''}
                      onChange={(e) => setForm({ ...form, category_en: e.target.value })}
                      placeholder="e.g. SaaS, Web App"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description_en">{t('admin_description')} (English) *</Label>
                  <Textarea
                    id="description_en"
                    value={form.description_en ?? ''}
                    onChange={(e) => setForm({ ...form, description_en: e.target.value })}
                    placeholder="Project description"
                    rows={3}
                    dir="ltr"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags_en">{t('admin_tags')} (English)</Label>
                  <Textarea
                    id="tags_en"
                    value={form.tags_en ?? ''}
                    onChange={(e) => setForm({ ...form, tags_en: e.target.value })}
                    placeholder='["Next.js", "TypeScript", "Prisma"]'
                    rows={2}
                    className="font-mono text-xs"
                    dir="ltr"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title_ar">{t('admin_title')} (العربية) *</Label>
                    <Input
                      id="title_ar"
                      value={form.title_ar ?? ''}
                      onChange={(e) => setForm({ ...form, title_ar: e.target.value })}
                      placeholder="عنوان المشروع"
                      dir="rtl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category_ar">{t('admin_category')} (العربية) *</Label>
                    <Input
                      id="category_ar"
                      value={form.category_ar ?? ''}
                      onChange={(e) => setForm({ ...form, category_ar: e.target.value })}
                      placeholder="مثال: تطبيق ويب، SaaS"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description_ar">{t('admin_description')} (العربية) *</Label>
                  <Textarea
                    id="description_ar"
                    value={form.description_ar ?? ''}
                    onChange={(e) => setForm({ ...form, description_ar: e.target.value })}
                    placeholder="وصف المشروع"
                    rows={3}
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags_ar">{t('admin_tags')} (العربية)</Label>
                  <Textarea
                    id="tags_ar"
                    value={form.tags_ar ?? ''}
                    onChange={(e) => setForm({ ...form, tags_ar: e.target.value })}
                    placeholder='["Next.js", "TypeScript", "Prisma"]'
                    rows={2}
                    className="font-mono text-xs"
                    dir="rtl"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="imageUrl">{t('admin_image_url')}</Label>
              <Input
                id="imageUrl"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                placeholder="https://example.com/image.png"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="metrics">{t('admin_metrics')}</Label>
              <Textarea
                id="metrics"
                value={form.metrics}
                onChange={(e) => setForm({ ...form, metrics: e.target.value })}
                placeholder='["100+ Users", "99.9% Uptime"]'
                rows={2}
                className="font-mono text-xs"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="color">{t('admin_color')}</Label>
                <Input
                  id="color"
                  value={form.color}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                  placeholder="from-emerald-500/20 to-teal-500/20"
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
                <Label>{t('admin_featured')}</Label>
                <p className="text-xs text-muted-foreground">
                  {t('admin_featured_desc')}
                </p>
              </div>
              <Switch
                checked={form.featured}
                onCheckedChange={(checked) => setForm({ ...form, featured: checked })}
              />
            </div>

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
            <Button onClick={handleSave} disabled={saving || !form.title_en || !form.category_en}>
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
            <AlertDialogTitle>{t('admin_delete_project')}</AlertDialogTitle>
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
