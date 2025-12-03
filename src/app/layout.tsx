import { ThemeProvider } from "next-themes"

import ConvexClientProvider from "@/components/ConvexClientProvider"
import { ThemeSync } from "@/components/ThemeSync"
import { Toaster } from "@/components/ui/sonner"

import type { Metadata } from "next"

import "@/styles/globals.css"

export const metadata: Metadata = {
	title: "next-leaflet",
	description: "An optimized tech stack for efficiency.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<ConvexClientProvider>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
						<ThemeSync />
						{children}
					</ThemeProvider>
				</ConvexClientProvider>
				<Toaster />
			</body>
		</html>
	)
}
