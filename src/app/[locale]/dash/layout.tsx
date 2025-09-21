import { redirect } from "next/navigation";
import { isLoggedIn } from "@/features/auth/actions/users";

export default async function DashLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	if (!(await isLoggedIn())) {
		redirect("/login");
	}

	return <>{children}</>;
}