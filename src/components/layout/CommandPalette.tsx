import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { portfolioData } from "@/types/portfolio";

const ALL_COMMANDS = [
  { id: "terminal", label: "Open Terminal", icon: "terminal", action: "navigate", target: "/" },
  { id: "projects", label: "View Projects", icon: "folder_open", action: "navigate", target: "/projects" },
  { id: "contact", label: "Contact Me", icon: "mail", action: "navigate", target: "/contact" },
  { id: "github", label: "Open GitHub Profile", icon: "code", action: "link", url: portfolioData.contact.github },
  { id: "linkedin", label: "Open LinkedIn Profile", icon: "person", action: "link", url: portfolioData.contact.linkedin },
  { id: "resume", label: "View Portfolio Site", icon: "language", action: "link", url: portfolioData.contact.website },
];

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearch("");
    }
  }, [isOpen]);

  const filteredCommands = search.trim()
    ? ALL_COMMANDS.filter((cmd) =>
        cmd.label.toLowerCase().includes(search.toLowerCase()) ||
        cmd.id.toLowerCase().includes(search.toLowerCase())
      )
    : ALL_COMMANDS;

  const handleAction = (cmd: typeof ALL_COMMANDS[0]) => {
    setIsOpen(false);
    if (cmd.action === "navigate") {
      navigate(cmd.target!);
      toast.success(`Navigated to ${cmd.label}.`);
    } else if (cmd.action === "link") {
      window.open(cmd.url!, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] md:pt-[20vh] bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg holographic-toast rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden mx-4"
          >
            <div className="flex items-center px-4 py-3 border-b border-white/10 bg-white/[0.02]">
              <span className="material-symbols-outlined text-primary mr-sm" style={{ fontVariationSettings: "'FILL' 0" }}>search</span>
              <input 
                ref={inputRef}
                className="bg-transparent border-none text-on-surface font-data-mono text-data-mono w-full focus:ring-0 placeholder:text-on-surface-variant/30" 
                placeholder="Search commands..." 
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="flex gap-1 shrink-0">
                <span className="px-1.5 py-0.5 bg-white/10 text-on-surface-variant rounded-[2px] font-data-mono text-[10px]">ESC</span>
              </div>
            </div>
            <div className="p-2 max-h-[300px] overflow-y-auto">
              <div className="px-3 py-1 text-[10px] font-label-caps text-on-surface-variant/50">
                {search.trim() ? "RESULTS" : "COMMANDS"}
              </div>
              <ul className="font-data-mono text-data-mono">
                {filteredCommands.length === 0 && (
                  <li className="px-3 py-2 text-on-surface-variant/50 text-center">No commands found.</li>
                )}
                {filteredCommands.map((cmd, idx) => (
                  <li
                    key={cmd.id}
                    className={`px-3 py-2 flex items-center justify-between rounded-sm cursor-pointer transition-colors ${
                      idx === 0
                        ? "bg-primary/10 text-primary"
                        : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"
                    }`}
                    onClick={() => handleAction(cmd)}
                  >
                    <div className="flex items-center gap-sm">
                      <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 0" }}>{cmd.icon}</span>
                      <span>{cmd.label}</span>
                    </div>
                    {idx === 0 && <span className="text-[10px] text-primary/50">↵</span>}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};