import { motion } from "framer-motion";
import { portfolioData } from "@/types/portfolio";

const Projects = () => {
  return (
    <div className="p-gutter lg:p-lg h-full overflow-y-auto">
      <div className="max-w-[1000px] mx-auto relative z-10 space-y-lg">
        
        {/* Header */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-sm mb-xs"
          >
            <span className="material-symbols-outlined text-primary text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>folder_open</span>
            <h1 className="text-display-sm text-on-surface">Projects</h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-on-surface-variant font-data-mono text-data-mono max-w-2xl"
          >
            A collection of my work, ranging from CLI tools to full-stack applications.
          </motion.p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {portfolioData.projects.map((project, idx) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="glass-panel p-6 flex flex-col group hover:border-primary/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-title-lg text-primary font-bold">{project.name}</h2>
                <div className="flex gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-on-surface-variant hover:text-primary transition-colors"
                      title="View GitHub Repository"
                    >
                      <span className="material-symbols-outlined text-[20px]">code</span>
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-on-surface-variant hover:text-primary transition-colors"
                      title="View Live Project"
                    >
                      <span className="material-symbols-outlined text-[20px]">open_in_new</span>
                    </a>
                  )}
                </div>
              </div>
              
              <p className="text-on-surface-variant mb-6 flex-grow">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-white/5 border border-white/10 rounded-sm text-label-sm font-data-mono text-on-surface-variant/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Projects;