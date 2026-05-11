import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

interface TopAppBarProps {
  onMenuToggle: () => void;
}

export const TopAppBar = ({ onMenuToggle }: TopAppBarProps) => {
  const location = useLocation();
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinkClass = (path: string) => {
    if (isActive(path)) {
      return "h-full flex items-center text-primary font-bold border-b-2 border-primary pb-1 px-2 mt-[2px]";
    }
    return "h-full flex items-center text-on-surface-variant/60 hover:text-primary hover:bg-white/5 transition-colors px-2";
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-gutter bg-surface/70 backdrop-blur-md text-primary-fixed-dim font-data-mono text-data-mono tracking-tight h-14 border-b border-white/10 shadow-[0_4px_40px_rgba(0,0,0,0.15)]">
      <div className="flex items-center gap-lg h-full">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuToggle}
          className="md:hidden text-on-surface-variant/60 hover:text-primary transition-colors p-1"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>menu</span>
        </button>

        {/* Logo badge */}
        <div className="font-label-caps text-label-caps text-primary tracking-widest bg-primary/10 px-2 py-1 border border-primary/20 flex items-center">
          TERMINALBAY
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex h-full items-center gap-md">
          <Link to="/" className={navLinkClass("/")}>TERMINAL</Link>
          <Link to="/projects" className={navLinkClass("/projects")}>PROJECTS</Link>
          <Link to="/contact" className={navLinkClass("/contact")}>CONTACT</Link>
        </div>
      </div>

      {/* Clock — desktop only */}
      <div className="hidden sm:flex items-center gap-xs font-data-mono text-label-caps text-on-surface-variant/60">
        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 0" }}>schedule</span>
        <span>{time}</span>
      </div>
    </nav>
  );
};