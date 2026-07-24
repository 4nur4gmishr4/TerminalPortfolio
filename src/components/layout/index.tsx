import { useState } from "react";
import { Outlet } from "react-router-dom";
import { CommandPalette } from "./CommandPalette";
import { Footer } from "./Footer";
import { TopAppBar } from "./TopAppBar";

export const Layout = () => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <TopAppBar onCommandOpen={() => setCommandPaletteOpen(true)} />
      <main id="main-content" className="site-main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <CommandPalette isOpen={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} />
    </div>
  );
};
