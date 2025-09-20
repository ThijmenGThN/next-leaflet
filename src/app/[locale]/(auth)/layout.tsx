import { redirect } from "next/navigation";
import { logoutUser } from "@/features/auth/actions/logout";
import { isLoggedIn } from "@/features/auth/actions/users";

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	if (await isLoggedIn()) redirect("/dash");

	await logoutUser();

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="w-full max-w-md p-6">
				{children}
			</div>
		</div>
	);
}