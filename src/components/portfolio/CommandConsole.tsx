import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatedIcon } from "@/components/portfolio/AnimatedIcon";
import activityAnimation from "@/assets/animations/activity.json";
import arrowUpAnimation from "@/assets/animations/arrow-up.json";

interface ConsoleLine {
  command: string;
  response: string;
}

const quickCommands = ["work", "about", "contact", "faultline"];

const commandResponses: Record<string, { response: string; path?: string }> = {
  help: { response: "Shortcuts: work, about, contact, faultline, clear." },
  work: { response: "Opening projects.", path: "/work#featured-work" },
  projects: { response: "Opening projects.", path: "/work#featured-work" },
  profile: { response: "Opening about me.", path: "/profile" },
  about: { response: "Opening about me.", path: "/profile" },
  contact: { response: "Opening contact.", path: "/contact#message" },
  faultline: { response: "Opening FaultLine.", path: "/projects/faultline" },
};

export const CommandConsole = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<ConsoleLine[]>([]);

  const execute = (value: string) => {
    const command = value.trim().toLowerCase();
    if (!command) return;

    if (command === "clear") {
      setLines([]);
      setInput("");
      return;
    }

    const result = commandResponses[command];
    if (result) {
      setLines((current) => [...current, { command, response: result.response }]);
      if (result.path) navigate(result.path);
    } else {
      setLines((current) => [...current, { command, response: `Command not found: ${command}. Run help for available commands.` }]);
    }
    setInput("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    execute(input);
  };

  return (
    <div className="command-console">
      <div className="command-console__bar">
        <div>
          <AnimatedIcon animationData={activityAnimation} loop size={20} invertColors />
          <span>anurag@portfolio</span>
        </div>
          <span>quick links</span>
      </div>

      <div className="command-console__output" aria-live="polite">
        <p>
          <span className="console-dim">status</span>
          <span>Portfolio ready.</span>
        </p>
        {lines.map((line, index) => (
          <div key={`${line.command}-${index}`} className="command-console__line">
            <p>
              <span className="console-prompt">$</span>
              {line.command}
            </p>
            <p className="console-dim">{line.response}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="command-console__form">
        <label className="sr-only" htmlFor="portfolio-command">
          Run a portfolio command
        </label>
        <span className="console-prompt" aria-hidden="true">
          $
        </span>
        <input
          id="portfolio-command"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Type a shortcut"
          autoComplete="off"
          spellCheck="false"
        />
        <button type="submit" aria-label="Run command">
          <AnimatedIcon animationData={arrowUpAnimation} loop size={20} invertColors className="rotate-45" />
        </button>
      </form>

      <div className="command-console__quick" aria-label="Quick commands">
        {quickCommands.map((command) => (
          <button key={command} type="button" onClick={() => execute(command)}>
            {command}
          </button>
        ))}
      </div>
    </div>
  );
};
