import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  fullWidth?: boolean;
}

export const FadeIn = ({ children, delay = 0, direction = "up", fullWidth = false }: FadeInProps) => {
  const directionOffset = {
    up: 30,
    down: -30,
    left: 30,
    right: -30,
    none: 0,
  };

  const initialY = direction === "up" || direction === "down" ? directionOffset[direction] : 0;
  const initialX = direction === "left" || direction === "right" ? directionOffset[direction] : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: initialY, x: initialX }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Custom Google-style easing (Out Quart/Quint hybrid)
      }}
      style={fullWidth ? { width: "100%" } : undefined}
    >
      {children}
    </motion.div>
  );
};
