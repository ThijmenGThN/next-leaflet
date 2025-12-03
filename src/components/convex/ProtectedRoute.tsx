"use client"

import { useQuery } from "convex/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { api } from "@/../convex/_generated/api"

interface ProtectedRouteProps {
	children: React.ReactNode
	redirectTo?: string
	loadingComponent?: React.ReactNode
}

export function ProtectedRoute({
	children,
	redirectTo = "/login",
	loadingComponent,
}: ProtectedRouteProps) {
	const user = useQuery(api.users.current)
	const router = useRouter()

	useEffect(() => {
		// Wait for the query to resolve
		if (user === undefined) {
			return // Still loading
		}

		// If not authenticated, redirect to specified path
		if (user === null) {
			router.push(redirectTo)
		}
	}, [user, router, redirectTo])

	// Show loading state while checking authentication
	if (user === undefined || user === null) {
		return (
			loadingComponent || (
				<div className="min-h-screen bg-background flex items-center justify-center">
					<p className="text-muted-foreground">Loading...</p>
				</div>
			)
		)
	}

	// User is authenticated, render the protected content
	return <>{children}</>
}
