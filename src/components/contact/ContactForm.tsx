"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef, FormEvent } from "react";
import { Check, Loader2, Send } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

function FloatingInput({ label, id, ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative group w-full mb-8">
      <input
        id={id}
        {...props}
        className="w-full bg-transparent px-4 py-3 text-gray-800 dark:text-gray-100 border-b-2 border-gray-200 dark:border-gray-800 focus:outline-none transition-colors peer"
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        onChange={(e) => {
          setHasValue(e.target.value.length > 0);
          props.onChange?.(e);
        }}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          isFocused || hasValue || props.value
            ? "-top-5 text-sm text-primary dark:text-primary font-medium"
            : "top-3 text-base text-gray-400 dark:text-gray-500"
        }`}
      >
        {label}
      </label>
      
      {/* Animated Bottom Border */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-indigo-500"
        initial={{ width: "0%", left: "50%" }}
        animate={isFocused ? { width: "100%", left: "0%" } : { width: "0%", left: "50%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
    </div>
  );
}

function FloatingTextarea({ label, id, ...props }: TextareaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative group w-full mb-8">
      <textarea
        id={id}
        {...props}
        className="w-full bg-transparent px-4 py-3 text-gray-800 dark:text-gray-100 border-b-2 border-gray-200 dark:border-gray-800 focus:outline-none transition-colors resize-none peer h-32"
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        onChange={(e) => {
          setHasValue(e.target.value.length > 0);
          props.onChange?.(e);
        }}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          isFocused || hasValue || props.value
            ? "-top-5 text-sm text-primary dark:text-primary font-medium"
            : "top-3 text-base text-gray-400 dark:text-gray-500"
        }`}
      >
        {label}
      </label>
      
      {/* Animated Bottom Border */}
      <motion.div
        className="absolute bottom-1.5 left-0 h-[2px] bg-gradient-to-r from-primary to-indigo-500"
        initial={{ width: "0%", left: "50%" }}
        animate={isFocused ? { width: "100%", left: "0%" } : { width: "0%", left: "50%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
    </div>
  );
}

const formVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  },
} as const;

export function ContactForm() {
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle");
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Magnetic button effect constraints
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.5 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || formState !== "idle") return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left - centerX;
    const mouseY = e.clientY - rect.top - centerY;
    
    // Magnetic pull ratio
    x.set(mouseX * 0.3);
    y.set(mouseY * 0.3);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState !== "idle") return;
    
    setFormState("loading");
    x.set(0);
    y.set(0);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      await fetch(
        "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfzg9OzO0ItFHKyjK-9lQ0Gb5SZdYZh2XSyLaMg3KRxcCSHow/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: formData,
        }
      );
      
      setFormState("success");
    } catch (error) {
      console.error(error);
      setFormState("idle");
    }
  };

  return (
    <motion.div 
      variants={formVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full max-w-xl mx-auto bg-white/50 dark:bg-[#111111]/50 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden relative"
    >
      <AnimatePresence mode="wait">
        {formState !== "success" ? (
          <motion.form 
            key="form"
            onSubmit={handleSubmit}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div variants={itemVariants}>
              <FloatingInput label="Your Name" id="name" name="entry.1201196482" required disabled={formState === "loading"} />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <FloatingInput label="Your Email" id="email" type="email" name="entry.1297188498" required disabled={formState === "loading"} />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <FloatingTextarea label="Your Message" id="message" name="entry.417320949" required disabled={formState === "loading"} />
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 flex justify-end">
              <motion.button
                ref={buttonRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ x: springX, y: springY }}
                whileHover={formState === "idle" ? { scale: 1.05 } : {}}
                whileTap={formState === "idle" ? { scale: 0.95 } : {}}
                type="submit"
                disabled={formState !== "idle"}
                className={`relative overflow-hidden flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white shadow-lg transition-colors duration-300 ${
                  formState === "loading"
                    ? "bg-blue-600 opacity-80" 
                    : "bg-primary hover:bg-blue-600"
                }`}
              >
                {formState === "idle" && (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
                
                {formState === "loading" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </motion.div>
                )}
                
                {/* Button Hover Glow Layer */}
                <div className="absolute inset-0 -z-10 bg-primary blur-xl opacity-0 hover:opacity-50 transition-opacity" />
              </motion.button>
            </motion.div>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
              className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6"
            >
              <Check className="w-10 h-10 text-green-500" />
            </motion.div>
            <h3 className="text-3xl font-bold font-outfit mb-3 text-gray-800 dark:text-gray-100">Message Sent Successfully!</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Thanks for reaching out! I will get back to you as soon as possible.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
