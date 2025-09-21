import { getUser } from "@/features/auth/actions/users";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
	const user = await getUser();

	if (!user) redirect("/login");

	return (
		<div className="min-h-screen bg-background flex items-center justify-center">
			<div className="w-full max-w-md px-6">
				<Card>
					<CardContent className="pt-6">
						<div className="space-y-6">
							<div className="text-center space-y-2">
								<p className="text-2xl font-bold text-foreground">Dashboard</p>
								<p className="text-muted-foreground">Welcome back!</p>
							</div>

							<div className="space-y-4">
								<div className="space-y-1">
									<label className="text-sm font-medium text-muted-foreground">
										Name
									</label>
									<p className="text-foreground">
										{[user.firstname, user.lastname].filter(Boolean).join(" ") || "Not provided"}
									</p>
								</div>
								<div className="space-y-1">
									<label className="text-sm font-medium text-muted-foreground">
										Email
									</label>
									<p className="text-foreground">
										{user.email}
									</p>
								</div>
								<div className="space-y-1">
									<label className="text-sm font-medium text-muted-foreground">
										Role
									</label>
									<p className="text-foreground capitalize">
										{user.role || "user"}
									</p>
								</div>
							</div>

							<div className="pt-4 border-t border-border">
								<Button asChild variant="outline" className="w-full">
									<Link href="/login">
										Logout
									</Link>
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}