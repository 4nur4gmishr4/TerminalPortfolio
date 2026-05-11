// ── TerminalBay Portfolio Data ──
// Source of truth for all resume content displayed across the application.
// Update this file to change any personal info, projects, skills, etc.

export interface Education {
  institution: string;
  location: string;
  degree: string;
  years: string;
  gpa?: string;
  percentage?: string;
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  duration: string;
  highlights: string[];
}

export interface Project {
  name: string;
  description: string;
  tech: string[];
  highlights: string[];
  github?: string;
  live?: string;
  stats?: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  contact: {
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    website: string;
  };
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Record<string, string[]>;
  achievements: string[];
}

export const portfolioData: PortfolioData = {
  name: "Anurag Mishra",
  title: "Full-Stack & AI Engineer",
  bio: "Full-stack and AI engineer focused on developer tooling, secure systems, and scalable end-to-end applications. Experienced in building platforms serving 17,000+ users, with hands-on experience in LLM integration, backend systems, and predictive machine learning pipelines.",

  contact: {
    email: "anuragmishrasnag06082004@gmail.com",
    phone: "+91 9302786886",
    github: "https://github.com/4nur4gmishr4",
    linkedin: "https://www.linkedin.com/in/4nur4gmishra/",
    website: "https://anuragsterminalbay.vercel.app/",
  },

  education: [
    {
      institution: "Gyan Ganga Institute of Technology and Sciences",
      location: "Jabalpur, MP",
      degree: "B.Tech. in Computer Science & Engineering (AI & ML)",
      years: "2022 — 2026",
    },
    {
      institution: "Sarvodaya English Higher Secondary School",
      location: "Lakhnadon, MP",
      degree: "Class XII",
      years: "Graduated 2022",
      percentage: "84.00%",
    },
    {
      institution: "Sarvodaya English Higher Secondary School",
      location: "Lakhnadon, MP",
      degree: "Class X",
      years: "Graduated 2020",
      percentage: "83.33%",
    },
  ],

  experience: [
    {
      company: "Prominent Digitech Solution & Associates",
      role: "Automation and Full-Stack Development Intern",
      location: "Remote",
      duration: "Dec 2024 — Present",
      highlights: [
        "Designed and deployed context-aware customer support chatbots using Node.js and REST APIs, automating responses for e-commerce and digital platforms, processing 500+ daily queries, and reducing CRM resolution time by 35%.",
        "Optimized React.js client web interfaces by implementing efficient state management and asset delivery, reducing page load latency by over 20% to improve frontend performance and user retention for 1,000+ monthly active visitors.",
      ],
    },
  ],

  projects: [
    {
      name: "Fahh",
      description: "VS Code Extension — Real-time error detection and LLM-powered debugging assistance",
      tech: ["TypeScript", "AST Parsing", "LLMs", "VS Code API", "Node.js"],
      highlights: [
        "Built a TypeScript-based VS Code extension for real-time error detection and LLM-powered debugging assistance, achieving 15,400+ downloads.",
        "Implemented an API pipeline to analyze runtime errors and generate contextual debugging suggestions for developers.",
      ],
      github: "https://github.com/4nur4gmishr4/vscode-fahh-Extension",
      live: "https://marketplace.visualstudio.com/items?itemName=4nur4gmishr4.fahh",
      stats: "15,400+ installs",
    },
    {
      name: "Null-Secret",
      description: "Secure Data Exchange — End-to-end encrypted, time-bound secret sharing platform",
      tech: ["Node.js", "Cryptography", "React", "REST APIs"],
      highlights: [
        "Engineered an end-to-end encrypted platform for secure, time-bound secret sharing utilized by 1,600+ users.",
        "Implemented client-side encryption with direct-to-device OTP retrieval, eliminating server-side plaintext exposure.",
      ],
      github: "https://github.com/4nur4gmishr4/Null-Secret",
      live: "https://null-secret.vercel.app/",
      stats: "1,600+ users",
    },
    {
      name: "AarogyaJal",
      description: "Smart Water Monitor — Real-time water quality monitoring with ML classification",
      tech: ["Python", "TensorFlow", "React Native", "IoT"],
      highlights: [
        "Built a real-time water quality monitoring platform integrating IoT sensors and machine learning classification for disease risk prediction.",
        "Applied predictive modeling techniques to evaluate environmental data, achieving 88.9% disease risk prediction accuracy.",
      ],
      github: "https://github.com/4nur4gmishr4/AarogyaJal",
      stats: "88.9% accuracy",
    },
    {
      name: "Calcura",
      description: "Math Solver & Calculator — Cross-platform handwritten expression recognition",
      tech: ["Flutter", "Dart", "OpenCV"],
      highlights: [
        "Developed a cross-platform mobile application implementing OpenCV-based preprocessing pipelines to recognize and solve handwritten expressions.",
        "Developed an algorithmic engine in Dart to parse, evaluate, and visualize multi-step algebraic expressions without external solver APIs.",
      ],
      github: "https://github.com/4nur4gmishr4/Calcura",
    },
  ],

  skills: {
    "Languages": ["Python", "JavaScript", "TypeScript", "Dart", "C/C++", "SQL", "Bash/Shell"],
    "AI & Machine Learning": ["TensorFlow", "OpenCV", "LangChain", "LangGraph", "Gemini API"],
    "Frontend & Mobile": ["React.js", "Next.js", "Flutter", "HTML/CSS"],
    "Backend & Infrastructure": ["Node.js", "Express.js", "REST APIs", "JWT Auth", "PostgreSQL", "MongoDB", "Firebase", "Supabase"],
    "Cloud & Tools": ["Docker", "AWS", "Linux", "Postman"],
  },

  achievements: [
    "Finalist (4th Place), Delhi Nexify Hackathon — Designed and pitched the WiseBill AI financial advisor architecture against a highly competitive pool of developers.",
    "Published a developer tool on the VS Code Marketplace, reaching 15,400+ installs organically with zero marketing spend.",
  ],
};
