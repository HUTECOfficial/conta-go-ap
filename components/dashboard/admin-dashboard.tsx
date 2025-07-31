"use client"

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
import { Users, FileText, DollarSign, AlertCircle } from "lucide-react"
import Link from "next/link"

const adminMetricsData = [
  { name: "Ene", usuarios: 15, declaraciones: 15, facturas: 180 },
  { name: "Feb", usuarios: 18, declaraciones: 18, facturas: 220 },
  { name: "Mar", usuarios: 25, declaraciones: 25, facturas: 280 },
  { name: "Abr", usuarios: 32, declaraciones: 32, facturas: 310 },
  { name: "May", usuarios: 38, declaraciones: 38, facturas: 350 },
  { name: "Jun", usuarios: 42, declaraciones: 42, facturas: 390 },
]

const adminPieData = [
  { name: "Plan Digital", value: 65 },
  { name: "Plan Emprendedor", value: 25 },
  { name: "Plan Empresarial", value: 10 },
]

const ADMIN_COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+4 desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Declaraciones</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">170</div>
            <p className="text-xs text-muted-foreground">+42 desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Facturas</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,730</div>
            <p className="text-xs text-muted-foreground">+390 desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$126,000</div>
            <p className="text-xs text-muted-foreground">+$12,000 desde el mes pasado</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Actividad Mensual</CardTitle>
            <CardDescription>Estadísticas de los últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adminMetricsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                    data={adminPieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {adminPieData.map((entry, index) => (
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Accede rápidamente a funciones comunes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/dashboard/admin/users">
                <Card className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Users className="h-8 w-8 mb-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]" />
                    <p className="text-sm font-medium">Gestionar Usuarios</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/dashboard/admin/lineas-captura">
                <Card className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <FileText className="h-8 w-8 mb-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]" />
                    <p className="text-sm font-medium">Líneas de Captura</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/dashboard/metrics">
                <Card className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <BarChart className="h-8 w-8 mb-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]" />
                    <p className="text-sm font-medium">Ver Métricas</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/dashboard/declarations">
                <Card className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <AlertCircle className="h-8 w-8 mb-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]" />
                    <p className="text-sm font-medium">Declaraciones Pendientes</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Usuarios Recientes</CardTitle>
            <CardDescription>Últimos usuarios registrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[rgb(0,100,80)] dark:bg-[rgb(0,200,160)] flex items-center justify-center text-white mr-3">
                  <span>LP</span>
                </div>
                <div>
                  <p className="font-medium">Laura Pérez</p>
                  <p className="text-sm text-gray-500">laura.perez@example.com</p>
                </div>
                <div className="ml-auto text-sm text-gray-500">Hace 2 días</div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[rgb(0,100,80)] dark:bg-[rgb(0,200,160)] flex items-center justify-center text-white mr-3">
                  <span>MR</span>
                </div>
                <div>
                  <p className="font-medium">Miguel Rodríguez</p>
                  <p className="text-sm text-gray-500">miguel.rodriguez@example.com</p>
                </div>
                <div className="ml-auto text-sm text-gray-500">Hace 3 días</div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[rgb(0,100,80)] dark:bg-[rgb(0,200,160)] flex items-center justify-center text-white mr-3">
                  <span>CL</span>
                </div>
                <div>
                  <p className="font-medium">Carmen López</p>
                  <p className="text-sm text-gray-500">carmen.lopez@example.com</p>
                </div>
                <div className="ml-auto text-sm text-gray-500">Hace 5 días</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

