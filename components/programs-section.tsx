"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useTheme } from "next-themes"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { MagicCard } from "@/components/magicui/magic-cards"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const programs = [
  {
    title: "Full Stack Development",
    duration: "3-6 Months",
    description:
      "Master both frontend and backend development with React, Node.js, MongoDB, and modern web technologies.",
    skills: ["React & Next.js", "Node.js & Express", "MongoDB & PostgreSQL", "API Development", "DevOps Basics"],
    icon: "💻",
  },
  {
    title: "Data Science",
    duration: "4-6 Months",
    description:
      "Learn machine learning, data analysis, and AI model development with Python and industry-standard tools.",
    skills: ["Python & R", "Machine Learning", "Data Visualization", "Statistical Analysis", "AI Models"],
    icon: "📊",
  },
  {
    title: "Cyber Security",
    duration: "3-5 Months",
    description:
      "Develop expertise in cybersecurity fundamentals, ethical hacking, and security assessment techniques.",
    skills: ["Network Security", "Ethical Hacking", "Risk Assessment", "Security Tools", "Compliance"],
    icon: "🔒",
  },
  {
    title: "Data Analyst",
    duration: "2-4 Months",
    description:
      "Master data analysis, visualization, and business intelligence with SQL, Power BI, and Tableau.",
    skills: ["SQL & Databases", "Power BI", "Tableau", "Excel Advanced", "Business Intelligence"],
    icon: "📈",
  },
  {
    title: "Python Development",
    duration: "3-5 Months",
    description:
      "Learn Python programming, web frameworks, automation, and backend development.",
    skills: ["Django & Flask", "Web Scraping", "Automation", "API Development", "Database Integration"],
    icon: "🐍",
  },
  {
    title: "Business Analysis",
    duration: "2-4 Months",
    description:
      "Develop business analysis skills, market research, and strategic planning capabilities.",
    skills: ["Market Research", "Business Intelligence", "Financial Analysis", "Process Improvement", "Strategy"],
    icon: "📋",
  },
]

export default function ProgramsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const cards = cardsRef.current
    if (!section || !title || !cards) return

    const cardElements = cards.querySelectorAll(".program-card")

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
          { y: 200, opacity: 0, rotationY: 45, scale: 0.8 },
          { y: 0, opacity: 1, rotationY: 0, scale: 1, duration: 1.5, stagger: 0.2, ease: "back.out(1.7)" },
        )
      },
      start: "top 80%",
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-black text-white relative overflow-hidden"
      id="programs"
    >
      <div className="container mx-auto px-4 md:px-8">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-8xl font-bold text-center mb-20 tracking-wide"
        >
          PROGRAMS
        </h2>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {programs.map((program, index) => (
            <div
              key={index}
              ref={(el) => {/* placeholder for ref array if needed */}}
              className="program-card border rounded-lg border-gray-600"
            >
              <Card className="p-0 shadow-none border-none bg-transparent">
                <MagicCard
                  gradientColor={"#262626"}
                  className="p-0"
                >
                  <CardHeader className="border-b border-border p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <span className="text-4xl">{program.icon}</span>
                        <CardTitle className="text-white">{program.title}</CardTitle>
                      </div>
                      <span className="text-xs font-bold text-white bg-gray-800 px-3 py-1 rounded-full">
                        {program.duration}
                      </span>
                    </div>
                    <CardDescription className="mt-2 text-white/80">
                      {program.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 text-white">
                    <h4 className="font-semibold mb-2">Key Skills:</h4>
                    <ul className="grid grid-cols-2 gap-2 text-sm">
                      {program.skills.map((skill, i) => (
                        <li key={i} className="flex items-center">
                          <span className="w-2 h-2 bg-white rounded-full mr-2" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="p-4 border-t border-border">
                    {/* Optional footer action */}
                  </CardFooter>
                </MagicCard>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
