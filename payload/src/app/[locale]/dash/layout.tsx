import { redirect } from "next/navigation";
import { isLoggedIn } from "@/features/auth/actions/user";

export default async function DashLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	if (!await isLoggedIn()) redirect("/login");

	return <>{children}</>;
}