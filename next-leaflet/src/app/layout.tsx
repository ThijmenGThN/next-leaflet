import type { Metadata } from "next"
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server"

import ConvexClientProvider from "@/shared/components/ConvexClientProvider"

import "@/shared/styles/globals.css"

export const metadata: Metadata = {
  title: "next-leaflet",
  description: "An optimized tech stack for efficiency.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body>
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  )
}
