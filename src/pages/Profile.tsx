import { GraduationCap, Layers3 } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedIcon } from "@/components/portfolio/AnimatedIcon";
import folderAnimation from "@/assets/animations/folder.json";
import starAnimation from "@/assets/animations/star.json";
import arrowUpAnimation from "@/assets/animations/arrow-up.json";
import arrowDownAnimation from "@/assets/animations/arrow-down.json";
import { portfolioData } from "@/types/portfolio";
import { formatIndex, generateId } from "@/lib/utils";
import { FadeIn } from "@/components/ui/FadeIn";


const SKILL_SLUG_MAP: Record<string, string> = {
  "Python": "python",
  "TypeScript/JavaScript": "typescript",
  "Dart": "dart",
  "C/C++": "cplusplus",
  "SQL": "postgresql",
  "Bash": "gnubash",
  "TensorFlow": "tensorflow",
  "OpenCV": "opencv",
  "LangChain": "langchain",
  "LangGraph": "langchain",
  "Gemini API": "googlegemini",
  "Claude Code": "anthropic",
  "GitHub Copilot": "githubcopilot",
  "React.js": "react",
  "Next.js": "nextdotjs",
  "Flutter": "flutter",
  "Tailwind CSS": "tailwindcss",
  "Redux": "redux",
  "Node.js": "nodedotjs",
  "Express.js": "express",
  "Flask": "flask",
  "JWT": "jsonwebtokens",
  "PostgreSQL": "postgresql",
  "Prisma": "prisma",
  "SQLAlchemy": "sqlalchemy",
  "MongoDB": "mongodb",
  "Firebase": "firebase",
  "Supabase": "supabase",
  "Vector DBs (Pinecone, Milvus)": "pinecone",
  "AWS (EC2/S3)": "amazonwebservices",
  "Docker": "docker",
  "Git": "git",
  "GitHub Actions": "githubactions",
  "Linux": "linux",
  "Postman": "postman",
};

const Profile = () => {

  return (
    <div className="page-shell page-shell--profile">
      <section className="page-intro" aria-labelledby="profile-title">
        <p className="eyebrow">About me</p>
        <h1 id="profile-title">The experience behind my work.</h1>
        <p>{portfolioData.summary}</p>
      </section>

      <FadeIn delay={0.1}>
      <section className="profile-section profile-section--experience" aria-labelledby="experience-title">
        <div className="profile-section__heading">
          <AnimatedIcon animationData={folderAnimation} boomerang speed={0.5} size={26} />
          <div>
            <p className="eyebrow">Experience</p>
            <h2 id="experience-title">Where I've worked.</h2>
          </div>
        </div>
        <div className="profile-section__items" style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
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
      </FadeIn>

      <FadeIn delay={0.1}>
      <section className="profile-section profile-section--education" aria-labelledby="education-title">
        <div className="profile-section__heading">
          <GraduationCap size={20} aria-hidden="true" />
          <div>
            <p className="eyebrow">Education</p>
            <h2 id="education-title">Where I've studied.</h2>
          </div>
        </div>
        <div className="profile-section__items" style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
          {portfolioData.education.map((education) => (
            <div key={education.institution}>
              <h3 style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}>{education.institution}</h3>
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
      </FadeIn>

      <FadeIn delay={0.1}>
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
                {group.skills.map((skill) => {
                  const slug = SKILL_SLUG_MAP[skill];
                  return (
                    <li key={skill} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {slug && <img src={`https://cdn.simpleicons.org/${slug}/16221b`} alt={`${skill} icon`} style={{ width: '16px', height: '16px' }} />}
                      {skill}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </section>
      </FadeIn>

      <FadeIn delay={0.1}>
      <section className="profile-section profile-section--honors" aria-labelledby="honors-title">
        <div className="profile-section__heading">
          <AnimatedIcon animationData={starAnimation} boomerang speed={0.5} size={26} />
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
      </FadeIn>

      <FadeIn delay={0.2}>
      <section className="profile-next-step" aria-label="Explore project work or resume">
        <div>
          <p className="eyebrow">Next</p>
          <h2>Explore my work or download my resume.</h2>
        </div>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "12px" }}>
          <a className="button button--secondary" href={portfolioData.contact.resume} download>
            Download Resume <AnimatedIcon animationData={arrowDownAnimation} loop size={20} />
          </a>
          <Link className="button button--primary" to="/work#featured-work">
            View projects <AnimatedIcon animationData={arrowUpAnimation} loop size={20} invertColors className="rotate-45" />
          </Link>
        </div>
      </section>
      </FadeIn>
    </div>
  );
};

export default Profile;
