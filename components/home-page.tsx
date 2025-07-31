"use client"

import React, { useState } from "react"
import {
  ArrowRight,
  CheckCircle,
  DollarSign,
  FileText,
  Users,
  Shield,
  Lock,
  RefreshCcw,
  Menu,
  X,
  Sun,
  Moon,
  Upload,
  FileIcon,
  History,
  Download,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log("Uncaught error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}

interface AuthModuleProps {
  onSuccessfulAuth: (email: string, password: string) => void
}

const AuthModule: React.FC<AuthModuleProps> = ({ onSuccessfulAuth }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isLogin) {
      console.log("Iniciando sesión con:", email, password)
      onSuccessfulAuth(email, password)
    } else {
      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden")
        return
      }
      console.log("Registrando cuenta con:", email, password)
      onSuccessfulAuth(email, password)
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{isLogin ? "Iniciar Sesión" : "Crear Cuenta"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {!isLogin && (
          <Input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        )}
        <Button type="submit" className="w-full">
          {isLogin ? "Ingresar" : "Registrarse"}
        </Button>
      </form>
      <p className="mt-4 text-center">
        {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
        <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="ml-2">
          {isLogin ? "Crear cuenta" : "Iniciar sesión"}
        </Button>
      </p>
      <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
        <p className="text-sm font-semibold mb-2">Usuarios de ejemplo:</p>
        <p className="text-xs">Admin: admin@contago.com / admin123</p>
        <p className="text-xs">Usuario: usuario@contago.com / usuario123</p>
      </div>
    </div>
  )
}

interface MyProfileProps {
  onClose: () => void
  user: {
    id: number
    name: string
    email: string
    hasEfirma: boolean
    lineaCaptura: string
  }
}

const MyProfile: React.FC<MyProfileProps> = ({ onClose, user }) => {
  const [files, setFiles] = useState([
    { name: "factura_enero_2024.pdf", date: "15 de Enero, 2024", size: "1.2 MB" },
    { name: "recibo_luz_febrero_2024.pdf", date: "10 de Febrero, 2024", size: "850 KB" },
    { name: "contrato_arrendamiento_2024.pdf", date: "1 de Marzo, 2024", size: "2.1 MB" },
    { name: "nomina_marzo_2024.xlsx", date: "31 de Marzo, 2024", size: "1.5 MB" },
    { name: "gastos_primer_trimestre_2024.csv", date: "5 de Abril, 2024", size: "500 KB" },
  ])

  const [declarations] = useState([
    { title: "Declaración Mensual - Marzo 2024", date: "10 de Abril, 2024", status: "Procesada" },
    { title: "Declaración Mensual - Febrero 2024", date: "10 de Marzo, 2024", status: "Procesada" },
    { title: "Declaración Mensual - Enero 2024", date: "10 de Febrero, 2024", status: "Procesada" },
    { title: "Declaración Anual - 2023", date: "30 de Marzo, 2024", status: "En revisión" },
    { title: "Declaración Mensual - Diciembre 2023", date: "10 de Enero, 2024", status: "Procesada" },
  ])

  const [history] = useState([
    { action: "Factura generada", date: "15 de Mayo, 2024 - 14:30" },
    { action: "Declaración mensual presentada", date: "10 de Mayo, 2024 - 09:15" },
    { action: "Archivo subido: recibo_luz_abril_2024.pdf", date: "5 de Mayo, 2024 - 11:45" },
    { action: "Consulta fiscal realizada", date: "2 de Mayo, 2024 - 16:20" },
    { action: "Actualización de datos personales", date: "28 de Abril, 2024 - 10:00" },
  ])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const newFile = {
        name: file.name,
        date: new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }),
        size: `${(file.size / 1024).toFixed(2)} KB`,
      }
      setFiles((prevFiles) => [newFile, ...prevFiles])
      alert(`Archivo "${file.name}" subido con éxito.`)
    }
  }

  const handleFileDownload = (fileName: string) => {
    console.log(`Descargando archivo: ${fileName}`)
    alert(`Descargando ${fileName}`)
  }

  const handleViewFile = (fileName: string) => {
    console.log(`Viendo archivo: ${fileName}`)
    alert(`Visualizando ${fileName}`)
  }

  const handleViewDetails = (declaration: { title: string }) => {
    console.log(`Viendo detalles de: ${declaration.title}`)
    alert(`Detalles de ${declaration.title}`)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">Mi Perfil</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex-grow overflow-hidden">
          <Tabs defaultValue="info" className="h-full flex flex-col">
            <TabsList className="mb-4">
              <TabsTrigger value="info">Información</TabsTrigger>
              <TabsTrigger value="files">Archivos Subidos</TabsTrigger>
              <TabsTrigger value="declarations">Declaraciones</TabsTrigger>
              <TabsTrigger value="history">Historial</TabsTrigger>
            </TabsList>
            <ScrollArea className="flex-grow">
              <div className="pr-4" style={{ maxHeight: "calc(90vh - 200px)" }}>
                <TabsContent value="info">
                  <Card>
                    <CardHeader>
                      <CardTitle>Información del Usuario</CardTitle>
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
                </TabsContent>
                <TabsContent value="files">
                  <div className="space-y-4">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="flex items-center">
                          <FileIcon className="mr-2" />
                          <div>
                            <span className="font-medium">{file.name}</span>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {file.date} - {file.size}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleFileDownload(file.name)}
                            className="w-28"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Descargar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewFile(file.name)}
                            className="w-28"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Ver
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="mt-4">
                      <Input type="file" onChange={handleFileUpload} className="hidden" id="file-upload" />
                      <label htmlFor="file-upload">
                        <Button asChild className="w-full cursor-pointer">
                          <span>
                            <Upload className="mr-2 h-4 w-4" /> Subir Nuevo Archivo
                          </span>
                        </Button>
                      </label>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="declarations">
                  <div className="space-y-4">
                    {declarations.map((declaration, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle>{declaration.title}</CardTitle>
                          <CardDescription>Presentada el {declaration.date}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>Estado: {declaration.status}</p>
                          <Button variant="outline" className="mt-2" onClick={() => handleViewDetails(declaration)}>
                            Ver Detalles
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="history">
                  <div className="space-y-4">
                    {history.map((item, index) => (
                      <div key={index} className="flex items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <History className="mr-2" />
                        <div>
                          <p className="font-semibold">{item.action}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Usuario 1", email: "usuario1@example.com", hasEfirma: true, lineaCaptura: "" },
    { id: 2, name: "Usuario 2", email: "usuario2@example.com", hasEfirma: false, lineaCaptura: "" },
  ])

  const [newLineaCaptura, setNewLineaCaptura] = useState("")
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  const handleLineaCapturaUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedUserId === null) {
      alert("Por favor, selecciona un usuario")
      return
    }
    setUsers(users.map((user) => (user.id === selectedUserId ? { ...user, lineaCaptura: newLineaCaptura } : user)))
    alert("Línea de captura subida con éxito")
    setNewLineaCaptura("")
    setSelectedUserId(null)
  }

  // Datos de ejemplo para las métricas del administrador
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="lineacaptura">Línea de Captura</TabsTrigger>
          <TabsTrigger value="metrics">Métricas</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Usuarios</CardTitle>
              <CardDescription>Visualiza y gestiona los usuarios registrados</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>e.firma</TableHead>
                    <TableHead>Línea de Captura</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.hasEfirma ? "Sí" : "No"}</TableCell>
                      <TableCell>{user.lineaCaptura || "No asignada"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="lineacaptura">
          <Card>
            <CardHeader>
              <CardTitle>Subir Línea de Captura</CardTitle>
              <CardDescription>Asigna una línea de captura a un usuario</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLineaCapturaUpload}>
                <div className="grid w-full gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="user">Usuario</Label>
                    <select
                      id="user"
                      value={selectedUserId || ""}
                      onChange={(e) => setSelectedUserId(Number(e.target.value))}
                      className="form-select mt-1 block w-full"
                    >
                      <option value="">Selecciona un usuario</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="lineacaptura">Línea de Captura</Label>
                    <Input
                      id="lineacaptura"
                      placeholder="Ingresa la línea de captura"
                      value={newLineaCaptura}
                      onChange={(e) => setNewLineaCaptura(e.target.value)}
                    />
                  </div>
                  <Button type="submit">
                    <Upload className="mr-2 h-4 w-4" /> Subir Línea de Captura
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="metrics">
          <Card>
            <CardHeader>
              <CardTitle>Métricas del Sistema</CardTitle>
              <CardDescription>Estadísticas y análisis de la plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Actividad Mensual</h3>
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
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Distribución de Planes</h3>
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
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Usuarios</p>
                        <p className="text-3xl font-bold">42</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Declaraciones</p>
                        <p className="text-3xl font-bold">170</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Facturas</p>
                        <p className="text-3xl font-bold">1,730</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Ingresos</p>
                        <p className="text-3xl font-bold">$126,000</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface UserPanelProps {
  user: {
    id: number
    name: string
    email: string
    hasEfirma: boolean
    lineaCaptura: string
  }
}

const UserPanel: React.FC<UserPanelProps> = ({ user }) => {
  const [efirma, setEfirma] = useState<File | null>(null)
  const [efirmaPassword, setEfirmaPassword] = useState("")

  const handleEfirmaUpload = (e: React.FormEvent) => {
    e.preventDefault()
    if (!efirma || !efirmaPassword) {
      alert("Por favor, selecciona un archivo e.firma y proporciona la contraseña")
      return
    }
    console.log("e.firma subida:", efirma.name)
    console.log("Contraseña e.firma:", efirmaPassword)
    // Aquí iría la lógica para subir la e.firma de manera segura
    alert("e.firma subida con éxito")
    setEfirma(null)
    setEfirmaPassword("")
  }

  // Datos de ejemplo para las métricas del usuario
  const userMetricsData = [
    { name: "Ene", facturas: 12, declaraciones: 1 },
    { name: "Feb", facturas: 19, declaraciones: 1 },
    { name: "Mar", facturas: 15, declaraciones: 1 },
    { name: "Abr", facturas: 21, declaraciones: 1 },
    { name: "May", facturas: 18, declaraciones: 1 },
    { name: "Jun", facturas: 24, declaraciones: 1 },
  ]

  const userPieData = [
    { name: "Ingresos", value: 75000 },
    { name: "Gastos", value: 45000 },
    { name: "Impuestos", value: 12000 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

  return (
    <div className="max-h-[80vh] overflow-y-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Usuario</h1>
      <Tabs defaultValue="info">
        <TabsList className="mb-4">
          <TabsTrigger value="info">Información</TabsTrigger>
          <TabsTrigger value="efirma">e.firma</TabsTrigger>
          <TabsTrigger value="metrics">Métricas</TabsTrigger>
          {user?.lineaCaptura && <TabsTrigger value="lineacaptura">Línea de Captura</TabsTrigger>}
        </TabsList>
        <TabsContent value="info">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Información del Usuario</CardTitle>
              <CardDescription>Datos de tu cuenta y línea de captura</CardDescription>
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
        </TabsContent>
        <TabsContent value="efirma">
          <Card>
            <CardHeader>
              <CardTitle>Subir e.firma</CardTitle>
              <CardDescription>Sube tu archivo e.firma y proporciona la contraseña</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEfirmaUpload}>
                <div className="grid w-full gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="efirma">Archivo e.firma</Label>
                    <Input id="efirma" type="file" onChange={(e) => setEfirma(e.target.files?.[0] || null)} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="efirma-password">Contraseña e.firma</Label>
                    <Input
                      id="efirma-password"
                      type="password"
                      value={efirmaPassword}
                      onChange={(e) => setEfirmaPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full mb-4">
                    <Upload className="mr-2 h-4 w-4" /> Subir e.firma
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="metrics">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Métricas Fiscales</CardTitle>
              <CardDescription>Resumen de tu actividad fiscal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Actividad Mensual</h3>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={userMetricsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Distribución Financiera</h3>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={userPieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {userPieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `$${value.toLocaleString()} MXN`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Facturas Emitidas</p>
                        <p className="text-3xl font-bold">109</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Declaraciones Presentadas</p>
                        <p className="text-3xl font-bold">6</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Impuestos Pagados</p>
                        <p className="text-3xl font-bold">$12,000</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {user?.lineaCaptura && (
          <TabsContent value="lineacaptura">
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Línea de Captura</CardTitle>
                <CardDescription>Utiliza esta línea para realizar tu pago de impuestos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 p-4 rounded-md">
                  <p className="font-mono text-lg">{user.lineaCaptura}</p>
                </div>
                <Button className="mt-4" onClick={() => alert("Descargando línea de captura...")}>
                  <FileText className="mr-2 h-4 w-4" /> Descargar Línea de Captura
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}

const sections = [
  { id: "hero", title: "Inicio" },
  { id: "services", title: "Servicios" },
  { id: "security", title: "Seguridad" },
  { id: "pricing", title: "Precios" },
  { id: "contact", title: "Contacto" },
]

interface ThemeToggleProps {
  isDark: boolean
  toggleTheme: () => void
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, toggleTheme }) => {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full transition-all duration-300 ease-in-out"
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      <Sun
        className={`h-6 w-6 rotate-0 scale-100 transition-all ${isDark ? "opacity-0 scale-0" : "opacity-100 scale-100"}`}
      />
      <Moon
        className={`absolute h-6 w-6 rotate-90 scale-0 transition-all ${isDark ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
      />
      <span className="sr-only">Cambiar tema</span>
    </Button>
  )
}

export default function Component() {
  const [email, setEmail] = useState("")
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [showUserPanel, setShowUserPanel] = useState(false)
  const [currentUser, setCurrentUser] = useState<{
    id: number
    name: string
    email: string
    hasEfirma: boolean
    lineaCaptura: string
  } | null>(null)

  const toggleTheme = () => {
    setIsDark(!isDark)
    if (isDark) {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Email enviado:", email)
    setEmail("")
    alert("Información solicitada. Te contactaremos pronto.")
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  const handleSuccessfulAuth = (email: string, password: string) => {
    if (email === "admin@contago.com" && password === "admin123") {
      setIsLoggedIn(true)
      setIsAdmin(true)
      setCurrentUser({
        id: 0,
        name: "Ana Gómez",
        email: "admin@contago.com",
        hasEfirma: true,
        lineaCaptura: "",
      })
      setShowAuthModal(false)
    } else if (email === "usuario@contago.com" && password === "usuario123") {
      setIsLoggedIn(true)
      setIsAdmin(false)
      setCurrentUser({
        id: 1,
        name: "Juan Pérez",
        email: "usuario@contago.com",
        hasEfirma: false,
        lineaCaptura: "LC-2023-001-002-003",
      })
      setShowAuthModal(false)
    } else {
      alert("Credenciales incorrectas")
    }
  }

  const handleStartNow = () => {
    if (isLoggedIn) {
      alert("¡Bienvenido! Estás listo para comenzar a usar nuestros servicios.")
    } else {
      setShowAuthModal(true)
    }
  }

  const handleFreeTrial = () => {
    setShowAuthModal(true)
  }

  const handlePricingButton = (plan: string) => {
    if (plan === "digital") {
      setShowAuthModal(true)
    } else {
      alert(`Te notificaremos cuando el plan ${plan} esté disponible.`)
    }
  }

  return (
    <ErrorBoundary>
      <div className={`flex flex-col min-h-screen ${isDark ? "dark" : ""}`}>
        <header className="h-16 flex items-center justify-between px-4 bg-white dark:bg-gray-800 bg-opacity-70 backdrop-blur-md sticky top-0 z-50">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            <span className="text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]">Conta</span> Go
          </h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
            {isLoggedIn && (
              <>
                <Button onClick={() => setShowProfileModal(true)}>Mi Perfil</Button>
                {isAdmin ? (
                  <Button onClick={() => setShowAdminPanel(true)}>Panel Admin</Button>
                ) : (
                  <Button onClick={() => setShowUserPanel(true)}>Panel Usuario</Button>
                )}
                <Button
                  onClick={() => {
                    setIsLoggedIn(false)
                    setIsAdmin(false)
                    setCurrentUser(null)
                  }}
                >
                  Cerrar Sesión
                </Button>
              </>
            )}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Menu
                    className={`h-6 w-6 transition-all duration-300 ${isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`}
                  />
                  <X
                    className={`h-6 w-6 absolute transition-all duration-300 ${isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"} text-white`}
                  />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] bg-gradient-to-br from-gray-900 to-gray-800 border-l-0"
              >
                <nav className="flex flex-col gap-4 mt-8">
                  {sections.map((section) => (
                    <SheetClose key={section.id} asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-white hover:text-[rgb(0,200,160)] transition-colors"
                        onClick={() => scrollToSection(section.id)}
                      >
                        {section.title}
                      </Button>
                    </SheetClose>
                  ))}
                  {!isLoggedIn && (
                    <Button
                      onClick={() => {
                        setShowAuthModal(true)
                        setIsOpen(false)
                      }}
                      className="w-full bg-gradient-to-r from-[rgb(0,100,80)] to-[rgb(0,200,160)] text-white hover:opacity-90 transition-all duration-200"
                    >
                      Iniciar Sesión / Registrarse
                    </Button>
                  )}
                </nav>
                <div className="absolute bottom-4 left-4 right-4 text-center text-gray-400 text-sm">
                  Powered by HUTEC
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>
        <main className="flex-1 flex flex-col">
          <section
            id="hero"
            className="flex-1 flex items-center justify-center bg-white dark:bg-gray-900 relative overflow-hidden py-12 sm:py-16"
          >
            <div className="container px-4 relative z-10 backdrop-blur-md bg-white dark:bg-gray-800 bg-opacity-70 rounded-xl shadow-lg p-6 sm:p-8 animate-fade-in-up">
              <div className="flex flex-col items-center space-y-4 text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter">
                  <span className="text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]">Contabilidad Segura</span> y
                  Eficiente para Tu Negocio
                </h1>
                <p className="mx-auto max-w-[700px] text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  Servicios contables confiables y seguros para pequeños negocios, autónomos y trabajadores de
                  plataformas digitales.
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
          <section id="services" className="py-16 bg-white dark:bg-gray-900">
            <div className="container px-4">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center mb-8">
                <span className="text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]">Nuestros Servicios</span> Contables
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                      <FileText className="w-6 h-6 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]" />
                      <span>Declaraciones Fiscales</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p
                      className="dark:text-gray-300 text-sm sm:text
base"
                    >
                      Preparamos y presentamos tus declaraciones fiscales mensuales y anuales con precisión y
                      puntualidad.
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
                      Emisión y control de facturas electrónicas de manera rápida y segura, cumpliendo con los
                      requisitos fiscales.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          <section id="security" className="py-16 bg-gray-50 dark:bg-gray-800">
            <div className="container px-4">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center mb-8">
                <span className="text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]">Seguridad</span> y Confianza
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex flex-col items-center text-center">
                  <Shield className="w-12 h-12 text-[rgb(0,100,80)]   dark:text-[rgb(0,200,160)] mb-4" />
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
          <section id="pricing" className="py-16 bg-white dark:bg-gray-900">
            <div className="container px-4">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center mb-8">
                <span className="text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]">Nuestros</span> Planes
              </h2>
              <div className="grid gap-8 md:grid-cols-3">
                <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-blue-400 dark:border-blue-600">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl text-center dark:text-white">Plan Digital</CardTitle>
                    <CardDescription className="text-center dark:text-gray-300 text-sm">
                      Ideal para trabajadores de plataformas digitales
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl sm:text-4xl font-bold mb-4 text-center text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]">
                      $300 MXN / mes
                    </div>
                    <p className="text-center text-blue-600 dark:text-blue-400 font-semibold mb-4">
                      ¡Primer mes GRATIS!
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 mr-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]" />
                        Declaraciones fiscales mensuales
                      </li>
                      <li className="flex items-center dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 mr-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]" />
                        Facturación electrónica básica
                      </li>
                      <li className="flex items-center dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 mr-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]" />
                        Asesoría fiscal básica
                      </li>
                    </ul>
                    <Button
                      className="w-full mt-6 bg-gradient-to-r from-[rgb(0,100,80)] to-[rgb(0,200,160)] text-white hover:opacity-90 transition-all duration-200"
                      onClick={() => handlePricingButton("digital")}
                    >
                      Comenzar prueba gratuita
                    </Button>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-green-400 dark:border-green-600">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl text-center dark:text-white">Plan Emprendedor</CardTitle>
                    <CardDescription className="text-center dark:text-gray-300 text-sm">
                      Para pequeños negocios y autónomos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl sm:text-4xl font-bold mb-4 text-center text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]">
                      Próximamente
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-center dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 mr-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]" />
                        Todo lo del Plan Digital
                      </li>
                      <li className="flex items-center dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 mr-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]" />
                        Facturación electrónica ilimitada
                      </li>
                      <li className="flex items-center dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 mr-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]" />
                        Gestión de nómina básica
                      </li>
                      <li className="flex items-center dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 mr-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]" />
                        Asesoría fiscal personalizada
                      </li>
                    </ul>
                    <Button
                      className="w-full mt-6 bg-gradient-to-r from-[rgb(0,100,80)] to-[rgb(0,200,160)] text-white hover:opacity-90 transition-all duration-200"
                      onClick={() => handlePricingButton("emprendedor")}
                    >
                      Notifícame cuando esté disponible
                    </Button>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-purple-400 dark:border-purple-600">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl text-center dark:text-white">Plan Empresarial</CardTitle>
                    <CardDescription className="text-center dark:text-gray-300 text-sm">
                      Para empresas en crecimiento
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl sm:text-4xl font-bold mb-4 text-center text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]">
                      Próximamente
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-center dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 mr-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]" />
                        Todo lo del Plan Emprendedor
                      </li>
                      <li className="flex items-center dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 mr-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]" />
                        Gestión de nómina avanzada
                      </li>
                      <li className="flex items-center dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 mr-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]" />
                        Contabilidad completa
                      </li>
                      <li className="flex items-center dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 mr-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]" />
                        Planificación fiscal estratégica
                      </li>
                      <li className="flex items-center dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 mr-2 text-[rgb(0,100,80)] dark:text-[rgb(0,200,160)]" />
                        Soporte prioritario
                      </li>
                    </ul>
                    <Button
                      className="w-full mt-6 bg-gradient-to-r from-[rgb(0,100,80)] to-[rgb(0,200,160)] text-white hover:opacity-90 transition-all duration-200"
                      onClick={() => handlePricingButton("empresarial")}
                    >
                      Notifícame cuando esté disponible
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          <section id="contact" className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="container px-4">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center mb-8">
                <span className="text-[rgb(0,200,160)]">Contáctanos</span>
              </h2>
              <form onSubmit={handleSubmit} className="max-w-md mx-auto w-full px-4 sm:px-0">
                <Input
                  type="email"
                  placeholder="Tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-4 bg-white text-gray-900 dark:bg-gray-700 dark:text-white w-full"
                />
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[rgb(0,100,80)] to-[rgb(0,200,160)] text-white hover:opacity-90 transition-all duration-200 transform hover:scale-105"
                >
                  Solicitar Información
                </Button>
              </form>
            </div>
          </section>
        </main>
        <footer className="py-8 px-4 bg-gray-900 text-white overflow-hidden relative">
          <div className="container mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Sobre Nosotros</h3>
              <p className="text-sm text-gray-400">
                Conta Go ofrece servicios contables de vanguardia potenciados por IA para pequeños negocios, autónomos y
                trabajadores de plataformas digitales.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contacto</h3>
              <p className="text-sm text-gray-400">Email: info@contago.com</p>
            </div>
          </div>
        </footer>
        {showAuthModal && (
          <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Acceso a Conta Go</DialogTitle>
                <DialogDescription>Inicia sesión para comenzar.</DialogDescription>
              </DialogHeader>
              <AuthModule onSuccessfulAuth={handleSuccessfulAuth} />
            </DialogContent>
          </Dialog>
        )}
        {showProfileModal && currentUser && <MyProfile onClose={() => setShowProfileModal(false)} user={currentUser} />}
        {showAdminPanel && (
          <Dialog open={showAdminPanel} onOpenChange={setShowAdminPanel}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Panel de Administración</DialogTitle>
              </DialogHeader>
              <AdminPanel />
            </DialogContent>
          </Dialog>
        )}
        {showUserPanel && currentUser && (
          <Dialog open={showUserPanel} onOpenChange={setShowUserPanel}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle>Panel de Usuario</DialogTitle>
              </DialogHeader>
              <UserPanel user={currentUser} />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </ErrorBoundary>
  )
}

