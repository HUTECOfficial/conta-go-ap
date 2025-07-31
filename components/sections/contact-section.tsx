"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ContactSection() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Email enviado:", email)
    setEmail("")
    alert("Información solicitada. Te contactaremos pronto.")
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container px-4 max-w-6xl mx-auto">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto w-full px-4 sm:px-0">
          <Input
            type="email"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 bg-white text-gray-900 dark:bg-gray-700 dark:text-white w-full"
            required
          />
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[rgb(0,100,80)] to-[rgb(0,200,160)] text-white hover:opacity-90 transition-all duration-200 transform hover:scale-105"
          >
            Solicitar Información
          </Button>
        </form>
      </div>
    </section>
  )
}

