"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Web Development",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Mobile Banking App",
    category: "Mobile Development",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Brand Identity System",
    category: "Design",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "SaaS Dashboard",
    category: "Web Development",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Fitness Tracking App",
    category: "Mobile Development",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Corporate Website",
    category: "Web Development",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function PortfolioGrid() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const grid = gridRef.current

    if (!section || !title || !grid) return

    // Title animation
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      onEnter: () => {
        gsap.fromTo(title, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" })
      },
    })

    // Grid items animation
    const items = grid.querySelectorAll(".portfolio-item")
    ScrollTrigger.batch(items, {
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          { y: 100, opacity: 0, scale: 0.8 },
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
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-black text-white" id="portfolio">
      <div className="container mx-auto px-4">
        <h2 ref={titleRef} className="text-5xl md:text-7xl font-thin text-center mb-20 tracking-wider">
          PORTFOLIO
        </h2>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <PortfolioItem key={index} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface PortfolioItemProps {
  title: string
  category: string
  image: string
  index: number
}

function PortfolioItem({ title, category, image, index }: PortfolioItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const item = itemRef.current
    const overlay = overlayRef.current
    const img = imageRef.current

    if (!item || !overlay || !img) return

    const handleMouseEnter = () => {
      gsap.to(img, {
        scale: 1.1,
        duration: 0.6,
        ease: "power2.out",
      })
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(img, {
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      })
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      })
    }

    item.addEventListener("mouseenter", handleMouseEnter)
    item.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      item.removeEventListener("mouseenter", handleMouseEnter)
      item.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={itemRef}
      className="portfolio-item relative overflow-hidden bg-gray-900 aspect-[4/3] cursor-pointer group"
    >
      <img ref={imageRef} src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center opacity-0 transition-opacity"
      >
        <div className="text-center">
          <h3 className="text-2xl font-light mb-2 tracking-wider">{title}</h3>
          <p className="text-gray-300 text-sm tracking-widest uppercase">{category}</p>
        </div>
      </div>
    </div>
  )
}
