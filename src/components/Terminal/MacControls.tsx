import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

export const MacControls = () => {
  const [isMaximized, setIsMaximized] = useState(false);

  const handleClose = () => {
    toast.info("Nice try! But you can't close my portfolio 😉");
  };

  const handleMinimize = () => {
    toast.info("Minimize? Just keep exploring!");
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    toast.success(isMaximized ? "Window restored" : "Window maximized");
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-b from-terminal-bg/80 to-terminal-bg/60">
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClose}
          className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#FF5F57]/80 transition-colors shadow-sm relative group"
          aria-label="Close"
        >
          <span className="absolute inset-0 flex items-center justify-center text-[8px] text-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
            ✕
          </span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleMinimize}
          className="w-3 h-3 rounded-full bg-[#FEBC2E] hover:bg-[#FEBC2E]/80 transition-colors shadow-sm relative group"
          aria-label="Minimize"
        >
          <span className="absolute inset-0 flex items-center justify-center text-[8px] text-black/60 opacity-0 group-hover:opacity-100 transition-opacity pb-1">
            −
          </span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleMaximize}
          className="w-3 h-3 rounded-full bg-[#28C840] hover:bg-[#28C840]/80 transition-colors shadow-sm relative group"
          aria-label="Maximize"
        >
          <span className="absolute inset-0 flex items-center justify-center text-[8px] text-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
            ⤢
          </span>
        </motion.button>
      </div>
      
      <div className="flex-1 text-center">
        <span className="text-xs sm:text-sm md:text-base text-muted-foreground font-semibold">Anurag's Portfolio~ %</span>
      </div>
      
      {/* <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
        <motion.span 
          className="hidden md:block"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ⌘ + K
        </motion.span>
      </div> */}
    </div>
  );
};
