"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import React, { useCallback, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface MagicCardProps {
  children?: React.ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
}

export function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientColor = "#262626",
  gradientOpacity = 0.8,
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (cardRef.current) {
        const { left, top } = cardRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }
    },
    [mouseX, mouseY]
  );

  const resetGradient = useCallback(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [mouseX, mouseY, gradientSize]);

  useEffect(() => {
    const enter = () => document.addEventListener("mousemove", handleMouseMove);
    const leave = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      resetGradient();
    };

    cardRef.current?.addEventListener("mouseenter", enter);
    cardRef.current?.addEventListener("mouseleave", leave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cardRef.current?.removeEventListener("mouseenter", enter);
      cardRef.current?.removeEventListener("mouseleave", leave);
    };
  }, [handleMouseMove, resetGradient]);

  return (
    <div ref={cardRef} className={cn("group relative rounded-[inherit]", className)}>
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-border opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)
          `,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: gradientOpacity }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
