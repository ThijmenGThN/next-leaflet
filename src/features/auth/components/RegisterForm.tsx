"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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

	const { isLoading, errorMessage, register: registerUser } = useAuth();

	const password = watch("password");

	return (
		<>
			<h1 className="text-2xl mb-6">Create an account</h1>

			{errorMessage && (
				<p className="text-sm text-destructive mb-4">{errorMessage}</p>
			)}

			<form onSubmit={handleSubmit(registerUser)} className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div>
						<Label htmlFor="firstname">First name</Label>
						<Input
							id="firstname"
							{...register("firstname", {
								required: "First name is required",
							})}
							placeholder="John"
							disabled={isLoading}
						/>
						{errors.firstname && (
							<p className="text-sm text-destructive">
								{errors.firstname.message}
							</p>
						)}
					</div>

					<div>
						<Label htmlFor="lastname">Last name</Label>
						<Input
							id="lastname"
							{...register("lastname", {
								required: "Last name is required",
							})}
							placeholder="Doe"
							disabled={isLoading}
						/>
						{errors.lastname && (
							<p className="text-sm text-destructive">
								{errors.lastname.message}
							</p>
						)}
					</div>
				</div>

				<div>
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
						placeholder="john.doe@example.com"
						disabled={isLoading}
					/>
					{errors.email && (
						<p className="text-sm text-destructive">
							{errors.email.message}
						</p>
					)}
				</div>

				<div>
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

				<div>
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

				<p className="text-center text-sm">
					Already have an account?{" "}
					<Link href="/login" className="text-primary underline">
						Login
					</Link>
				</p>
			</form>
		</>
	);
}