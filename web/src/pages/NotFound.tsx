import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full glass-panel rounded-lg overflow-hidden"
      >
        <div className="p-8 text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="text-6xl mb-4"
          >
            <span className="material-symbols-outlined text-primary text-[96px]" style={{ fontVariationSettings: "'FILL' 0" }}>terminal</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <h1 className="text-6xl font-bold text-primary font-display-lg">404</h1>
            <h2 className="text-2xl font-semibold text-on-surface font-headline-md">Page Not Found</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="glass-panel rounded-lg p-4 border border-primary/20 font-data-mono text-data-mono"
          >
            <p className="text-error mb-2">Error: Command not found</p>
            <p className="text-on-surface-variant">
              The route <span className="text-primary">{location.pathname}</span> does not exist in the system.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary border border-primary/30 rounded-sm font-label-caps text-label-caps hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>home</span>
                Return to Terminal
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xs text-on-surface-variant/50 font-data-mono"
          >
            Tip: Type <span className="text-primary">'help'</span> in the terminal to see available commands
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
