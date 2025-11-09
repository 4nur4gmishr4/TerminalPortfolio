import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MacControls } from "@/components/Terminal/MacControls";
import { TerminalOutput } from "@/components/Terminal/TerminalOutput";
import { CommandInput } from "@/components/Terminal/CommandInput";
import { QuickCommands } from "@/components/Terminal/QuickCommands";
import { WelcomeScreen } from "@/components/Terminal/WelcomeScreen";
import { TerminalFooter } from "@/components/Terminal/TerminalFooter";

const Index = () => {
  const [commands, setCommands] = useState<string[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [commands]);

  // Keyboard shortcuts
  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if ((e.metaKey || e.ctrlKey) && e.key === "l") {
  //       e.preventDefault();
  //       setCommands([]);
  //     }
  //   };
  //   
  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => window.removeEventListener("keydown", handleKeyDown);
  // }, []);

  const handleCommand = (command: string) => {
    if (command.toLowerCase() === "clear") {
      setCommands([]);
    } else {
      setCommands([...commands, command]);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-terminal flex items-center justify-center p-2 sm:p-4 md:p-8 relative overflow-hidden">
      {/* Ambient Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.02, 0.05, 0.02],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent rounded-full blur-[120px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="w-full max-w-6xl min-h-[88vh] glass rounded-2xl macbook-frame overflow-hidden flex flex-col relative z-10 md:max-h-[88vh]"
      >
        {/* Scanline Effect */}
        <div className="scanlines opacity-30" />
        
        {/* Mac Controls */}
        <div className="bg-gradient-to-b from-terminal-bg/80 to-terminal-bg/60 border-b border-primary/20 backdrop-blur-xl relative z-10">
          <MacControls />
        </div>

        {/* Terminal Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 font-mono text-sm relative z-10">
          <AnimatePresence mode="wait">
            {showWelcome ? (
              <motion.div
                key="welcome"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <WelcomeScreen />
              </motion.div>
            ) : (
              <motion.div
                key="terminal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Welcome Banner */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-primary/30 rounded-lg p-4 glass max-w-fit mx-auto"
                >
                  <pre className="text-[0.5rem] sm:text-[0.6rem] md:text-base leading-tight">
{`
╔═══════════════════════════════════════════════════════════════╗
 ║                                                             ║
║      █████╗ ███╗   ██╗██╗   ██╗██████╗  █████╗  ██████╗       ║
 ║    ██╔══██╗████╗  ██║██║   ██║██╔══██╗██╔══██╗██╔════╝      ║
║     ███████║██╔██╗ ██║██║   ██║██████╔╝███████║██║  ███╗      ║
 ║    ██╔══██║██║╚██╗██║██║   ██║██╔══██╗██╔══██║██║   ██║     ║
║     ██║  ██║██║ ╚████║╚██████╔╝██║  ██║██║  ██║╚██████╔╝      ║
 ║    ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝      ║
║                                                               ║
 ║           ML Engineer & Flutter App Developer               ║
║                                                               ║
 ║                                                             ║
╚═══════════════════════════════════════════════════════════════╝
`}
                  </pre>
                </motion.div>

                {/* Quick Commands */}
                <QuickCommands onCommand={handleCommand} />

                {/* Command History */}
                <div className="space-y-6">
                  {commands.map((command, index) => (
                    <TerminalOutput key={`${command}-${index}`} command={command} index={index} />
                  ))}
                </div>

                {/* Scroll anchor */}
                <div ref={terminalEndRef} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Command Input */}
        {!showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border-t border-primary/20 p-4 bg-terminal-bg/80 backdrop-blur-xl relative z-10"
          >
            <CommandInput onCommand={handleCommand} commandHistory={commands} />
          </motion.div>
        )}

        {/* Terminal Footer - Status Bar */}
        <div className="relative z-10">
          <TerminalFooter />
        </div>
      </motion.div>

      {/* Keyboard Shortcuts Helper */}
      {/* <KeyboardShortcuts /> */}
    </div>
  );
};

export default Index;
