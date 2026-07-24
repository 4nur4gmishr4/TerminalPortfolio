import { SlidersHorizontal } from "lucide-react";
import { AnimatedIcon } from "@/components/portfolio/AnimatedIcon";
import arrowDownAnimation from "@/assets/animations/arrow-down.json";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { getProjectsByGroup, projectGroups, projects, type ProjectGroupId } from "@/types/portfolio";
import { formatIndex } from "@/lib/utils";

type WorkFilter = "all" | ProjectGroupId;

const isWorkFilter = (value: string | null): value is WorkFilter =>
  value === "all" || value === "featured" || value === "client" || value === "engineering";

import { BackButton } from "@/components/ui/BackButton";

const Projects = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryFilter = searchParams.get("group");
  const activeFilter: WorkFilter = isWorkFilter(queryFilter) ? queryFilter : "all";

  const setFilter = (filter: WorkFilter) => {
    if (filter === "all") {
      navigate("/work#work-list");
      return;
    }
    navigate(`/work?group=${filter}#${filter}-work`);
  };

  const visibleGroups = activeFilter === "all" ? projectGroups : projectGroups.filter((group) => group.id === activeFilter);

  return (
    <div className="page-shell page-shell--work">
      <BackButton />
      <section className="page-intro" aria-labelledby="work-title">
        <p className="eyebrow">Work / {projects.length} projects</p>
        <h1 id="work-title">Work I have built.</h1>
        <p>
          Start with my featured work, then see client work and other projects across web, mobile, data, and connected devices.
        </p>
      </section>

      <section className="work-filter" aria-label="Filter work">
        <div className="work-filter__label">
          <SlidersHorizontal size={17} aria-hidden="true" />
          <span>Show</span>
        </div>
        <div className="filter-controls" role="group" aria-label="Project group">
          <button className={activeFilter === "all" ? "is-active" : ""} type="button" onClick={() => setFilter("all")} aria-pressed={activeFilter === "all"}>
            All projects
          </button>
          {projectGroups.map((group) => (
            <button
              className={activeFilter === group.id ? "is-active" : ""}
              key={group.id}
              type="button"
              onClick={() => setFilter(group.id)}
              aria-pressed={activeFilter === group.id}
            >
              {group.title}
            </button>
          ))}
        </div>
      </section>

      <div className="work-groups" id="work-list">
        {visibleGroups.map((group) => {
          const projects = getProjectsByGroup(group.id);
          const indexOffset = projectGroups.slice(0, projectGroups.findIndex((candidate) => candidate.id === group.id)).reduce((total, candidate) => total + getProjectsByGroup(candidate.id).length, 0);

          return (
            <section className="work-group" id={`${group.id}-work`} key={group.id} aria-labelledby={`${group.id}-projects-title`}>
              <div className="work-group__heading">
                <div>
                  <p className="eyebrow">{formatIndex(indexOffset + 1)} - {formatIndex(indexOffset + projects.length)}</p>
                  <h2 id={`${group.id}-projects-title`}>{group.title}</h2>
                </div>
                <p>{group.description}</p>
              </div>
              <div className="project-grid">
                {projects.map((project, index) => (
                  <ProjectCard key={project.slug} project={project} index={index + indexOffset + 1} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="work-footer-note">
        <AnimatedIcon animationData={arrowDownAnimation} loop size={20} className="-rotate-45" />
        <p>Open a project to see what it does, how it works, the tools used, and the available links.</p>
      </div>
    </div>
  );
};

export default Projects;
