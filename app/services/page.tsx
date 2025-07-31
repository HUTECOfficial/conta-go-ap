import { ServicesSection } from "@/components/sections/services-section"

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-16">
      <h1 className="text-3xl font-bold text-center mb-8">
        <span className="text-[rgb(0,100,80)]">Nuestros Servicios</span> Contables
      </h1>
      <ServicesSection />
    </div>
  )
}

