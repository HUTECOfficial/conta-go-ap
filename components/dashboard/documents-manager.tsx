"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileIcon, Download, Eye, Upload, Loader2 } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { uploadDocument, getUserDocuments, type Document } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export function DocumentsManager() {
  const [files, setFiles] = useState<Document[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

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
        setIsLoading(false)
      }
    }

    loadDocuments()
  }, [user, toast])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !user) return

    setIsUploading(true)

    try {
      await uploadDocument(user.id, file)

      // Recargar documentos
      const documents = await getUserDocuments(user.id)
      setFiles(documents)

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
      setIsUploading(false)
    }
  }

  const handleFileDownload = async (file: Document) => {
    try {
      // Simular descarga
      await new Promise((resolve) => setTimeout(resolve, 800))

      toast({
        title: "Archivo descargado",
        description: `Se ha descargado "${file.name}"`,
        variant: "success",
      })
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
      // Simular visualización
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast({
        title: "Visualizando archivo",
        description: `Visualizando "${file.name}"`,
        variant: "success",
      })
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[rgb(0,100,80)]" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {files.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <FileIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">No hay documentos</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Sube tu primer documento para comenzar</p>
          <div className="mt-4">
            <Input type="file" onChange={handleFileUpload} className="hidden" id="file-upload" disabled={isUploading} />
            <label htmlFor="file-upload">
              <Button asChild className="cursor-pointer" disabled={isUploading}>
                <span>
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Subiendo...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" /> Subir Documento
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
            <Input type="file" onChange={handleFileUpload} className="hidden" id="file-upload" disabled={isUploading} />
            <label htmlFor="file-upload">
              <Button asChild className="w-full cursor-pointer" disabled={isUploading}>
                <span>
                  {isUploading ? (
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
  )
}

