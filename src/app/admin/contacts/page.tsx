'use client';

import React, { useEffect, useState } from 'react';
import {
  Mail, MailOpen, Loader2, Trash2, Eye, ExternalLink,
  Clock, DollarSign, Briefcase,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { useToast } from '@/hooks/use-toast';
import { useLocale } from '@/lib/i18n';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminContactsPage() {
  const { t, locale } = useLocale();
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/admin/contacts');
      if (res.ok) {
        const data = await res.json();
        setContacts(data);
      }
    } catch {
      // keep empty
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchContacts(); }, []);

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/admin/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true }),
      });
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, read: true } : c))
      );
      toast({ title: t('admin_marked_as_read') });
    } catch {
      toast({ title: t('admin_error_generic'), variant: 'destructive' });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`/api/admin/contacts/${deleteId}`, { method: 'DELETE' });
      setContacts((prev) => prev.filter((c) => c.id !== deleteId));
      toast({ title: t('admin_contacts') + ' ' + t('admin_removed') });
    } catch {
      toast({ title: t('admin_error_delete'), variant: 'destructive' });
    } finally {
      setDeleteId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  const selectedContact = contacts.find((c) => c.id === selectedId);
  const unreadCount = contacts.filter((c) => !c.read).length;

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
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Mail className="size-6 text-primary" />
          {t('admin_contacts')}
        </h1>
        <p className="text-muted-foreground mt-1">
          {contacts.length} {t('admin_total_messages')}
          {unreadCount > 0 && (
            <Badge variant="secondary" className="ms-2 bg-primary/10 text-primary">
              {unreadCount} {t('admin_unread')}
            </Badge>
          )}
        </p>
      </div>

      {/* Contact List */}
      {contacts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Mail className="size-12 text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground text-lg font-medium">{t('admin_no_messages')}</p>
            <p className="text-muted-foreground/60 text-sm mt-1">
              {t('admin_no_messages_desc')}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {contacts.map((contact) => (
            <Card
              key={contact.id}
              className={`transition-all hover:shadow-md cursor-pointer ${
                !contact.read ? 'border-primary/30 bg-primary/5' : ''
              }`}
              onClick={() => setSelectedId(contact.id)}
            >
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-start gap-4">
                  {/* Unread indicator */}
                  <div className="mt-1 flex-shrink-0">
                    {contact.read ? (
                      <MailOpen className="size-5 text-muted-foreground/40" />
                    ) : (
                      <div className="relative">
                        <Mail className="size-5 text-primary" />
                        <div className="absolute -top-0.5 -end-0.5 h-2.5 w-2.5 rounded-full bg-primary" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-semibold text-sm ${!contact.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {contact.name}
                      </span>
                      <span className="text-xs text-muted-foreground/60">{contact.email}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                      {contact.message}
                    </p>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      {contact.projectType && (
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                          <Briefcase className="size-3" />
                          {contact.projectType}
                        </span>
                      )}
                      {contact.budget && (
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                          <DollarSign className="size-3" />
                          {contact.budget}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground/50">
                        <Clock className="size-3" />
                        {formatDate(contact.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {!contact.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(contact.id);
                        }}
                        title={t('admin_mark_as_read')}
                      >
                        <Eye className="size-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-destructive hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteId(contact.id);
                      }}
                      title={t('admin_delete')}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedContact && (
        <AlertDialog open={!!selectedContact} onOpenChange={() => setSelectedId(null)}>
          <AlertDialogContent className="max-w-lg">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <Mail className="size-5 text-primary" />
                {t('admin_message_from')} {selectedContact.name}
              </AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="space-y-4 mt-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">{t('admin_email')}</span>
                      <p className="font-medium flex items-center gap-1 mt-0.5">
                        <ExternalLink className="size-3" />
                        {selectedContact.email}
                      </p>
                    </div>
                    {selectedContact.projectType && (
                      <div>
                        <span className="text-muted-foreground">{t('admin_project_type')}</span>
                        <p className="font-medium mt-0.5">{selectedContact.projectType}</p>
                      </div>
                    )}
                    {selectedContact.budget && (
                      <div>
                        <span className="text-muted-foreground">{t('admin_budget')}</span>
                        <p className="font-medium mt-0.5">{selectedContact.budget}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-muted-foreground">{t('admin_received')}</span>
                      <p className="font-medium mt-0.5">{formatDate(selectedContact.createdAt)}</p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-4">
                    <span className="text-sm text-muted-foreground">{t('admin_message')}</span>
                    <p className="text-sm mt-1 whitespace-pre-wrap leading-relaxed">
                      {selectedContact.message}
                    </p>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              {!selectedContact.read && (
                <Button
                  variant="outline"
                  onClick={() => {
                    markAsRead(selectedContact.id);
                    setSelectedId(null);
                  }}
                >
                  <Eye className="size-4 me-1" />
                  {t('admin_mark_as_read')}
                </Button>
              )}
              <AlertDialogCancel>{t('admin_close')}</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('admin_delete_message')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('admin_delete_confirm')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('admin_cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-white hover:bg-destructive/90">
              {t('admin_delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
