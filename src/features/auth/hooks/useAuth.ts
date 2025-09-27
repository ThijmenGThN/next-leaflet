"use client";

import { useState } from "react";
import { useRouter } from "@/locales/navigation";
import { toast } from "sonner";
import { createUser, loginUser, forgotPassword, resetPassword } from "@/features/auth/actions/user";
import type {
	LoginFormData,
	RegisterFormData,
	ForgotPasswordFormData,
	ResetPasswordFormData
} from "@/features/auth/types/auth";

export function useAuth() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const login = async (data: LoginFormData) => {
		setIsLoading(true);

		const result = await loginUser(data);

		if (result.success && result.user) {
			router.push("/dash");
		} else {
			toast.error(result.message || "Invalid email or password");
		}

		setIsLoading(false);
	};

	const register = async (data: RegisterFormData) => {
		setIsLoading(true);

		try {
			const user = await createUser({
				email: data.email,
				password: data.password,
				firstname: data.firstname,
				lastname: data.lastname,
			});

			if (!user) {
				toast.error("Failed to create account. Email may already be in use.");
				setIsLoading(false);
				return;
			}

			const loginResult = await loginUser({
				email: data.email,
				password: data.password,
			});

			if (loginResult.success) {
				router.push("/dash");
			} else {
				toast.error("Account created but login failed. Please try signing in.");
				router.push("/login");
			}
		} catch {
			toast.error("An unexpected error occurred. Please try again.");
			setIsLoading(false);
		}
	};

	const forgotPasswordHandler = async (data: ForgotPasswordFormData) => {
		setIsLoading(true);

		try {
			await forgotPassword(data.email);
			toast.success("If an account with that email exists, we've sent you a reset link.");
		} catch {
			toast.error("An error occurred. Please try again.");
		}

		setIsLoading(false);
	};

	const resetPasswordHandler = async (token: string, data: ResetPasswordFormData) => {
		setIsLoading(true);

		const result = await resetPassword({ token, password: data.password });

		if (result) {
			toast.success("Password reset successfully! Please sign in with your new password.");
			router.push("/login");
		} else {
			toast.error("Password reset failed. The link may be expired or invalid.");
		}

		setIsLoading(false);
	};

	return {
		isLoading,
		login,
		register,
		forgotPassword: forgotPasswordHandler,
		resetPassword: resetPasswordHandler,
	};
}