"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const services = [
  {
    title: "Web Development",
    description:
      "Custom web applications built with cutting-edge technologies like React, Next.js, and Node.js. We create scalable, performant solutions that drive business growth.",
    features: ["React & Next.js", "Node.js Backend", "Database Design", "API Development"],
    icon: "🌐",
  },
  {
    title: "Mobile Development",
    description:
      "Native and cross-platform mobile applications for iOS and Android. From concept to app store deployment, we handle the entire mobile development lifecycle.",
    features: ["iOS Development", "Android Development", "React Native", "Flutter"],
    icon: "📱",
  },
  {
    title: "UI/UX Design",
    description:
      "User-centered design that combines aesthetics with functionality. We create intuitive interfaces that enhance user experience and drive engagement.",
    features: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
    icon: "🎨",
  },
  {
    title: "Digital Strategy",
    description:
      "Comprehensive digital transformation strategies that align technology with business objectives. We help you navigate the digital landscape effectively.",
    features: ["Digital Consulting", "Technology Audit", "Growth Strategy", "Market Analysis"],
    icon: "🚀",
  },
  {
    title: "E-Commerce Solutions",
    description:
      "Complete e-commerce platforms that drive sales and enhance customer experience. From payment integration to inventory management.",
    features: ["Shopify Development", "WooCommerce", "Payment Integration", "Inventory Systems"],
    icon: "🛒",
  },
  {
    title: "Cloud Solutions",
    description:
      "Scalable cloud infrastructure and deployment solutions. We help you leverage cloud technologies for better performance and cost efficiency.",
    features: ["AWS Deployment", "Azure Solutions", "DevOps", "Scalability"],
    icon: "☁️",
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const cards = cardsRef.current

    if (!section || !title || !cards) return

    const cardElements = cards.querySelectorAll(".service-card")

    // Title entrance
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

    // Cards staggered entrance with 3D effects
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
    <section ref={sectionRef} className="py-20 bg-black text-white relative overflow-hidden" id="services">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />

      <div className="relative z-10 container mx-auto px-8">
        <h2 ref={titleRef} className="text-6xl md:text-8xl font-thin text-center mb-20 tracking-wider">
          SERVICES
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ServiceCardProps {
  title: string
  description: string
  features: string[]
  icon: string
  index: number
}

function ServiceCard({ title, description, features, icon, index }: ServiceCardProps) {
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
      className="service-card bg-gradient-to-br from-gray-900 to-black p-8 border border-gray-800 cursor-pointer group"
      style={{ perspective: "1000px" }}
    >
      <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">{icon}</div>

      <h3 className="text-2xl font-light mb-4 tracking-wider">{title}</h3>

      <p className="text-gray-400 mb-6 leading-relaxed">{description}</p>

      <ul className="space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="text-sm text-gray-500 flex items-center">
            <span className="w-2 h-2 bg-white rounded-full mr-3" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}
