"use server";

import { getPayload } from "@/shared/lib/payload";
import type { UpdateProfileData } from "@/features/profile/types/profile";

export async function updateProfile(data: UpdateProfileData): Promise<boolean> {
	const payload = await getPayload();
	try {
		const result = await payload.update({
			collection: "users",
			id: data.userId,
			data: {
				firstname: data.firstname,
				lastname: data.lastname,
			},
			overrideAccess: true,
		});

		return true;
	} catch (error) {
		console.error("Error updating profile:", error);
		return false;
	}
}