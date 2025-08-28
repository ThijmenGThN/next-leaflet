import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { isLoggedIn } from "@/functions/auth/users";

export default async function Template({ children }: { children: ReactNode }) {
	if (await isLoggedIn()) redirect("/dash");

	return <>{children}</>;
}
