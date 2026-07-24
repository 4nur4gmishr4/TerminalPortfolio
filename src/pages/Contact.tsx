import { Phone, Send } from "lucide-react";
import { AnimatedIcon } from "@/components/portfolio/AnimatedIcon";
import arrowUpAnimation from "@/assets/animations/arrow-up.json";
import mailAnimation from "@/assets/animations/mail.json";
import githubAnimation from "@/assets/animations/github.json";
import linkedinAnimation from "@/assets/animations/linkedin.json";
import { portfolioData } from "@/types/portfolio";

import { BackButton } from "@/components/ui/BackButton";

const Contact = () => {

  return (
    <div className="page-shell page-shell--contact">
      <BackButton />
      <section className="page-intro" aria-labelledby="contact-title">
        <p className="eyebrow">Contact</p>
        <h1 id="contact-title">Let's talk.</h1>
        <p>Have a project or a question? Send a message using the option that works best for you.</p>
      </section>

      <div className="contact-layout">
        <section className="contact-channels" aria-labelledby="channels-title">
          <div className="contact-channels__heading">
            <p className="eyebrow">Direct channels</p>
            <h2 id="channels-title">Pick a way to reach me.</h2>
          </div>
          <a href={`mailto:${portfolioData.contact.email}`}>
            <AnimatedIcon animationData={mailAnimation} loop speed={0.5} size={24} />
            <span>
              <strong>Email</strong>
              <small>{portfolioData.contact.email}</small>
            </span>
            <AnimatedIcon animationData={arrowUpAnimation} loop size={17} className="rotate-45" />
          </a>
          <a href={`tel:${portfolioData.contact.phone.replace(/\s/g, "")}`}>
            <Phone size={20} aria-hidden="true" />
            <span>
              <strong>Phone</strong>
              <small>{portfolioData.contact.phone}</small>
            </span>
            <AnimatedIcon animationData={arrowUpAnimation} loop size={17} className="rotate-45" />
          </a>
          <a href={portfolioData.contact.linkedin} target="_blank" rel="noreferrer">
            <AnimatedIcon animationData={linkedinAnimation} loop speed={0.5} size={24} />
            <span>
              <strong>LinkedIn</strong>
              <small>linkedin.com/in/4nur4gmishra</small>
            </span>
            <AnimatedIcon animationData={arrowUpAnimation} loop size={17} className="rotate-45" />
          </a>
          <a href={portfolioData.contact.github} target="_blank" rel="noreferrer">
            <AnimatedIcon animationData={githubAnimation} loop speed={0.5} size={24} />
            <span>
              <strong>GitHub</strong>
              <small>github.com/4nur4gmishr4</small>
            </span>
            <AnimatedIcon animationData={arrowUpAnimation} loop size={17} className="rotate-45" />
          </a>
        </section>

        <section className="contact-form-section" id="message" aria-labelledby="message-title">
          <div>
            <p className="eyebrow">Send a message</p>
            <h2 id="message-title">Tell me about it.</h2>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <p>Click the button below to open your default email client and start a conversation.</p>
            <div className="contact-form__submit-row" style={{ marginTop: "1.5rem" }}>
              <a href={`mailto:${portfolioData.contact.email}`} className="button button--primary">
                Open email client <Send size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
