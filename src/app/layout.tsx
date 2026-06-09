import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Animation Desk — The animation desk, reborn as an heirloom.',
    template: '%s | Animation Desk',
  },
  description:
    'A limited line of premium studio furniture for the artists, collectors, and studios keeping hand-drawn animation alive.',
  keywords: [
    'animation desk',
    'studio furniture',
    'hand-drawn animation',
    'heirloom desk',
    'animator desk',
    'pegbar desk',
    'light disc',
    'luxury studio furniture',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Animation Desk',
    title: 'Animation Desk — The animation desk, reborn as an heirloom.',
    description:
      'A limited line of premium studio furniture for the artists, collectors, and studios keeping hand-drawn animation alive.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Animation Desk',
    description:
      'A limited line of premium studio furniture for artists keeping hand-drawn animation alive.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-background text-text antialiased">{children}</body>
    </html>
  )
}
