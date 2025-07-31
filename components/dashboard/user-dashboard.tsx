"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { FileText, DollarSign, AlertCircle, BarChartIcon, Loader2 } from "lucide-react"
import Link from "next/link"
import { getUserMetrics } from "@/lib/metrics"
import { getUserDeclarations } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export function UserDashboard() {
  const { user } = useAuth()
  const [metrics, setMetrics] = useState<any>(null)
  const [pendingDeclarations, setPendingDeclarations] = useState<number>(0)
  const [nextDeclarationDate, setNextDeclarationDate] = useState<Date | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function loadData() {
      if (!user) return

      try {
        // Cargar métricas
        const metricsData = await getUserMetrics(user.id)
        setMetrics(metricsData)

        // Cargar declaraciones para encontrar pendientes
        const declarations = await getUserDeclarations(user.id)
        const pending = declarations.filter((d) => d.status.toLowerCase() === "pendiente").length
        setPendingDeclarations(pending)

        // Simular próxima fecha de declaración (en una app real vendría de la base de datos)
        const today = new Date()
        const nextDate = new Date(today.getFullYear(), today.getMonth(), 17)
        if (nextDate < today) {
          nextDate.setMonth(nextDate.getMonth() + 1)
        }
        setNextDeclarationDate(nextDate)
      } catch (error) {
        console.error("Error al cargar datos del dashboard:", error)
        toast({
          title: "Error",
          description: "No se pudieron cargar algunos datos del dashboard",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [user, toast])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[rgb(0,100,80)]" />
      </div>
    )
  }

  // Calcular días restantes para la próxima declaración
  const daysRemaining = nextDeclarationDate
    ? Math.ceil((nextDeclarationDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Facturas Pendientes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingDeclarations || 0}</div>
            <p className="text-xs text-muted-foreground">
              {pendingDeclarations === 0 ? "No hay facturas pendientes" : "Requieren tu atención"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próxima Declaración</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {nextDeclarationDate ? format(nextDeclarationDate, "d 'de' MMMM", { locale: es }) : "No programada"}
            </div>
            <p className="text-xs text-muted-foreground">
              {daysRemaining > 0 ? `Faltan ${daysRemaining} días` : "Fecha no disponible"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impuestos Pagados</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics?.taxesPaid?.toLocaleString() || "0"}</div>
            <p className="text-xs text-muted-foreground">Este año fiscal</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
          <CardDescription>Tu actividad fiscal de los últimos 6 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            {metrics?.monthlyData ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metrics.monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="facturas" fill="#0088FE" name="Facturas" />
                  <Bar dataKey="declaraciones" fill="#00C49F" name="Declaraciones" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">No hay datos disponibles</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Información del Usuario</CardTitle>
            <CardDescription>Datos de tu cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>Nombre:</strong> {user?.name || "No disponible"}
              </p>
              <p>
                <strong>Email:</strong> {user?.email || "No disponible"}
              </p>
              <p>
                <strong>e.firma:</strong> {user?.hasEfirma ? "Subida" : "No subida"}
              </p>
              <p>
                <strong>Línea de Captura:</strong> {user?.lineaCaptura || "No asignada"}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Accede rápidamente a funciones comunes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/dashboard/documents">
                <Card className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <FileText className="h-8 w-8 mb-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]" />
                    <p className="text-sm font-medium">Subir Documento</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/dashboard/declarations">
                <Card className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <FileText className="h-8 w-8 mb-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]" />
                    <p className="text-sm font-medium">Ver Declaraciones</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/dashboard/metrics">
                <Card className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <BarChartIcon className="h-8 w-8 mb-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]" />
                    <p className="text-sm font-medium">Ver Métricas</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/profile">
                <Card className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <DollarSign className="h-8 w-8 mb-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]" />
                    <p className="text-sm font-medium">Ver Línea de Captura</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

