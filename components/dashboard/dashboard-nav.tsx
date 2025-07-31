"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { LayoutDashboard, FileText, BarChart, Users, Upload, User } from "lucide-react"

const commonNavItems = [
  { href: "/dashboard", label: "Panel Principal", icon: LayoutDashboard },
  { href: "/dashboard/documents", label: "Documentos", icon: FileText },
  { href: "/dashboard/declarations", label: "Declaraciones", icon: FileText },
  { href: "/dashboard/metrics", label: "Métricas", icon: BarChart },
]

const adminNavItems = [
  { href: "/dashboard/admin/users", label: "Usuarios", icon: Users },
  { href: "/dashboard/admin/lineas-captura", label: "Líneas de Captura", icon: Upload },
]

export function DashboardNav() {
  const pathname = usePathname()
  const { isAdmin } = useAuth()

  const navItems = isAdmin ? [...commonNavItems, ...adminNavItems] : commonNavItems

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6 hidden md:flex flex-wrap gap-2 justify-center">
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
              pathname === item.href
                ? "bg-[rgb(0,100,80)] text-white dark:bg-[rgb(0,200,160)]"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        )
      })}
      <Link
        href="/profile"
        className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
          pathname === "/profile"
            ? "bg-[rgb(0,100,80)] text-white dark:bg-[rgb(0,200,160)]"
            : "hover:bg-gray-200 dark:hover:bg-gray-700"
        }`}
      >
        <User className="h-5 w-5" />
        <span>Mi Perfil</span>
      </Link>
    </div>
  )
}

