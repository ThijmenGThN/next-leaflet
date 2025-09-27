"use client";

import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

	const { isLoading, login } = useAuth();

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
							<h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
							<p className="text-muted-foreground">Sign in to your account</p>
						</div>

						<form onSubmit={handleSubmit(login)} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									autoComplete="email"
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

							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<Label htmlFor="password">Password</Label>
									<Link href="/reset" className="text-sm text-primary hover:underline">
										Forgot password?
									</Link>
								</div>
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
							</div>

							<Button type="submit" className="w-full" disabled={isLoading}>
								{isLoading ? "Signing in..." : "Sign in"}
							</Button>
						</form>

						<div className="text-center pt-4 border-t border-border">
							<p className="text-sm text-muted-foreground">
								Don&apos;t have an account?{" "}
								<Link href="/register" className="text-primary hover:underline font-medium">
									Create account
								</Link>
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}