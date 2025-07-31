"use client"

import { useAuth } from "@/hooks/use-auth"
import { redirect } from "next/navigation"
import { UserMetrics } from "@/components/dashboard/user-metrics"
import { AdminMetrics } from "@/components/dashboard/admin-metrics"

export default function MetricsPage() {
  const { user, isAdmin } = useAuth()

  if (!user) {
    redirect("/auth")
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Métricas</h1>
      {isAdmin ? <AdminMetrics /> : <UserMetrics />}
    </div>
  )
}

