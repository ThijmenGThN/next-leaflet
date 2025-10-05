import { Email } from "@convex-dev/auth/providers/Email"
import { Password } from "@convex-dev/auth/providers/Password"
import { convexAuth } from "@convex-dev/auth/server"

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
	providers: [
		Password({
			reset: Email({
				id: "password-reset",
				sendVerificationRequest: async (params) => {
					const domain = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000"
					const response = await fetch(`${domain}/api/send-reset-email`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							email: params.identifier,
							token: params.token,
						}),
					})

					if (!response.ok) {
						throw new Error("Failed to send reset email")
					}
				},
			}),
			profile(params) {
				return {
					email: params.email as string,
					name: params.name as string,
				}
			},
		}),
	],
})
