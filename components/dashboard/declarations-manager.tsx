"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getUserDeclarations, type Declaration } from "@/lib/auth"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { Loader2, FileText } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export function DeclarationsManager() {
  const [declarations, setDeclarations] = useState<Declaration[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    async function loadDeclarations() {
      if (!user) return

      try {
        const declarationsData = await getUserDeclarations(user.id)
        setDeclarations(declarationsData)
      } catch (error) {
        console.error("Error al cargar declaraciones:", error)
        toast({
          title: "Error",
          description: "No se pudieron cargar las declaraciones",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadDeclarations()
  }, [user, toast])

  const handleViewDetails = (declaration: Declaration) => {
    // En una aplicación real, aquí podríamos abrir un modal con los detalles
    // o navegar a una página de detalles
    toast({
      title: "Detalles de la declaración",
      description: declaration.details || "No hay detalles disponibles para esta declaración.",
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "d 'de' MMMM, yyyy", { locale: es })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[rgb(0,100,80)]" />
      </div>
    )
  }

  if (declarations.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium mb-2">No hay declaraciones</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">Aún no tienes declaraciones fiscales registradas</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {declarations.map((declaration) => (
        <Card key={declaration.id}>
          <CardHeader>
            <CardTitle>{declaration.title}</CardTitle>
            <CardDescription>Presentada el {formatDate(declaration.date)}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-2">
                  Estado:{" "}
                  <span className={`font-medium ${getStatusColor(declaration.status)}`}>{declaration.status}</span>
                </p>
                <p className="text-sm text-gray-500">Creada el {formatDate(declaration.created_at)}</p>
              </div>
              <Button variant="outline" onClick={() => handleViewDetails(declaration)}>
                Ver Detalles
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "procesada":
      return "text-green-600 dark:text-green-400"
    case "en revisión":
      return "text-amber-600 dark:text-amber-400"
    case "pendiente":
      return "text-blue-600 dark:text-blue-400"
    case "rechazada":
      return "text-red-600 dark:text-red-400"
    default:
      return ""
  }
}

