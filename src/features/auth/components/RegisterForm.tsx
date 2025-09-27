"use client";

import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/locales/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { RegisterFormData } from "@/features/auth/types/auth";

export default function RegisterForm() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<RegisterFormData>();

	const { isLoading, register: registerUser } = useAuth();

	const password = watch("password");

	return (
		<div className="space-y-4">
			<Button asChild variant="ghost" size="sm" className="self-start">
				<Link href="/">
					<ArrowLeft className="h-4 w-4 mr-2" />
					Back to home
				</Link>
			</Button>

			<Card>
				<CardContent className="pt-6">
					<div className="space-y-6">
						<div className="text-center space-y-2">
							<h1 className="text-2xl font-bold text-foreground">Create account</h1>
							<p className="text-muted-foreground">Sign up for a new account</p>
						</div>

					<form onSubmit={handleSubmit(registerUser)} className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="firstname">First name</Label>
								<Input
									id="firstname"
									{...register("firstname", {
										required: "First name is required",
									})}
									disabled={isLoading}
								/>
								{errors.firstname && (
									<p className="text-sm text-destructive">
										{errors.firstname.message}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="lastname">Last name</Label>
								<Input
									id="lastname"
									{...register("lastname", {
										required: "Last name is required",
									})}
									disabled={isLoading}
								/>
								{errors.lastname && (
									<p className="text-sm text-destructive">
										{errors.lastname.message}
									</p>
								)}
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								{...register("email", {
									required: "Email is required",
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: "Invalid email address",
									},
								})}
								type="email"
								disabled={isLoading}
							/>
							{errors.email && (
								<p className="text-sm text-destructive">
									{errors.email.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								{...register("password", {
									required: "Password is required",
									minLength: {
										value: 8,
										message: "Password must be at least 8 characters",
									},
								})}
								type="password"
								disabled={isLoading}
							/>
							{errors.password && (
								<p className="text-sm text-destructive">
									{errors.password.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="confirmPassword">Confirm password</Label>
							<Input
								id="confirmPassword"
								{...register("confirmPassword", {
									required: "Please confirm your password",
									validate: (value) =>
										value === password || "Passwords do not match",
								})}
								type="password"
								disabled={isLoading}
							/>
							{errors.confirmPassword && (
								<p className="text-sm text-destructive">
									{errors.confirmPassword.message}
								</p>
							)}
						</div>

						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? "Creating account..." : "Create account"}
						</Button>
					</form>

					<div className="text-center pt-4 border-t border-border">
						<p className="text-sm text-muted-foreground">
							Already have an account?{" "}
							<Link href="/login" className="text-primary hover:underline font-medium">
								Sign in
							</Link>
						</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}