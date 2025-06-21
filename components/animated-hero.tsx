"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AnimatedHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const background = backgroundRef.current

    if (!hero || !title || !subtitle || !background) return

    // Split text into individual characters
    const titleText = title.textContent || ""
    const subtitleText = subtitle.textContent || ""

    title.innerHTML = titleText
      .split("")
      .map((char) => (char === " " ? "&nbsp;" : `<span class="inline-block">${char}</span>`))
      .join("")

    subtitle.innerHTML = subtitleText
      .split("")
      .map((char) => (char === " " ? "&nbsp;" : `<span class="inline-block">${char}</span>`))
      .join("")

    const titleChars = title.querySelectorAll("span")
    const subtitleChars = subtitle.querySelectorAll("span")

    // Initial setup
    gsap.set(titleChars, { y: 100, opacity: 0, rotationX: 90 })
    gsap.set(subtitleChars, { y: 50, opacity: 0 })
    gsap.set(background, { scale: 1.2, opacity: 0.3 })

    // Animation timeline
    const tl = gsap.timeline({ delay: 3.5 })

    // Background entrance
    tl.to(background, {
      scale: 1,
      opacity: 0.1,
      duration: 2,
      ease: "power2.out",
    })

    // Title animation
    tl.to(
      titleChars,
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.05,
        ease: "back.out(1.7)",
      },
      "-=1.5",
    )

    // Subtitle animation
    tl.to(
      subtitleChars,
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.02,
        ease: "power2.out",
      },
      "-=0.8",
    )

    // Parallax scroll effect
    ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress
        gsap.to(background, {
          y: progress * 200,
          scale: 1 + progress * 0.2,
          duration: 0.3,
        })
        gsap.to(titleChars, {
          y: progress * -100,
          opacity: 1 - progress * 0.5,
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
    <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden" id="hero">
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%),
                           radial-gradient(circle at 70% 30%, rgba(255,255,255,0.05) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 text-center px-4">
        <h1 ref={titleRef} className="text-6xl md:text-8xl lg:text-9xl font-thin tracking-wider mb-6">
          INLIGHNTECH
        </h1>
        <p ref={subtitleRef} className="text-xl md:text-2xl font-light tracking-widest text-gray-300">
          ILLUMINATING DIGITAL EXPERIENCES
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="w-px h-16 bg-white opacity-50 animate-pulse" />
      </div>
    </section>
  )
}
