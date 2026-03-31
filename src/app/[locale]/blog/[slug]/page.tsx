import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import BlogPostClient from './page-client';
import { BlogPostingSchema } from '@/components/seo/blog-posting-schema';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://asra3.com';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// Fetch post data for both metadata and schema
async function getPost(slug: string) {
  try {
    return await db.blogPost.findUnique({
      where: { slug },
      select: {
        slug: true,
        title_en: true,
        title_ar: true,
        excerpt_en: true,
        excerpt_ar: true,
        coverImage: true,
        createdAt: true,
        updatedAt: true,
        published: true,
      },
    });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const isAr = locale === 'ar';
  const post = await getPost(slug);

  if (!post || !post.published) {
    return { title: isAr ? 'المقال غير موجود' : 'Post Not Found' };
  }

  const title = isAr
    ? (post.title_ar || post.title_en || 'مقال')
    : (post.title_en || 'Blog Post');

  const description = isAr
    ? (post.excerpt_ar || post.excerpt_en || '')
    : (post.excerpt_en || '');

  const ogImage = post.coverImage || `${BASE_URL}/og-image.png`;
  const canonical = `${BASE_URL}/${locale}/blog/${slug}`;

  return {
    title: `${title} | asra3.com`,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${BASE_URL}/en/blog/${slug}`,
        ar: `${BASE_URL}/ar/blog/${slug}`,
      },
    },
    openGraph: {
      title: `${title} | asra3.com`,
      description,
      url: canonical,
      type: 'article',
      locale: isAr ? 'ar_SA' : 'en_US',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | asra3.com`,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const post = await getPost(slug);

  if (!post || !post.published) {
    notFound();
  }

  const isAr = locale === 'ar';
  const title = isAr ? (post.title_ar || post.title_en || '') : (post.title_en || '');
  const description = isAr ? (post.excerpt_ar || post.excerpt_en || '') : (post.excerpt_en || '');

  return (
    <>
      <BlogPostingSchema
        title={title}
        description={description}
        slug={slug}
        locale={locale}
        coverImage={post.coverImage}
        createdAt={post.createdAt.toISOString()}
        updatedAt={post.updatedAt.toISOString()}
      />
      <BlogPostClient />
    </>
  );
}
