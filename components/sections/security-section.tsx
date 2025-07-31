import { Shield, Lock, RefreshCcw } from "lucide-react"

export function SecuritySection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center mb-8">
          <span className="text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]">Seguridad</span> y Confianza
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <Shield className="w-12 h-12 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)] mb-4" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Datos Cifrados</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Toda tu información contable está protegida con cifrado de nivel bancario.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Lock className="w-12 h-12 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)] mb-4" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Acceso Seguro</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Autenticación de dos factores para garantizar que solo tú accedas a tu información.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <RefreshCcw className="w-12 h-12 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)] mb-4" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Respaldos Automáticos</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Tus datos se respaldan automáticamente para prevenir cualquier pérdida de información.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

