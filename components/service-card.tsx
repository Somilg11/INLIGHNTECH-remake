"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ServiceCardProps {
  title: string
  description: string
  icon: string
  index: number
}

export default function ServiceCard({ title, description, icon, index }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const frontRef = useRef<HTMLDivElement>(null)
  const backRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const front = frontRef.current
    const back = backRef.current

    if (!card || !front || !back) return

    // Initial setup
    gsap.set(back, { rotationY: 180 })
    gsap.set(card, { transformStyle: "preserve-3d" })
    gsap.set([front, back], { backfaceVisibility: "hidden" })

    // Hover animations
    const handleMouseEnter = () => {
      gsap.to(card, {
        rotationY: 180,
        duration: 0.8,
        ease: "power2.inOut",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationY: 0,
        duration: 0.8,
        ease: "power2.inOut",
      })
    }

    card.addEventListener("mouseenter", handleMouseEnter)
    card.addEventListener("mouseleave", handleMouseLeave)

    // Scroll-triggered entrance
    ScrollTrigger.create({
      trigger: card,
      start: "left 80%",
      onEnter: () => {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0, rotationX: 45 },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 1,
            delay: index * 0.2,
            ease: "back.out(1.7)",
          },
        )
      },
    })

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter)
      card.removeEventListener("mouseleave", handleMouseLeave)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [index])

  return (
    <div ref={cardRef} className="w-80 h-96 cursor-pointer perspective-1000">
      <div
        ref={frontRef}
        className="absolute inset-0 bg-black text-white p-8 flex flex-col justify-center items-center text-center border border-gray-800"
      >
        <div className="text-6xl mb-6">{icon}</div>
        <h3 className="text-2xl font-light tracking-wider">{title}</h3>
      </div>

      <div
        ref={backRef}
        className="absolute inset-0 bg-white text-black p-8 flex flex-col justify-center border border-gray-200"
      >
        <h3 className="text-2xl font-light mb-6 tracking-wider">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
