
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'

import type { Metadata } from 'next'

import { locales } from '@/../middleware'

import '@/styles/globals.css'

export const metadata: Metadata = {
    title: 'next-leaflet',
    description: 'An optimized tech stack for efficiency.',
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children, params: { locale } }: { children: React.ReactNode, params: { locale: string } }) {

    if (!locales.includes(locale as any)) notFound()

    return (
        <html lang={locale}>
            <body className={inter.className}>
                {children}
            </body>
        </html>
    )
}
