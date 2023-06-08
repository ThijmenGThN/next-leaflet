import '@/styles/globals.css'

export const metadata = {
  title: 'next-leaflet',
  description: 'An optimized tech stack for efficiency.',
  icons: { icon: '/favicon.ico' }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  )
}