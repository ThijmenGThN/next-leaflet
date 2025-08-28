import { redirect } from "next/navigation";
import { getUser } from "@/functions/auth/users";
import type { User } from "@/types/payload-types";
import Client from "./Client";

export default async function Page() {
	const user = await getUser();

	if (!user) return redirect("/login");

	return <Client user={user as User} />;
}
