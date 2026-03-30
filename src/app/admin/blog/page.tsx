'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { toast } from '@/hooks/use-toast';
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  FileText,
  Eye,
  EyeOff,
  Link2,
  Code2,
  Type,
  Image as ImageIcon,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocale } from '@/lib/i18n';
import { LanguageTabs } from '@/components/admin/language-tabs';
import { TagInput } from '@/components/admin/tag-input';
import dynamic from 'next/dynamic';
import 'easymde/dist/easymde.min.css';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

interface BlogPost {
  id: string;
  slug: string;
  title_en: string;
  title_ar: string;
  excerpt_en: string;
  excerpt_ar: string;
  content_en: string;
  content_ar: string;
  coverImage: string;
  projectId: string | null;
  project: { id: string; title_en: string; title_ar: string; title: string } | null;
  tags: string;
  published: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface Project {
  id: string;
  title_en: string;
  title_ar: string;
  title: string;
}

const emptyForm = {
  slug: '',
  title_en: '',
  title_ar: '',
  excerpt_en: '',
  excerpt_ar: '',
  content_en: '',
  content_ar: '',
  coverImage: '',
  projectId: '',
  tags: '[]',
  published: false,
  order: 0,
};

export default function AdminBlogPage() {
  const { t, locale } = useLocale();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [formTab, setFormTab] = useState<'en' | 'ar'>('en');
  const [editorMode, setEditorMode] = useState<'visual' | 'markdown'>('visual');

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/blog');
      if (res.ok) {
        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []);
      }
    } catch {
      toast({ title: 'Error', description: 'Failed to fetch blog posts', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    fetchPosts();
    fetchProjects();
  }, [fetchPosts, fetchProjects]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormTab('en');
    setEditorMode('visual');
    setDialogOpen(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setForm({
      slug: post.slug ?? '',
      title_en: post.title_en ?? '',
      title_ar: post.title_ar ?? '',
      excerpt_en: post.excerpt_en ?? '',
      excerpt_ar: post.excerpt_ar ?? '',
      content_en: post.content_en ?? '',
      content_ar: post.content_ar ?? '',
      coverImage: post.coverImage ?? '',
      projectId: post.projectId ?? '',
      tags: post.tags ?? '[]',
      published: post.published ?? false,
      order: post.order ?? 0,
    });
    setFormTab('en');
    setEditorMode('visual');
    setDialogOpen(true);
  };

  const openDelete = (id: string) => {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const slug = form.slug || generateSlug(form.title_en);
      const url = editingId ? `/api/admin/blog/${editingId}` : '/api/admin/blog';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, slug }),
      });

      if (res.ok) {
        toast({ title: 'Blog post ' + (editingId ? 'updated' : 'created'), description: 'Saved successfully' });
        setDialogOpen(false);
        fetchPosts();
      } else {
        const data = await res.json();
        toast({ title: 'Error', description: data.error || 'Failed to save', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Error', description: 'Failed to save', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/blog/${deletingId}`, { method: 'DELETE' });
      if (res.ok) {
        toast({ title: 'Blog post deleted' });
        setDeleteDialogOpen(false);
        setDeletingId(null);
        fetchPosts();
      } else {
        toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const getDisplayTitle = (post: BlogPost) => {
    if (locale === 'ar') return post.title_ar || post.title_en;
    return post.title_en || post.title_ar;
  };

  // SimpleMDE options  
  const mdeOptions = useMemo(() => ({
    spellChecker: false,
    autofocus: false,
    placeholder: 'Write your blog post content here...\n\nSupports markdown, images, and videos.\n\n## Image Syntax\n![Alt text](url)\n![Alt text|600x400](url) — with custom size\n\n## Video Embed\n<video src="url" controls width="100%"></video>\n<iframe src="youtube-url" width="100%" height="400"></iframe>',
    toolbar: [
      'bold', 'italic', 'heading', '|',
      'quote', 'unordered-list', 'ordered-list', '|',
      'link', 'image', 'table', '|',
      'preview', 'side-by-side', 'fullscreen', '|',
      'guide',
    ] as const,
    status: false as const,
  }), []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="size-6 text-primary" />
            Blog Posts
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your blog posts and articles
          </p>
        </div>
        <Button onClick={openCreate} className="shrink-0">
          <Plus className="size-4 me-2" />
          New Post
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg bg-background">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <FileText className="size-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">No blog posts yet</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Title</TableHead>
                <TableHead>Project</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Order</TableHead>
                <TableHead className="text-end">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div>
                      <span className="font-medium">{getDisplayTitle(post)}</span>
                      <p className="text-xs text-muted-foreground mt-0.5">/{post.slug}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {post.project ? (
                      <Badge variant="secondary" className="text-xs">
                        <Link2 className="size-3 me-1" />
                        {locale === 'ar'
                          ? post.project.title_ar || post.project.title_en || post.project.title
                          : post.project.title_en || post.project.title}
                      </Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={post.published ? 'default' : 'outline'} className="text-xs">
                      {post.published ? (
                        <><Eye className="size-3 me-1" /> Published</>
                      ) : (
                        <><EyeOff className="size-3 me-1" /> Draft</>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground">
                    {post.order}
                  </TableCell>
                  <TableCell className="text-end">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="size-8" onClick={() => openEdit(post)}>
                        <Pencil className="size-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="size-8 text-destructive hover:text-destructive" onClick={() => openDelete(post.id)}>
                        <Trash2 className="size-3.5" />
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
        <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <DialogTitle>
                {editingId ? 'Edit Blog Post' : 'New Blog Post'}
              </DialogTitle>
              <div className="flex items-center gap-2">
                <LanguageTabs activeTab={formTab} onTabChange={setFormTab} />
              </div>
            </div>
            <DialogDescription>
              {editingId ? 'Update your blog post content' : 'Create a new blog post'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            {/* Title & Slug row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>{formTab === 'ar' ? 'العنوان (العربية)' : 'Title (English)'} *</Label>
                <Input
                  value={formTab === 'ar' ? form.title_ar : form.title_en}
                  onChange={(e) => {
                    if (formTab === 'ar') {
                      setForm({ ...form, title_ar: e.target.value });
                    } else {
                      const newForm = { ...form, title_en: e.target.value };
                      if (!editingId) newForm.slug = generateSlug(e.target.value);
                      setForm(newForm);
                    }
                  }}
                  placeholder={formTab === 'ar' ? 'عنوان المقال' : 'Post title'}
                  dir={formTab === 'ar' ? 'rtl' : 'ltr'}
                />
              </div>
              <div className="space-y-2">
                <Label>Slug (URL) *</Label>
                <Input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="my-blog-post"
                  dir="ltr"
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">/blog/{form.slug || '...'}</p>
              </div>
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <Label>{formTab === 'ar' ? 'الملخص (العربية)' : 'Excerpt (English)'}</Label>
              <Textarea
                value={formTab === 'ar' ? form.excerpt_ar : form.excerpt_en}
                onChange={(e) => {
                  if (formTab === 'ar') {
                    setForm({ ...form, excerpt_ar: e.target.value });
                  } else {
                    setForm({ ...form, excerpt_en: e.target.value });
                  }
                }}
                placeholder={formTab === 'ar' ? 'ملخص قصير للمقال' : 'A short summary of the post'}
                rows={2}
                dir={formTab === 'ar' ? 'rtl' : 'ltr'}
              />
            </div>

            {/* Content Editor with mode toggle */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>{formTab === 'ar' ? 'المحتوى (العربية)' : 'Content (English)'} *</Label>
                <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
                  <button
                    type="button"
                    onClick={() => setEditorMode('visual')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      editorMode === 'visual'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Type className="size-3.5" />
                    Visual
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorMode('markdown')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      editorMode === 'markdown'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Code2 className="size-3.5" />
                    Markdown
                  </button>
                </div>
              </div>

              {editorMode === 'visual' ? (
                <div className="border rounded-lg overflow-hidden [&_.EasyMDEContainer]:border-0 [&_.EasyMDEContainer_.CodeMirror]:min-h-[300px] [&_.EasyMDEContainer_.CodeMirror]:border-0 [&_.EasyMDEContainer_.CodeMirror]:rounded-none [&_.editor-toolbar]:border-b [&_.editor-toolbar]:border-t-0 [&_.editor-toolbar]:rounded-none [&_.editor-toolbar]:border-x-0">
                  <SimpleMDE
                    value={formTab === 'ar' ? form.content_ar : form.content_en}
                    onChange={(val: string) => {
                      if (formTab === 'ar') {
                        setForm({ ...form, content_ar: val });
                      } else {
                        setForm({ ...form, content_en: val });
                      }
                    }}
                    options={mdeOptions}
                  />
                </div>
              ) : (
                <Textarea
                  value={formTab === 'ar' ? form.content_ar : form.content_en}
                  onChange={(e) => {
                    if (formTab === 'ar') {
                      setForm({ ...form, content_ar: e.target.value });
                    } else {
                      setForm({ ...form, content_en: e.target.value });
                    }
                  }}
                  placeholder={formTab === 'ar'
                    ? 'اكتب محتوى المقال هنا بصيغة Markdown...'
                    : 'Write or paste your markdown content here...\n\n## Images\n![Alt text](url)\n![Alt text|600x400](url)\n\n## Videos\n<video src="url" controls width="100%"></video>'}
                  rows={16}
                  dir={formTab === 'ar' ? 'rtl' : 'ltr'}
                  className="font-mono text-sm"
                />
              )}
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <ImageIcon className="size-3" />
                Images: <code className="px-1 bg-muted rounded">![alt](url)</code> — resize: <code className="px-1 bg-muted rounded">![alt|600x400](url)</code> — Videos: <code className="px-1 bg-muted rounded">&lt;video src=&quot;url&quot; controls width=&quot;100%&quot;&gt;&lt;/video&gt;</code>
              </p>
            </div>

            {/* Cover Image & Project */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Cover Image URL</Label>
                <Input
                  value={form.coverImage}
                  onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                  placeholder="https://example.com/cover.jpg"
                />
                {form.coverImage && (
                  <div className="relative h-24 rounded-lg overflow-hidden bg-muted">
                    <img src={form.coverImage} alt="Cover" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label>Linked Project (optional)</Label>
                <Select
                  value={form.projectId || 'none'}
                  onValueChange={(v) => setForm({ ...form, projectId: v === 'none' ? '' : v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="No project linked" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No project linked</SelectItem>
                    {projects.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {locale === 'ar' ? (p.title_ar || p.title_en || p.title) : (p.title_en || p.title)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Tags & Order */}
            <div className="grid gap-4 sm:grid-cols-[1fr_100px]">
              <div className="space-y-1.5">
                <Label>Tags</Label>
                <TagInput
                  value={form.tags}
                  onChange={(v) => setForm({ ...form, tags: v })}
                  placeholder="Type tag and press Enter..."
                  dir="ltr"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Order</Label>
                <Input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <Separator />

            {/* Published toggle */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Published</Label>
                <p className="text-xs text-muted-foreground">
                  Make this post visible on the public blog
                </p>
              </div>
              <Switch
                checked={form.published}
                onCheckedChange={(checked) => setForm({ ...form, published: checked })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving || !form.title_en || !form.slug}>
              {saving ? (
                <><Loader2 className="size-4 animate-spin me-2" /> Saving...</>
              ) : editingId ? (
                'Update Post'
              ) : (
                'Create Post'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this blog post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={saving}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {saving ? (
                <><Loader2 className="size-4 animate-spin me-2" /> Deleting...</>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
