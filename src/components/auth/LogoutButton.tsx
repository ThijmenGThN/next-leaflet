"use client"

import { signOut } from "@/convex/auth"

export default function LogoutButton() {
	return <button onClick={signOut}>Logout</button>
}
