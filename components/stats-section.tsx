"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation"
import { GlobeDemo } from "./globe-demo"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const stats = [
  { number: 5000, suffix: "+", label: "INTERNS ENROLLED" },
  { number: 9000, suffix: "+", label: "PROJECTS COMPLETED" },
  { number: 93, suffix: "%", label: "SATISFACTION RATE" },
  { number: 30, suffix: "+", label: "TOP INSTRUCTORS" },
]

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const container = statsRef.current
    if (!section || !container) return

    const statEls = Array.from(container.querySelectorAll<HTMLDivElement>(".stat-item"))

    // Batch-animate all counters on first enter
    ScrollTrigger.batch(statEls, {
      start: "top 80%",
      onEnter: (elements) => {
        elements.forEach((el, idx) => {
          const numEl = el.querySelector<HTMLSpanElement>(".stat-number")
          if (!numEl) return

          // Entrance motion
          gsap.fromTo(
            el,
            { y: 80, opacity: 0, scale: 0.8 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              delay: idx * 0.1,
              ease: "back.out(1.7)",
            },
          )

          // Counting effect
          const obj = { val: 0 }
          gsap.to(obj, {
            val: stats[idx].number,
            duration: 2,
            delay: idx * 0.1 + 0.3,
            ease: "power2.out",
            onUpdate: () => {
              numEl.textContent = Math.floor(obj.val).toLocaleString()
            },
          })
        })
      },
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <section ref={sectionRef} className="bg-white overflow-hidden" id="stats">
      <BackgroundGradientAnimation>
        <div className="flex items-center justify-center mx-auto px-4 md:px-8 bg-purple-500">
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 justify-items-center gap-8 max-w-6xl mx-auto py-12">
            {stats.map((s, i) => (
              <div key={i} className="stat-item text-center">
                <div className="text-5xl md:text-7xl font-bold mb-2 text-black">
                  <span className="stat-number">0</span>
                  {s.suffix}
                </div>
                <div className="text-xs md:text-sm font-bold text-white tracking-widest">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-[500px] mt-0 mx-auto flex items-center justify-center text-2xl font-bold text-white bg-black">
          <GlobeDemo/>
        </div>
      </BackgroundGradientAnimation>
    </section>
  )
}
