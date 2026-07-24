import { GraduationCap, Layers3 } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedIcon } from "@/components/portfolio/AnimatedIcon";
import folderAnimation from "@/assets/animations/folder.json";
import starAnimation from "@/assets/animations/star.json";
import arrowUpAnimation from "@/assets/animations/arrow-up.json";
import { portfolioData } from "@/types/portfolio";
import { formatIndex, generateId } from "@/lib/utils";

import { BackButton } from "@/components/ui/BackButton";

const Profile = () => {

  return (
    <div className="page-shell page-shell--profile">
      <BackButton />
      <section className="page-intro" aria-labelledby="profile-title">
        <p className="eyebrow">About me</p>
        <h1 id="profile-title">The experience behind my work.</h1>
        <p>{portfolioData.summary}</p>
      </section>

      <section className="profile-section profile-section--experience" aria-labelledby="experience-title">
        <div className="profile-section__heading">
          <AnimatedIcon animationData={folderAnimation} loop speed={0.5} size={26} />
          <div>
            <p className="eyebrow">Experience</p>
            <h2 id="experience-title">Where I've worked.</h2>
          </div>
        </div>
        <div className="profile-section__items" style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
          {portfolioData.experience.map((experience) => (
            <div key={experience.company}>
              <div className="profile-role-line" style={{ marginBottom: "16px" }}>
                <strong>{experience.role}</strong>
                <span>{experience.company}</span>
                <span>{experience.location}</span>
                <span>{experience.duration}</span>
              </div>
              <ul className="evidence-list evidence-list--large">
                {experience.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="profile-section profile-section--education" aria-labelledby="education-title">
        <div className="profile-section__heading">
          <GraduationCap size={20} aria-hidden="true" />
          <div>
            <p className="eyebrow">Education</p>
            <h2 id="education-title">Where I've studied.</h2>
          </div>
        </div>
        <div className="profile-section__items" style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
          {portfolioData.education.map((education) => (
            <div key={education.institution}>
              <h3 style={{ marginBottom: "16px", fontSize: "16px", fontFamily: "JetBrains Mono, monospace" }}>{education.institution}</h3>
              <div className="profile-education-grid">
                <p>{education.degree}</p>
                <dl>
                  <div>
                    <dt>Location</dt>
                    <dd>{education.location}</dd>
                  </div>
                  {education.credential && (
                    <div>
                      <dt>Academic record</dt>
                      <dd>{education.credential}</dd>
                    </div>
                  )}
                  <div>
                    <dt>Completion</dt>
                    <dd>{education.completion}</dd>
                  </div>
                </dl>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="profile-section profile-section--skills" aria-labelledby="skills-title">
        <div className="profile-section__heading">
          <Layers3 size={20} aria-hidden="true" />
          <div>
            <p className="eyebrow">Skills</p>
            <h2 id="skills-title">Tools I use to build software.</h2>
          </div>
        </div>
        <div className="skills-matrix">
          {portfolioData.skills.map((group) => (
            <section key={group.name} className="skills-matrix__row" aria-labelledby={`${generateId(group.name)}-skills`}>
              <h3 id={`${generateId(group.name)}-skills`}>{group.name}</h3>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section className="profile-section profile-section--honors" aria-labelledby="honors-title">
        <div className="profile-section__heading">
          <AnimatedIcon animationData={starAnimation} loop speed={0.5} size={26} />
          <div>
            <p className="eyebrow">Highlights</p>
            <h2 id="honors-title">A few things I am proud of.</h2>
          </div>
        </div>
        <ol className="honors-list">
          {portfolioData.honors.map((honor, index) => (
            <li key={honor}>
              <span>{formatIndex(index + 1)}</span>
              <p>{honor}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="profile-section profile-section--articles" aria-labelledby="articles-title">
        <div className="profile-section__heading">
          <Layers3 size={20} aria-hidden="true" />
          <div>
            <p className="eyebrow">Writing</p>
            <h2 id="articles-title">Technical Writing & Blogs.</h2>
          </div>
        </div>
        <div className="profile-section__items" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {portfolioData.articles?.map((article) => (
            <a 
              key={article.title} 
              href={article.url} 
              target="_blank" 
              rel="noreferrer"
              className="article-link-card"
              style={{ display: 'block', textDecoration: 'none', color: 'inherit', padding: '16px', border: '1px solid var(--line)', borderRadius: 'var(--radius-xs)', transition: 'background-color 0.2s' }}
            >
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>{article.title}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--muted)' }}>
                <span>{article.platform}</span>
                <span>{article.date}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="profile-next-step" aria-label="Explore project work or resume">
        <div>
          <p className="eyebrow">Next</p>
          <h2>Explore my work or download my resume.</h2>
        </div>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "24px" }}>
          <a className="button button--secondary" href={portfolioData.contact.resume} download>
            Download Resume <AnimatedIcon animationData={arrowUpAnimation} loop size={20} className="rotate-90" />
          </a>
          <Link className="button button--primary" to="/work#featured-work">
            View projects <AnimatedIcon animationData={arrowUpAnimation} loop size={20} invertColors className="rotate-45" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Profile;
