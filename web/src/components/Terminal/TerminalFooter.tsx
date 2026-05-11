import { motion } from "framer-motion";
import { Wifi, Battery, Clock } from "lucide-react";
import { useState, useEffect } from "react";

export const TerminalFooter = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="flex items-center justify-between px-4 py-2 bg-terminal-bg/60 border-t border-primary/10 text-xs font-mono backdrop-blur-sm"
    >
      <div className="flex items-center gap-4">
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-primary flex items-center gap-1"
        >
          <span className="w-2 h-2 bg-primary rounded-full shadow-glow" />
          <span>Online</span>
        </motion.span>
        <span className="text-muted-foreground">
          Shell: portfolio.sh
        </span>
      </div>

      <div className="flex items-center gap-4 text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{time.toLocaleTimeString()}</span>
        </div>
        <motion.div
          animate={{ opacity: [0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="flex items-center gap-1"
        >
          <Wifi className="w-3 h-3 text-secondary" />
        </motion.div>
        <motion.div
          animate={{ opacity: [0.8, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="flex items-center gap-1"
        >
          <Battery className="w-3 h-3 text-secondary" />
          <span>100%</span>
        </motion.div>
      </div>
    </motion.div>
  );
};
