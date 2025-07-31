"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Evitar hidratación incorrecta
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-10 h-10 rounded-full transition-all duration-300 ease-in-out"
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      <Sun
        className={`h-6 w-6 rotate-0 scale-100 transition-all ${isDark ? "opacity-0 scale-0" : "opacity-100 scale-100"}`}
      />
      <Moon
        className={`absolute h-6 w-6 rotate-90 scale-0 transition-all ${isDark ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
      />
      <span className="sr-only">Cambiar tema</span>
    </Button>
  )
}

