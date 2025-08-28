import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { routing } from "@/locales/routing";

import "@/styles/globals.css";

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
					<NextIntlClientProvider>{children}</NextIntlClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
