"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function PricingSection() {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const handlePricingButton = async (plan: string) => {
    if (plan === "digital" || plan === "personal") {
      setLoading(plan)
      try {
        const response = await fetch('/api/stripe/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ plan }),
        })

        const data = await response.json()
        
        if (response.ok) {
          window.location.href = data.url
        } else {
          console.error('Error:', data.error)
          alert('Error al procesar el pago. Por favor intenta de nuevo.')
        }
      } catch (error) {
        console.error('Error:', error)
        alert('Error al procesar el pago. Por favor intenta de nuevo.')
      } finally {
        setLoading(null)
      }
    } else {
      alert(`Te notificaremos cuando el plan ${plan} esté disponible.`)
    }
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Plan Digital */}
          <Card className="flex flex-col bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-blue-400 dark:border-blue-600 h-full">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-xl sm:text-2xl dark:text-white">Plan Digital</CardTitle>
              <CardDescription className="text-sm">Ideal para trabajadores de plataformas digitales</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <div className="text-center mb-6">
                <div className="text-2xl sm:text-4xl font-bold text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]">
                  $300 MXN / mes
                </div>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mt-2">¡Primer mes GRATIS!</p>
              </div>

              <div className="flex-grow">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)] mt-0.5 flex-shrink-0" />
                    <span className="dark:text-gray-300">Declaraciones fiscales mensuales</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)] mt-0.5 flex-shrink-0" />
                    <span className="dark:text-gray-300">Facturación electrónica básica</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)] mt-0.5 flex-shrink-0" />
                    <span className="dark:text-gray-300">Asesoría fiscal básica</span>
                  </li>
                </ul>
              </div>

              <Button
                className="w-full mt-auto bg-gradient-to-r from-[rgb(0,100,80)] to-[rgb(0,200,160)] text-white hover:opacity-90 transition-all duration-200"
                onClick={() => handlePricingButton("digital")}
                disabled={loading === "digital"}
              >
                {loading === "digital" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  "Comenzar prueba gratuita"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Plan Personal */}
          <Card className="flex flex-col bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-green-400 dark:border-green-600 h-full">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-xl sm:text-2xl dark:text-white">Plan Personal</CardTitle>
              <CardDescription className="text-sm">Servicio estándar para personas</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <div className="text-center mb-6">
                <div className="text-2xl sm:text-4xl font-bold text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]">
                  $500 MXN / mes
                </div>
              </div>

              <div className="flex-grow">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)] mt-0.5 flex-shrink-0" />
                    <span className="dark:text-gray-300">Todo lo del Plan Digital</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)] mt-0.5 flex-shrink-0" />
                    <span className="dark:text-gray-300">Facturación electrónica ilimitada</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)] mt-0.5 flex-shrink-0" />
                    <span className="dark:text-gray-300">Gestión de nómina básica</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)] mt-0.5 flex-shrink-0" />
                    <span className="dark:text-gray-300">Asesoría fiscal personalizada</span>
                  </li>
                </ul>
              </div>

              <Button
                className="w-full mt-auto bg-gradient-to-r from-[rgb(0,100,80)] to-[rgb(0,200,160)] text-white hover:opacity-90 transition-all duration-200"
                onClick={() => handlePricingButton("personal")}
                disabled={loading === "personal"}
              >
                {loading === "personal" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  "Comenzar ahora"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Plan Empresarial */}
          <Card className="flex flex-col bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-purple-400 dark:border-purple-600 h-full">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-xl sm:text-2xl dark:text-white">Plan Empresarial</CardTitle>
              <CardDescription className="text-sm">Para empresas en crecimiento</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <div className="text-center mb-6">
                <div className="text-2xl sm:text-4xl font-bold text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]">
                  Próximamente
                </div>
              </div>

              <div className="flex-grow">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)] mt-0.5 flex-shrink-0" />
                    <span className="dark:text-gray-300">Todo lo del Plan Emprendedor</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)] mt-0.5 flex-shrink-0" />
                    <span className="dark:text-gray-300">Gestión de nómina avanzada</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)] mt-0.5 flex-shrink-0" />
                    <span className="dark:text-gray-300">Contabilidad completa</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)] mt-0.5 flex-shrink-0" />
                    <span className="dark:text-gray-300">Planificación fiscal estratégica</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)] mt-0.5 flex-shrink-0" />
                    <span className="dark:text-gray-300">Soporte prioritario</span>
                  </li>
                </ul>
              </div>

              <Button
                className="w-full mt-auto bg-gradient-to-r from-[rgb(0,100,80)] to-[rgb(0,200,160)] text-white hover:opacity-90 transition-all duration-200"
                onClick={() => handlePricingButton("empresarial")}
              >
                Notifícame cuando esté disponible
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

