"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUser } from "@/features/auth/actions/users";
import type { User } from "@/types/payload-types";

export default function Form({ user }: { user: User }) {
	const [firstName, setFirstName] = useState(user.firstname || "");
	const [lastName, setLastName] = useState(user.lastname || "");
	const [isSaving, setIsSaving] = useState(false);
	const [message, setMessage] = useState<{
		text: string;
		type: "success" | "error";
	} | null>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSaving(true);
		setMessage(null);

		try {
			const success = await updateUser({
				firstname: firstName,
				lastname: lastName,
			});

			if (success) {
				setMessage({
					text: "Profile updated successfully",
					type: "success",
				});
			} else {
				setMessage({
					text: "Failed to update profile",
					type: "error",
				});
			}
		} catch {
			setMessage({
				text: "An error occurred while updating your profile",
				type: "error",
			});
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold">Profile</h1>
				<p className="text-muted-foreground">
					Manage your personal information
				</p>
			</div>

			{message && (
				<p className={`text-sm ${message.type === "error" ? "text-destructive" : "text-green-600"}`}>
					{message.text}
				</p>
			)}

			<form onSubmit={handleSubmit} className="space-y-4 max-w-md">
				<div className="grid gap-4 sm:grid-cols-2">
					<div>
						<Label htmlFor="firstName">First name</Label>
						<Input
							id="firstName"
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							placeholder="Enter your first name"
						/>
					</div>
					<div>
						<Label htmlFor="lastName">Last name</Label>
						<Input
							id="lastName"
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							placeholder="Enter your last name"
						/>
					</div>
				</div>

				<div>
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						type="email"
						value={user.email}
						disabled
						className="bg-muted"
					/>
					<p className="text-sm text-muted-foreground">
						Email cannot be changed
					</p>
				</div>

				<Button type="submit" disabled={isSaving}>
					{isSaving ? "Saving..." : "Save changes"}
				</Button>
			</form>
		</div>
	);
}
