"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

export function HeroSection() {
  const router = useRouter()
  const { user } = useAuth()

  const handleStartNow = () => {
    if (user) {
      router.push("/dashboard")
    } else {
      router.push("/auth")
    }
  }

  const handleFreeTrial = () => {
    router.push("/auth")
  }

  return (
    <section className="flex-1 flex items-center justify-center bg-white dark:bg-gray-900 relative overflow-hidden py-12 sm:py-16">
      <div className="container px-4 max-w-5xl mx-auto relative z-10 backdrop-blur-md bg-white dark:bg-gray-800 bg-opacity-70 rounded-xl shadow-lg p-6 sm:p-8 animate-fade-in-up">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter">
            <span className="text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]">Contabilidad Segura</span> y Eficiente
            para Tu Negocio
          </h1>
          <p className="mx-auto max-w-[700px] text-sm sm:text-base text-gray-600 dark:text-gray-300">
            Servicios contables confiables y seguros para pequeños negocios, autónomos y trabajadores de plataformas
            digitales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:justify-center">
            <Button
              className="bg-gradient-to-r from-[rgb(0,100,80)] to-[rgb(0,200,160)] text-white hover:opacity-90 transition-all duration-200 transform hover:scale-105"
              onClick={handleStartNow}
            >
              Empieza Ahora <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="text-[rgb(0,100,80)] border-[rgb(0,100,80)] hover:border-[rgb(0,200,160)] hover:shadow-[0_0_10px_rgba(0,200,160,0.5)] transition-all duration-300 dark:text-[rgb(0,200,160)] dark:border-[rgb(0,200,160)]"
              onClick={handleFreeTrial}
            >
              Prueba Gratis por 1 Mes
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 particle-animation"></div>
    </section>
  )
}

