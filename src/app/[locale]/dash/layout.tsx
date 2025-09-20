import { headers as getHeaders } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import Layout from "@/features/dashboard/components/Layout";
import { getPayload } from "@/lib/payload";

export default async function Layout({ children }: { children: ReactNode }) {
	const headers = await getHeaders();
	const payload = await getPayload();
	const { user } = await payload.auth({ headers });

	if (!user) redirect("/login");

	return <Layout user={user}>{children}</Layout>;
}
