"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const parentVariant = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 * i },
  }),
};

const childVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 12, stiffness: 100 },
  },
} as const;

export function AnimatedText({ text, className = "", delay = 0 }: AnimatedTextProps) {
  const [mounted, setMounted] = useState(false);
  const characters = Array.from(text);

  // This ensures the complex animation logic only runs on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Simple render for Server Side (SSR)
  if (!mounted) {
    return (
      <span className={cn("relative inline-block", className)}>
        <span className="inline-block font-outfit text-transparent bg-clip-text">
          {text}
        </span>
      </span>
    );
  }

  // Full animated render for Client Side
  return (
    <span className={cn("relative inline-block", className)}>
      <motion.span
        className="inline-block font-outfit text-transparent bg-clip-text"
        variants={parentVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={delay}
      >
        {characters.map((char, index) => (
          <motion.span key={index} variants={childVariant} className="inline-block">
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>

      <motion.span
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none inline-block font-outfit text-transparent bg-clip-text"
        style={{
          backgroundImage: "linear-gradient(-45deg, transparent 40%, rgba(200, 255, 255, 0.3) 48%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 200, 255, 0.3) 52%, transparent 60%)",
          backgroundSize: "300% 100%",
        }}
        initial={{ backgroundPosition: "-100% 0", opacity: 0 }}
        animate={{ backgroundPosition: ["-100% 0", "200% 0"], opacity: 1 }}
        transition={{
          backgroundPosition: { duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" },
          opacity: { delay: delay + 1.5, duration: 1 },
        }}
      >
        {characters.map((char, index) => (
          <span key={index} className="inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </motion.span>
    </span>
  );
}