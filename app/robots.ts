import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://highventurecamps.com';

  return {
    rules: [
      // Rule #1: Specific rules for Googlebot
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/packages',
          '/activities',
          '/about',
          '/contact',
          // Specifically allow the API routes Google needs to render content
          '/api/activities',
          '/api/tours',
        ],
        // Still disallow paths we don't want indexed
        disallow: ['/admin', '/sign-in', '/sign-up'],
        crawlDelay: 1,
      },
      // Rule #2: A more restrictive rule for all other bots
      {
        userAgent: '*',
        allow: ['/', '/packages', '/activities', '/about', '/contact'],
        // Block the entire /api/ directory for non-Google bots
        disallow: ['/admin', '/api', '/sign-in', '/sign-up'],
        crawlDelay: 1,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}