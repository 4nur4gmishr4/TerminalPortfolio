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
    // Focus input on mount only — no global click listener to avoid focus hijack
    inputRef.current?.focus();
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
    // Enter to run selected suggestion
    if (e.key === "Enter" && suggestions.length > 0) {
      e.preventDefault();
      onCommand(suggestions[selectedSuggestion]);
      setInput("");
      setSuggestions([]);
      setHistoryIndex(-1);
    }
    // Tab for autocomplete
    else if (e.key === "Tab" && suggestions.length > 0) {
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
      <form onSubmit={handleSubmit} className="mt-auto flex items-center gap-sm pt-2">
        <span className="text-primary">guest@terminalbay ~ $</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setHistoryIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          className="terminal-input flex-grow font-data-mono text-data-mono text-on-background p-0 border-0 border-transparent focus:ring-0 placeholder:text-on-surface-variant/30"
          placeholder="Execute command or type 'help'..."
          autoComplete="off"
          spellCheck="false"
          autoFocus
        />
      </form>

      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 bottom-full mb-2 w-full max-w-full md:max-w-md holographic-toast rounded-lg border border-primary/30 overflow-hidden z-50 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          >
            <div className="px-3 py-2 text-xs text-primary border-b border-white/10 bg-white/[0.02]">
              <span className="font-semibold">SUGGESTED</span>
            </div>
            {suggestions.map((suggestion, idx) => (
              <motion.div
                key={suggestion}
                onClick={() => {
                  setInput(suggestion);
                  setSuggestions([]);
                  inputRef.current?.focus();
                }}
                className={`px-4 py-2.5 cursor-pointer transition-all font-data-mono text-data-mono ${
                  idx === selectedSuggestion
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-white/5 text-on-surface-variant hover:text-on-surface"
                }`}
                whileHover={{ x: 5 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-primary/50">↵</span>
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
