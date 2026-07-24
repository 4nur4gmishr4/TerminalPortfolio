import React, { useState, useEffect, useRef } from "react";
import { portfolioData, projects } from "@/types/portfolio";
import { X, Minus, Square } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CommandHistory {
  id: string;
  command: string;
  output: React.ReactNode;
}

export function TerminalOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const prompt = `anurag@portfolio:~$`;

  // Toggle terminal on ~
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle on ~ or `
      if (e.key === "`" || e.key === "~") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Scroll to bottom on history change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    if (cmd.trim()) {
      setCommandHistory((prev) => [...prev, cmd]);
    }

    const args = cmd.trim().split(" ").filter(Boolean);
    const baseCmd = args[0]?.toLowerCase();
    
    let output: React.ReactNode = "";

    switch (baseCmd) {
      case "help":
        output = (
          <div className="text-gray-300">
            <p className="mb-2">Available commands:</p>
            <ul className="list-none pl-4 space-y-1">
              <li><span className="text-green-400 inline-block w-20">help</span> - Show this message</li>
              <li><span className="text-green-400 inline-block w-20">whoami</span> - Display profile summary</li>
              <li><span className="text-green-400 inline-block w-20">projects</span> - List all projects</li>
              <li><span className="text-green-400 inline-block w-20">ls</span> - List available files</li>
              <li><span className="text-green-400 inline-block w-20">cat</span> - View file contents (usage: cat &lt;file&gt;)</li>
              <li><span className="text-green-400 inline-block w-20">echo</span> - Print text</li>
              <li><span className="text-green-400 inline-block w-20">pwd</span> - Print working directory</li>
              <li><span className="text-green-400 inline-block w-20">clear</span> - Clear terminal (alias: cls)</li>
            </ul>
          </div>
        );
        break;

      case "whoami":
        output = (
          <div className="text-gray-300 space-y-2">
            <div>
              <p className="text-blue-400 font-bold text-lg">{portfolioData.name}</p>
              <p className="text-purple-400">{portfolioData.title}</p>
            </div>
            <p className="text-gray-300">{portfolioData.summary}</p>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-4 max-h-80 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-white/30 rounded">
            {projects.map((p) => (
              <div key={p.slug} className="text-gray-300 border-l-2 border-white/10 pl-3">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400 font-bold">{p.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/70">{p.category}</span>
                </div>
                <p className="text-sm mt-1 text-gray-400">{p.overview}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "ls":
        output = (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-blue-400">
            <span>resume.txt</span>
            <span>about.txt</span>
            <span>skills.txt</span>
            <span>contact.txt</span>
            <span className="text-purple-400">projects/</span>
          </div>
        );
        break;

      case "cat": {
        const file = args[1]?.toLowerCase();
        if (!file) {
          output = <span className="text-red-400">Usage: cat &lt;file&gt;</span>;
        } else if (file === "resume.txt") {
          output = (
            <div className="text-gray-300">
              <p>Fetching resume...</p>
              <a href={portfolioData.contact.resume} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline mt-2 inline-block">
                → Open Resume (PDF)
              </a>
            </div>
          );
        } else if (file === "about.txt") {
          output = <span className="text-gray-300">{portfolioData.summary}</span>;
        } else if (file === "skills.txt") {
          output = (
            <div className="text-gray-300 space-y-3">
              {portfolioData.skills.map((group) => (
                <div key={group.name}>
                  <span className="text-purple-400 font-semibold">{group.name}:</span>
                  <p className="text-sm text-gray-400">{group.skills.join(", ")}</p>
                </div>
              ))}
            </div>
          );
        } else if (file === "contact.txt") {
          output = (
            <div className="text-gray-300 space-y-1">
              <p>Email: <a href={`mailto:${portfolioData.contact.email}`} className="text-blue-400 hover:underline">{portfolioData.contact.email}</a></p>
              <p>LinkedIn: <a href={portfolioData.contact.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">{portfolioData.contact.linkedin}</a></p>
              <p>GitHub: <a href={portfolioData.contact.github} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">{portfolioData.contact.github}</a></p>
              <p>Website: <a href={portfolioData.contact.website} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">{portfolioData.contact.website}</a></p>
            </div>
          );
        } else if (file === "projects") {
          output = <span className="text-red-400">cat: projects: Is a directory (Use 'projects' command instead)</span>;
        } else {
          output = <span className="text-red-400">cat: {file}: No such file or directory</span>;
        }
        break;
      }

      case "echo":
        output = <span className="text-gray-300">{args.slice(1).join(" ")}</span>;
        break;

      case "pwd":
        output = <span className="text-gray-300">/home/anurag</span>;
        break;

      case "sudo":
        output = <span className="text-yellow-400">Nice try! This incident will be reported.</span>;
        break;

      case "clear":
      case "cls":
        setHistory([]);
        return;

      case undefined:
        output = "";
        break;

      default:
        output = <span className="text-red-400">Command not found: {baseCmd}. Type 'help' for a list of commands.</span>;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(7),
        command: cmd,
        output,
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
      setHistoryIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "c" && e.ctrlKey) {
      e.preventDefault();
      setHistory((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(7),
          command: input + "^C",
          output: "",
        },
      ]);
      setInput("");
      setHistoryIndex(-1);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm sm:p-6"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-4xl h-[80vh] sm:h-[70vh] bg-[#0c0c0c]/80 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl flex flex-col overflow-hidden text-sm sm:text-base font-mono relative ring-1 ring-white/5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Header */}
            <div className="h-12 bg-white/[0.03] border-b border-white/10 flex items-center justify-between px-4 select-none">
              <div className="flex items-center space-x-2 w-20">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 flex items-center justify-center group transition-colors"
                >
                  <X className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
                </button>
                <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] flex items-center justify-center group">
                  <Minus className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
                </div>
                <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] flex items-center justify-center group">
                  <Square className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
                </div>
              </div>
              <div className="text-gray-400 text-xs font-medium flex-1 text-center font-sans tracking-wide">
                anurag@portfolio ~ zsh
              </div>
              <div className="w-20" /> {/* Spacer for centering */}
            </div>

            {/* Terminal Body */}
            <div
              className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-track]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-white/20"
              onClick={() => inputRef.current?.focus()}
            >
              <div className="text-gray-400 mb-6 space-y-1">
                <p>Welcome to Anurag's Interactive Portfolio Terminal v1.0.0</p>
                <p>Type <span className="text-green-400 font-bold">help</span> to see available commands.</p>
                <p className="text-xs text-gray-500 mt-2">Hint: You can use Up/Down arrow keys for command history, or Ctrl+C to cancel.</p>
              </div>

              {history.map((entry) => (
                <div key={entry.id} className="space-y-1.5 animate-in fade-in duration-200">
                  <div className="flex items-center space-x-2 text-gray-300 break-all">
                    <span className="text-green-400 font-semibold shrink-0">{prompt}</span>
                    <span>{entry.command}</span>
                  </div>
                  {entry.output && (
                    <div className="pl-4 break-words">{entry.output}</div>
                  )}
                </div>
              ))}

              <div className="flex items-center space-x-2 text-gray-300">
                <span className="text-green-400 font-semibold shrink-0">{prompt}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none border-none text-gray-200 min-w-0 font-mono focus:ring-0 p-0 m-0"
                  spellCheck={false}
                  autoComplete="off"
                  autoFocus
                />
              </div>
              <div ref={bottomRef} className="h-4" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
