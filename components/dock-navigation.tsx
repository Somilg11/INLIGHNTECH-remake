"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Home, User, BookOpen, Award, MessageSquare, Mail } from "lucide-react"

const navItems = [
  { icon: Home, label: "Home", href: "#hero" },
  { icon: User, label: "About Us", href: "#about" },
  { icon: BookOpen, label: "Programs", href: "#programs" },
  { icon: Award, label: "Verify Certificate", href: "#" },
  { icon: MessageSquare, label: "What's Special", href: "#features" },
  { icon: Mail, label: "Contact Us", href: "#contact" },
]

export default function DockNavigation() {
  const dockRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dock = dockRef.current
    if (!dock) return

    // Entrance animation
    gsap.fromTo(
      dock,
      { y: 100, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1.5, delay: 5, ease: "back.out(1.7)" },
    )

    // Hover animations for dock items
    const items = dock.querySelectorAll(".dock-item")
    items.forEach((item, index) => {
      const handleMouseEnter = () => {
        gsap.to(item, {
          scale: 1.3,
          y: -15,
          rotationY: 10,
          duration: 0.4,
          ease: "back.out(1.7)",
        })

        // Ripple effect on adjacent items
        const prevItem = items[index - 1]
        const nextItem = items[index + 1]

        if (prevItem) {
          gsap.to(prevItem, {
            scale: 1.15,
            y: -8,
            duration: 0.3,
            ease: "power2.out",
          })
        }

        if (nextItem) {
          gsap.to(nextItem, {
            scale: 1.15,
            y: -8,
            duration: 0.3,
            ease: "power2.out",
          })
        }
      }

      const handleMouseLeave = () => {
        gsap.to(items, {
          scale: 1,
          y: 0,
          rotationY: 0,
          duration: 0.4,
          ease: "power2.out",
        })
      }

      item.addEventListener("mouseenter", handleMouseEnter)
      item.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      items.forEach((item) => {
        item.removeEventListener("mouseenter", () => {})
        item.removeEventListener("mouseleave", () => {})
      })
    }
  }, [])

  const handleNavClick = (href: string) => {
    // In-page hash link
    if (href.startsWith("#")) {
      const id = href.slice(1) // remove the #
      if (id) {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: "smooth" })
        }
      } else {
        // Bare "#" means “scroll to top”
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      return
    }

    // Any other link (e.g. /login) – regular navigation
    window.location.href = href
  }

  return (
    <div ref={dockRef} className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-black/90 backdrop-blur-md border border-gray-700 rounded-2xl px-6 py-1 flex items-center gap-3 shadow-2xl">
        {navItems.map((item, index) => {
          const Icon = item.icon
          return (
            <button
              key={index}
              onClick={() => handleNavClick(item.href)}
              className="dock-item p-3 rounded-xl hover:bg-white/10 transition-colors group relative"
              title={item.label}
              style={{ perspective: "1000px" }}
            >
              <Icon className="w-6 h-6 text-white group-hover:text-gray-300" />
              <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-700">
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
