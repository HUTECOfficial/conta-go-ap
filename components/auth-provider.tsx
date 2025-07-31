"use client"

import type React from "react"
import { createContext, useState, useEffect } from "react"

// Tipo simplificado
type UserProfile = {
  id: string
  name: string
  email: string
  hasEfirma: boolean
  lineaCaptura: string
  isAdmin: boolean
}

type AuthContextType = {
  user: UserProfile | null
  isAdmin: boolean
  logout: () => void
}

// Valor por defecto simplificado
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  // Efecto simplificado que solo se ejecuta una vez
  useEffect(() => {
    // Intentar leer del localStorage
    try {
      const storedUser = localStorage.getItem("currentUser")
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        setIsAdmin(!!parsedUser.isAdmin)
      }
    } catch (error) {
      console.error("Error al leer usuario:", error)
    }
  }, [])

  // Función de logout simplificada
  const logout = () => {
    localStorage.removeItem("currentUser")
    setUser(null)
    setIsAdmin(false)
    window.location.href = "/"
  }

  return <AuthContext.Provider value={{ user, isAdmin, logout }}>{children}</AuthContext.Provider>
}

