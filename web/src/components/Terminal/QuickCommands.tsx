import { motion } from "framer-motion";
import { User, Mail, GraduationCap, Briefcase, FolderGit, Code, Trophy, HelpCircle, Terminal } from "lucide-react";

interface QuickCommandsProps {
  onCommand: (command: string) => void;
}

const commands = [
  { name: "about", icon: User, description: "Learn about me", color: "text-primary" },
  { name: "projects", icon: FolderGit, description: "My projects", color: "text-accent" },
  { name: "skills", icon: Code, description: "Technical skills", color: "text-secondary" },
  { name: "experience", icon: Briefcase, description: "Work experience", color: "text-primary" },
  { name: "education", icon: GraduationCap, description: "Educational background", color: "text-accent" },
  { name: "achievements", icon: Trophy, description: "Achievements", color: "text-secondary" },
  { name: "contact", icon: Mail, description: "Get in touch", color: "text-primary" },
  { name: "help", icon: HelpCircle, description: "Show all commands", color: "text-accent" },
];

export const QuickCommands = ({ onCommand }: QuickCommandsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mb-8"
    >
      <div className="flex items-center gap-2 mb-4">
        <Terminal className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-primary">Quick Commands</h3>
        <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {commands.map((cmd, idx) => (
          <motion.button
            key={cmd.name}
            onClick={() => onCommand(cmd.name)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "var(--shadow-glow)",
              borderColor: "hsl(var(--primary) / 0.6)"
            }}
            whileTap={{ scale: 0.95 }}
            className="glass rounded-lg p-4 border border-primary/20 hover:border-primary/50 transition-all group text-left relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <cmd.icon className={`w-5 h-5 ${cmd.color} mb-2 group-hover:scale-110 transition-transform`} />
              <div className="text-xs text-foreground font-semibold mb-0.5">{cmd.name}</div>
              <div className="text-[10px] text-muted-foreground line-clamp-1">{cmd.description}</div>
            </div>
          </motion.button>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-xs text-muted-foreground mt-4 text-center"
      >
        Or type any command below • Press Tab for autocomplete
      </motion.p>
    </motion.div>
  );
};
