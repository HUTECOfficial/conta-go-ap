"use client"

import Link from "next/link"

const sections = [
  { href: "/", label: "Inicio" },
  { href: "/services", label: "Servicios" },
  { href: "/pricing", label: "Precios" },
  { href: "/contact", label: "Contacto" },
]

export function Footer() {
  return (
    <footer className="py-8 px-4 bg-gray-900 text-white overflow-hidden relative">
      <div className="container mx-auto max-w-7xl grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Sobre Nosotros</h3>
          <p className="text-sm text-gray-400">
            Conta Go ofrece servicios contables de vanguardia potenciados por IA para pequeños negocios, autónomos y
            trabajadores de plataformas digitales.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Enlaces Rápidos</h3>
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.href}>
                <Link href={section.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                  {section.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contacto</h3>
          <p className="text-sm text-gray-400">Email: info@contago.com</p>
        </div>
      </div>
    </footer>
  )
}

