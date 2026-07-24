import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatedIcon } from "@/components/portfolio/AnimatedIcon";
import arrowUpAnimation from "@/assets/animations/arrow-up.json";
import arrowDownAnimation from "@/assets/animations/arrow-down.json";
import mailAnimation from "@/assets/animations/mail.json";
import { CommandConsole } from "@/components/portfolio/CommandConsole";
import { TypingReveal } from "@/components/portfolio/TypingReveal";
import Carousel from "@/components/ui/Carousel";
import { getProjectsByGroup, portfolioData, type Project } from "@/types/portfolio";
import nullSecretLogo from "@/assets/null-secrets-logo.json";

const featuredProjects = getProjectsByGroup("featured");
const headline = "Useful software, built carefully.";

const Index = () => {
  const [carouselWidth, setCarouselWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth - 48 : 1200
  );

  useEffect(() => {
    let timeout: number;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        setCarouselWidth(window.innerWidth - 48);
      }, 150);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="page-shell home-page-shell">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero__copy">
          <p className="eyebrow">Applied AI & Backend Engineer • India</p>
          <h1 id="home-title">
            <span className="sr-only">{headline}</span>
            <TypingReveal text={headline} />
          </h1>
          <p className="home-hero__summary">{portfolioData.summary}</p>
          <div className="page-actions" style={{ flexWrap: 'wrap' }}>
            <Link className="button button--primary" to="/work#featured-work">
              See my work <AnimatedIcon animationData={arrowDownAnimation} loop size={20} invertColors className="-rotate-45" />
            </Link>
            <Link className="button button--secondary" to="/contact#message">
              Get in touch <AnimatedIcon animationData={arrowUpAnimation} loop size={20} className="rotate-45" />
            </Link>
            <a className="button button--secondary" href={portfolioData.contact.resume} download>
              Download Resume <AnimatedIcon animationData={arrowDownAnimation} loop size={20} />
            </a>
          </div>
        </div>

        <aside className="impact-ledger" aria-label="Impact at a glance">
          <div className="impact-ledger__header">
            <span>At a glance</span>
            <span>2026</span>
          </div>
          <div className="impact-ledger__metrics">
            {portfolioData.metrics.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
          <div className="impact-ledger__footer">
            <span>Focus</span>
            <p>Web tools, backend services, and useful automation.</p>
          </div>
        </aside>
      </section>

      <section className="content-section" aria-labelledby="selected-work-title">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 id="selected-work-title">A few projects to start with.</h2>
          </div>
          <Link className="text-link" to="/work#featured-work">
            View all projects <AnimatedIcon animationData={arrowUpAnimation} loop size={18} className="rotate-45" />
          </Link>
        </div>
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Carousel
            items={featuredProjects.map((project: Project) => ({
              title: project.name,
              description: project.overview,
              id: project.slug,
              tags: project.stack,
              role: project.role,
              logoUrl: project.logo,
              logoNode: project.slug === 'null-secret' ? <AnimatedIcon animationData={nullSecretLogo} loop size="100%" /> : undefined,
              client: project.client,
              status: project.status,
              metric: project.metric,
              impact: project.impact?.slice(0, 2),
              category: project.category,
              arrowIcon: <AnimatedIcon animationData={arrowUpAnimation} loop size={16} className="rotate-45" />
            }))}
            baseWidth={carouselWidth}
            autoplay={true}
            autoplayDelay={3000}
            pauseOnHover={true}
            loop={true}
            round={false}
          />
        </div>
      </section>

      <section className="content-section console-section" aria-labelledby="console-title">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">Quick links</p>
            <h2 id="console-title">Use a short command to move around.</h2>
          </div>
          <p className="section-aside">You can use these quick links, or simply use the menu.</p>
        </div>
        <CommandConsole />
      </section>

      <section className="contact-band" aria-labelledby="contact-band-title">
        <div>
          <p className="eyebrow">Want to work together?</p>
          <h2 id="contact-band-title">Let's talk about your next project.</h2>
        </div>
        <a className="contact-band__email" href={`mailto:${portfolioData.contact.email}`}>
          <AnimatedIcon animationData={mailAnimation} loop speed={0.5} size={24} />
          <span>{portfolioData.contact.email}</span>
          <AnimatedIcon animationData={arrowUpAnimation} loop size={24} className="rotate-45" />
        </a>
      </section>
    </div>
  );
};

export default Index;
