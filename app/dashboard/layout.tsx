import type React from "react"
import { AuthGuard } from "@/components/auth-guard"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <div className="max-w-7xl mx-auto">
        <DashboardNav />
        <div className="p-6 w-full">{children}</div>
      </div>
    </AuthGuard>
  )
}

