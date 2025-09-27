"use client";

import { useState } from "react";
import { useRouter } from "@/locales/navigation";
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
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const clearMessages = () => {
		setErrorMessage(null);
		setSuccessMessage(null);
	};

	const login = async (data: LoginFormData) => {
		setIsLoading(true);
		clearMessages();

		const result = await loginUser(data);

		if (result.success && result.user) {
			router.push("/dash");
		} else {
			setErrorMessage(result.message || "Invalid email or password");
		}

		setIsLoading(false);
	};

	const register = async (data: RegisterFormData) => {
		setIsLoading(true);
		clearMessages();

		try {
			const user = await createUser({
				email: data.email,
				password: data.password,
				firstname: data.firstname,
				lastname: data.lastname,
			});

			if (!user) {
				setErrorMessage("Failed to create account. Email may already be in use.");
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
				router.push("/login");
			}
		} catch {
			setErrorMessage("An unexpected error occurred. Please try again.");
			setIsLoading(false);
		}
	};

	const forgotPasswordHandler = async (data: ForgotPasswordFormData) => {
		setIsLoading(true);
		clearMessages();

		try {
			await forgotPassword(data.email);
			setSuccessMessage("If an account with that email exists, we've sent you a reset link.");
		} catch {
			setErrorMessage("An error occurred. Please try again.");
		}

		setIsLoading(false);
	};

	const resetPasswordHandler = async (token: string, data: ResetPasswordFormData) => {
		setIsLoading(true);
		clearMessages();

		const result = await resetPassword({ token, password: data.password });

		if (result) {
			router.push("/login");
		} else {
			setErrorMessage("An error occurred. Please try again.");
		}

		setIsLoading(false);
	};

	return {
		isLoading,
		errorMessage,
		successMessage,
		clearMessages,
		login,
		register,
		forgotPassword: forgotPasswordHandler,
		resetPassword: resetPasswordHandler,
	};
}