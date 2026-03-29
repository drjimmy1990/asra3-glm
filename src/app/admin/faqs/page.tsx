'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { Input } from '@/components/ui/input';
import { useLocale } from '@/lib/i18n';
import { LanguageTabs } from '@/components/admin/language-tabs';

interface FAQ {
  id: string;
  question: string;
  question_en: string;
  question_ar: string;
  answer: string;
  answer_en: string;
  answer_ar: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

const emptyForm = {
  question: '',
  question_en: '',
  question_ar: '',
  answer: '',
  answer_en: '',
  answer_ar: '',
  order: 0,
  active: true,
};

export default function AdminFaqsPage() {
  const { t, locale } = useLocale();
  const [items, setItems] = useState<FAQ[]>([]);
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
      const res = await fetch('/api/admin/faqs');
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

  const openEdit = (item: FAQ) => {
    setEditingId(item.id);
    setForm({
      question: item.question,
      question_en: item.question_en,
      question_ar: item.question_ar,
      answer: item.answer,
      answer_en: item.answer_en,
      answer_ar: item.answer_ar,
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
        ? `/api/admin/faqs/${editingId}`
        : '/api/admin/faqs';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast({ title: t('admin_faqs') + ' ' + (editingId ? t('admin_update').toLowerCase() : t('admin_create').toLowerCase()), description: t('admin_saved') });
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
      const res = await fetch(`/api/admin/faqs/${deletingId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        toast({ title: t('admin_faqs') + ' ' + t('admin_removed') });
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

  const getDisplayQuestion = (item: FAQ) => {
    if (locale === 'ar') return item.question_ar || item.question || item.question_en;
    return item.question_en || item.question || item.question_ar;
  };

  const getDisplayAnswer = (item: FAQ) => {
    if (locale === 'ar') return item.answer_ar || item.answer || item.answer_en;
    return item.answer_en || item.answer || item.answer_ar;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <HelpCircle className="size-6 text-primary" />
            {t('admin_faqs')}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t('admin_faqs_desc')}
          </p>
        </div>
        <Button onClick={openCreate} className="shrink-0">
          <Plus className="size-4 me-2" />
          {t('admin_add_faq')}
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
            <HelpCircle className="size-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">{t('admin_no_faqs')}</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">{t('admin_question')}</TableHead>
                <TableHead className="min-w-[200px]">{t('admin_answer')}</TableHead>
                <TableHead className="text-center">{t('admin_active')}</TableHead>
                <TableHead className="text-center">{t('admin_order')}</TableHead>
                <TableHead className="text-end">{t('admin_actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{getDisplayQuestion(item)}</TableCell>
                  <TableCell className="max-w-[300px] truncate text-muted-foreground text-xs">
                    {getDisplayAnswer(item)}
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
                {editingId ? t('admin_edit_faq') : t('admin_add_faq')}
              </DialogTitle>
              <LanguageTabs activeTab={formTab} onTabChange={setFormTab} />
            </div>
            <DialogDescription>
              {editingId
                ? t('admin_update_faq_desc')
                : t('admin_create_faq_desc')}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            {formTab === 'en' ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="question_en">{t('admin_question')} (English) *</Label>
                  <Textarea
                    id="question_en"
                    value={form.question_en}
                    onChange={(e) => setForm({ ...form, question_en: e.target.value })}
                    placeholder="The question your visitors might ask"
                    rows={3}
                    dir="ltr"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="answer_en">{t('admin_answer')} (English) *</Label>
                  <Textarea
                    id="answer_en"
                    value={form.answer_en}
                    onChange={(e) => setForm({ ...form, answer_en: e.target.value })}
                    placeholder="The answer to the question"
                    rows={5}
                    dir="ltr"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="question_ar">{t('admin_question')} (العربية) *</Label>
                  <Textarea
                    id="question_ar"
                    value={form.question_ar}
                    onChange={(e) => setForm({ ...form, question_ar: e.target.value })}
                    placeholder="السؤال الذي قد يسأله الزوار"
                    rows={3}
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="answer_ar">{t('admin_answer')} (العربية) *</Label>
                  <Textarea
                    id="answer_ar"
                    value={form.answer_ar}
                    onChange={(e) => setForm({ ...form, answer_ar: e.target.value })}
                    placeholder="إجابة السؤال"
                    rows={5}
                    dir="rtl"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="order">{t('admin_order')}</Label>
              <Input
                id="order"
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                className="max-w-[120px]"
              />
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
              disabled={saving || !form.question_en || !form.answer_en}
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
            <AlertDialogTitle>{t('admin_delete_faq')}</AlertDialogTitle>
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
