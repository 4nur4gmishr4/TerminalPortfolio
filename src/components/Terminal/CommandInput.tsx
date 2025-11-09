import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CommandInputProps {
  onCommand: (command: string) => void;
  commandHistory: string[];
}

const AVAILABLE_COMMANDS = [
  "about",
  "contact",
  "education",
  "experience",
  "projects",
  "skills",
  "achievements",
  "neofetch",
  "clear",
  "help",
  "whoami",
  "ls",
  "pwd",
];

export const CommandInput = ({ onCommand, commandHistory }: CommandInputProps) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on mount and when clicking anywhere
    inputRef.current?.focus();
    
    const handleFocus = () => inputRef.current?.focus();
    window.addEventListener("click", handleFocus);
    
    return () => window.removeEventListener("click", handleFocus);
  }, []);

  useEffect(() => {
    if (input) {
      const filtered = AVAILABLE_COMMANDS.filter((cmd) =>
        cmd.toLowerCase().startsWith(input.toLowerCase())
      );
      setSuggestions(filtered);
      setSelectedSuggestion(0);
    } else {
      setSuggestions([]);
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input.trim());
      setInput("");
      setSuggestions([]);
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Tab for autocomplete
    if (e.key === "Tab" && suggestions.length > 0) {
      e.preventDefault();
      setInput(suggestions[selectedSuggestion]);
      setSuggestions([]);
    } 
    // Arrow down for suggestions or history
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedSuggestion((prev) => (prev + 1) % suggestions.length);
      }
    } 
    // Arrow up for suggestions or history
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedSuggestion((prev) => (prev - 1 + suggestions.length) % suggestions.length);
      } else if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    }
    // Ctrl/Cmd + L to clear
    else if ((e.ctrlKey || e.metaKey) && e.key === "l") {
      e.preventDefault();
      onCommand("clear");
    }
    // Ctrl/Cmd + C to cancel input
    else if ((e.ctrlKey || e.metaKey) && e.key === "c") {
      e.preventDefault();
      setInput("");
      setSuggestions([]);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 group">
        <motion.span 
          className="text-accent font-bold"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ➜
        </motion.span>
        <span className="text-primary font-semibold">~</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setHistoryIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-foreground font-mono caret-primary selection:bg-primary/30"
          placeholder="Type 'help' to see available commands..."
          autoComplete="off"
          spellCheck="false"
        />
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          className="w-2 h-5 bg-primary shadow-glow"
        />
      </form>

      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full mt-2 w-full max-w-full md:max-w-md glass rounded-lg border border-primary/30 overflow-hidden z-50 shadow-strong"
          >
            <div className="px-3 py-2 text-xs text-primary border-b border-primary/20 bg-terminal-bg/50">
              <span className="font-semibold">Suggestions</span>
              <span className="text-muted-foreground ml-2">
                (↑↓ to navigate, Tab to complete)
              </span>
            </div>
            {suggestions.map((suggestion, idx) => (
              <motion.div
                key={suggestion}
                onClick={() => {
                  setInput(suggestion);
                  setSuggestions([]);
                  inputRef.current?.focus();
                }}
                className={`px-4 py-2.5 cursor-pointer transition-all font-mono ${
                  idx === selectedSuggestion
                    ? "bg-primary/20 text-primary border-l-2 border-primary"
                    : "hover:bg-primary/10 text-foreground border-l-2 border-transparent"
                }`}
                whileHover={{ x: 5 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-accent">$</span>
                  <span>{suggestion}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
