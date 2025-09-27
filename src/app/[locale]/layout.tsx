import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { hasLocale, NextIntlClientProvider as LocaleProvider } from "next-intl";

import { routing } from "@/shared/locales/routing";
import { Toaster } from "@/components/ui/sonner";

import "@/shared/styles/globals.css";

export const metadata: Metadata = {
	title: "Next-Leaflet",
	description: "An optimized tech stack for efficiency.",
};

const inter = Inter({ weight: "400", subsets: ["latin"] });

export default async function Layout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {

	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) notFound();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<LocaleProvider>
						{children}
					</LocaleProvider>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
