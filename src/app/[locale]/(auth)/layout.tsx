"use client"

import { useEffect } from "react";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {

	useEffect(() => {
		try {
			fetch("/api/users/logout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			})
		} catch { }
	}, [])

	return (
		<div className="min-h-screen flex items-center justify-center bg-background">
			<div className="w-full max-w-md px-6">
				{children}
			</div>
		</div>
	);
}