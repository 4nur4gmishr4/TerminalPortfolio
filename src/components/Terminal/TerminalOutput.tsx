import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, ExternalLink } from "lucide-react";
import { portfolioData } from "@/types/portfolio";

interface TerminalOutputProps {
  command: string;
  index: number;
}

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.3 }}
      className="whitespace-pre-wrap"
    >
      {text}
    </motion.div>
  );
};

export const TerminalOutput = ({ command, index }: TerminalOutputProps) => {
  const delay = index * 0.1;

  const renderOutput = () => {
    switch (command.toLowerCase()) {
      case "help":
        return (
          <TypewriterText
            delay={delay}
            text={`Available commands:
  
  about       - Learn about me
  contact     - Get my contact information
  education   - View my educational background
  experience  - See my work experience
  projects    - Explore my projects
  skills      - List my technical skills
  achievements - View my achievements
  neofetch    - Display system info with ASCII art
  whoami      - Show current user info
  ls          - List available sections
  pwd         - Print working directory
  clear       - Clear terminal history
  help        - Show this help message
  
Type any command to get started!`}
          />
        );

      case "about":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="space-y-4"
          >
            <div className="border-l-4 border-primary pl-4">
              <h2 className="text-xl font-bold text-primary terminal-glow mb-2">
                {portfolioData.name}
              </h2>
              <p className="text-accent font-semibold mb-2">{portfolioData.title}</p>
              <p className="text-foreground leading-relaxed">{portfolioData.bio}</p>
            </div>
          </motion.div>
        );

      case "contact":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="space-y-3"
          >
            <h2 className="text-xl font-bold text-primary terminal-glow mb-4">Contact Information</h2>
            <div className="space-y-2">
              <motion.a
                href={`mailto:${portfolioData.contact.email}`}
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-5 h-5 text-accent" />
                <span className="group-hover:underline">{portfolioData.contact.email}</span>
              </motion.a>
              <motion.div
                className="flex items-center gap-3 text-foreground"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-5 h-5 text-accent" />
                <span>{portfolioData.contact.phone}</span>
              </motion.div>
              <motion.a
                href={portfolioData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
                whileHover={{ x: 5 }}
              >
                <Github className="w-5 h-5 text-accent" />
                <span className="group-hover:underline">GitHub</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
              <motion.a
                href={portfolioData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
                whileHover={{ x: 5 }}
              >
                <Linkedin className="w-5 h-5 text-accent" />
                <span className="group-hover:underline">LinkedIn</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            </div>
          </motion.div>
        );

      case "education":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-bold text-primary terminal-glow mb-4">Education</h2>
            {portfolioData.education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + idx * 0.1 }}
                className="border-l-2 border-accent/50 pl-4 py-2"
              >
                <h3 className="font-semibold text-primary">{edu.institution}</h3>
                <p className="text-sm text-muted-foreground">{edu.location}</p>
                <p className="text-foreground">{edu.degree}</p>
                {edu.gpa && <p className="text-sm text-accent">CGPA: {edu.gpa}</p>}
                {edu.percentage && <p className="text-sm text-accent">Percentage: {edu.percentage}</p>}
                <p className="text-sm text-muted-foreground mt-1">{edu.years}</p>
              </motion.div>
            ))}
          </motion.div>
        );

      case "experience":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-bold text-primary terminal-glow mb-4">Work Experience</h2>
            {portfolioData.experience.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + idx * 0.1 }}
                className="border-l-2 border-accent/50 pl-4 py-2"
              >
                <h3 className="font-semibold text-primary">{exp.company}</h3>
                <p className="text-accent">{exp.role}</p>
                <p className="text-sm text-muted-foreground">{exp.location} | {exp.duration}</p>
                <ul className="mt-2 space-y-1">
                  {exp.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="text-sm text-foreground flex items-start gap-2">
                      <span className="text-primary">▹</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        );

      case "projects":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-bold text-primary terminal-glow mb-4">Featured Projects</h2>
            {portfolioData.projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + idx * 0.15 }}
                className="glass rounded-lg p-4 border border-primary/20 hover:border-primary/50 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-primary terminal-glow">{project.name}</h3>
                    <p className="text-sm text-accent mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tech.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-xs px-2 py-1 bg-primary/10 text-primary rounded border border-primary/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <ul className="space-y-1">
                      {project.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="text-sm text-foreground flex items-start gap-2">
                          <span className="text-accent">▹</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-glow transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-6 h-6" />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        );

      case "skills":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-bold text-primary terminal-glow mb-4">Technical Skills</h2>
            {Object.entries(portfolioData.skills).map(([category, skills], idx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + idx * 0.1 }}
                className="space-y-2"
              >
                <h3 className="font-semibold text-accent">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, sIdx) => (
                    <motion.span
                      key={sIdx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: delay + idx * 0.1 + sIdx * 0.05 }}
                      className="px-3 py-1 bg-primary/10 text-foreground rounded-md border border-primary/30 hover:border-primary/60 hover:bg-primary/20 transition-all text-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        );

      case "achievements":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-bold text-primary terminal-glow mb-4">Achievements & Certifications</h2>
            <ul className="space-y-3">
              {portfolioData.achievements.map((achievement, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: delay + idx * 0.1 }}
                  className="flex items-start gap-3 text-foreground"
                >
                  <span className="text-accent text-xl">★</span>
                  <span>{achievement}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        );

      case "neofetch":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay, duration: 0.5 }}
            className="font-mono text-sm"
          >
            <pre className="text-primary terminal-glow-strong text-xs sm:text-sm">
{`
    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓      ${portfolioData.name}
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓      ────────────────────────────
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    OS: MacOS Terminal Emulator
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    Host: Developer Portfolio
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    Kernel: React + TypeScript
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    Uptime: ${new Date().getFullYear() - 2022} years (learning)
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    Shell: portfolio.sh
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    Resolution: Infinite possibilities
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    Theme: Terminal Dark [Cyan]
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    CPU: Coffee + Code
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓      Memory: Filled with ML models
    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓      
                           ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓
`}
            </pre>
          </motion.div>
        );

      case "whoami":
        return (
          <TypewriterText
            delay={delay}
            text={`${portfolioData.name}
${portfolioData.title}

A passionate developer who loves building intelligent solutions.
Type 'about' to learn more!`}
          />
        );

      case "ls":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="space-y-2"
          >
            <p className="text-foreground mb-3">Available sections:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {["about", "contact", "education", "experience", "projects", "skills", "achievements"].map((item, idx) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: delay + idx * 0.05 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-accent">📁</span>
                  <span className="text-primary hover:text-primary-glow cursor-pointer transition-colors">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case "pwd":
        return (
          <TypewriterText
            delay={delay}
            text="/home/anurag/portfolio"
          />
        );

      default:
        return (
          <TypewriterText
            delay={delay}
            text={`Command not found: ${command}
Type 'help' to see available commands.`}
          />
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay }}
      className="mb-6"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-accent">➜</span>
        <span className="text-primary">~</span>
        <span className="text-foreground">{command}</span>
      </div>
      <div className="pl-6 text-foreground">{renderOutput()}</div>
    </motion.div>
  );
};
