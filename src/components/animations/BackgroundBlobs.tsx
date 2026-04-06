"use client";

import { motion } from "framer-motion";

export function BackgroundBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Top Right Blob */}
      <motion.div
        className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-primary/10 dark:bg-primary/5 blur-3xl"
        animate={{
          y: [0, 20, 0],
          x: [0, -20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Bottom Left Blob */}
      <motion.div
        className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl"
        animate={{
          y: [0, -30, 0],
          x: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
