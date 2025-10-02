"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const updateTheme = useMutation(api.users.updateTheme)

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme)
    updateTheme({ theme: newTheme }).catch(() => {
      // Silently fail if user is not authenticated
    })
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => handleThemeChange(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  )
}
