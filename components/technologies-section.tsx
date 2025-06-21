"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const technologies = [
  { name: "React", category: "Frontend", level: 95 },
  { name: "Next.js", category: "Framework", level: 90 },
  { name: "Node.js", category: "Backend", level: 88 },
  { name: "TypeScript", category: "Language", level: 92 },
  { name: "Python", category: "Language", level: 85 },
  { name: "AWS", category: "Cloud", level: 80 },
  { name: "MongoDB", category: "Database", level: 87 },
  { name: "PostgreSQL", category: "Database", level: 83 },
  { name: "Docker", category: "DevOps", level: 78 },
  { name: "Kubernetes", category: "DevOps", level: 75 },
  { name: "GraphQL", category: "API", level: 82 },
  { name: "Redis", category: "Cache", level: 80 },
]

export default function TechnologiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const orbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const grid = gridRef.current
    const orb = orbRef.current

    if (!section || !title || !grid || !orb) return

    // Floating orb animation
    gsap.to(orb, {
      y: 50,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    gsap.to(orb, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
    })

    // Pin section with horizontal scroll
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress

        // Horizontal scroll effect
        gsap.to(grid, {
          x: -progress * (grid.scrollWidth - window.innerWidth + 200),
          duration: 0.3,
        })

        // Title transformation
        gsap.to(title, {
          scale: 1 + progress * 0.3,
          y: progress * -50,
          duration: 0.3,
        })

        // Orb movement
        gsap.to(orb, {
          x: progress * 200,
          scale: 1 + progress * 0.5,
          duration: 0.3,
        })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen bg-white text-black overflow-hidden" id="technologies">
      <div
        ref={orbRef}
        className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-black to-gray-600 rounded-full opacity-10 blur-xl"
      />

      <div className="relative z-10 h-full flex flex-col justify-center">
        <h2 ref={titleRef} className="text-6xl md:text-8xl font-thin text-center mb-20 tracking-wider">
          TECHNOLOGIES
        </h2>

        <div ref={gridRef} className="flex gap-8 px-8" style={{ width: `${technologies.length * 300}px` }}>
          {technologies.map((tech, index) => (
            <TechCard key={index} {...tech} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface TechCardProps {
  name: string
  category: string
  level: number
  index: number
}

function TechCard({ name, category, level, index }: TechCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const progress = progressRef.current

    if (!card || !progress) return

    // Card entrance animation
    ScrollTrigger.create({
      trigger: card,
      start: "left 80%",
      onEnter: () => {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0, rotationY: 45 },
          {
            y: 0,
            opacity: 1,
            rotationY: 0,
            duration: 1,
            delay: index * 0.1,
            ease: "back.out(1.7)",
          },
        )

        // Progress bar animation
        gsap.fromTo(
          progress,
          { width: 0 },
          {
            width: `${level}%`,
            duration: 2,
            delay: index * 0.1 + 0.5,
            ease: "power2.out",
          },
        )
      },
    })

    // Hover effects
    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.1,
        rotationY: 10,
        z: 50,
        duration: 0.5,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        rotationY: 0,
        z: 0,
        duration: 0.5,
        ease: "power2.out",
      })
    }

    card.addEventListener("mouseenter", handleMouseEnter)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter)
      card.removeEventListener("mouseleave", handleMouseLeave)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [index, level])

  return (
    <div
      ref={cardRef}
      className="w-72 h-80 bg-gradient-to-br from-gray-100 to-white p-8 border border-gray-200 cursor-pointer"
      style={{ perspective: "1000px" }}
    >
      <div className="text-center">
        <h3 className="text-3xl font-light mb-2 tracking-wider">{name}</h3>
        <p className="text-gray-600 text-sm tracking-widest uppercase mb-8">{category}</p>

        <div className="relative">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div ref={progressRef} className="h-full bg-black rounded-full" style={{ width: 0 }} />
          </div>
          <div className="text-right mt-2 text-sm font-light">{level}%</div>
        </div>
      </div>
    </div>
  )
}
