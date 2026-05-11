import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface SideNavBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SideNavBar = ({ isOpen, onClose }: SideNavBarProps) => {
  const location = useLocation();

  const getLinkClass = (path: string) => {
    const base = "flex items-center gap-md py-3 px-4 transition-all duration-300 ";
    if (location.pathname === path) {
      return base + "bg-primary/10 text-primary border-r-2 border-primary";
    }
    return base + "text-on-surface-variant/50 hover:bg-white/5 hover:text-on-surface hover:translate-x-1";
  };

  const sidebarContent = (
    <>
      {/* User info */}
      <div className="px-gutter mb-lg">
        <div className="flex items-center gap-sm mb-xs">
          <div className="w-8 h-8 rounded-full bg-surface-bright border border-white/10 flex items-center justify-center overflow-hidden">
            <span className="material-symbols-outlined text-on-surface-variant">person</span>
          </div>
          <div>
            <div className="font-label-caps text-label-caps text-secondary tracking-widest">VISITOR</div>
            <div className="text-[10px] text-on-surface-variant/60">Guest Access</div>
          </div>
        </div>
      </div>
      
      {/* Nav links — only working pages */}
      <nav className="flex-1 flex flex-col w-full">
        <Link to="/" className={getLinkClass("/")} onClick={onClose}>
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>terminal</span>
          <span>Terminal</span>
        </Link>
        <Link to="/projects" className={getLinkClass("/projects")} onClick={onClose}>
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>folder_open</span>
          <span>Projects</span>
        </Link>
        <Link to="/contact" className={getLinkClass("/contact")} onClick={onClose}>
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>mail</span>
          <span>Contact</span>
        </Link>
      </nav>
    </>
  );

  return (
    <>
      {/* Desktop sidebar — always visible */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full z-40 pt-20 pb-8 bg-surface-container-lowest/80 backdrop-blur-xl text-primary-fixed-dim font-data-mono text-data-mono w-64 border-r border-white/10 shadow-xl">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
              onClick={onClose}
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="md:hidden fixed left-0 top-0 h-full z-[70] flex flex-col pt-20 pb-8 bg-surface-container-lowest backdrop-blur-xl text-primary-fixed-dim font-data-mono text-data-mono w-64 border-r border-white/10 shadow-xl"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};