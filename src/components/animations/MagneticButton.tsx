"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { FileText } from "lucide-react";

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
}

export function MagneticButton({ href, children }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic pull coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Smooth spring physics for the magnetic pull
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate distance from center
    const mouseX = e.clientX - rect.left - centerX;
    const mouseY = e.clientY - rect.top - centerY;
    
    // Apply a magnetic pull ratio (e.g., 30% pull towards pointer)
    x.set(mouseX * 0.3);
    y.set(mouseY * 0.3);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center justify-center gap-2 overflow-hidden px-8 py-3.5 rounded-full backdrop-blur-md bg-white/5 dark:bg-[#111111]/40 border border-white/20 dark:border-white/10 group shadow-[0_0_20px_rgba(255,255,255,0.05)] text-gray-800 dark:text-gray-200 font-medium"
    >
      {/* Subtle glowing border layer behind the text */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <span className="relative z-10">{children}</span>
      
      {/* Sliding Icon Animation */}
      <motion.div
        initial={{ width: 0, opacity: 0, x: -10 }}
        animate={isHovered ? { width: "auto", opacity: 1, x: 0 } : { width: 0, opacity: 0, x: -10 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative z-10 overflow-hidden flex items-center"
      >
        <FileText className="w-4 h-4 ml-1 text-primary" />
      </motion.div>
    </motion.a>
  );
}
