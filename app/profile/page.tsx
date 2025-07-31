"use client"

import { useAuth } from "@/hooks/use-auth"
import { redirect } from "next/navigation"
import { ProfileManager } from "@/components/profile/profile-manager"

export default function ProfilePage() {
  const { user } = useAuth()

  if (!user) {
    redirect("/auth")
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl px-4">
      <h1 className="text-2xl font-bold mb-6">Mi Perfil</h1>
      <ProfileManager />
    </div>
  )
}

