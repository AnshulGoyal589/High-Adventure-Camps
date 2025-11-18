import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://highventurecamps.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/packages', '/activities', '/about', '/contact'],
        disallow: ['/admin', '/api', '/sign-in', '/sign-up'],
        crawlDelay: 1,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
