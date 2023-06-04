import '@/styles/globals.css'

export const metadata = {
    title: 'next-leaflet',
    description: 'An optimized tech stack for efficiency.',
    icons: { icon: '/favicon.ico' }
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html className='min-h-screen'>
            <body className='min-h-screen'>
                {children}
            </body>
        </html>
    )
}
