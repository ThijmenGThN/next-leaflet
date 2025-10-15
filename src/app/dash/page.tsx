"use client"

import { useAuthActions } from "@convex-dev/auth/react"
import { useMutation, useQuery } from "convex/react"
import { LogOut, Mail, CheckCircle2, XCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { api } from "@/../convex/_generated/api"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function Page() {
	const { signOut } = useAuthActions()
	const user = useQuery(api.users.current)
	const updateName = useMutation(api.users.updateName)
	const resendVerificationEmail = useMutation(api.users.resendVerificationEmail)
	const [name, setName] = useState("")
	const [isUpdating, setIsUpdating] = useState(false)
	const [isResending, setIsResending] = useState(false)

	useEffect(() => {
		if (user) {
			setName(user.name || "")
		}
	}, [user])

	const handleSave = async () => {
		setIsUpdating(true)
		try {
			await updateName({ name })
			toast.success("Profile updated successfully")
		} catch (error) {
			toast.error("Failed to update profile")
		} finally {
			setIsUpdating(false)
		}
	}

	const handleResendVerification = async () => {
		setIsResending(true)
		try {
			await resendVerificationEmail()
			toast.success("Verification email sent! Please check your inbox.")
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Failed to send verification email")
		} finally {
			setIsResending(false)
		}
	}

	const hasChanges = name !== (user?.name || "")
	const isEmailVerified = user?.emailVerificationTime !== undefined
	return (
		<div className="min-h-screen bg-background flex items-center justify-center">
			<div className="w-full max-w-md px-6">
				<Card>
					<CardContent className="pt-6">
						<div className="space-y-6">
							<div className="text-center space-y-2">
								<p className="text-2xl font-bold text-foreground">Welcome to the Dashboard</p>
								<p className="text-muted-foreground">
									Your profile information is displayed below.
								</p>
							</div>

							<div className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="name">Name</Label>
									<Input
										id="name"
										type="text"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>

								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<Label htmlFor="email">Email</Label>
										{user?.email && (
											<div className="flex items-center gap-2">
												{isEmailVerified ? (
													<Badge variant="outline" className="gap-1.5 border-green-600 text-green-600">
														Verified
													</Badge>
												) : (
													<>
														<Button
															size="sm"
															variant="ghost"
															onClick={handleResendVerification}
															disabled={isResending}
															className="h-7 text-xs px-2"
														>
															<Mail className="h-3 w-3 mr-1.5" />
															{isResending ? "Sending..." : "Unverified, resend?"}
														</Button>
													</>
												)}
											</div>
										)}
									</div>
									<Input id="email" type="email" value={user?.email || ""} disabled />
								</div>
							</div>

							<div className="pt-4 border-t border-border">
								<div className="flex gap-2">
									<Button variant="outline" onClick={() => signOut()} className="flex-1">
										<LogOut className="h-4 w-4 mr-2" />
										Logout
									</Button>
									<ThemeToggle />
									<Button
										className="flex-1"
										onClick={handleSave}
										disabled={!hasChanges || isUpdating}
									>
										{isUpdating ? "Saving..." : "Save"}
									</Button>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
