import { PricingSection } from "@/components/sections/pricing-section"

export default function PricingPage() {
  return (
    <div className="container mx-auto py-16">
      <h1 className="text-3xl font-bold text-center mb-8">
        <span className="text-[rgb(0,100,80)]">Nuestros</span> Planes
      </h1>
      <PricingSection />
    </div>
  )
}

