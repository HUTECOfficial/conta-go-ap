"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Importamos directamente las funciones de autenticación
import { signIn, signUp } from "@/lib/auth"

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: ""
  })
  const router = useRouter()
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isLogin) {
        // Proceso de login
        const { profile } = await signIn(formData.email, formData.password)
        
        if (profile) {
          toast({
            title: "¡Bienvenido!",
            description: "Has iniciado sesión correctamente.",
          })
          window.location.href = "/dashboard"
        } else {
          toast({
            title: "Error",
            description: "Credenciales incorrectas. Por favor verifica tu email y contraseña.",
            variant: "destructive",
          })
        }
      } else {
        // Proceso de registro
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Error",
            description: "Las contraseñas no coinciden.",
            variant: "destructive",
          })
          setIsLoading(false)
          return
        }

        if (formData.password.length < 6) {
          toast({
            title: "Error",
            description: "La contraseña debe tener al menos 6 caracteres.",
            variant: "destructive",
          })
          setIsLoading(false)
          return
        }

        const { profile } = await signUp(formData.email, formData.password, formData.name)
        
        if (profile) {
          toast({
            title: "¡Registro exitoso!",
            description: "Tu cuenta ha sido creada. Bienvenido a Conta-Go.",
          })
          window.location.href = "/dashboard"
        } else {
          toast({
            title: "Error",
            description: "No se pudo crear la cuenta. El email podría estar en uso.",
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      console.error("Error en autenticación:", error)
      toast({
        title: "Error",
        description: isLogin ? "Error al iniciar sesión" : "Error al crear la cuenta",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Tu nombre completo"
                value={formData.name}
                onChange={handleInputChange}
                required={!isLogin}
                disabled={isLoading}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Tu contraseña"
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                minLength={6}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirma tu contraseña"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required={!isLogin}
                disabled={isLoading}
                minLength={6}
              />
            </div>
          )}
          
          <Button
            type="submit"
            className="w-full bg-[rgb(0,100,80)] hover:bg-[rgb(0,80,60)]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isLogin ? "Iniciando sesión..." : "Creando cuenta..."}
              </>
            ) : (
              isLogin ? "Iniciar Sesión" : "Crear Cuenta"
            )}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
          </p>
          <Button
            type="button"
            variant="link"
            className="text-[rgb(0,100,80)] hover:text-[rgb(0,80,60)]"
            onClick={() => {
              setIsLogin(!isLogin)
              setFormData({
                email: "",
                password: "",
                confirmPassword: "",
                name: ""
              })
            }}
            disabled={isLoading}
          >
            {isLogin ? "Crear una cuenta" : "Iniciar sesión"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

