import { useState } from "react";
import { Outlet } from "react-router-dom";
import { CommandPalette } from "./CommandPalette";
import { Footer } from "./Footer";
import { TopAppBar } from "./TopAppBar";
import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion";

export const Layout = () => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  const rotateX = useTransform(smoothVelocity, [-2000, 0, 2000], [4, 0, -4]);
  const scale = useTransform(smoothVelocity, [-2000, 0, 2000], [0.97, 1, 0.97]);

  return (
    <div className="site-shell" style={{ perspective: "1500px" }}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <TopAppBar onCommandOpen={() => setCommandPaletteOpen(true)} />
      <motion.main 
        id="main-content" 
        className="site-main" 
        tabIndex={-1}
        style={{
          rotateX,
          scale,
          transformOrigin: "center center",
          willChange: "transform"
        }}
      >
        <Outlet />
      </motion.main>
      <Footer />
      <CommandPalette isOpen={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} />
    </div>
  );
};
