import { Command, Search } from "lucide-react";
import { AnimatedIcon } from "@/components/portfolio/AnimatedIcon";
import githubAnimation from "@/assets/animations/github.json";
import menuAnimation from "@/assets/animations/menu-v3.json";
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { portfolioData } from "@/types/portfolio";
import { siteRoutes } from "@/lib/routes";

interface TopAppBarProps {
  onCommandOpen: () => void;
}

export const TopAppBar = ({ onCommandOpen }: TopAppBarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="brand" aria-label="Anurag Mishra portfolio home" onClick={closeMobileMenu}>
          <span className="brand__mark">AM</span>
          <span className="brand__copy">
            <strong>Anurag Mishra</strong>
            <span>Software developer</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Primary navigation">
          {siteRoutes.filter(route => route.path).map((item) => (
            <NavLink
              end={item.end}
              className={({ isActive }) => (isActive ? "site-nav__link is-active" : "site-nav__link")}
              key={item.path}
              to={item.path!}
            >
              {item.shortLabel}
            </NavLink>
          ))}
        </nav>

        <div className="site-header__actions">
          <button className="header-command" type="button" onClick={onCommandOpen} aria-label="Open quick links">
            <Search size={17} aria-hidden="true" />
            <span>Quick links</span>
            <kbd>Ctrl K</kbd>
          </button>
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
            <AnimatedIcon animationData={menuAnimation} isToggled={mobileOpen} size={26} />
            <span className="sr-only">{mobileOpen ? "Close navigation" : "Open navigation"}</span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation">
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
        </nav>
      )}
    </header>
  );
};
