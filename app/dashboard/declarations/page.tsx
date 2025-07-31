"use client"

import { useAuth } from "@/hooks/use-auth"
import { redirect } from "next/navigation"
import { DeclarationsManager } from "@/components/dashboard/declarations-manager"

export default function DeclarationsPage() {
  const { user } = useAuth()

  if (!user) {
    redirect("/auth")
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Declaraciones</h1>
      <DeclarationsManager />
    </div>
  )
}

