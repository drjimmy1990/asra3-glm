import { MetadataRoute } from 'next';
import { db } from '@/lib/db';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://asra3.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static routes (both locales)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/en`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${BASE_URL}/en`,
          ar: `${BASE_URL}/ar`,
        },
      },
    },
    {
      url: `${BASE_URL}/ar`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${BASE_URL}/en`,
          ar: `${BASE_URL}/ar`,
        },
      },
    },
    {
      url: `${BASE_URL}/en/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${BASE_URL}/en/blog`,
          ar: `${BASE_URL}/ar/blog`,
        },
      },
    },
    {
      url: `${BASE_URL}/ar/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${BASE_URL}/en/blog`,
          ar: `${BASE_URL}/ar/blog`,
        },
      },
    },
  ];

  // Dynamic blog post routes
  try {
    const posts = await db.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { createdAt: 'desc' },
    });

    const blogRoutes: MetadataRoute.Sitemap = posts.flatMap((post) => [
      {
        url: `${BASE_URL}/en/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: {
          languages: {
            en: `${BASE_URL}/en/blog/${post.slug}`,
            ar: `${BASE_URL}/ar/blog/${post.slug}`,
          },
        },
      },
      {
        url: `${BASE_URL}/ar/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: {
          languages: {
            en: `${BASE_URL}/en/blog/${post.slug}`,
            ar: `${BASE_URL}/ar/blog/${post.slug}`,
          },
        },
      },
    ]);

    return [...staticRoutes, ...blogRoutes];
  } catch {
    // If DB is unavailable during build, return static routes only
    return staticRoutes;
  }
}
