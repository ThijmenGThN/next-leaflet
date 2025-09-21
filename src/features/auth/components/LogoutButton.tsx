"use client";

import { useRouter } from "@/locales/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function LogoutButton() {
	const router = useRouter();
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	const handleLogout = async () => {
		setIsLoggingOut(true);
		try {
			await fetch("/api/users/logout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
			router.push("/login");
		} catch (error) {
			console.error("Logout failed:", error);
			router.push("/login");
		} finally {
			setIsLoggingOut(false);
		}
	};

	return (
		<Button
			onClick={handleLogout}
			variant="outline"
			className="text-red-600 border-red-300 hover:bg-red-50"
			disabled={isLoggingOut}
		>
			{isLoggingOut ? "Logging out..." : "Logout"}
		</Button>
	);
}