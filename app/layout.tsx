import { Inter } from 'next/font/google'

import Providers from '@/components/logic/Providers'

import '@/styles/globals.css'

export const metadata = {
  title: 'next-leaflet',
  description: 'An optimized tech stack for efficiency.',
  icons: { icon: '/favicon.ico' }
}

const Font = Inter({ subsets: ['latin'] })
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className={Font.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}