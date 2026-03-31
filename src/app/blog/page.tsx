'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/lib/i18n';
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  FileText,
  Loader2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  title_en: string;
  title_ar: string;
  excerpt: string;
  excerpt_en: string;
  excerpt_ar: string;
  coverImage: string;
  tags: string;
  project: { id: string; title_en: string; title_ar: string; title: string } | null;
  createdAt: string;
  content_en: string;
  content_ar: string;
}

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function BlogPage() {
  const { locale, isRTL, t } = useLocale();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/blog?lang=${locale}`);
        if (res.ok) {
          const data = await res.json();
          setPosts(Array.isArray(data) ? data : []);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [locale]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center size-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-md shadow-primary/20 group-hover:shadow-lg group-hover:shadow-primary/30 transition-shadow">
              <FileText className="size-4" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              asra<span className="text-primary">3</span>
              <span className="text-muted-foreground font-normal ms-1">/ blog</span>
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {isRTL ? <ArrowRight className="size-4" /> : null}
            {isRTL ? 'العودة للرئيسية' : 'Back to Home'}
            {!isRTL ? <ArrowLeft className="size-4" /> : null}
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero */}
        <div className="text-center mb-12 sm:mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm font-medium border-primary/30 text-primary">
            {isRTL ? 'المدونة' : 'BLOG'}
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {isRTL ? 'رؤى وأفكار تقنية' : 'Insights & Ideas'}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isRTL
              ? 'مقالات عن الأتمتة، الذكاء الاصطناعي، تطوير SaaS، وأفضل الممارسات التقنية'
              : 'Articles about automation, AI, SaaS development, and tech best practices'}
          </p>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <FileText className="size-16 mx-auto mb-4 opacity-20" />
            <h2 className="text-xl font-semibold mb-2">
              {isRTL ? 'لا توجد مقالات بعد' : 'No posts yet'}
            </h2>
            <p className="text-sm">
              {isRTL ? 'ترقبوا المقالات القادمة!' : 'Stay tuned for upcoming articles!'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => {
              const readTime = estimateReadTime(
                locale === 'ar' ? (post.content_ar || post.content_en) : (post.content_en || post.content_ar)
              );
              let parsedTags: string[] = [];
              try { parsedTags = JSON.parse(post.tags); } catch { /* ignore */ }
              const date = new Date(post.createdAt);
              const dateStr = date.toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });

              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group relative flex flex-col rounded-2xl border bg-background/60 backdrop-blur-sm overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Cover */}
                  {post.coverImage ? (
                    <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        priority={index === 0}
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  ) : (
                    <div className="relative aspect-[16/9] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                      <FileText className="size-12 text-primary/30" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5 sm:p-6">
                    {/* Tags */}
                    {parsedTags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {parsedTags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <h2 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {post.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto pt-4 border-t border-border/50">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3.5" />
                        {dateStr}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5" />
                        {readTime} {isRTL ? 'دقيقة قراءة' : 'min read'}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} asra3.com — {isRTL ? 'جميع الحقوق محفوظة' : 'All rights reserved'}
        </div>
      </footer>
    </div>
  );
}
