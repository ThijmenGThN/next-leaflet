import { getUser } from "@/features/auth/actions/users";
import { LogoutButton } from "@/features/auth/components/LogoutButton";

export default async function DashboardPage() {
	const user = await getUser();

	if (!user) {
		return <div>Error loading user data</div>;
	}

	return (
		<div className="min-h-screen p-6">
			<div className="max-w-2xl mx-auto">
				<div className="bg-white rounded-lg shadow-md p-6">
					<div className="flex justify-between items-start mb-6">
						<h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
						<LogoutButton />
					</div>

					<div className="space-y-4">
						<div className="border-b pb-4">
							<h2 className="text-xl font-semibold text-gray-800 mb-3">
								User Information
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="text-sm font-medium text-gray-600">
										First Name
									</label>
									<p className="text-lg text-gray-900">
										{user.firstname || "Not provided"}
									</p>
								</div>
								<div>
									<label className="text-sm font-medium text-gray-600">
										Last Name
									</label>
									<p className="text-lg text-gray-900">
										{user.lastname || "Not provided"}
									</p>
								</div>
								<div className="md:col-span-2">
									<label className="text-sm font-medium text-gray-600">
										Email
									</label>
									<p className="text-lg text-gray-900">
										{user.email}
									</p>
								</div>
								<div>
									<label className="text-sm font-medium text-gray-600">
										Role
									</label>
									<p className="text-lg text-gray-900 capitalize">
										{user.role || "user"}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}