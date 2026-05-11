import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/types/portfolio";
import { TerminalOutput } from "@/components/Terminal/TerminalOutput";
import { CommandInput } from "@/components/Terminal/CommandInput";

const BOOT_LOG = [
  { time: "[0.001]", message: "Welcome to TerminalBay", status: "OK", bold: true },
];

const Index = () => {
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleCommand = (command: string) => {
    if (command.toLowerCase() === "clear") {
      setCommandHistory([]);
      return;
    }
    setCommandHistory((prev) => [...prev, command]);
    // Auto-scroll to bottom
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 100);
  };

  return (
    <div className="p-gutter lg:p-lg h-full overflow-y-auto">
      <div className="max-w-[1000px] mx-auto h-full flex flex-col relative z-10">
        <div className="h-full">
          
          {/* ── Main Terminal Window ── */}
          <div className="glass-panel rounded-lg flex flex-col min-h-[500px] lg:h-full relative overflow-hidden shadow-xl">
            {/* Chrome */}
            <div className="h-8 border-b border-white/10 flex items-center px-4 justify-between bg-white/[0.02] shrink-0">
              <div className="flex gap-xs">
                <div className="w-2.5 h-2.5 rounded-full bg-on-surface-variant/30"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-on-surface-variant/30"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-on-surface-variant/30"></div>
              </div>
              <div className="font-data-mono text-[10px] text-on-surface-variant/50 uppercase tracking-widest">
                guest@terminalbay:~
              </div>
              <div className="w-10"></div>
            </div>

            {/* Terminal Content */}
            <div ref={terminalRef} className="p-window-padding font-data-mono text-data-mono text-on-surface-variant flex-1 overflow-y-auto space-y-4">
              {/* Boot log */}
              <div className="flex flex-col gap-xs">
                {BOOT_LOG.map((entry, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`flex gap-md group cursor-default ${entry.bold ? "border-b border-white/5 pb-sm mb-sm" : ""}`}
                  >
                    <span className="opacity-50 min-w-[60px] sm:min-w-[80px] text-[11px] sm:text-data-mono">{entry.time}</span>
                    <span className={`group-hover:text-primary transition-colors ${entry.bold ? "text-on-background" : ""}`}>
                      {entry.message}
                    </span>
                    <span className="ml-auto text-primary">{entry.status}</span>
                  </motion.div>
                ))}
              </div>

              {/* whoami overview */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-4"
              >
                <div className="flex gap-sm">
                  <span className="text-primary">guest@terminalbay:~$</span>
                  <span className="text-on-surface">whoami</span>
                </div>
                <div className="text-on-surface-variant/80 space-y-2 pl-2">
                  <div className="text-primary font-bold text-lg">{portfolioData.name}</div>
                  <div className="text-secondary">{portfolioData.title}</div>
                  <br />
                  <div>Type <span className="text-primary">help</span> to see available commands.</div>
                  <div>Type <span className="text-primary">about</span> to learn more about me.</div>
                </div>
              </motion.div>

              {/* Command history */}
              {commandHistory.map((cmd, idx) => (
                <TerminalOutput key={`${cmd}-${idx}`} command={cmd} index={idx} />
              ))}

              {/* Command input */}
              <CommandInput onCommand={handleCommand} commandHistory={commandHistory} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Index;