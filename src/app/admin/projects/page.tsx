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

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  metrics: string;
  tags: string;
  color: string;
  featured: boolean;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

const emptyForm = {
  title: '',
  category: '',
  description: '',
  imageUrl: '',
  metrics: '[]',
  tags: '[]',
  color: 'from-emerald-500/20 to-teal-500/20',
  featured: false,
  order: 0,
  active: true,
};

export default function AdminProjectsPage() {
  const { t } = useLocale();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);

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
    setDialogOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditingId(project.id);
    setForm({
      title: project.title,
      category: project.category,
      description: project.description,
      imageUrl: project.imageUrl,
      metrics: project.metrics,
      tags: project.tags,
      color: project.color,
      featured: project.featured,
      order: project.order,
      active: project.active,
    });
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
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{project.category}</Badge>
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
            <DialogTitle>
              {editingId ? t('admin_edit_project') : t('admin_add_project')}
            </DialogTitle>
            <DialogDescription>
              {editingId
                ? t('admin_update_project_desc')
                : t('admin_create_project_desc')}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">{t('admin_title')} *</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Project title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">{t('admin_category')} *</Label>
                <Input
                  id="category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="e.g. SaaS, Web App"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{t('admin_description')} *</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Project description"
                rows={3}
              />
            </div>

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

            <div className="space-y-2">
              <Label htmlFor="tags">{t('admin_tags')}</Label>
              <Textarea
                id="tags"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder='["Next.js", "TypeScript", "Prisma"]'
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
            <Button onClick={handleSave} disabled={saving || !form.title || !form.category}>
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
