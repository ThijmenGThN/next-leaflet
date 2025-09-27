"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";
import { updateProfile } from "@/features/profile/actions/profile";
import type { User } from "@/shared/types/payload-types";
import type { UpdateProfileFormData } from "@/features/profile/types/profile";

interface ProfileCardProps {
	user: Partial<User>;
}

export default function ProfileCard({ user }: ProfileCardProps) {
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isDirty },
	} = useForm<UpdateProfileFormData>({
		defaultValues: {
			firstname: user.firstname || "",
			lastname: user.lastname || "",
		}
	});

	const onSubmit = async (data: UpdateProfileFormData) => {
		setIsLoading(true);

		try {
			const success = await updateProfile({
				...data,
				userId: user.id!
			});

			if (success) {
				toast.success("Profile updated successfully!");
				// Reset form with new values to mark as clean (not dirty)
				reset({
					firstname: data.firstname,
					lastname: data.lastname,
				});
			} else {
				toast.error("Failed to update profile. Please try again.");
			}
		} catch {
			toast.error("An error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Card>
			<CardContent className="pt-6">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="space-y-6">
						<div className="text-center space-y-2">
							<p className="text-2xl font-bold text-foreground">Welcome to the Dashboard</p>
							<p className="text-muted-foreground">Your profile information is displayed below.</p>
						</div>

						<div className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="firstname" className="text-sm font-medium text-muted-foreground">
										First name
									</Label>
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
									<Label htmlFor="lastname" className="text-sm font-medium text-muted-foreground">
										Last name
									</Label>
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

							<div className="space-y-1">
								<label className="text-sm font-medium text-muted-foreground">
									Email
								</label>
								<p className="text-foreground">
									{user.email}
								</p>
							</div>
							<div className="space-y-1">
								<label className="text-sm font-medium text-muted-foreground">
									Role
								</label>
								<p className="text-foreground capitalize">
									{user.role || "user"}
								</p>
							</div>
						</div>

						<div className="pt-4 border-t border-border">
							<div className="flex gap-3">
								<Button
									type="submit"
									variant="default"
									className="flex-1"
									disabled={isLoading || !isDirty}
								>
									{isLoading ? "Updating..." : "Update Profile"}
								</Button>
								<Button asChild variant="outline" className="flex-1">
									<Link href="/login">
										Logout
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}