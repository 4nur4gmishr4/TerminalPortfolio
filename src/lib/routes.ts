import { Command, Mail, UserRound, Workflow, Github } from "lucide-react";
import { portfolioData } from "@/types/portfolio";

export const siteRoutes = [
  { id: "overview", label: "Home", shortLabel: "Home", detail: "A quick introduction", icon: Command, path: "/", end: true },
  { id: "work", label: "Projects", shortLabel: "Projects", detail: "All the work I have built", icon: Workflow, path: "/work" },
  { id: "profile", label: "About me", shortLabel: "About me", detail: "Experience, skills, education, and highlights", icon: UserRound, path: "/profile" },
  { id: "contact", label: "Contact", shortLabel: "Contact", detail: "Send me a message", icon: Mail, path: "/contact" },
  { id: "github", label: "GitHub profile", shortLabel: "GitHub", detail: "Open github.com", icon: Github, href: portfolioData.contact.github },
];
