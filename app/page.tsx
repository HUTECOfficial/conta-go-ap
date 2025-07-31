import { HeroSection } from "@/components/sections/hero-section"
import { ServicesSection } from "@/components/sections/services-section"
import { SecuritySection } from "@/components/sections/security-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { ContactSection } from "@/components/sections/contact-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <SecuritySection />
      <PricingSection />
      <ContactSection />
    </>
  )
}

