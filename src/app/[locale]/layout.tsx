import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { routing } from '@/locales/routing'
import { hasLocale, NextIntlClientProvider } from 'next-intl'

import type { Metadata } from 'next'

import '@/styles/globals.css'

export const metadata: Metadata = {
    title: 'Next-Leaflet',
    description: "An optimized tech stack for efficiency.",
}

const inter = Inter({ weight: '400', subsets: ['latin'] })

export default async function Layout({ children, params }: { children: React.ReactNode, params: Promise<{ locale: string }> }) {
    const { locale } = await params
    if (!hasLocale(routing.locales, locale)) notFound()

    return (
        <html lang={locale}>
            <body className={inter.className}>
                <NextIntlClientProvider>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    )
}