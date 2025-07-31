"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/hooks/use-auth"

export function MainNav() {
  const { user, logout } = useAuth()

  return (
    <header className="h-16 flex items-center justify-between px-4 bg-white dark:bg-gray-800 sticky top-0 z-40">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          <span className="text-[rgb(0,100,80)]">Conta</span> Go
        </Link>

        <div className="flex items-center space-x-4">
          <ThemeToggle />

          {user ? (
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Button onClick={logout}>Cerrar Sesión</Button>
            </div>
          ) : (
            <Link href="/auth">
              <Button>Iniciar Sesión</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

