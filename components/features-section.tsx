"use client"

import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { GlowingEffectDemo } from "./glowing-card-demo"

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLUListElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".glow-card")
    const heading = headingRef.current

    // Animate heading text
    if (heading) {
      gsap.fromTo(
        heading,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 80%",
          },
        }
      )
    }

    // Animate glow cards
    if (cards) {
      ScrollTrigger.batch(cards, {
        onEnter: (els) => {
          gsap.fromTo(
            els,
            { y: 100, opacity: 0, scale: 0.9 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              stagger: 0.1,
              ease: "power2.out",
            }
          )
        },
        start: "top 90%",
      })
    }

    // Cleanup
    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-black text-white" id="features">
      <div className="container mx-auto px-4 md:px-8">
        <h2 ref={headingRef} className="text-5xl font-bold text-center mb-12">
          Why Choose Our Internship
        </h2>

        <GlowingEffectDemo />
      </div>
    </section>
  )
}

interface GlowCardProps {
  icon: React.ReactNode
  title: string
  description: string
}
