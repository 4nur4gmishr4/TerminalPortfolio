import { Command, Search } from "lucide-react";
import { AnimatedIcon } from "@/components/portfolio/AnimatedIcon";
import githubAnimation from "@/assets/animations/github.json";
import linkedinAnimation from "@/assets/animations/linkedin.json";
import menuAnimation from "@/assets/animations/menu-v3.json";
import { useEffect, useState, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { portfolioData } from "@/types/portfolio";
import { siteRoutes } from "@/lib/routes";
import { PremiumNav } from "@/components/ui/PremiumNav";

interface TopAppBarProps {
  onCommandOpen: () => void;
}

export const TopAppBar = ({ onCommandOpen }: TopAppBarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const startYRef = useRef<number | null>(null);
  const dragYRef = useRef(0);
  const navRef = useRef<HTMLElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    startYRef.current = e.touches[0].clientY;
    if (navRef.current) {
      navRef.current.classList.add('is-dragging');
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startYRef.current === null) return;
    const currentY = e.touches[0].clientY;
    const diff = startYRef.current - currentY;
    
    // Only allow dragging upwards (diff > 0)
    if (diff > 0) {
      // Apply spring resistance (0.85 multiplier)
      dragYRef.current = diff * 0.85;
      
      // Direct DOM mutation for absolute 60fps peak performance (bypasses React render cycle)
      if (navRef.current) {
        navRef.current.style.setProperty('--drag-y', `-${dragYRef.current}px`);
      }
    }
  };

  const handleTouchEnd = () => {
    if (navRef.current) {
      navRef.current.classList.remove('is-dragging');
      // Reset DOM inline style so CSS transitions take over smoothly
      navRef.current.style.removeProperty('--drag-y');
    }
    
    if (dragYRef.current > 60) {
      setMobileOpen(false);
    }
    
    startYRef.current = null;
    dragYRef.current = 0;
  };

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="brand" aria-label="Anurag Mishra portfolio home" onClick={closeMobileMenu}>
          <img src="/favicon.svg" alt="AM" className="brand__mark" />
          <span className="brand__copy">
            <strong>Anurag Mishra</strong>
            <span>Software developer</span>
          </span>
        </Link>

        <div className="site-nav-container">
          <PremiumNav
            items={siteRoutes.filter(route => route.path).map((item) => ({
              label: item.shortLabel,
              href: item.path!
            }))}
          />
        </div>

        <div className="site-header__actions">
          <button className="header-command" type="button" onClick={onCommandOpen} aria-label="Open quick links">
            <Search size={17} aria-hidden="true" />
            <span>Quick links</span>
            <kbd>Ctrl K</kbd>
          </button>
          <a className="icon-button" href={portfolioData.contact.linkedin} target="_blank" rel="noreferrer" aria-label="Open Anurag Mishra's LinkedIn profile">
            <AnimatedIcon animationData={linkedinAnimation} loop speed={0.5} size={22} />
          </a>
          <a className="icon-button" href={portfolioData.contact.github} target="_blank" rel="noreferrer" aria-label="Open Anurag Mishra's GitHub profile">
            <AnimatedIcon animationData={githubAnimation} loop speed={0.5} size={22} />
          </a>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={mobileOpen}
            className="mobile-menu-button"
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <AnimatedIcon animationData={menuAnimation} isToggled={mobileOpen} speed={2.5} size={26} />
            <span className="sr-only">{mobileOpen ? "Close navigation" : "Open navigation"}</span>
          </button>
        </div>
      </div>

      <div 
        className={`mobile-overlay ${mobileOpen ? 'is-open' : ''}`} 
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      <nav 
        id="mobile-navigation" 
        ref={navRef}
        className={`mobile-navigation ${mobileOpen ? 'is-open' : ''}`} 
        aria-label="Mobile navigation"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="mobile-navigation__wrapper">
          <div className="mobile-navigation__inner">
            {siteRoutes.filter(route => route.path).map((item) => (
              <NavLink
                end={item.end}
                className={({ isActive }) => (isActive ? "mobile-navigation__link is-active" : "mobile-navigation__link")}
                key={item.path}
                to={item.path!}
                onClick={closeMobileMenu}
              >
                {item.shortLabel}
              </NavLink>
            ))}
            <button
              className="mobile-navigation__command"
              type="button"
              onClick={() => {
                closeMobileMenu();
                onCommandOpen();
              }}
            >
              <Command size={17} aria-hidden="true" />
              Open quick links
            </button>
          </div>
          <div className="mobile-navigation__grabber-container">
            <div className="mobile-navigation__grabber" />
          </div>
        </div>
      </nav>
    </header>
  );
};
