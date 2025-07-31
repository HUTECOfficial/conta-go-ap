"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Loader2 } from "lucide-react"
import { getAllUsers, updateUserLineaCaptura, type UserProfile } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"

export function LineasCapturaManager() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newLineaCaptura, setNewLineaCaptura] = useState("")
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    async function loadUsers() {
      try {
        const usersData = await getAllUsers()
        setUsers(usersData)
      } catch (error) {
        console.error("Error al cargar usuarios:", error)
        toast({
          title: "Error",
          description: "No se pudieron cargar los usuarios",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadUsers()
  }, [toast])

  const handleLineaCapturaUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedUserId === null) {
      toast({
        title: "Error",
        description: "Por favor, selecciona un usuario",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await updateUserLineaCaptura(selectedUserId, newLineaCaptura)

      // Actualizar la lista de usuarios
      const updatedUsers = await getAllUsers()
      setUsers(updatedUsers)

      toast({
        title: "Éxito",
        description: "Línea de captura asignada con éxito",
        variant: "success",
      })

      setNewLineaCaptura("")
      setSelectedUserId(null)
    } catch (error) {
      console.error("Error al asignar línea de captura:", error)
      toast({
        title: "Error",
        description: "No se pudo asignar la línea de captura",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[rgb(0,100,80)]" />
      </div>
    )
  }

  return (
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
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="form-select mt-1 block w-full p-2 border rounded-md"
                disabled={isSubmitting}
              >
                <option value="">Selecciona un usuario</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} - {user.email}
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
                disabled={isSubmitting}
              />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Asignando...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" /> Asignar Línea de Captura
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

