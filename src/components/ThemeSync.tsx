"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

export function ThemeSync() {
	const { setTheme } = useTheme()
	const user = useQuery(api.users.current)

	useEffect(() => {
		if (user?.theme) {
			setTheme(user.theme)
		}
	}, [user?.theme, setTheme])

	return null
}
