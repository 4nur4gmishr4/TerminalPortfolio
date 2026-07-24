import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  
  const magneticRef = useRef<{ x: number, y: number, width: number, height: number } | null>(null);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      // If we are magnetically attached, we can slightly pull the cursor towards the mouse,
      // but keep it anchored to the element. Let's do a simple implementation first.
      
      let x = e.clientX;
      let y = e.clientY;

      if (magneticRef.current && cursorVariant === "magnetic") {
        const { x: rectX, y: rectY, width, height } = magneticRef.current;
        const centerX = rectX + width / 2;
        const centerY = rectY + height / 2;
        
        // Pull cursor towards center of element, but with some mouse influence
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        
        x = centerX + distanceX * 0.2;
        y = centerY + distanceY * 0.2;
      }

      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", mouseMove);

    // Add global hover listeners for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if it's a clickable element or has .magnetic class
      const isClickable = target.closest('a, button, input, [role="button"]');
      const isMagnetic = target.closest('.magnetic');

      if (isMagnetic) {
        setCursorVariant("magnetic");
        magneticRef.current = (isMagnetic as HTMLElement).getBoundingClientRect();
      } else if (isClickable) {
        setCursorVariant("hover");
        magneticRef.current = null;
      } else {
        setCursorVariant("default");
        magneticRef.current = null;
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorVariant]);

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      width: 16,
      height: 16,
      backgroundColor: "rgba(10, 97, 87, 0.5)", // primary color
      mixBlendMode: "difference" as any,
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      width: 48,
      height: 48,
      backgroundColor: "rgba(10, 97, 87, 0.2)",
      mixBlendMode: "difference" as any,
    },
    magnetic: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      width: 64,
      height: 64,
      backgroundColor: "rgba(10, 97, 87, 0.15)",
      mixBlendMode: "difference" as any,
    }
  };

  return (
    <>
      {/* Hide native cursor globally */}
      <style>{`
        @media (pointer: fine) {
          body, a, button, input, [role="button"] {
            cursor: none !important;
          }
        }
      `}</style>
      <motion.div
        className="custom-cursor hidden md:block"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          backdropFilter: cursorVariant === "magnetic" ? "blur(2px)" : "none",
        }}
      />
    </>
  );
};
