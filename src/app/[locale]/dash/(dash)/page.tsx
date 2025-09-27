import { getUser } from "@/features/auth/actions/user";
import { redirect } from "next/navigation";
import ProfileCard from "@/features/profile/components/ProfileCard";

export default async function DashboardPage() {
	const user = await getUser();

	if (!user) redirect("/login");

	return (
		<div className="min-h-screen bg-background flex items-center justify-center">
			<div className="w-full max-w-md px-6">
				<ProfileCard user={user} />
			</div>
		</div>
	);
}