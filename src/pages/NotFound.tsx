import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Terminal } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full bg-gradient-terminal flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full glass rounded-2xl shadow-strong border border-primary/20 overflow-hidden"
      >
        <div className="p-8 text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="text-6xl mb-4"
          >
            <Terminal className="w-24 h-24 mx-auto text-primary terminal-glow" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <h1 className="text-6xl font-bold text-primary terminal-glow">404</h1>
            <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-lg p-4 border border-primary/30 font-mono text-sm"
          >
            <p className="text-destructive mb-2">Error: Command not found</p>
            <p className="text-muted-foreground">
              The route <span className="text-accent">{location.pathname}</span> does not exist in the system.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "var(--shadow-glow)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary-glow transition-colors"
              >
                <Home className="w-5 h-5" />
                Return to Terminal
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xs text-muted-foreground"
          >
            Tip: Type <span className="text-primary">'help'</span> in the terminal to see available commands
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
