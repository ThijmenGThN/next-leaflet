import type { LoginFormData, ForgotPasswordFormData, AuthResponse } from "@/features/auth/types/auth";

class AuthServiceClass {
	private async handleResponse(response: Response): Promise<AuthResponse> {
		const data = await response.json();

		if (!response.ok) {
			return {
				success: false,
				message: data.message || "An error occurred"
			};
		}

		return {
			success: true,
			user: data.user,
			message: data.message
		};
	}

	async login({ email, password }: LoginFormData): Promise<AuthResponse> {
		try {
			const response = await fetch("/api/users/login", {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			return this.handleResponse(response);
		} catch {
			return {
				success: false,
				message: "An unexpected error occurred. Please try again."
			};
		}
	}

	async forgotPassword({ email }: ForgotPasswordFormData): Promise<AuthResponse> {
		try {
			const response = await fetch("/api/users/forgot-password", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});

			return this.handleResponse(response);
		} catch {
			return {
				success: false,
				message: "An unexpected error occurred. Please try again."
			};
		}
	}

	async resetPassword(token: string, password: string): Promise<AuthResponse> {
		try {
			const response = await fetch("/api/users/reset-password", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ token, password }),
			});

			return this.handleResponse(response);
		} catch {
			return {
				success: false,
				message: "An unexpected error occurred. Please try again."
			};
		}
	}
}

export const AuthService = new AuthServiceClass();