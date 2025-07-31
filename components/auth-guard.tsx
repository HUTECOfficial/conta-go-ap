"use client"

import type React from "react"
import { useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      window.location.href = "/auth"
    }
  }, [user])

  if (!user) {
    return null
  }

  return <>{children}</>
}

