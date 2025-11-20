import type { Metadata, Viewport } from 'next'
// import { Geist, Geist_Mono } from 'next/font/google'
// import { Analytics } from '@vercel/analytics/next'
import { ClerkProvider } from '@clerk/nextjs'
import { ContactPopup } from '@/components/contact-popup';
import './globals.css'


export const metadata: Metadata = {
  title: 'High Adventure Camps | Adventure Tours & Packages in Manali',
  description: 'Experience thrilling adventure tours, trekking packages, and outdoor activities in Manali. High Adventure Camps offers unforgettable experiences for adventure seekers.',
  keywords: [
    "adventure camps",
    "Manali tours",
    "trekking packages", "adventure activities", "outdoor experiences",
    "adventure activities",
    "outdoor experiences",
    "high adventure",
    "camping in Manali",
    "adventure travel",
    "adventure tourism",
    "adventure sports",
    "adventure holidays",
    "adventure trips",
    "adventure excursions",
    "adventure tours India",
    "Manali trekking",
    "Manali adventure packages",
    "adventure tour operators",
    "adventure vacation",
    "adventure destinations",
    "adventure experiences",
    "adventure holidays in India",
    "adventure travel companies",
    "adventure tour packages",
    "adventure activities in Manali",
    "outdoor adventure",
    "adventure camp experiences",
    "adventure tour guides",
    "adventure travel deals",
    "adventure tourism in Manali",
    "High Adventure Camps Manali",
    "High Adventure Camps",
    "Camping in manali",
    "Trekking in manali",
    "Camps in manali",
    "Manali camping",
    "Best camp in manali",
    "Manali camps",
    "Student camping",
    "Education tours",
    "Student camps",
    "Corporate camping",
    "Corporate camps"
  ],
  authors: [{ name: 'High Adventure Camps' }],
  openGraph: {
    title: 'High Adventure Camps | Adventure Tours & Packages in Manali',
    description: 'Experience thrilling adventure tours, trekking packages, and outdoor activities in Manali.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  generator: 'Anshul Goyal',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#CC0000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: 'High Adventure Camps',
                description: 'Adventure tours and packages in Manali',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Manali',
                  addressRegion: 'Himachal Pradesh',
                  addressCountry: 'IN',
                },
                url: 'https://highventurecamps.com',
                telephone: '+91-XXXXXXXXXX',
                sameAs: [
                  'https://facebook.com/highventurecamps',
                  'https://instagram.com/highventurecamps',
                ],
              }),
            }}
          />
        </head>
        <body className={`font-sans antialiased bg-background text-foreground`}>
          <ContactPopup />
          {children}
          {/* <Analytics /> */}
        </body>
      </html>
    </ClerkProvider>
  )
}
