import { Email } from "@convex-dev/auth/providers/Email"
import { internal } from "./_generated/api"

/**
 * Email provider for password reset functionality
 * Calls an internal Node.js action that uses nodemailer to send emails
 */
export const EmailPasswordReset = Email({
	// @ts-expect-error - Convex Auth passes ctx as second parameter even though it's not in Auth.js types
	async sendVerificationRequest(params, ctx) {
		const { identifier: email, token } = params

		try {
			// Call the internal Node.js action to send the email
			await ctx.runAction(internal.sendEmail.sendPasswordResetEmail, {
				email,
				token,
			})

			console.log("Password reset email request sent for:", email)
		} catch (error) {
			console.error("Error sending password reset email:", error)
			throw new Error(
				`Failed to send password reset email: ${error instanceof Error ? error.message : "Unknown error"}`,
			)
		}
	},
})
