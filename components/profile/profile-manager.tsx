"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"
import { FileIcon, Download, Eye, Upload, History, Loader2 } from "lucide-react"
import {
  getUserDocuments,
  getUserHistory,
  uploadDocument,
  updateUserEfirma,
  addHistoryItem,
  type Document,
  type HistoryItem,
} from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export function ProfileManager() {
  const { user } = useAuth()
  const [efirma, setEfirma] = useState<File | null>(null)
  const [efirmaPassword, setEfirmaPassword] = useState("")
  const [isUploadingEfirma, setIsUploadingEfirma] = useState(false)
  const [files, setFiles] = useState<Document[]>([])
  const [isLoadingFiles, setIsLoadingFiles] = useState(true)
  const [isUploadingFile, setIsUploadingFile] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)
  const { toast } = useToast()

  // Cargar documentos del usuario
  useEffect(() => {
    async function loadDocuments() {
      if (!user) return

      try {
        const documents = await getUserDocuments(user.id)
        setFiles(documents)
      } catch (error) {
        console.error("Error al cargar documentos:", error)
        toast({
          title: "Error",
          description: "No se pudieron cargar los documentos",
          variant: "destructive",
        })
      } finally {
        setIsLoadingFiles(false)
      }
    }

    loadDocuments()
  }, [user, toast])

  // Cargar historial del usuario
  useEffect(() => {
    async function loadHistory() {
      if (!user) return

      try {
        const historyData = await getUserHistory(user.id)
        setHistory(historyData)
      } catch (error) {
        console.error("Error al cargar historial:", error)
        toast({
          title: "Error",
          description: "No se pudo cargar el historial",
          variant: "destructive",
        })
      } finally {
        setIsLoadingHistory(false)
      }
    }

    if (user) {
      loadHistory()
    } else {
      setIsLoadingHistory(false)
    }
  }, [user, toast])

  const handleEfirmaUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!efirma || !efirmaPassword || !user) {
      toast({
        title: "Error",
        description: "Por favor, selecciona un archivo e.firma y proporciona la contraseña",
        variant: "destructive",
      })
      return
    }

    setIsUploadingEfirma(true)

    try {
      // Simular subida de e.firma
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Actualizar el estado del usuario
      await updateUserEfirma(user.id, true)

      // Registrar la acción en el historial
      await addHistoryItem(user.id, "e.firma subida")

      toast({
        title: "Éxito",
        description: "e.firma subida con éxito",
        variant: "success",
      })

      // Actualizar el estado local
      setEfirma(null)
      setEfirmaPassword("")
    } catch (error) {
      console.error("Error al subir e.firma:", error)
      toast({
        title: "Error",
        description: "No se pudo subir la e.firma",
        variant: "destructive",
      })
    } finally {
      setIsUploadingEfirma(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !user) return

    setIsUploadingFile(true)

    try {
      await uploadDocument(user.id, file)

      // Recargar documentos
      const documents = await getUserDocuments(user.id)
      setFiles(documents)

      // Registrar la acción en el historial
      await addHistoryItem(user.id, `Archivo subido: ${file.name}`)

      toast({
        title: "Éxito",
        description: `Archivo "${file.name}" subido con éxito.`,
        variant: "success",
      })
    } catch (error) {
      console.error("Error al subir archivo:", error)
      toast({
        title: "Error",
        description: "No se pudo subir el archivo",
        variant: "destructive",
      })
    } finally {
      setIsUploadingFile(false)
    }
  }

  const handleFileDownload = async (file: Document) => {
    try {
      // Simular descarga de archivo
      await new Promise((resolve) => setTimeout(resolve, 800))

      // En una aplicación real, aquí descargaríamos el archivo
      // Para simular, mostramos un mensaje
      toast({
        title: "Archivo descargado",
        description: `Se ha descargado "${file.name}"`,
        variant: "success",
      })

      // Registrar la acción en el historial
      if (user) {
        await addHistoryItem(user.id, `Archivo descargado: ${file.name}`)
      }
    } catch (error) {
      console.error("Error al descargar archivo:", error)
      toast({
        title: "Error",
        description: "No se pudo descargar el archivo",
        variant: "destructive",
      })
    }
  }

  const handleViewFile = async (file: Document) => {
    try {
      // Simular visualización de archivo
      await new Promise((resolve) => setTimeout(resolve, 500))

      // En una aplicación real, aquí visualizaríamos el archivo
      // Para simular, mostramos un mensaje
      toast({
        title: "Visualizando archivo",
        description: `Visualizando "${file.name}"`,
        variant: "success",
      })

      // Registrar la acción en el historial
      if (user) {
        await addHistoryItem(user.id, `Archivo visualizado: ${file.name}`)
      }
    } catch (error) {
      console.error("Error al visualizar archivo:", error)
      toast({
        title: "Error",
        description: "No se pudo visualizar el archivo",
        variant: "destructive",
      })
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB"
    return (bytes / (1024 * 1024)).toFixed(2) + " MB"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "d 'de' MMMM, yyyy", { locale: es })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="info">
        <TabsList className="mb-4">
          <TabsTrigger value="info">Información</TabsTrigger>
          <TabsTrigger value="efirma">e.firma</TabsTrigger>
          <TabsTrigger value="files">Archivos Subidos</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
          {user?.lineaCaptura && <TabsTrigger value="lineacaptura">Línea de Captura</TabsTrigger>}
        </TabsList>

        <TabsContent value="info">
          <Card>
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
                    <Input
                      id="efirma"
                      type="file"
                      onChange={(e) => setEfirma(e.target.files?.[0] || null)}
                      disabled={isUploadingEfirma}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="efirma-password">Contraseña e.firma</Label>
                    <Input
                      id="efirma-password"
                      type="password"
                      value={efirmaPassword}
                      onChange={(e) => setEfirmaPassword(e.target.value)}
                      disabled={isUploadingEfirma}
                    />
                  </div>
                  <Button type="submit" className="w-full mb-4" disabled={isUploadingEfirma}>
                    {isUploadingEfirma ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Subiendo...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" /> Subir e.firma
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files">
          <div className="space-y-4">
            {isLoadingFiles ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-[rgb(0,100,80)]" />
              </div>
            ) : files.length === 0 ? (
              <div className="text-center py-12 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <FileIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No hay archivos</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Sube tu primer archivo para comenzar</p>
                <div className="mt-4">
                  <Input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    disabled={isUploadingFile}
                  />
                  <label htmlFor="file-upload">
                    <Button asChild className="cursor-pointer" disabled={isUploadingFile}>
                      <span>
                        {isUploadingFile ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Subiendo...
                          </>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" /> Subir Archivo
                          </>
                        )}
                      </span>
                    </Button>
                  </label>
                </div>
              </div>
            ) : (
              <>
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center">
                      <FileIcon className="mr-2" />
                      <div>
                        <span className="font-medium">{file.name}</span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(file.created_at)} - {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleFileDownload(file)} className="w-28">
                        <Download className="mr-2 h-4 w-4" />
                        Descargar
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleViewFile(file)} className="w-28">
                        <Eye className="mr-2 h-4 w-4" />
                        Ver
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="mt-4">
                  <Input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    disabled={isUploadingFile}
                  />
                  <label htmlFor="file-upload">
                    <Button asChild className="w-full cursor-pointer" disabled={isUploadingFile}>
                      <span>
                        {isUploadingFile ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Subiendo...
                          </>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" /> Subir Nuevo Archivo
                          </>
                        )}
                      </span>
                    </Button>
                  </label>
                </div>
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="space-y-4">
            {isLoadingHistory ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-[rgb(0,100,80)]" />
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-12 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <History className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No hay historial</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tu historial de actividades aparecerá aquí</p>
              </div>
            ) : (
              history.map((item, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <History className="mr-2" />
                  <div>
                    <p className="font-semibold">{item.action}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(item.date)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        {user?.lineaCaptura && (
          <TabsContent value="lineacaptura">
            <Card>
              <CardHeader>
                <CardTitle>Línea de Captura</CardTitle>
                <CardDescription>Utiliza esta línea para realizar tu pago de impuestos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                  <p className="font-mono text-lg">{user.lineaCaptura}</p>
                </div>
                <Button
                  className="mt-4"
                  onClick={async () => {
                    // Simular descarga de línea de captura
                    await new Promise((resolve) => setTimeout(resolve, 500))

                    toast({
                      title: "Línea de captura descargada",
                      description: "Se ha descargado la línea de captura",
                      variant: "success",
                    })

                    // Registrar la acción
                    if (user) {
                      await addHistoryItem(user.id, "Línea de captura descargada")
                    }
                  }}
                >
                  <Download className="mr-2 h-4 w-4" /> Descargar Línea de Captura
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}

