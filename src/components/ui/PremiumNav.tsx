import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';

interface NavItem {
  label: string;
  href: string;
}

export const PremiumNav = ({ items }: { items: NavItem[] }) => {
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const location = useLocation();

  return (
    <nav style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <ul
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          listStyle: 'none',
          padding: '6px',
          margin: 0,
          position: 'relative',
          background: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '9999px',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 2px 10px rgba(0, 0, 0, 0.02)',
        }}
        onMouseLeave={() => setHoveredPath(null)}
      >
        {items.map((item) => {
          // React Router matching logic for active state
          const isActive = item.href === '/' 
            ? location.pathname === '/' 
            : location.pathname.startsWith(item.href);
            
          const isHovered = hoveredPath === item.href;

          return (
            <li
              key={item.href}
              style={{ position: 'relative', zIndex: 1 }}
              onMouseEnter={() => setHoveredPath(item.href)}
            >
              {isActive && (
                <motion.div
                  layoutId="premium-nav-active-pill"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'var(--primary)',
                    borderRadius: '9999px',
                    boxShadow: '0 2px 8px rgba(0,255,0,0.2)',
                    zIndex: -1,
                  }}
                />
              )}
              {isHovered && !isActive && (
                <motion.div
                  layoutId="premium-nav-hover-pill"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    borderRadius: '9999px',
                    zIndex: -1,
                  }}
                />
              )}
              <NavLink
                to={item.href}
                end={item.href === '/'}
                style={{
                  display: 'block',
                  padding: '6px 14px',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: isActive ? '#ffffff' : 'var(--ink-soft)',
                  textDecoration: 'none',
                  position: 'relative',
                  transition: 'color 0.2s ease',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  letterSpacing: '-0.01em',
                }}
              >
                {item.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
