"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const logo = logoRef.current
    const particles = particlesRef.current
    const progress = progressRef.current

    if (!container || !logo || !particles || !progress) return

    // Create particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div")
      particle.className = "absolute w-1 h-1 bg-white rounded-full opacity-20"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.top = Math.random() * 100 + "%"
      particles.appendChild(particle)
    }

    const particleElements = particles.querySelectorAll("div")

    // Initial setup
    gsap.set(container, { scale: 1, opacity: 1 })
    gsap.set(logo, { scale: 0, rotation: -180, opacity: 0 })
    gsap.set(particleElements, { scale: 0, opacity: 0 })
    gsap.set(progress, { width: 0 })

    // Animation timeline
    const tl = gsap.timeline()

    // Particles entrance
    tl.to(particleElements, {
      scale: 1,
      opacity: 0.3,
      duration: 1,
      stagger: 0.02,
      ease: "power2.out",
    })

    // Logo entrance
    tl.to(
      logo,
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 1.5,
        ease: "back.out(1.7)",
      },
      "-=0.5",
    )

    // Progress bar
    tl.to(
      progress,
      {
        width: "100%",
        duration: 2,
        ease: "power2.inOut",
      },
      "-=1",
    )

    // Particles animation
    tl.to(
      particleElements,
      {
        y: () => gsap.utils.random(-200, 200),
        x: () => gsap.utils.random(-200, 200),
        scale: () => gsap.utils.random(0.5, 2),
        duration: 2,
        ease: "power2.inOut",
      },
      "-=2",
    )

    // Final explosion and zoom out
    tl.to(
      particleElements,
      {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      },
      "+=0.5",
    )

    tl.to(
      logo,
      {
        scale: 3,
        opacity: 0,
        duration: 0.8,
        ease: "power2.in",
      },
      "-=0.3",
    )

    tl.to(
      container,
      {
        scale: 10,
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
      },
      "-=0.5",
    )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div ref={particlesRef} className="absolute inset-0" />

      <div className="relative z-10 text-center">
        <div ref={logoRef} className="mb-8">
          <div className="w-32 h-32 border-2 border-white rounded-full flex items-center justify-center relative">
            <div className="absolute inset-2 border border-gray-400 rounded-full animate-spin" />
            <div className="text-white font-light text-lg tracking-[0.3em]">IL</div>
          </div>
        </div>

        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div ref={progressRef} className="h-full bg-white rounded-full" />
        </div>

        <p className="text-gray-400 text-sm mt-4 tracking-widest">LOADING EXPERIENCE</p>
      </div>
    </div>
  )
}
