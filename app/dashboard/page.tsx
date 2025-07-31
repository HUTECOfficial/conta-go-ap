"use client"

import { useAuth } from "@/hooks/use-auth"
import { redirect } from "next/navigation"
import { UserDashboard } from "@/components/dashboard/user-dashboard"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"

export default function DashboardPage() {
  const { user, isAdmin } = useAuth()

  if (!user) {
    redirect("/auth")
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Panel de Control</h1>
      {isAdmin ? <AdminDashboard /> : <UserDashboard />}
    </div>
  )
}

