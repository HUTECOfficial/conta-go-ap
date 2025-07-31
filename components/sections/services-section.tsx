import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, DollarSign } from "lucide-react"

export function ServicesSection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                <FileText className="w-6 h-6 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]" />
                <span>Declaraciones Fiscales</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="dark:text-gray-300 text-sm sm:text-base">
                Preparamos y presentamos tus declaraciones fiscales mensuales y anuales con precisión y puntualidad.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                <Users className="w-6 h-6 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]" />
                <span>Nómina</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="dark:text-gray-300 text-sm sm:text-base">
                Gestión eficiente de nóminas para tus empleados, cumpliendo con todas las regulaciones laborales.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                <DollarSign className="w-6 h-6 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]" />
                <span>Facturación</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="dark:text-gray-300 text-sm sm:text-base">
                Emisión y control de facturas electrónicas de manera rápida y segura, cumpliendo con los requisitos
                fiscales.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

