import { ContactSection } from "@/components/sections/contact-section"

export default function ContactPage() {
  return (
    <div className="container mx-auto py-16">
      <h1 className="text-3xl font-bold text-center mb-8">
        <span className="text-[rgb(0,100,80)]">Contáctanos</span>
      </h1>
      <ContactSection />
    </div>
  )
}

