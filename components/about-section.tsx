"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { DraggableCardDemo } from "./draggable-card-demo"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLSpanElement>(null)
  const morphRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const morph = morphRef.current

    if (!section || !title || !subtitle || !morph) return

    // Morphing background animation
    gsap.to(morph, {
      rotation: 360,
      scale: 1.2,
      duration: 20,
      repeat: -1,
      ease: "none",
    })

    // Pin section and animate title & subtitle
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=200%",
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress

        // About title grows
        gsap.to(title, {
          scale: 1 + progress * 0.3,
          y: progress * -50,
          opacity: 1 - progress * 0.2,
          duration: 0.3,
        })

        // WHO WE ARE vanishes
        gsap.to(subtitle, {
          scale: 1 - progress * 0.2,
          opacity: 1 - progress,
          duration: 0.3,
        })

        // Morph scaling
        gsap.to(morph, {
          scale: 1.2 + progress * 0.8,
          opacity: 0.1 - progress * 0.05,
          duration: 0.3,
        })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-black text-white overflow-hidden"
      id="about"
    >
      {/* Morphing Background */}
      <div
        ref={morphRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-10"
      >
        <div className="w-full h-full bg-gradient-to-br from-white to-gray-400 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center mt-32">
        <div className="text-center mb-12">
          <span
            ref={subtitleRef}
            className="text-gray-400 text-lg font-bold tracking-widest uppercase"
          >
            WHO WE ARE
          </span>
          <h2
            ref={titleRef}
            className="text-xl md:text-2xl lg:text-4xl font-bold mt-4 tracking-wide"
          >
            About INLIGHN TECH
          </h2>
        </div>

        {/* Draggable cards content */}
        <div className="w-full">
          <DraggableCardDemo />
        </div>
      </div>
    </section>
  )
}
