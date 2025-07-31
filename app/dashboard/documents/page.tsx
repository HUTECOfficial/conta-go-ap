"use client"

import { useAuth } from "@/hooks/use-auth"
import { redirect } from "next/navigation"
import { DocumentsManager } from "@/components/dashboard/documents-manager"

export default function DocumentsPage() {
  const { user } = useAuth()

  if (!user) {
    redirect("/auth")
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Documentos</h1>
      <DocumentsManager />
    </div>
  )
}

