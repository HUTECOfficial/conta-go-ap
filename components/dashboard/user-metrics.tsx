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
import { getUserMetrics } from "@/lib/metrics"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

export function UserMetrics() {
  const [metrics, setMetrics] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    async function loadMetrics() {
      if (!user) return

      try {
        const metricsData = await getUserMetrics(user.id)
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
  }, [user, toast])

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
            <CardDescription>Tu actividad fiscal de los últimos 6 meses</CardDescription>
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
                  <Bar dataKey="facturas" fill="#0088FE" name="Facturas" />
                  <Bar dataKey="declaraciones" fill="#00C49F" name="Declaraciones" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Distribución Financiera</CardTitle>
            <CardDescription>Desglose de tus finanzas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={metrics.financialData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {metrics.financialData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toLocaleString()} MXN`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Facturas Emitidas</p>
              <p className="text-3xl font-bold">{metrics.totalDocuments}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Declaraciones Presentadas</p>
              <p className="text-3xl font-bold">{metrics.totalDeclarations}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Impuestos Pagados</p>
              <p className="text-3xl font-bold">${metrics.taxesPaid.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

