import { useState } from "react";
import { Outlet } from "react-router-dom";
import { TopAppBar } from "./TopAppBar";
import { SideNavBar } from "./SideNavBar";
import { Footer } from "./Footer";
import { CommandPalette } from "./CommandPalette";

export const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen w-screen bg-background text-on-background font-body-base overflow-hidden flex flex-col relative">
      <TopAppBar onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
      <div className="flex flex-1 pt-14 pb-8 overflow-hidden relative">
        <SideNavBar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        <main className="flex-1 md:ml-64 relative h-full w-full overflow-hidden">
          <Outlet />
        </main>
      </div>
      
      <Footer />
      <CommandPalette />
      
      {/* Global ambient background glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
    </div>
  );
};