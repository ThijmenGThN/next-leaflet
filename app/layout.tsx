import '@/styles/globals.css'

export const metadata = {
  title: 'next-leaflet',
  description: 'An optimized tech stack for efficiency.',
  icons: {
    icon: '/public/favicon.ico'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  )
}