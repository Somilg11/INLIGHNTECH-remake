"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const companies = [
  { name: "Google", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Microsoft", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Amazon", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Meta", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Apple", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Netflix", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Tesla", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Spotify", logo: "/placeholder.svg?height=60&width=120" },
]

export default function CompaniesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const logosRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const logos = logosRef.current

    if (!section || !title || !logos) return

    // Title animation
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      onEnter: () => {
        gsap.fromTo(title, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "back.out(1.7)" })
      },
    })

    // Logo animation
    const logoElements = logos.querySelectorAll(".company-logo")
    ScrollTrigger.batch(logoElements, {
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          { y: 50, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
        )
      },
      start: "top 80%",
    })

    // Continuous floating animation
    gsap.to(logoElements, {
      y: () => gsap.utils.random(-10, 10),
      duration: () => gsap.utils.random(2, 4),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2,
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
  ref={sectionRef}
  className="py-20 bg-gradient-to-r from-black via-black to-purple-950 text-white relative overflow-hidden"
  id="companies"
>
      <div className="container mx-auto px-4 md:px-8">
        <h2 ref={titleRef} className="text-3xl md:text-5xl font-bold text-center mb-16 tracking-wide text-white">
          Our Interns Work At Top Companies
        </h2>

        <div ref={logosRef} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
          {companies.map((company, index) => (
            <div
              key={index}
              className="company-logo flex justify-center items-center p-4 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
            >
              <img src={company.logo || "/placeholder.svg"} alt={company.name} className="max-h-12 w-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
