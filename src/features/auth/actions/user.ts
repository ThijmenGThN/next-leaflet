"use server";

import { headers as nextHeaders } from "next/headers";

import type { User } from "@/types/payload-types";

import { getPayload } from "@/lib/payload";

export async function getUser(): Promise<Partial<User> | null> {
	const payload = await getPayload();
	const headers = await nextHeaders();
	const { user } = await payload.auth({ headers });
	return user;
}

export async function isLoggedIn(): Promise<boolean> {
	const user = await getUser();
	return !!user;
}

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

export async function forgotPassword(email: string) {
	const payload = await getPayload();
	try {
		await payload.forgotPassword({
			collection: "users",
			data: { email },
		});
	} catch (error) {
		console.error("Error during forgot password:", error);
		return null;
	}
}

export async function resetPassword(data: {
	token: string;
	password: string;
}): Promise<boolean> {
	const payload = await getPayload();
	try {
		const result = await payload.resetPassword({
			collection: "users",
			data,
			overrideAccess: false,
		});
		return Boolean(result);
	} catch {
		return false;
	}
}

export async function createUser(
	data: Omit<User, "id" | "role" | "updatedAt" | "createdAt">,
): Promise<User | null> {
	const payload = await getPayload();
	try {
		return await payload.create({
			collection: "users",
			data: {
			...data,
			email: data.email?.trim().toLowerCase(),
			role: "user" as const,
		}});
	} catch (error) {
		console.error("Error creating user:", error);
		return null;
	}
}
