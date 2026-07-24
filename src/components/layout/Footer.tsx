import { AnimatedIcon } from "@/components/portfolio/AnimatedIcon";
import arrowUpAnimation from "@/assets/animations/arrow-up.json";
import { Link } from "react-router-dom";
import { portfolioData } from "@/types/portfolio";

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p>
          <span>{new Date().getFullYear()}</span> Anurag Mishra
        </p>
        <p>Projects by Anurag Mishra.</p>
        <div className="site-footer__links">
          <a href={portfolioData.contact.github} target="_blank" rel="noreferrer">
            GitHub <AnimatedIcon animationData={arrowUpAnimation} loop size={14} className="rotate-45" />
          </a>
          <a href={portfolioData.contact.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <AnimatedIcon animationData={arrowUpAnimation} loop size={14} className="rotate-45" />
          </a>
          <Link to="/contact#message">Contact</Link>
        </div>
      </div>
    </footer>
  );
};
