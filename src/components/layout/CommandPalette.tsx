import { Search, X } from "lucide-react";
import { AnimatedIcon } from "@/components/portfolio/AnimatedIcon";
import arrowUpAnimation from "@/assets/animations/arrow-up.json";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "@/lib/routes";

interface CommandPaletteProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const CommandPalette = ({ isOpen, onOpenChange }: CommandPaletteProps) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpenChange(!isOpen);
      }
      if (event.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      window.requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return siteRoutes;
    return siteRoutes.filter((item) => `${item.label} ${item.detail}`.toLowerCase().includes(normalized));
  }, [query]);

  const execute = (item: typeof siteRoutes[number]) => {
    onOpenChange(false);
    if (item.path) navigate(item.path);
    if (item.href) window.open(item.href, "_blank", "noopener,noreferrer");
  };

  if (!isOpen) return null;

  return (
    <div className="command-palette__layer" role="presentation" onMouseDown={() => onOpenChange(false)}>
      <section
        aria-label="Quick links"
        aria-modal="true"
        className="command-palette"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="command-palette__search">
          <Search size={19} aria-hidden="true" />
          <label className="sr-only" htmlFor="command-search">
            Search pages
          </label>
          <input
            id="command-search"
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search pages"
          />
          <button type="button" onClick={() => onOpenChange(false)} aria-label="Close quick links">
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="command-palette__results">
          {filteredItems.length ? (
            filteredItems.map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.id} type="button" onClick={() => execute(item)}>
                  <Icon size={18} aria-hidden="true" />
                  <span>
                    <strong>{item.label}</strong>
                    <small>{item.detail}</small>
                  </span>
                  <AnimatedIcon animationData={arrowUpAnimation} loop size={17} className="rotate-45" />
                </button>
              );
            })
          ) : (
            <p className="command-palette__empty">No matching destination.</p>
          )}
        </div>
      </section>
    </div>
  );
};
