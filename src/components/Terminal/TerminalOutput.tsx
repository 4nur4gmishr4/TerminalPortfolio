import { motion } from "framer-motion";
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
      className="whitespace-pre-wrap font-data-mono"
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
              <h2 className="text-xl font-bold text-primary mb-2 glitch-text">
                {portfolioData.name}
              </h2>
              <p className="text-secondary font-semibold mb-2">{portfolioData.title}</p>
              <p className="text-on-surface leading-relaxed">{portfolioData.bio}</p>
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
            <h2 className="text-xl font-bold text-primary mb-4">Contact Information</h2>
            <div className="space-y-2">
              <motion.a
                href={`mailto:${portfolioData.contact.email}`}
                className="flex items-center gap-3 text-on-surface hover:text-primary transition-colors group"
                whileHover={{ x: 5 }}
              >
                <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>mail</span>
                <span className="group-hover:underline">{portfolioData.contact.email}</span>
              </motion.a>
              <motion.div
                className="flex items-center gap-3 text-on-surface"
                whileHover={{ x: 5 }}
              >
                <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>phone</span>
                <span>{portfolioData.contact.phone}</span>
              </motion.div>
              <motion.a
                href={portfolioData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-on-surface hover:text-primary transition-colors group"
                whileHover={{ x: 5 }}
              >
                <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>code</span>
                <span className="group-hover:underline">GitHub</span>
                <span className="material-symbols-outlined text-[14px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontVariationSettings: "'FILL' 0" }}>open_in_new</span>
              </motion.a>
              <motion.a
                href={portfolioData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-on-surface hover:text-primary transition-colors group"
                whileHover={{ x: 5 }}
              >
                <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>person</span>
                <span className="group-hover:underline">LinkedIn</span>
                <span className="material-symbols-outlined text-[14px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontVariationSettings: "'FILL' 0" }}>open_in_new</span>
              </motion.a>
              <motion.a
                href={portfolioData.contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-on-surface hover:text-primary transition-colors group"
                whileHover={{ x: 5 }}
              >
                <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>language</span>
                <span className="group-hover:underline">Portfolio</span>
                <span className="material-symbols-outlined text-[14px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontVariationSettings: "'FILL' 0" }}>open_in_new</span>
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
            <h2 className="text-xl font-bold text-primary mb-4">Education</h2>
            {portfolioData.education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + idx * 0.1 }}
                className="border-l-2 border-secondary/50 pl-4 py-2"
              >
                <h3 className="font-semibold text-primary">{edu.institution}</h3>
                <p className="text-sm text-on-surface-variant/70">{edu.location}</p>
                <p className="text-on-surface">{edu.degree}</p>
                {edu.percentage && <p className="text-sm text-secondary">Percentage: {edu.percentage}</p>}
                <p className="text-sm text-on-surface-variant/70 mt-1">{edu.years}</p>
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
            <h2 className="text-xl font-bold text-primary mb-4">Work Experience</h2>
            {portfolioData.experience.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + idx * 0.1 }}
                className="border-l-2 border-secondary/50 pl-4 py-2"
              >
                <h3 className="font-semibold text-primary">{exp.company}</h3>
                <p className="text-secondary">{exp.role}</p>
                <p className="text-sm text-on-surface-variant/70">{exp.location} | {exp.duration}</p>
                <ul className="mt-2 space-y-1">
                  {exp.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="text-sm text-on-surface flex items-start gap-2">
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
            <h2 className="text-xl font-bold text-primary mb-4">Featured Projects</h2>
            {portfolioData.projects.map((project, idx) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + idx * 0.15 }}
                className="glass-panel rounded-lg p-4 border border-primary/20 hover:border-primary/50 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg text-primary">{project.name}</h3>
                      {project.stats && (
                        <span className="text-[10px] text-secondary bg-secondary/10 px-2 py-0.5 rounded-sm border border-secondary/20">{project.stats}</span>
                      )}
                    </div>
                    <p className="text-sm text-secondary mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-[2px] border border-primary/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <ul className="space-y-1">
                      {project.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="text-sm text-on-surface flex items-start gap-2">
                          <span className="text-secondary">▹</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-fixed-dim transition-colors"
                        title="GitHub"
                      >
                        <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 0" }}>code</span>
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary hover:text-secondary transition-colors"
                        title="Live"
                      >
                        <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 0" }}>open_in_new</span>
                      </a>
                    )}
                  </div>
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
            <h2 className="text-xl font-bold text-primary mb-4">Technical Skills</h2>
            {Object.entries(portfolioData.skills).map(([category, skills], idx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + idx * 0.1 }}
                className="space-y-2"
              >
                <h3 className="font-semibold text-secondary">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, sIdx) => (
                    <motion.span
                      key={sIdx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: delay + idx * 0.1 + sIdx * 0.05 }}
                      className="px-3 py-1 bg-white/5 text-on-surface rounded-[2px] border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all text-[11px] font-data-mono"
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
            <h2 className="text-xl font-bold text-primary mb-4">Achievements</h2>
            <ul className="space-y-3">
              {portfolioData.achievements.map((achievement, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: delay + idx * 0.1 }}
                  className="flex items-start gap-3 text-on-surface"
                >
                  <span className="text-secondary text-xl">★</span>
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
            className="font-data-mono text-[11px]"
          >
            <pre className="text-primary text-xs sm:text-[11px]">
{`
    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓      ${portfolioData.name}
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓      ────────────────────────────
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    OS: TerminalBay v1.0
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    Host: ${portfolioData.title}
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    Kernel: React 18 + TypeScript
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    Status: Online
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    Shell: TerminalBay Web Shell
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    Projects: ${portfolioData.projects.length} deployed
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    Theme: TerminalBay Dark
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    Downloads: 15,400+ (Fahh)
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓      Users: 1,600+ (Null-Secret)
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

${portfolioData.bio}
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
            <p className="text-on-surface mb-3">Available sections:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {["about", "contact", "education", "experience", "projects", "skills", "achievements"].map((item, idx) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: delay + idx * 0.05 }}
                  className="flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px] text-secondary" style={{ fontVariationSettings: "'FILL' 0" }}>folder</span>
                  <span className="text-primary hover:text-primary-fixed-dim cursor-pointer transition-colors">
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
            text="/home/visitor/workspace"
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
      className="mb-6 font-data-mono text-[13px]"
    >
      <div className="flex items-center gap-sm mb-2">
        <span className="text-primary">guest@terminalbay ~$</span>
        <span className="text-on-surface">{command}</span>
      </div>
      <div className="pl-0 text-on-surface-variant">{renderOutput()}</div>
    </motion.div>
  );
};