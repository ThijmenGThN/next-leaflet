import { Ubuntu } from 'next/font/google'

import type { Metadata } from 'next'

import '@/styles/globals.css'

export const metadata: Metadata = {
    title: 'next-leaflet',
    description: "An optimized tech stack for efficiency.",
}

const ubuntu = Ubuntu({ weight: '400', subsets: ['latin'] })

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <html lang="en">
            <body className={ubuntu.className}>
                {children}
            </body>
        </html>
    )
}
