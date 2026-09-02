import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { placeholderSettings } from '@/lib/data'

export const metadata: Metadata = {
  title: {
    default: 'Haven Productions — Where Sound Meets Vision',
    template: '%s | Haven Productions',
  },
  description:
    'Haven Productions is a multi-vertical production house delivering music, film, events, audio launches, and brand sponsorships across India.',
  keywords: ['music production', 'film production', 'event production', 'audio launch', 'brand sponsorship', 'Mumbai', 'India'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://havenproductions.com',
    siteName: 'Haven Productions',
  },
}

import { getSiteSettings } from '@/lib/supabase'

export const revalidate = 0

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings() || placeholderSettings

  return (
    <html lang="en" data-theme={settings.theme} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider initialTheme={settings.theme}>
          <LenisProvider>
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
