"use client"

import { useAuth } from "@/hooks/use-auth"
import { redirect } from "next/navigation"
import { LineasCapturaManager } from "@/components/dashboard/admin/lineas-captura-manager"

export default function LineasCapturaPage() {
  const { user, isAdmin } = useAuth()

  if (!user || !isAdmin) {
    redirect("/dashboard")
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Gestión de Líneas de Captura</h1>
      <LineasCapturaManager />
    </div>
  )
}

