"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    domain: "",
    state: "",
    message: "",
  })

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const form = formRef.current
    const particles = particlesRef.current

    if (!section || !title || !form || !particles) return

    // Create floating particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div")
      particle.className = "absolute w-2 h-2 bg-white rounded-full opacity-10"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.top = Math.random() * 100 + "%"
      particles.appendChild(particle)
    }

    const particleElements = particles.querySelectorAll("div")

    // Particles animation
    gsap.to(particleElements, {
      y: () => gsap.utils.random(-50, 50),
      x: () => gsap.utils.random(-50, 50),
      duration: () => gsap.utils.random(5, 10),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2,
    })

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

    // Form animation
    const formElements = form.querySelectorAll("input, textarea, button, select")
    ScrollTrigger.create({
      trigger: form,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(
          formElements,
          { y: 50, opacity: 0, rotationX: 45 },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)

    // Button animation on submit
    const button = e.currentTarget.querySelector('button[type="submit"]')
    if (button) {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section ref={sectionRef} className="py-20 bg-black text-white relative overflow-hidden" id="contact">
      <div ref={particlesRef} className="absolute inset-0" />

      <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-gray-400 text-lg font-bold tracking-widest uppercase">GET IN TOUCH</span>
          <h2 ref={titleRef} className="text-4xl md:text-6xl lg:text-8xl font-bold mt-4 tracking-wide">
            Fill the form to contact us
          </h2>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-8 bg-gray-900 p-8 md:p-12 border border-gray-800"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="bg-transparent border-0 border-b-2 border-gray-600 rounded-none px-0 py-4 text-lg focus:border-white transition-colors text-white placeholder-gray-400"
                required
              />
            </div>
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-transparent border-0 border-b-2 border-gray-600 rounded-none px-0 py-4 text-lg focus:border-white transition-colors text-white placeholder-gray-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <select
                name="domain"
                value={formData.domain}
                onChange={handleInputChange}
                className="w-full bg-transparent border-0 border-b-2 border-gray-600 rounded-none px-0 py-4 text-lg focus:border-white transition-colors text-white"
                required
              >
                <option value="" className="bg-gray-900">
                  Domain of Internship
                </option>
                <option value="full-stack" className="bg-gray-900">
                  Full Stack Development
                </option>
                <option value="data-science" className="bg-gray-900">
                  Data Science
                </option>
                <option value="cyber-security" className="bg-gray-900">
                  Cyber Security
                </option>
                <option value="data-analyst" className="bg-gray-900">
                  Data Analyst
                </option>
                <option value="python" className="bg-gray-900">
                  Python Development
                </option>
                <option value="business-analysis" className="bg-gray-900">
                  Business Analysis
                </option>
              </select>
            </div>
            <div>
              <Input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                className="bg-transparent border-0 border-b-2 border-gray-600 rounded-none px-0 py-4 text-lg focus:border-white transition-colors text-white placeholder-gray-400"
                required
              />
            </div>
          </div>

          <div>
            <Textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleInputChange}
              rows={6}
              className="bg-transparent border-0 border-b-2 border-gray-600 rounded-none px-0 py-4 text-lg focus:border-white transition-colors resize-none text-white placeholder-gray-400"
              required
            />
          </div>

          <div className="text-center pt-8">
            <Button
              type="submit"
              className="bg-white text-black hover:bg-gray-200 px-12 py-4 text-lg font-bold tracking-wider transition-all duration-300 hover:scale-105"
            >
              SUBMIT
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
