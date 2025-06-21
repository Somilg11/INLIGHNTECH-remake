"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Briefcase, GraduationCap } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const reasons = [
  {
    icon: Briefcase,
    title: "Career Support",
    description:
      "We go beyond training. Our career services include portfolio reviews, interview prep, and connections with industry professionals to help you land your dream job.",
  },
  {
    icon: GraduationCap,
    title: "Tailored Programs",
    description:
      "Our courses in Full Stack Development, Data Science, and Project Management are crafted with a focus on hands-on, practical learning.",
  },
]

export default function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const cards = cardsRef.current

    if (!section || !title || !cards) return

    // Title animation
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      onEnter: () => {
        gsap.fromTo(
          title,
          { y: 100, opacity: 0, rotationX: 90 },
          { y: 0, opacity: 1, rotationX: 0, duration: 1.5, ease: "back.out(1.7)" },
        )
      },
    })

    // Cards animation
    const cardElements = cards.querySelectorAll(".reason-card")
    ScrollTrigger.batch(cardElements, {
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          {
            y: 200,
            opacity: 0,
            rotationY: 45,
            scale: 0.8,
          },
          {
            y: 0,
            opacity: 1,
            rotationY: 0,
            scale: 1,
            duration: 1.5,
            stagger: 0.3,
            ease: "back.out(1.7)",
          },
        )
      },
      start: "top 80%",
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-black text-white relative overflow-hidden" id="why-choose-us">
      <div className="container mx-auto px-4 md:px-8">
        <h2 ref={titleRef} className="text-4xl md:text-6xl lg:text-8xl font-bold text-center mb-20 tracking-wide">
          Why Choose Us?
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <ReasonCard key={index} {...reason} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ReasonCardProps {
  icon: React.ComponentType<any>
  title: string
  description: string
  index: number
}

function ReasonCard({ icon: Icon, title, description, index }: ReasonCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -20,
        rotationY: 5,
        rotationX: 5,
        scale: 1.05,
        duration: 0.6,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      })
    }

    card.addEventListener("mouseenter", handleMouseEnter)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="reason-card bg-gradient-to-br from-gray-900 to-black p-12 border border-gray-800 cursor-pointer group text-center"
      style={{ perspective: "1000px" }}
    >
      <div className="mb-8 flex justify-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-10 h-10 text-black" />
        </div>
      </div>

      <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-wide">{title}</h3>
      <p className="text-gray-300 text-lg leading-relaxed font-medium">{description}</p>
    </div>
  )
}
