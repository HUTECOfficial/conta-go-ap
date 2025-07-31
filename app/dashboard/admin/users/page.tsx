"use client"

import { useAuth } from "@/hooks/use-auth"
import { redirect } from "next/navigation"
import { UsersManager } from "@/components/dashboard/admin/users-manager"

export default function UsersPage() {
  const { user, isAdmin } = useAuth()

  if (!user || !isAdmin) {
    redirect("/dashboard")
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Gestión de Usuarios</h1>
      <UsersManager />
    </div>
  )
}

