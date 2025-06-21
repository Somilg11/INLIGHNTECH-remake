"use client"

import { useState, useEffect } from "react"
import LoadingScreen from "@/components/loading-screen"
import Hero3D from "@/components/hero-3d"
import FeaturesSection from "@/components/features-section"
import AboutSection from "@/components/about-section"
import ProgramsSection from "@/components/programs-section"
import WhyChooseUsSection from "@/components/why-choose-us-section"
import StatsSection from "@/components/stats-section"
import TestimonialsSection from "@/components/testimonials-section"
import CompaniesSection from "@/components/companies-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import DockNavigation from "@/components/dock-navigation"
import ScrollProgress from "@/components/scroll-progress"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <main className="bg-black text-white overflow-x-hidden">
      <ScrollProgress />
      <Hero3D />
      <FeaturesSection />
      <AboutSection />
      <ProgramsSection />
      <WhyChooseUsSection />
      <StatsSection />
      <TestimonialsSection />
      <CompaniesSection />
      <ContactSection />
      <Footer />
      <DockNavigation />
    </main>
  )
}
