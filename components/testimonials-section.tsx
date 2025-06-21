/* eslint-disable @next/next/no-img-element */
"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Marquee } from "@/components/magicui/marquee"

const reviews = [
  {
    username: "Mirunalini R",
    role: "Data Analyst Intern",
    body: "During my Data Analytics internship at INLIGHN TECH, I learned SQL, Power BI, Tableau, and Data Cleaning. The program focused on real-world business intelligence projects, which helped me understand data-driven decision-making. The mentorship and structured learning approach made a significant impact on my skills.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    username: "Surendra Kumar",
    role: "Data Science Intern (India)",
    body: "I completed my Data Science internship at INLIGHN TECH, where I gained hands-on experience in Machine Learning, Data Visualization, and AI Models. Working on real-world datasets helped me apply my knowledge in a practical way. The structured guidance and expert mentorship improved my problem-solving and analytical skills. ✅ Thanks to this experience.",
    img: "https://avatar.vercel.sh/surendra",
  },
  {
    username: "Vignesh",
    role: "Business Analyst Intern",
    body: "I interned in Business Analysis at INLIGHN TECH, where I gained hands-on experience in Market Research, Business Intelligence, and Financial Analysis. The training and projects provided deep insights into business strategies, and I developed strong analytical and problem-solving skills. The experience was incredibly valuable for my career.",
    img: "https://avatar.vercel.sh/vignesh",
  },
  {
    username: "Hariharan Rajendaran",
    role: "Full-Stack Developer Intern",
    body: "At INLIGHN TECH, I completed my Full-Stack Development internship, where I worked on React, Node.js, MongoDB, and API development. I built web applications from scratch, which helped me understand both frontend and backend development. The real-world exposure and expert guidance made me industry-ready.",
    img: "https://avatar.vercel.sh/hariharan",
  },
  {
    username: "Sumit Vishwas",
    role: "Python Developer Intern",
    body: "My Python Development internship at INLIGHN TECH gave me hands-on experience with Django, Flask, Web Scraping, and Automation. I worked on projects that enhanced my programming skills and helped me understand backend development better. The structured learning path made a big difference in my confidence and abilities.",
    img: "https://avatar.vercel.sh/sumit",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)
const thirdRow = reviews.slice(0, reviews.length / 2)
const fourthRow = reviews.slice(reviews.length / 2)

const ReviewCard = ({
  img,
  username,
  role,
  body,
}: {
  img: string
  username: string
  role: string
  body: string
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-fit sm:w-36 cursor-pointer overflow-hidden rounded-xl border p-4",
        // dark styles
        "bg-gray-900 border-gray-700 hover:bg-gray-800",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt={role} src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-white">{username}</figcaption>
          <p className="text-xs font-medium text-gray-400">{role}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-gray-300">{body}</blockquote>
    </figure>
  )
}

export default function TestimonialsSection() {
  return (
    <>
    
    <section className="relative flex h-96 w-full items-center justify-center overflow-hidden bg-black text-white" id="testimonials">
      <h2 className="absolute top-4 left-4 text-7xl font-bold mt-20">Testimonials</h2>
      <div
        className="flex flex-row items-center gap-4"
        style={{
          transform:
            "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
        }}
      >
        <Marquee pauseOnHover vertical className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {thirdRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee pauseOnHover className="[--duration:20s]" vertical>
          {fourthRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black"></div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black"></div>
    </section>
    </>
  )
}
