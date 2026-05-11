import { portfolioData } from "@/types/portfolio";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 h-8 bg-surface border-t border-white/10 flex items-center justify-between px-gutter font-data-mono text-[10px] text-on-surface-variant/50 uppercase tracking-widest backdrop-blur-md">
      <div className="flex items-center gap-md">
        <span>© {new Date().getFullYear()} {portfolioData.name}</span>
        <span className="hidden sm:inline">| All Rights Reserved</span>
      </div>
      
      <div className="flex items-center gap-md">
        <a href={portfolioData.contact.github} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
          GITHUB
        </a>
        <a href={portfolioData.contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
          LINKEDIN
        </a>
      </div>
    </footer>
  );
};