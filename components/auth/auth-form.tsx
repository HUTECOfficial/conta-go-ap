"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

// Importamos directamente las funciones de autenticación
import { signIn } from "@/lib/auth"

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Función simplificada para iniciar sesión directamente
  const handleDirectLogin = async (userType: "admin" | "user") => {
    setIsLoading(true)

    try {
      // Credenciales predefinidas
      const email = userType === "admin" ? "admin@contago.com" : "usuario@contago.com"
      const password = userType === "admin" ? "admin123" : "usuario123"

      // Llamada directa a la función de autenticación
      const { profile } = await signIn(email, password)

      if (profile) {
        // Redirigimos inmediatamente al dashboard
        window.location.href = "/dashboard"
      } else {
        console.error("No se pudo obtener el perfil del usuario")
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Error en inicio de sesión:", error)
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-4">Acceso Rápido</h2>
        <p className="mb-4">Selecciona un tipo de usuario para iniciar sesión:</p>

        <div className="space-y-4">
          <Button
            onClick={() => handleDirectLogin("admin")}
            disabled={isLoading}
            className="w-full bg-[rgb(0,100,80)] hover:bg-[rgb(0,80,60)]"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              "Entrar como Administrador"
            )}
          </Button>

          <Button onClick={() => handleDirectLogin("user")} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              "Entrar como Usuario"
            )}
          </Button>
        </div>

        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
          <p className="text-sm font-semibold mb-2">Credenciales:</p>
          <p className="text-xs">
            Admin: <strong>admin@contago.com</strong> / <strong>admin123</strong>
          </p>
          <p className="text-xs">
            Usuario: <strong>usuario@contago.com</strong> / <strong>usuario123</strong>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

