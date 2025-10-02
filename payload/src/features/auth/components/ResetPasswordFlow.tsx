"use client";

import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Link } from "@/shared/locales/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { ForgotPasswordFormData, ResetPasswordFormData } from "@/features/auth/types/auth";

interface ResetPasswordFlowProps {
	token?: string | null;
}

export default function ResetPasswordFlow({ token }: ResetPasswordFlowProps) {
	const forgotPasswordForm = useForm<ForgotPasswordFormData>();
	const resetPasswordForm = useForm<ResetPasswordFormData>();

	const { isLoading, forgotPassword, resetPassword } = useAuth();

	const onForgotPasswordSubmit = async (data: ForgotPasswordFormData) => {
		await forgotPassword(data);
		forgotPasswordForm.reset();
	};

	const onResetPasswordSubmit = async (data: ResetPasswordFormData) => {
		if (token) {
			await resetPassword(token, data);
		}
	};

	const watchPassword = resetPasswordForm.watch("password");

	return (
		<div className="space-y-4">
			<Button asChild variant="ghost" size="sm" className="self-start">
				<Link href="/login">
					<ArrowLeft className="h-4 w-4 mr-2" />
					Back to login
				</Link>
			</Button>

			<Card>
				<CardContent className="pt-6">
					<div className="space-y-6">
						<div className="text-center space-y-2">
							<h1 className="text-2xl font-bold text-foreground">
								{token ? "Reset Password" : "Forgot Password"}
							</h1>
							<p className="text-muted-foreground">
								{token ? "Enter your new password" : "Enter your email to reset your password"}
							</p>
						</div>

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
									{isLoading ? "Resetting..." : "Reset Password"}
								</Button>
							</form>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}