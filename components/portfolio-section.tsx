"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const projects = [
  {
    title: "FinTech Dashboard",
    category: "Web Application",
    description:
      "A comprehensive financial dashboard with real-time analytics, built with React and D3.js for data visualization.",
    technologies: ["React", "Node.js", "MongoDB", "D3.js"],
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "E-Commerce Platform",
    category: "Full Stack",
    description: "Complete e-commerce solution with payment integration, inventory management, and admin dashboard.",
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Redis"],
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Healthcare Mobile App",
    category: "Mobile Development",
    description: "Patient management system with appointment scheduling, medical records, and telemedicine features.",
    technologies: ["React Native", "Firebase", "WebRTC", "AWS"],
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "AI-Powered Analytics",
    category: "Machine Learning",
    description: "Business intelligence platform with predictive analytics and automated reporting capabilities.",
    technologies: ["Python", "TensorFlow", "FastAPI", "Docker"],
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Real Estate Platform",
    category: "Web Application",
    description: "Property listing and management platform with virtual tours and mortgage calculator integration.",
    technologies: ["Vue.js", "Laravel", "MySQL", "Mapbox"],
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Social Media Dashboard",
    category: "SaaS Platform",
    description:
      "Multi-platform social media management tool with scheduling, analytics, and team collaboration features.",
    technologies: ["Angular", "Express.js", "MongoDB", "Socket.io"],
    image: "/placeholder.svg?height=600&width=800",
  },
]

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const container = containerRef.current

    if (!section || !title || !container) return

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

    // Portfolio items animation
    const items = container.querySelectorAll(".portfolio-item")
    ScrollTrigger.batch(items, {
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          {
            y: 200,
            opacity: 0,
            scale: 0.8,
            rotationY: 30,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 1.5,
            stagger: 0.2,
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
    <section ref={sectionRef} className="py-20 bg-black text-white relative overflow-hidden" id="portfolio">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />

      <div className="relative z-10 container mx-auto px-8">
        <h2 ref={titleRef} className="text-6xl md:text-8xl font-thin text-center mb-20 tracking-wider">
          PORTFOLIO
        </h2>

        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
  description: string
  technologies: string[]
  image: string
  index: number
}

function PortfolioItem({ title, category, description, technologies, image, index }: PortfolioItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const item = itemRef.current
    const imageDiv = imageRef.current
    const content = contentRef.current

    if (!item || !imageDiv || !content) return

    const handleMouseEnter = () => {
      gsap.to(imageDiv, {
        scale: 1.1,
        rotationY: 5,
        duration: 0.8,
        ease: "power2.out",
      })

      gsap.to(content, {
        y: -10,
        duration: 0.5,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(imageDiv, {
        scale: 1,
        rotationY: 0,
        duration: 0.8,
        ease: "power2.out",
      })

      gsap.to(content, {
        y: 0,
        duration: 0.5,
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
    <div ref={itemRef} className="portfolio-item cursor-pointer group" style={{ perspective: "1000px" }}>
      <div ref={imageRef} className="relative overflow-hidden mb-6 bg-gray-900 aspect-[4/3]">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div ref={contentRef} className="space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-light tracking-wider">{title}</h3>
          <span className="text-sm text-gray-400 tracking-widest uppercase">{category}</span>
        </div>

        <p className="text-gray-400 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, i) => (
            <span key={i} className="px-3 py-1 bg-gray-800 text-xs tracking-wider border border-gray-700">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
