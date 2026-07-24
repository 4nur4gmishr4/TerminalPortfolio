import { LockKeyhole } from "lucide-react";
import { AnimatedIcon } from "@/components/portfolio/AnimatedIcon";
import arrowUpAnimation from "@/assets/animations/arrow-up.json";
import { Link } from "react-router-dom";
import type { Project } from "@/types/portfolio";
import { formatIndex } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const indexLabel = formatIndex(index);

  return (
    <article className="project-card">
      <div className="project-card__meta">
        <span>{indexLabel}</span>
        <span>{project.category}</span>
      </div>

      <div className="project-card__body">
        <div className="project-card__heading">
          <h3>{project.name}</h3>
          {project.status && (
            <span className="project-status">
              {project.status.includes("private") || project.status.includes("Private") ? <LockKeyhole size={13} aria-hidden="true" /> : null}
              {project.status}
            </span>
          )}
        </div>
        <p>{project.overview}</p>
      </div>

      <div className="project-card__footer">
        <div className="project-card__evidence">
          {project.metric ? (
            <p>
              <strong>{project.metric.value}</strong>
              <span>{project.metric.label}</span>
            </p>
          ) : (
            <p>
              <strong>{project.role}</strong>
              <span>{project.client ?? "Personal project"}</span>
            </p>
          )}
          <ul aria-label={`${project.name} technologies`}>
            {project.stack.slice(0, 3).map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </div>
        <Link className="project-card__action" to={`/projects/${project.slug}`} aria-label={`View ${project.name} project`}>
          <span>View project</span>
          <AnimatedIcon animationData={arrowUpAnimation} loop size={18} className="rotate-45" />
        </Link>
      </div>
    </article>
  );
};
