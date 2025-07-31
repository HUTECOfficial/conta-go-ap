"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { getAdminMetrics } from "@/lib/metrics"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

const ADMIN_COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

export function AdminMetrics() {
  const [metrics, setMetrics] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function loadMetrics() {
      try {
        const metricsData = await getAdminMetrics()
        setMetrics(metricsData)
      } catch (error) {
        console.error("Error al cargar métricas:", error)
        toast({
          title: "Error",
          description: "No se pudieron cargar las métricas",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadMetrics()
  }, [toast])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[rgb(0,100,80)]" />
      </div>
    )
  }

  if (!metrics) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No hay datos disponibles</h3>
        <p className="text-gray-500 dark:text-gray-400">No se pudieron cargar las métricas en este momento</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Actividad Mensual</CardTitle>
            <CardDescription>Estadísticas de los últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metrics.monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="usuarios" fill="#0088FE" name="Usuarios" />
                  <Bar dataKey="declaraciones" fill="#00C49F" name="Declaraciones" />
                  <Bar dataKey="facturas" fill="#FFBB28" name="Facturas" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Planes</CardTitle>
            <CardDescription>Porcentaje de usuarios por plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={metrics.plansData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {metrics.plansData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={ADMIN_COLORS[index % ADMIN_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Usuarios</p>
              <p className="text-3xl font-bold">{metrics.usersCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Declaraciones</p>
              <p className="text-3xl font-bold">{metrics.declarationsCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Facturas</p>
              <p className="text-3xl font-bold">{metrics.documentsCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Ingresos</p>
              <p className="text-3xl font-bold">${metrics.revenue.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

