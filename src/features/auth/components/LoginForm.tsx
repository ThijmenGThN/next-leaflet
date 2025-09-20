"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/locales/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { LoginFormData } from "@/features/auth/types/auth";

export default function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>();

	const { isLoading, errorMessage, login } = useAuth();

	return (
		<>
			<h1 className="text-2xl mb-6">Login</h1>

			<form onSubmit={handleSubmit(login)} className="space-y-4">
				<div>
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						type="email"
						autoComplete="email"
						placeholder="john.doe@example.com"
						{...register("email", {
							required: "Email is required",
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: "Invalid email address",
							},
						})}
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
						type="password"
						autoComplete="current-password"
						{...register("password", { required: "Password is required" })}
						disabled={isLoading}
					/>
					{errors.password && (
						<p className="text-sm text-destructive">
							{errors.password.message}
						</p>
					)}
					<Link href="/reset" className="text-sm text-primary underline">
						Forgot password?
					</Link>
				</div>

				<Button type="submit" className="w-full" disabled={isLoading}>
					{isLoading ? "Signing in..." : "Sign in"}
				</Button>

				{errorMessage && (
					<p className="text-sm text-destructive">{errorMessage}</p>
				)}

				<p className="text-center text-sm">
					Don&apos;t have an account?{" "}
					<Link href="/register" className="text-primary underline">
						Register
					</Link>
				</p>
			</form>
		</>
	);
}