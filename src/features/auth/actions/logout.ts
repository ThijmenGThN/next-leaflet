"use server";

import { headers as nextHeaders } from "next/headers";
import { getPayload } from "@/lib/payload";

export async function logoutUser() {
	try {
		const payload = await getPayload();
		const headers = await nextHeaders();
		await payload.logout({ headers });
	} catch (error) {
		console.error("Logout error:", error);
	}
}