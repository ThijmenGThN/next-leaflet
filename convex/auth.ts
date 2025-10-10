import { Email } from "@convex-dev/auth/providers/Email"
import { Password } from "@convex-dev/auth/providers/Password"
import { convexAuth } from "@convex-dev/auth/server"

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
	providers: [
		Password({
			reset: Email({
				sendVerificationRequest: async ({ expires, identifier, token }) => {
					console.log({ expires, identifier, token })
				}
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
