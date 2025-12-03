"use client"

import { useQuery } from "convex/react"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { api } from "@/../convex/_generated/api"

// Centralized route configuration
export const ROUTE_CONFIG = {
	
	// Where to redirect after successful authentication
	DEFAULT_AUTHENTICATED_ROUTE: "/dash",

	// Where to redirect when authentication is required
	DEFAULT_UNAUTHENTICATED_ROUTE: "/login",

	// Routes that require authentication (supports glob patterns)
	PROTECTED_ROUTES: ["/dash"],

	// Routes that should redirect authenticated users away (login, register, etc.)
	AUTH_ROUTES: ["/login", "/register", "/reset"],

} as const

interface RouteGuardProps {
	children: React.ReactNode
	loadingComponent?: React.ReactNode
}

export function RouteGuard({ children, loadingComponent }: RouteGuardProps) {
	const user = useQuery(api.users.current)
	const router = useRouter()
	const pathname = usePathname()

	const isProtectedRoute = ROUTE_CONFIG.PROTECTED_ROUTES.some((route) =>
		pathname.startsWith(route),
	)
	const isAuthRoute = ROUTE_CONFIG.AUTH_ROUTES.some((route) => pathname.startsWith(route))

	useEffect(() => {
		// Wait for the query to resolve
		if (user === undefined) {
			return
		}

		const isAuthenticated = user !== null

		// Redirect authenticated users away from auth pages
		if (isAuthenticated && isAuthRoute) {
			router.push(ROUTE_CONFIG.DEFAULT_AUTHENTICATED_ROUTE)
			return
		}

		// Redirect unauthenticated users away from protected pages
		if (!isAuthenticated && isProtectedRoute) {
			router.push(ROUTE_CONFIG.DEFAULT_UNAUTHENTICATED_ROUTE)
			return
		}
	}, [user, router, pathname, isProtectedRoute, isAuthRoute])

	// Show loading while checking authentication
	if (user === undefined) {
		return (
			loadingComponent || (
				<div className="min-h-screen bg-background flex items-center justify-center">
					<p className="text-muted-foreground">Loading...</p>
				</div>
			)
		)
	}

	const isAuthenticated = user !== null

	// Show loading during redirect
	if ((isAuthenticated && isAuthRoute) || (!isAuthenticated && isProtectedRoute)) {
		return (
			loadingComponent || (
				<div className="min-h-screen bg-background flex items-center justify-center">
					<p className="text-muted-foreground">Redirecting...</p>
				</div>
			)
		)
	}

	// Route is accessible, render children
	return <>{children}</>
}
