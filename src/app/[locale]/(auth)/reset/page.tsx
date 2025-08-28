"use client";

import { ArrowLeft, KeyRound } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useRouter } from "@/locales/navigation";

type ForgotPasswordFormData = {
	email: string;
};

type ResetPasswordFormData = {
	password: string;
	confirmPassword: string;
};

export default function Page() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const forgotPasswordForm = useForm<ForgotPasswordFormData>();
	const resetPasswordForm = useForm<ResetPasswordFormData>();

	const onForgotPasswordSubmit = async ({ email }: ForgotPasswordFormData) => {
		setIsLoading(true);
		setErrorMessage(null);
		setSuccessMessage(null);

		try {
			const req = await fetch(`/api/users/forgot-password`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});

			if (req.ok) {
				setSuccessMessage(
					"If an account with that email exists, we've sent you a reset link.",
				);
				forgotPasswordForm.reset();
			} else {
				const data = await req.json();
				setErrorMessage(data.message || "An error occurred. Please try again.");
			}
		} catch {
			setErrorMessage("An unexpected error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const onResetPasswordSubmit = async ({ password }: ResetPasswordFormData) => {
		setIsLoading(true);
		setErrorMessage(null);
		setSuccessMessage(null);

		try {
			const req = await fetch(`/api/users/reset-password`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ token, password }),
			});

			if (req.ok) {
				resetPasswordForm.reset();
				router.push("/login");
			} else {
				const data = await req.json();
				setErrorMessage(data.message || "An error occurred. Please try again.");
			}
		} catch {
			setErrorMessage("An unexpected error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const watchPassword = resetPasswordForm.watch("password");

	return (
		<div className="min-h-screen flex items-center justify-center bg-background">
			<Card className="w-full max-w-sm">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl">
						{token ? "Reset Password" : "Forgot Password"}
					</CardTitle>
					<CardDescription>
						{token
							? "Enter your new password below"
							: "Enter your email address and we'll send you a reset link"}
					</CardDescription>
				</CardHeader>
				<CardContent>
					{errorMessage && (
						<Alert variant="destructive" className="mb-4">
							<AlertDescription>{errorMessage}</AlertDescription>
						</Alert>
					)}

					{successMessage && (
						<Alert className="mb-4">
							<AlertDescription>{successMessage}</AlertDescription>
						</Alert>
					)}

					{!token ? (
						<form
							onSubmit={forgotPasswordForm.handleSubmit(onForgotPasswordSubmit)}
							className="space-y-4"
						>
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									autoComplete="email"
									placeholder="john.doe@example.com"
									{...forgotPasswordForm.register("email", {
										required: "Email is required",
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
											message: "Invalid email address",
										},
									})}
									disabled={isLoading}
								/>
								{forgotPasswordForm.formState.errors.email && (
									<p className="text-sm text-destructive">
										{forgotPasswordForm.formState.errors.email.message}
									</p>
								)}
							</div>

							<Button type="submit" className="w-full" disabled={isLoading}>
								{isLoading ? (
									<>
										<svg
											className="animate-spin -ml-1 mr-2 h-4 w-4"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
										Sending...
									</>
								) : (
									<>
										<KeyRound className="mr-2 h-4 w-4" />
										Send Reset Link
									</>
								)}
							</Button>
						</form>
					) : (
						<form
							onSubmit={resetPasswordForm.handleSubmit(onResetPasswordSubmit)}
							className="space-y-4"
						>
							<div className="space-y-2">
								<Label htmlFor="password">New Password</Label>
								<Input
									id="password"
									type="password"
									autoComplete="new-password"
									{...resetPasswordForm.register("password", {
										required: "Password is required",
										minLength: {
											value: 8,
											message: "Password must be at least 8 characters",
										},
									})}
									disabled={isLoading}
								/>
								{resetPasswordForm.formState.errors.password && (
									<p className="text-sm text-destructive">
										{resetPasswordForm.formState.errors.password.message}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="confirmPassword">Confirm New Password</Label>
								<Input
									id="confirmPassword"
									type="password"
									autoComplete="new-password"
									{...resetPasswordForm.register("confirmPassword", {
										required: "Please confirm your password",
										validate: (value) =>
											value === watchPassword || "Passwords do not match",
									})}
									disabled={isLoading}
								/>
								{resetPasswordForm.formState.errors.confirmPassword && (
									<p className="text-sm text-destructive">
										{resetPasswordForm.formState.errors.confirmPassword.message}
									</p>
								)}
							</div>

							<Button type="submit" className="w-full" disabled={isLoading}>
								{isLoading ? (
									<>
										<svg
											className="animate-spin -ml-1 mr-2 h-4 w-4"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
										Resetting...
									</>
								) : (
									<>
										<KeyRound className="mr-2 h-4 w-4" />
										Reset Password
									</>
								)}
							</Button>
						</form>
					)}

					<div className="text-center text-sm mt-4">
						<Link
							href="/login"
							className="text-primary underline inline-flex items-center"
						>
							<ArrowLeft className="mr-1 h-3 w-3" />
							Back to Login
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
