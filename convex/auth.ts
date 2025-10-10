import { Password } from "@convex-dev/auth/providers/Password"
import { convexAuth } from "@convex-dev/auth/server"
import { EmailPasswordReset } from "./emailActions"

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
	providers: [
		Password({
			reset: EmailPasswordReset,
			profile(params) {
				return {
					email: params.email as string,
					name: params.name as string,
				}
			},
		}),
	],
})
