
import { Inter } from 'next/font/google'

import type { Metadata } from 'next'

import '@/styles/globals.css'

export const metadata: Metadata = {
    title: 'next-leaflet',
    description: 'An optimized tech stack for efficiency.',
}

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }: { children: React.ReactNode}) {

    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    )
}
