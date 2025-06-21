"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Facebook, Twitter, Linkedin, Instagram, Phone, Mail, MapPin } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    ScrollTrigger.create({
      trigger: footer,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(
          footer.querySelectorAll(".footer-item"),
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power2.out",
          }
        )
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <footer
      ref={footerRef}
      className="bg-black text-gray-300 py-16 border-t border-gray-800"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="footer-item">
            <h3 className="text-2xl font-bold mb-6 tracking-wide text-white">
              INLIGHN TECH
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed font-medium">
              At INLIGHN TECH, we believe that the future of education lies in bridging the gap between academic
              learning and industry needs.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
              <Twitter className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
              <Linkedin className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
              <Instagram className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-item">
            <h4 className="text-xl font-bold mb-6 tracking-wide text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: "#", label: "Home" },
                { href: "#about", label: "About Us" },
                { href: "#programs", label: "Programs" },
                { href: "#contact", label: "Contact Us" },
                { href: "#", label: "Login To Portal" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="footer-item">
            <h4 className="text-xl font-bold mb-6 tracking-wide text-white">
              Legal
            </h4>
            <ul className="space-y-3">
              {[
                "Privacy Policy",
                "Terms & Conditions",
                "Disclaimer",
                "FAQ's",
              ].map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors font-medium"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-item">
            <h4 className="text-xl font-bold mb-6 tracking-wide text-white">
              Contact Info
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <p className="text-gray-400 font-medium leading-relaxed">
                  Corporate Office · Office No: VO-301, WeWork Prestige Central, Ground Floor, 36 Infantry Rd, Shivaji
                  Nagar, Bengaluru, 560001
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <p className="text-gray-400 font-medium">+91 9368842663</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <p className="text-gray-400 font-medium">info@inlighntech.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-item border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 font-medium">
            © 2025 INLIGHN TECH. All rights reserved. | Empowering the next generation of tech professionals.
          </p>
        </div>
      </div>
    </footer>
  )
}
