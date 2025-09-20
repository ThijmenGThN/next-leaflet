"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/locales/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { ForgotPasswordFormData, ResetPasswordFormData } from "@/features/auth/types/auth";

interface ResetPasswordFlowProps {
	token?: string | null;
}

export default function ResetPasswordFlow({ token }: ResetPasswordFlowProps) {
	const forgotPasswordForm = useForm<ForgotPasswordFormData>();
	const resetPasswordForm = useForm<ResetPasswordFormData>();

	const { isLoading, errorMessage, successMessage, forgotPassword, resetPassword } = useAuth();

	const onForgotPasswordSubmit = async (data: ForgotPasswordFormData) => {
		await forgotPassword(data);
		if (!errorMessage) {
			forgotPasswordForm.reset();
		}
	};

	const onResetPasswordSubmit = async (data: ResetPasswordFormData) => {
		if (token) {
			await resetPassword(token, data);
			if (!errorMessage) {
				resetPasswordForm.reset();
			}
		}
	};

	const watchPassword = resetPasswordForm.watch("password");

	return (
		<>
			<h1 className="text-2xl mb-6">
				{token ? "Reset Password" : "Forgot Password"}
			</h1>

			{errorMessage && (
				<p className="text-sm text-destructive mb-4">{errorMessage}</p>
			)}

			{successMessage && (
				<p className="text-sm text-green-600 mb-4">{successMessage}</p>
			)}

			{!token ? (
				<form
					onSubmit={forgotPasswordForm.handleSubmit(onForgotPasswordSubmit)}
					className="space-y-4"
				>
					<div>
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
						{isLoading ? "Sending..." : "Send Reset Link"}
					</Button>
				</form>
			) : (
				<form
					onSubmit={resetPasswordForm.handleSubmit(onResetPasswordSubmit)}
					className="space-y-4"
				>
					<div>
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

					<div>
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
						{isLoading ? "Resetting..." : "Reset Password"}
					</Button>
				</form>
			)}

			<p className="text-center text-sm mt-4">
				<Link href="/login" className="text-primary underline">
					Back to Login
				</Link>
			</p>
		</>
	);
}