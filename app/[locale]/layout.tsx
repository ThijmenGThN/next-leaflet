import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'

import Session from './Session'
import { locales } from '../../middleware'

import '@/styles/globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'next-leaflet',
    description: 'An optimized tech stack for efficiency.'
}

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children, params: { locale } }: { children: React.ReactNode, params: { locale: string } }) {

    locales.some(cur => cur === locale) ?? notFound()

    return (
        <html lang={locale} className="h-full">
            <body className={inter.className + ' h-full'}>
                <Session>
                    {children}
                </Session>
            </body>
        </html>
    )
}
