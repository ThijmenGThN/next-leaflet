import { redirect } from "next/navigation";
import { getUser } from "@/features/auth/actions/users";
import type { User } from "@/types/payload-types";
import Form from "@/features/profile/components/Form";

export default async function Page() {
	const user = await getUser();

	if (!user) return redirect("/login");

	return <Form user={user as User} />;
}
