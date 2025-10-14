/**
 * Setup Script for Convex Authentication
 *
 * This script configures your Convex backend with the necessary environment variables
 * for authentication to work. It runs automatically before `npm run dev`.
 *
 * What it does:
 * 1. Transfers SMTP email settings from .env to Convex
 * 2. Generates JWT signing keys and stores them in .env (also syncs to Convex)
 * 3. Sets the site URL for auth redirects
 *
 * Note: JWT keys in .env act as the "setup completed" marker - if they exist,
 * key regeneration is skipped on subsequent runs.
 */

import { spawnSync } from "child_process"
import { config as loadEnvFile } from "dotenv"
import fs from "fs"
import { exportJWK, exportPKCS8, generateKeyPair } from "jose"

// ============================================================================
// STEP 1: Load local environment variables
// ============================================================================

// Exit early if .env doesn't exist yet
if (!fs.existsSync(".env")) {
	process.exit(0)
}

// Load .env variables into a config object
const config = {}
loadEnvFile({ path: ".env", processEnv: config })

// Check if we should only run once (--once flag from package.json predev hook)
const runOnceWorkflow = process.argv.includes("--once")

// ============================================================================
// STEP 2: Configure SMTP for emails
// ============================================================================

if (config.SMTP_HOST || config.SMTP_USER || config.SMTP_PASS) {
	console.log("Setting SMTP environment variables...")

	const smtpVars = {
		SMTP_HOST: config.SMTP_HOST,
		SMTP_PORT: config.SMTP_PORT || "587",
		SMTP_USER: config.SMTP_USER,
		SMTP_PASS: config.SMTP_PASS,
		MAIL_DEFAULT_NAME: config.MAIL_DEFAULT_NAME || "next-leaflet",
		MAIL_DEFAULT_ADDRESS: config.MAIL_DEFAULT_ADDRESS || config.SMTP_USER,
	}

	// Transfer each SMTP variable to Convex environment
	for (const [key, value] of Object.entries(smtpVars)) {
		if (value) {
			setConvexEnvVar(key, value)
		}
	}
} else {
	console.log("No SMTP configuration found in .env, skipping SMTP setup...")
}

// ============================================================================
// STEP 3: Check if setup already completed (avoid regenerating JWT keys)
// ============================================================================

// If JWT keys already exist in .env, skip regeneration
if (runOnceWorkflow && config.JWT_PRIVATE_KEY && config.JWKS) {
	// Still sync them to Convex in case they're missing there
	setConvexEnvVar("JWT_PRIVATE_KEY", config.JWT_PRIVATE_KEY, true)
	setConvexEnvVar("JWKS", config.JWKS, true)

	const siteUrl = config.NEXT_PUBLIC_DOMAIN || "http://localhost:3000"
	setConvexEnvVar("SITE_URL", siteUrl, true)

	process.exit(0)
}

// ============================================================================
// STEP 4: Run Convex Auth CLI (for OAuth providers like Google/GitHub)
// ============================================================================
// Note: This template uses password auth by default, not OAuth

const result = spawnSync("npx", ["@convex-dev/auth", "--skip-git-check"], {
	stdio: "pipe", // Suppress output unless there's an error
})

if (result.status !== 0) {
	// Silent failure - OAuth setup is optional
}

// ============================================================================
// STEP 5: Set site URL for authentication redirects
// ============================================================================

const siteUrl = config.NEXT_PUBLIC_DOMAIN || "http://localhost:3000"
setConvexEnvVar("SITE_URL", siteUrl)

// ============================================================================
// STEP 6: Generate JWT keys for authentication tokens
// ============================================================================

// Generate RSA-256 key pair (industry standard for JWT signing)
const keys = await generateKeyPair("RS256", { extractable: true })

// Private key: Used by Convex to SIGN auth tokens (kept secret server-side)
const privateKey = await exportPKCS8(keys.privateKey)
const jwtPrivateKey = privateKey.trimEnd().replace(/\n/g, " ")

// Public key: Used to VERIFY auth tokens (can be shared)
const publicKey = await exportJWK(keys.publicKey)
const jwks = JSON.stringify({ keys: [{ use: "sig", ...publicKey }] })

// Store JWT keys in .env file (these act as the "setup completed" marker)
fs.appendFileSync(".env", `\nJWT_PRIVATE_KEY="${jwtPrivateKey}"\n`)
fs.appendFileSync(".env", `JWKS='${jwks}'\n`)

// Also sync them to Convex environment
setConvexEnvVar("JWT_PRIVATE_KEY", jwtPrivateKey)
setConvexEnvVar("JWKS", jwks)

console.log("✓ Setup complete! Authentication is ready.")

process.exit(0)

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Sets an environment variable in Convex
 * @param {string} key - Environment variable name
 * @param {string} value - Environment variable value
 * @param {boolean} silent - Suppress output (default: false)
 */
function setConvexEnvVar(key, value, silent = false) {
	const result = spawnSync("npx", ["convex", "env", "set", `${key}=${value}`], {
		stdio: silent ? "pipe" : "inherit",
	})

	if (result.status !== 0) {
		console.error(`Failed to set ${key} in Convex`)
		process.exit(result.status)
	}
}
