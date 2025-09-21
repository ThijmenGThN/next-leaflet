"use server";

import { getPayload } from "@/lib/payload";

export async function loginUser(data: { email: string; password: string }) {
	const payload = await getPayload();

	try {
		const result = await payload.login({
			collection: "users",
			data,
		});

		return {
			success: true,
			user: result.user,
		};
	} catch (error) {
		console.error("Login error:", error);
		return {
			success: false,
			message: "Invalid email or password",
		};
	}
}