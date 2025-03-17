import { Ubuntu } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'

import { routing } from '@/locales/routing'

import type { Metadata } from 'next'

import '@/styles/globals.css'

export const metadata: Metadata = {
    title: 'next-leaflet',
    description: "An optimized tech stack for efficiency.",
}

const ubuntu = Ubuntu({ weight: '400', subsets: ['latin'] })

export default async function Layout({ children, params }: { children: React.ReactNode, params: Promise<{ locale: string }> }) {

    const { locale } = await params
    if (!hasLocale(routing.locales, locale)) notFound()

    return (
        <html lang={locale}>
            <body className={ubuntu.className}>
                <NextIntlClientProvider>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
