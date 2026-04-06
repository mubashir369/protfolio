"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useMotionTemplate, animate } from "framer-motion";

export function Preloader() {
  const { progress, active } = useProgress();
  const [loadState, setLoadState] = useState<"loading" | "finishing" | "done">("loading");
  const [displayProgress, setDisplayProgress] = useState(0);
  const [inputType, setInputType] = useState<"mouse" | "keyboard">("mouse");
  const [jitterCount, setJitterCount] = useState(0);

  // Handle Input Morphing
  useEffect(() => {
    const handleKeyDown = () => setInputType("keyboard");
    const handleMouseMove = () => setInputType("mouse");
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Jitter effect for terminal numbers
  useEffect(() => {
    const jitterInterval = setInterval(() => {
      setJitterCount(Math.random() * 2 - 1);
    }, 50);
    return () => clearInterval(jitterInterval);
  }, []);

  // Artificial timing plus actual R3F progress
  useEffect(() => {
    const startTime = Date.now();
    const MIN_LOAD_TIME = 1200;

    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        const elapsed = Date.now() - startTime;
        let target = Math.min((elapsed / MIN_LOAD_TIME) * 100, 99);
        
        const isR3FDone = progress === 100 || (!active && progress === 0);
        
        if (isR3FDone && elapsed >= MIN_LOAD_TIME) {
          target = 100;
          clearInterval(interval);
          setLoadState("finishing");
        }
        return prev + (target - prev) * 0.15;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [progress, active]);

  // Hardware-accelerated mask reveal sequence
  const maskSize = useMotionValue(0);
  const maskStyle = useMotionTemplate`radial-gradient(circle at 50% 50%, transparent ${maskSize}%, black calc(${maskSize}% + 1px))`;

  useEffect(() => {
    if (loadState === "finishing") {
      animate(maskSize, 150, {
        duration: 1.2,
        ease: "easeInOut",
        onComplete: () => setLoadState("done")
      });
    }
  }, [loadState, maskSize]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || loadState === "done") return null;

  const currentDisplay = Math.min(Math.round(displayProgress), 100);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] pointer-events-none"
      style={{
        WebkitMaskImage: loadState === "finishing" ? maskStyle : "none",
        maskImage: loadState === "finishing" ? maskStyle : "none",
      }}
    >
        <AnimatePresence>
          {loadState === "loading" && (
            <motion.div 
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center relative"
            >
              {/* Central Interaction Icon Container */}
              <div className="h-32 w-32 relative flex items-center justify-center">
                 <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-2xl animate-pulse" />
                 
                 <AnimatePresence mode="wait">
                   {inputType === "mouse" ? (
                      <motion.svg
                        key="mouse"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        width="32" height="48" viewBox="0 0 24 32"
                        fill="none" stroke="white" strokeWidth="1.5"
                        className="relative z-10"
                      >
                         <defs>
                           <clipPath id="left-click">
                             <rect x="4" y="2" width="8" height="12" />
                           </clipPath>
                         </defs>
                         <rect x="4" y="2" width="16" height="28" rx="8" className="opacity-40" />
                         <motion.path 
                           d="M12 2v10" 
                           className="opacity-40"
                         />
                         <motion.path 
                           d="M4 12h16" 
                           className="opacity-40"
                         />
                         
                         {/* Flashing Left Button */}
                         <motion.rect 
                           x="4" y="2" width="16" height="28" rx="8" 
                           fill="white" clipPath="url(#left-click)"
                           animate={{ fillOpacity: [0.1, 0.9, 0.1] }}
                           transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                         />

                         {/* Emanating Ripple */}
                         {[1, 2].map((i) => (
                           <motion.circle
                             key={i}
                             cx="8" cy="8" r="4"
                             stroke="currentColor" strokeWidth="1"
                             initial={{ scale: 0.5, opacity: 1 }}
                             animate={{ scale: 6, opacity: 0 }}
                             transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.75, ease: "easeOut" }}
                           />
                         ))}
                      </motion.svg>
                   ) : (
                      <motion.svg
                        key="keyboard"
                        initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
                        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                        exit={{ opacity: 0, scale: 0.8, rotateX: -20 }}
                        width="48" height="48" viewBox="0 0 24 24"
                        fill="none" stroke="white" strokeWidth="1.5"
                        style={{ perspective: "1000px" }}
                        className="relative z-10"
                      >
                         <rect x="2" y="2" width="20" height="20" rx="4" className="opacity-30" />
                         
                         <motion.rect 
                           x="4" y="4" width="16" height="12" rx="2"
                           fill="white" stroke="none"
                           animate={{ y: [0, 4, 0], fillOpacity: [0.1, 0.8, 0.1] }}
                           transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                         />

                         <motion.circle
                            cx="12" cy="10" r="12" stroke="none"
                            fill="currentColor"
                            animate={{ opacity: [0, 0.3, 0], scale: [0.5, 1.5, 0.5] }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                            className="text-indigo-400 mix-blend-screen"
                         />
                      </motion.svg>
                   )}
                 </AnimatePresence>
              </div>

              {/* Jitter Terminal Numbers */}
              <div className="mt-12 flex items-center justify-center mix-blend-plus-lighter">
                 <motion.h1 
                   className="text-6xl md:text-8xl font-mono font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30"
                   style={{ x: jitterCount }}
                 >
                   {currentDisplay.toString().padStart(3, '0')}
                 </motion.h1>
                 <span className="text-2xl md:text-4xl ml-2 text-white/30 font-mono font-light">%</span>
              </div>

              {/* Console Status */}
              <div className="mt-8 flex gap-3 text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-[0.4em]">
                 <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>[SYS]</motion.span>
                 INITIALIZING R3F PHYSICS
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </motion.div>
  );
}
