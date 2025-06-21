"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { BackgroundLines } from "./ui/background-lines"
import { HoverBorderGradient } from "./ui/hover-border-gradient"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Hero3D() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const cubeRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const cta = ctaRef.current
    const cube = cubeRef.current
    const particles = particlesRef.current

    if (!hero || !title || !subtitle || !cta || !cube || !particles) return

    // Create floating particles
    for (let i = 0; i < 100; i++) {
      const particle = document.createElement("div")
      particle.className = "absolute w-1 h-1 bg-white rounded-full opacity-10"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.top = Math.random() * 100 + "%"
      particles.appendChild(particle)
    }

    const particleElements = particles.querySelectorAll("div")

    // Split text into characters
    const titleText = "Transform Your Career with INLIGHN TECH 🎓"
    const subtitleText =
      "Gain real-world experience with our immersive internship programs in Cyber Security, Full Stack Development, Data Science, Data Analyst and in various tech domains. Learn today, lead tomorrow."

    title.innerHTML = titleText
      .split(" ")
      .map(
        (word, i) =>
          `<span class="inline-block mr-4" style="transform: translateY(100px) rotateX(90deg); opacity: 0;">${word}</span>`,
      )
      .join("")

    subtitle.innerHTML = subtitleText
      .split(" ")
      .map(
        (word, i) => `<span class="inline-block mr-2" style="transform: translateY(50px); opacity: 0;">${word}</span>`,
      )
      .join("")

    const titleWords = title.querySelectorAll("span")
    const subtitleWords = subtitle.querySelectorAll("span")

    // Initial setup
    gsap.set(cube, { rotationX: 45, rotationY: 45, scale: 0 })
    gsap.set(particleElements, { scale: 0 })
    gsap.set(cta, { y: 50, opacity: 0 })

    // Main animation timeline
    const tl = gsap.timeline({ delay: 4.5 })

    // Particles entrance
    tl.to(particleElements, {
      scale: 1,
      duration: 2,
      stagger: 0.01,
      ease: "power2.out",
    })

    // Cube entrance
    tl.to(
      cube,
      {
        scale: 1,
        duration: 2,
        ease: "back.out(1.7)",
      },
      "-=1.5",
    )

    // Title animation
    tl.to(
      titleWords,
      {
        y: 0,
        rotationX: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      "-=1",
    )

    // Subtitle animation
    tl.to(
      subtitleWords,
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.05,
        ease: "power2.out",
      },
      "-=0.8",
    )

    // CTA animation
    tl.to(
      cta,
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.7)",
      },
      "-=0.5",
    )

    // Continuous animations
    gsap.to(cube, {
      rotationY: "+=360",
      duration: 20,
      repeat: -1,
      ease: "none",
    })

    gsap.to(particleElements, {
      y: () => gsap.utils.random(-20, 20),
      x: () => gsap.utils.random(-20, 20),
      duration: () => gsap.utils.random(3, 6),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.1,
    })

    // Scroll-triggered animations
    ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress

        gsap.to(cube, {
          rotationX: 45 + progress * 180,
          scale: 1 - progress * 0.5,
          y: progress * -200,
          duration: 0.3,
        })

        gsap.to([titleWords, subtitleWords], {
          y: progress * -100,
          rotationX: progress * -90,
          opacity: 1 - progress,
          duration: 0.3,
        })

        gsap.to(particleElements, {
          y: progress * -300,
          opacity: 0.1 - progress * 0.1,
          duration: 0.3,
        })
      },
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero">
      <div ref={particlesRef} className="absolute inset-0" />

      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 opacity-50" />

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div
          ref={cubeRef}
          className="mb-8 mx-auto w-20 h-20 md:w-32 md:h-32 relative"
          style={{ perspective: "1000px" }}
        >
          <div className="w-full h-full relative" style={{ transformStyle: "preserve-3d" }}>
            <div
              className="absolute inset-0 bg-gradient-to-br from-white to-gray-300 border border-gray-400"
              style={{ transform: "rotateY(0deg) translateZ(40px)" }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-400 border border-gray-500"
              style={{ transform: "rotateY(90deg) translateZ(40px)" }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-500 border border-gray-600"
              style={{ transform: "rotateY(180deg) translateZ(40px)" }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 border border-gray-700"
              style={{ transform: "rotateY(-90deg) translateZ(40px)" }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300 border border-gray-400"
              style={{ transform: "rotateX(90deg) translateZ(40px)" }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-br from-gray-500 to-gray-700 border border-gray-800"
              style={{ transform: "rotateX(-90deg) translateZ(40px)" }}
            />
          </div>
        </div>

        <BackgroundLines className="bg-transparent">

        <h1 ref={titleRef} className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-wide mb-6 leading-tight" />

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl font-medium text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed"
        />

        

        <div ref={ctaRef} className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
          <Button className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-bold tracking-wider transition-all duration-300 hover:scale-105 w-full md:w-auto">
            EXPLORE INTERNSHIPS
          </Button>
          {/* <Button
            variant="outline"
            className="border-white text-black hover:bg-white hover:text-black px-8 py-4 text-lg font-bold tracking-wider transition-all duration-300 hover:scale-105 w-full md:w-auto"
          > */}
            <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="bg-black text-white flex items-center space-x-2"
        >

            LOGIN TO PORTAL
        </HoverBorderGradient>
          {/* </Button> */}
        </div>

        </BackgroundLines>
      </div>

      {/* <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div> */}
    </section>
  )
}
