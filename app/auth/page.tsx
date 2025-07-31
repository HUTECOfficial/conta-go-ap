"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AuthPage() {
  // Funciones de login extremadamente simples
  function loginAsAdmin() {
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        id: "admin-id",
        name: "Ana Gómez",
        email: "admin@contago.com",
        hasEfirma: true,
        lineaCaptura: "",
        isAdmin: true,
      }),
    )
    window.location.href = "/dashboard"
  }

  function loginAsUser() {
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        id: "user-id",
        name: "Juan Pérez",
        email: "usuario@contago.com",
        hasEfirma: false,
        lineaCaptura: "LC-2023-001-002-003",
        isAdmin: false,
      }),
    )
    window.location.href = "/dashboard"
  }

  return (
    <div className="container mx-auto py-16">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Acceso a ContaGo</h1>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Acceso Rápido</h2>
            <p className="mb-4">Selecciona un tipo de usuario para iniciar sesión:</p>

            <div className="space-y-4">
              <Button onClick={loginAsAdmin} className="w-full bg-[rgb(0,100,80)] hover:bg-[rgb(0,80,60)]">
                Entrar como Administrador
              </Button>

              <Button onClick={loginAsUser} className="w-full">
                Entrar como Usuario
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
      </div>
    </div>
  )
}

