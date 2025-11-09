import { motion } from "framer-motion";

export const WelcomeScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="text-center space-y-6 max-w-2xl px-6">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            duration: 1,
            bounce: 0.5
          }}
          className="text-5xl sm:text-6xl md:text-7xl mb-6"
        >
          💻
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary terminal-glow-strong mb-4">
            Welcome to my Terminal
          </h1>
          <p className="text-xl text-accent mb-6">
            Anurag Mishra's Portfolio
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="space-y-2"
        >
          <p className="text-muted-foreground">Initializing portfolio system...</p>
          <div className="flex items-center justify-center gap-2">
            <motion.div
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
              className="w-2 h-2 bg-primary rounded-full shadow-glow"
            />
            <motion.div
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              className="w-2 h-2 bg-primary rounded-full shadow-glow"
            />
            <motion.div
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              className="w-2 h-2 bg-primary rounded-full shadow-glow"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 1, duration: 1.2, ease: "easeInOut" }}
          className="h-1 bg-gradient-to-r from-primary via-accent to-primary mx-auto rounded-full shadow-strong max-w-sm"
        />
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-xs text-muted-foreground pt-4"
        >
          Loading in {Math.floor(Math.random() * 650 + 390)}ms...
        </motion.p>
      </div>
    </div>
  );
};
