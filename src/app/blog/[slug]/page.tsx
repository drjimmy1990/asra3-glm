'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useLocale } from '@/lib/i18n';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  FileText,
  Loader2,
  Share2,
  ExternalLink,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  title_en: string;
  title_ar: string;
  excerpt: string;
  content: string;
  content_en: string;
  content_ar: string;
  coverImage: string;
  tags: string;
  project: {
    id: string;
    title_en: string;
    title_ar: string;
    title: string;
    category_en: string;
    category_ar: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { locale, isRTL } = useLocale();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog?slug=${slug}&lang=${locale}`);
        if (res.ok) {
          const data = await res.json();
          setPost(data);
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchPost();
  }, [slug, locale]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: post?.title, url });
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <FileText className="size-16 text-muted-foreground/30 mb-4" />
        <h1 className="text-2xl font-bold mb-2">
          {isRTL ? 'المقال غير موجود' : 'Post Not Found'}
        </h1>
        <p className="text-muted-foreground mb-6">
          {isRTL ? 'هذا المقال غير متاح أو تم حذفه' : "This post doesn't exist or has been removed"}
        </p>
        <Link href="/blog">
          <Button>
            <BackArrow className="size-4 me-2" />
            {isRTL ? 'العودة للمدونة' : 'Back to Blog'}
          </Button>
        </Link>
      </div>
    );
  }

  const content = post.content;
  const readTime = estimateReadTime(content);
  let parsedTags: string[] = [];
  try { parsedTags = JSON.parse(post.tags); } catch { /* ignore */ }
  const date = new Date(post.createdAt);
  const dateStr = date.toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/blog" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <BackArrow className="size-4" />
            {isRTL ? 'العودة للمدونة' : 'Back to Blog'}
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="size-9" onClick={handleShare}>
              <Share2 className="size-4" />
            </Button>
            <Link href="/">
              <Button variant="outline" size="sm">
                {isRTL ? 'الرئيسية' : 'Home'}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto mb-8 sm:mb-12">
          {/* Tags */}
          {parsedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {parsedTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  <Tag className="size-3 me-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg text-muted-foreground mb-6">
              {post.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b">
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4" />
              {dateStr}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" />
              {readTime} {isRTL ? 'دقيقة قراءة' : 'min read'}
            </span>
            {post.project && (
              <Badge variant="outline" className="text-xs">
                <ExternalLink className="size-3 me-1" />
                {locale === 'ar'
                  ? (post.project.title_ar || post.project.title_en)
                  : (post.project.title_en || post.project.title)}
              </Badge>
            )}
          </div>
        </div>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="max-w-4xl mx-auto mb-8 sm:mb-12 rounded-2xl overflow-hidden shadow-lg relative aspect-video">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        )}

        {/* Content */}
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl prose-img:shadow-md prose-img:mx-auto
            prose-pre:bg-muted prose-pre:border prose-pre:rounded-xl
            prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
            prose-blockquote:border-primary prose-blockquote:bg-muted/50 prose-blockquote:rounded-r-xl prose-blockquote:py-1
            prose-table:border prose-th:bg-muted prose-th:p-3 prose-td:p-3
            prose-video:rounded-xl prose-video:shadow-md prose-video:w-full
            [&_iframe]:rounded-xl [&_iframe]:shadow-md [&_iframe]:w-full [&_iframe]:aspect-video
          ">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                // Wrap tables in scrollable container for mobile
                table: ({ children }) => (
                  <div className="overflow-x-auto -mx-4 px-4 my-6">
                    <table>{children}</table>
                  </div>
                ),
                // Support alignment from GFM tables
                th: ({ children, style }) => (
                  <th style={style}>{children}</th>
                ),
                td: ({ children, style }) => (
                  <td style={style}>{children}</td>
                ),
                // Paragraphs with proper spacing
                p: ({ children }) => (
                  <p className="my-4 leading-relaxed">{children}</p>
                ),
                // Custom image handler with size syntax
                img: ({ node, alt, src, ...props }) => {
                  let width: string | undefined;
                  let height: string | undefined;
                  let cleanAlt = alt || '';

                  const sizeMatch = cleanAlt.match(/^(.*?)\|(\d+)x(\d+)$/);
                  if (sizeMatch) {
                    cleanAlt = sizeMatch[1];
                    width = sizeMatch[2];
                    height = sizeMatch[3];
                  }

                  return (
                    <span className="block my-6">
                      {width && height ? (
                        <Image
                          src={src || ''}
                          alt={cleanAlt}
                          width={parseInt(width, 10)}
                          height={parseInt(height, 10)}
                          className="rounded-xl shadow-md mx-auto"
                          style={{
                            maxWidth: '100%',
                            height: 'auto',
                            width: `${width}px`,
                          }}
                          {...(props as any)}
                        />
                      ) : (
                        <img
                          src={src}
                          alt={cleanAlt}
                          className="rounded-xl shadow-md mx-auto"
                          style={{ maxWidth: '100%', height: 'auto' }}
                          loading="lazy"
                          {...props}
                        />
                      )}
                      {cleanAlt && (
                        <span className="block text-center text-sm text-muted-foreground mt-3">
                          {cleanAlt}
                        </span>
                      )}
                    </span>
                  );
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Project Link */}
        {post.project && (
          <div className="max-w-3xl mx-auto mt-12 p-6 rounded-2xl border bg-muted/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <ExternalLink className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {isRTL ? 'مشروع ذو صلة' : 'Related Project'}
                </p>
                <h3 className="font-semibold">
                  {locale === 'ar'
                    ? (post.project.title_ar || post.project.title_en)
                    : (post.project.title_en || post.project.title)}
                </h3>
              </div>
            </div>
          </div>
        )}

        {/* Back to Blog CTA */}
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <Link href="/blog">
            <Button variant="outline" size="lg">
              <BackArrow className="size-4 me-2" />
              {isRTL ? 'جميع المقالات' : 'All Posts'}
            </Button>
          </Link>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} asra3.com — {isRTL ? 'جميع الحقوق محفوظة' : 'All rights reserved'}
        </div>
      </footer>
    </div>
  );
}
