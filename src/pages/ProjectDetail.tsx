import { ArrowRight, Check, ExternalLink, Github, Layers3, Store, X } from "lucide-react";
import { AnimatedIcon } from "@/components/portfolio/AnimatedIcon";
import arrowUpAnimation from "@/assets/animations/arrow-up.json";
import chevronRightAnimation from "@/assets/animations/chevron-right.json";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { getProject, projectGroups, projects } from "@/types/portfolio";
import NotFound from "./NotFound";
import { formatIndex } from "@/lib/utils";
import { useEffect } from "react";
import { BackButton } from "@/components/ui/BackButton";

const linkIcon = {
  github: Github,
  marketplace: Store,
  live: ExternalLink,
};

export const ProjectDetail = ({ isModal }: { isModal?: boolean }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const project = slug ? getProject(slug) : undefined;

  useEffect(() => {
    if (isModal) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isModal]);

  if (!project) return <NotFound />;

  const group = projectGroups.find((candidate) => candidate.id === project.group);
  const projectIndex = projects.findIndex((candidate) => candidate.slug === project.slug);
  const nextProject = projects[projectIndex + 1] ?? projects[0];

  const content = (
    <div className="page-shell page-shell--case-study">
      <BackButton />

      <section className="case-study-hero" aria-labelledby="case-study-title">
        <div className="case-study-hero__copy">
          <p className="eyebrow">{group?.title ?? "Project"}</p>
          <h1 id="case-study-title">{project.name}</h1>
          <p className="case-study-hero__category">{project.category}</p>
          <p className="case-study-hero__overview">{project.overview}</p>
        </div>
        <aside className="case-study-facts" aria-label={`${project.name} project facts`}>
          <div>
            <span>Role</span>
            <strong>{project.role}</strong>
          </div>
          {project.client && (
            <div>
              <span>Client</span>
              <strong>{project.client}</strong>
            </div>
          )}
          {project.metric && (
            <div>
              <span>People using it</span>
              <strong>{project.metric.value}</strong>
              <small>{project.metric.label}</small>
            </div>
          )}
          {project.status && (
            <div>
              <span>Status</span>
              <strong>{project.status}</strong>
            </div>
          )}
        </aside>
      </section>

      <section className="case-study-section case-study-section--evidence" aria-labelledby="evidence-title">
        <div className="case-study-section__heading">
          <p className="eyebrow">My work</p>
          <h2 id="evidence-title">What I built.</h2>
        </div>
        <ol className="case-evidence">
          {project.impact.map((item, index) => (
            <li key={item}>
              <span>{formatIndex(index + 1)}</span>
              <p>{item}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="case-study-section case-study-section--architecture" aria-labelledby="architecture-title">
        <div className="case-study-section__heading">
          <p className="eyebrow">How it works</p>
          <h2 id="architecture-title">The main steps.</h2>
        </div>
        <div className="system-map" aria-label={`${project.name} main steps`}>
          {project.architecture.map((step, index) => (
            <div className="system-map__step" key={step}>
              <span>{formatIndex(index + 1)}</span>
              <p>{step}</p>
              {index < project.architecture.length - 1 && <ArrowRight className="system-map__arrow" size={18} aria-hidden="true" />}
            </div>
          ))}
        </div>
      </section>

      <div className="case-study-columns">
        <section className="case-study-section" aria-labelledby="features-title">
          <div className="case-study-section__heading">
            <p className="eyebrow">Main features</p>
            <h2 id="features-title">What it can do.</h2>
          </div>
          <ul className="feature-list">
            {project.features.map((feature) => (
              <li key={feature}>
                <Check size={17} aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="case-study-section" aria-labelledby="stack-title">
          <div className="case-study-section__heading">
            <p className="eyebrow">Tools used</p>
            <h2 id="stack-title">Built with.</h2>
          </div>
          <div className="stack-cloud">
            {project.stack.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
          {project.links.length > 0 ? (
            <div className="project-links" aria-label={`${project.name} links`}>
              {project.links.map((link) => {
                const Icon = linkIcon[link.type];
                return (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                    <Icon size={17} aria-hidden="true" />
                    <span>{link.label}</span>
                    <AnimatedIcon animationData={arrowUpAnimation} loop size={16} className="rotate-45" />
                  </a>
                );
              })}
            </div>
          ) : (
            <p className="private-note">
              <Layers3 size={17} aria-hidden="true" />
              The code for this project is private.
            </p>
          )}
        </section>
      </div>

      <section className="case-study-next" aria-label="Next project">
        <p className="eyebrow">Next project</p>
        <Link to={`/projects/${nextProject.slug}`} state={isModal ? location.state : undefined}>
          <span>{nextProject.name}</span>
          <AnimatedIcon animationData={chevronRightAnimation} loop size={24} />
        </Link>
      </section>
    </div>
  );

  if (isModal) {
    return (
      <div 
        className="bottom-sheet-overlay" 
        onClick={() => navigate(-1)}
        role="dialog"
        aria-modal="true"
      >
        <div 
          className="bottom-sheet-content" 
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bottom-sheet-header">
            <div className="bottom-sheet-grabber" />
            <button className="bottom-sheet-close" onClick={() => navigate(-1)} aria-label="Close project">
              <X size={20} />
            </button>
          </div>
          <div className="bottom-sheet-body">
            {content}
          </div>
        </div>
      </div>
    );
  }

  return content;
};

export default ProjectDetail;
