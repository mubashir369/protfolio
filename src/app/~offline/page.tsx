"use client";

import { motion } from "framer-motion";
import { Satellite, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OfflinePage() {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    window.location.reload();
  };

  // Add auto-retry polling
  useEffect(() => {
    const handleOnline = () => {
      window.location.reload();
    };
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Starfield effect for the Offline screen */}
      <div className="absolute inset-0 z-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary"
            style={{
              width: Math.random() * 4 + 1 + "px",
              height: Math.random() * 4 + 1 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-md">
        
        {/* Animated Satellite */}
        <div className="relative w-40 h-40 flex items-center justify-center mb-8">
          
          {/* Signal Rings */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-primary/30"
              initial={{ scale: 0.8, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.6,
                ease: "easeOut"
              }}
            />
          ))}

          <motion.div
            className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 backdrop-blur-sm"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Satellite className="w-10 h-10 text-primary" />
          </motion.div>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold font-outfit tracking-tighter mb-4 text-gray-900 dark:text-white"
        >
          Lost Signal
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-500 dark:text-gray-400 mb-8"
        >
          It seems you have disconnected from the network. The cached 3D assets are safe, but this page requires a connection.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRetry}
          disabled={isRetrying}
          className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20"
        >
          <RefreshCw className={`w-5 h-5 ${isRetrying ? "animate-spin" : ""}`} />
          {isRetrying ? "Reconnecting..." : "Retry Connection"}
        </motion.button>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <Link href="/" className="text-sm text-gray-400 hover:text-primary transition-colors underline underline-offset-4">
            Return to Cached Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
