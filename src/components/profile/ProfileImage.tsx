"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export function ProfileImage() {
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.5 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.5 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full perspective-1000"
    >
      <div 
        className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-indigo-500 blur-2xl opacity-40 animate-pulse"
        style={{ transform: "translateZ(-50px)" }}
      />
      <div 
        className="relative w-full h-full rounded-full border-4 border-white/20 dark:border-white/10 overflow-hidden shadow-2xl backdrop-blur-sm"
        style={{ transform: "translateZ(20px)" }}
      >
        {/* Using a placeholder SVG or simple gradient if the image isn't available, but we'll try to load /profile-pic.jpg */}
        <div className="relative w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500">
           {/* Replace this div with an actual logic to load the image if you add one to public folder */}
           <Image 
              src="/profile-pic.jpg" 
              alt="Mubashir" 
              fill
              sizes="(max-width: 768px) 256px, 320px"
              className="object-cover transition-all duration-500 ease-in-out brightness-75 hover:brightness-100 hover:scale-105"
              onError={(e) => {
                // Fallback if no image
                (e.target as HTMLImageElement).style.display = 'none';
              }}
           />
           <span className="font-bold text-2xl absolute -z-10 text-gray-400">Profile</span >
        </div>
      </div>
    </motion.div>
  );
}
