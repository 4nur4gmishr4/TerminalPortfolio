export type ProjectGroupId = "featured" | "client" | "engineering";

export interface Metric {
  value: string;
  label: string;
}

export interface ProfileLink {
  label: string;
  href: string;
}

export interface Education {
  institution: string;
  location: string;
  degree: string;
  credential: string;
  completion: string;
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  duration: string;
  highlights: string[];
}

export interface SkillGroup {
  name: string;
  skills: string[];
}

export interface ProjectLink {
  label: string;
  href: string;
  type: "github" | "marketplace" | "live";
}

export interface Project {
  slug: string;
  name: string;
  group: ProjectGroupId;
  category: string;
  overview: string;
  role: string;
  client?: string;
  status?: string;
  metric?: Metric;
  impact: string[];
  features: string[];
  stack: string[];
  architecture: string[];
  links: ProjectLink[];
}

export interface ProjectGroup {
  id: ProjectGroupId;
  title: string;
  description: string;
}

export const projectGroups: ProjectGroup[] = [
  {
    id: "featured",
    title: "Featured work",
    description: "The projects that best show how I build useful software.",
  },
  {
    id: "client",
    title: "Client work",
    description: "Work made for real businesses and their day-to-day needs.",
  },
  {
    id: "engineering",
    title: "More projects",
    description: "Projects across web, mobile, data, and connected devices.",
  },
];

export const portfolioData = {
  name: "Anurag Mishra",
  title: "Applied AI & Backend Engineer",
  summary:
    "Product-focused Full-Stack Developer with experience in developer tooling and AI-integrated applications. Successfully built and deployed platforms reaching 21,700+ cumulative users and downloads across developer tooling and web applications. Proficient in scalable backend architecture, LLM-based orchestration, and machine learning pipelines with a focus on delivering high-impact, production-ready software.",
  contact: {
    phone: "+91 9302786886",
    email: "anuragmishrasnag06082004@gmail.com",
    linkedin: "https://www.linkedin.com/in/4nur4gmishra",
    github: "https://github.com/4nur4gmishr4",
    website: "https://anuragsterminalbay.vercel.app",
  },
  metrics: [
    { value: "21,700+", label: "cumulative users and downloads" },
    { value: "500+", label: "daily API requests handled" },
    { value: "35%", label: "faster support replies" },
  ] satisfies Metric[],
  education: [
    {
      institution: "Gyan Ganga Institute of Technology and Sciences",
      location: "Jabalpur, MP",
      degree: "B.Tech. in Computer Science & Engineering (AI & ML)",
      credential: "CGPA: 7.94",
      completion: "Graduated May 2026",
    },
    {
      institution: "Sarvodaya English Higher Secondary School",
      location: "Lakhnadon, MP",
      degree: "Class XII (84.00%) & Class X (83.33%)",
      credential: "",
      completion: "Graduated 2022",
    }
  ] satisfies Education[],
  experience: [
    {
      company: "Prominent Digitech Solution & Associates",
      role: "Full-Stack Development Intern",
      location: "Remote",
      duration: "Dec 2024 - May 2026",
      highlights: [
        "Architected and deployed highly available Node.js backend services, owning feature delivery, relational schema design, and SQL optimization to support 500+ daily API requests with sub-second latency.",
        "Developed context-aware automation workflows using Node.js and REST APIs to streamline customer interactions for digital platforms, processing 500+ daily queries and contributing to a 35% reduction in customer support turnaround time.",
        "Refactored React.js frontend components to optimize state management and asset delivery, reducing page load latency by over 20% for 1,000+ monthly active users (MAU).",
        "Maintained production applications and executed continuous CI/CD deployments, systematically leveraging Claude Code & GitHub Copilot to rapidly debug logs and ensure high system reliability."
      ],
    },
  ] satisfies Experience[],
  skills: [
    { name: "Languages", skills: ["Python", "TypeScript/JavaScript", "Dart", "C/C++", "SQL", "Bash"] },
    { name: "AI & Machine Learning", skills: ["TensorFlow", "OpenCV", "LangChain", "LangGraph", "Gemini API", "Claude Code", "GitHub Copilot", "RAG Architecture", "vLLM", "Agent Orchestration"] },
    { name: "Frontend & Mobile", skills: ["React.js", "Next.js", "Flutter", "Tailwind CSS", "Redux"] },
    {
      name: "Backend & Core",
      skills: ["Node.js", "Express.js", "Flask", "REST APIs", "OAuth 2.0", "JWT", "Microservices", "OOP"],
    },
    {
      name: "Databases",
      skills: ["PostgreSQL", "Prisma", "SQLAlchemy", "MongoDB", "Firebase", "Supabase", "Vector DBs (Pinecone, Milvus)"],
    },
    {
      name: "Cloud & DevOps",
      skills: ["AWS (EC2/S3)", "Docker", "Git", "GitHub Actions", "Linux", "CI/CD", "Postman"],
    },
  ] satisfies SkillGroup[],
  honors: [
    "Developer Tool Author: Architected and continuously maintained an open-source VS Code extension, driving a combined reach of 21,700+ cumulative users/downloads across software projects.",
    "Finalist (4th Place), Delhi Nexify Hackathon: Architected an AI-driven financial advisor prototype, competing against 100+ teams from across India.",
  ],
  links: [
    { label: "GitHub", href: "https://github.com/4nur4gmishr4" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/4nur4gmishra" },
    { label: "Portfolio", href: "https://anuragsterminalbay.vercel.app" },
  ] satisfies ProfileLink[],
};

export const projects: Project[] = [
  {
    slug: "faultline",
    name: "FaultLine",
    group: "featured",
    category: "Intelligent Developer Tooling",
    overview:
      "An intelligent VS Code extension that intercepts failed terminal commands, diagnosing errors and suggesting actionable fixes in real-time.",
    role: "Built and maintained by me",
    metric: { value: "20,200+", label: "downloads" },
    impact: [
      "Engineered a developer tool reaching 20,200+ downloads that combines custom audio alerts with Abstract Syntax Tree (AST) parsing for real-time error detection.",
      "Integrated an LLM-powered popup interface that instantly explains runtime errors and provides step-by-step resolution code, serving as a comprehensive debugging assistant for developers of all skill levels.",
      "Implemented a gamification engine to track runtime error counts and manage daily resolution limits, enhancing continuous developer engagement."
    ],
    features: [
      "Find failed terminal commands and tasks",
      "Explain errors in plain language",
      "Read code structure to give better help",
      "Choose from several code helpers",
      "Hide secrets before sending error details",
      "Desktop and sound alerts",
      "Jira and webhook connections",
      "Status bar updates",
      "VS Code Marketplace release",
    ],
    stack: [
      "TypeScript",
      "VS Code Extension API",
      "Node.js",
      "AST Parsing",
      "GitHub Actions",
      "GitHub Copilot",
      "OpenAI",
      "Gemini",
      "Anthropic",
      "Groq",
      "OpenRouter",
      "REST APIs",
    ],
    architecture: ["VS Code", "Find the failed command or code error", "Choose a code helper", "Show a clear next step"],
    links: [
      { label: "GitHub", href: "https://github.com/4nur4gmishr4/vscode-faultline-Extension", type: "github" },
      { label: "Marketplace", href: "https://marketplace.visualstudio.com/items?itemName=4nur4gmishr4.faultline", type: "marketplace" },
      { label: "Product site source", href: "https://github.com/4nur4gmishr4/Faultline.site", type: "github" },
    ],
  },
  {
    slug: "pegasus",
    name: "Pegasus",
    group: "featured",
    category: "Autonomous Agent Orchestrator",
    overview:
      "An advanced CLI tool that autonomously breaks down complex objectives into sequential tasks, dynamically delegating work to optimal LLM agents.",
    role: "Built by me",
    status: "Private work in progress",
    impact: [
      "Engineering a fault-tolerant multi-agent orchestration platform designed to translate high-level user objectives into deterministic execution plans across multiple foundational LLMs.",
      "Constructing a unified CLI adapter to intelligently delegate atomic subtasks (Claude, Gemini), enforcing continuous execution, context-retention, and iterative refinement loops."
    ],
    features: [
      "Break a goal into steps",
      "Plan tasks in order",
      "Run tasks from the command line",
      "Keep the task history",
      "Pick a model for each task",
      "Run the next step automatically",
      "Try failed steps again",
      "Add plugins",
    ],
    stack: ["Python", "FastAPI", "AsyncIO", "LLM APIs", "CLI", "Docker", "LangGraph", "LangChain"],
    architecture: ["Goal", "Task plan", "Choose a model", "Run and remember the result"],
    links: [{ label: "GitHub (private)", href: "https://github.com/4nur4gmishr4/Pegasus", type: "github" }],
  },
  {
    slug: "null-secret",
    name: "Null-Secret",
    group: "featured",
    category: "Secure link sharing app",
    overview:
      "A sharing app that locks a message in the browser before it is sent. The server does not receive the readable message or its key.",
    role: "Built by me",
    metric: { value: "1,500+", label: "users" },
    impact: [
      "Designed a zero-trust Node.js and Prisma backend supporting 1,500+ users, implementing end-to-end zero-knowledge encrypted storage and automated OTP validation mechanisms.",
      "Orchestrated a resilient CI/CD pipeline via GitHub Actions to autonomously ship feature updates, critical security patches, and scheduled database expirations directly to live production.",
      "Implemented client-side AES-256 encryption with a direct-to-device OTP access mechanism to ensure zero-knowledge server storage."
    ],
    features: [
      "Lock a message before it is sent",
      "AES-256-GCM encryption",
      "One-time secret links",
      "Links that delete themselves",
      "File attachments",
      "One-time password check",
      "Sign in and view past links",
      "Automatic expiry and Docker deployment",
    ],
    stack: [
      "Node.js",
      "Prisma",
      "PostgreSQL",
      "Web Crypto API",
      "GitHub Actions",
      "Docker",
    ],
    architecture: ["Lock the message in the browser", "Store only locked data", "Check the one-time code", "Delete the link on time"],
    links: [
      { label: "GitHub", href: "https://github.com/4nur4gmishr4/Null-Secret", type: "github" },
      { label: "Live product", href: "https://null-secret.vercel.app", type: "live" },
    ],
  },
  {
    slug: "smart-money",
    name: "Smart Money",
    group: "featured",
    category: "Personal finance app",
    overview:
      "A personal finance app that helps people track spending and get simple financial summaries.",
    role: "Backend and smart summaries",
    status: "Private project",
    impact: [
      "Engineered a high-throughput financial backend utilizing Flask, PostgreSQL, and SQLAlchemy for robust real-time market data ingestion and secure user authentication flows.",
      "Integrated the Gemini API to synthesize personalized financial analytics and deployed the containerized microservice architecture using production-grade Docker workflows."
    ],
    features: [
      "Expense tracking",
      "Simple spending summaries",
      "Investment notes",
      "Read receipts with a camera",
      "Read bank SMS messages",
      "Investment analysis",
      "Sign in",
      "Spending dashboard",
    ],
    stack: ["Flask", "Python", "PostgreSQL", "SQLAlchemy", "Gemini API", "Docker"],
    architecture: ["Get market data", "Store account data", "Review spending", "Show a simple summary"],
    links: [{ label: "GitHub (private)", href: "https://github.com/4nur4gmishr4/SmartMoney", type: "github" }],
  },
  {
    slug: "brothers-fitness",
    name: "Brothers Fitness",
    group: "client",
    category: "Gym management app",
    overview:
      "A gym app for members, memberships, payments, basic reports, and diet plans.",
    role: "Full-Stack Developer",
    client: "Brother's Fitness",
    status: "Client work",
    impact: [
      "Built one place for gym staff to manage members, payments, reports, and diet plans.",
    ],
    features: [
      "Admin dashboard",
      "Manage members",
      "Track memberships",
      "Diet planner",
      "Revenue reports",
      "Payment history",
      "Notifications and sign in",
      "Installable web app",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Supabase", "Firebase", "Vitest", "GitHub Actions"],
    architecture: ["Member app", "Staff dashboard", "Data and sign-in services", "Reports"],
    links: [{ label: "GitHub", href: "https://github.com/4nur4gmishr4/BrothersFitness", type: "github" }],
  },
  {
    slug: "prominent-digitech-global",
    name: "Prominent Digitech Global",
    group: "client",
    category: "Business website",
    overview:
      "A business website made to load quickly, work well on every screen, and help visitors get in touch.",
    role: "Full-Stack Developer",
    client: "Prominent Digitech Global",
    status: "Client work",
    impact: [
      "Built a clear website that helps people find services, understand the business, and make contact.",
    ],
    features: [
      "Works on phones and desktops",
      "Search-friendly pages",
      "Large navigation menu",
      "Service pages",
      "Simple motion",
      "Contact requests",
      "Fast static pages",
      "Contact forms",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    architecture: ["Page structure", "Fast page delivery", "Responsive design", "Contact form"],
    links: [{ label: "GitHub", href: "https://github.com/4nur4gmishr4/Prominent-Digitech-Global", type: "github" }],
  },
  {
    slug: "aarogyajal",
    name: "AarogyaJal",
    group: "engineering",
    category: "Water safety project",
    overview:
      "A Smart India Hackathon project that uses water sensors and data to warn about possible waterborne disease risks.",
    role: "Web, data, and device work",
    status: "Smart India Hackathon project",
    impact: [
      "Architected a real-time water quality monitoring system using a TensorFlow classification pipeline to predict health risks from sensor data.",
      "Developed the end-to-end data ingestion pipeline and achieved 88.9% prediction accuracy on validated datasets."
    ],
    features: [
      "Water sensor readings",
      "Disease risk checks",
      "Connected sensors",
      "Location maps",
      "SMS alerts",
      "Mobile app",
      "Data-based prediction",
      "Reports",
    ],
    stack: ["Python", "FastAPI", "TensorFlow", "React Native", "React", "PostgreSQL", "ESP32", "MQTT", "Docker"],
    architecture: ["Water sensors", "Send readings", "Check risk", "Show results and alerts"],
    links: [{ label: "GitHub", href: "https://github.com/4nur4gmishr4/AarogyaJal", type: "github" }],
  },
  {
    slug: "calcura",
    name: "Calcura",
    group: "engineering",
    category: "Math solver mobile app",
    overview:
      "A mobile app that reads handwritten maths problems and shows the answer step by step.",
    role: "Built by me",
    impact: [
      "Built a mobile application using OpenCV preprocessing pipelines for handwritten character recognition and mathematical expression solving.",
      "Developed a recursive descent parser in Dart to evaluate complex algebraic expressions without external solving libraries."
    ],
    features: ["Read text from a photo", "Camera input", "Choose from gallery", "Step-by-step answers", "Graphs", "Works offline", "Dark mode"],
    stack: ["Flutter", "Dart", "OCR.space API", "Math Expressions", "fl_chart"],
    architecture: ["Take a photo", "Read the maths", "Work out the answer", "Show the answer and graph"],
    links: [{ label: "GitHub", href: "https://github.com/4nur4gmishr4/Calcura", type: "github" }],
  },
  {
    slug: "library-inventory-management",
    name: "Library Inventory Management",
    group: "engineering",
    category: "Library management web app",
    overview:
      "A web app for library staff to manage books, members, and access rules.",
    role: "Built by me",
    impact: [
      "Made a clear way for library staff to manage books and members with sign-in and role-based access.",
    ],
    features: ["Sign in", "Add, edit, and remove records", "Different access levels", "Manage members", "Manage books", "Check form data", "REST API"],
    stack: ["MongoDB", "Express.js", "React", "Node.js", "JWT", "Tailwind CSS"],
    architecture: ["Web app", "Server API", "Sign-in checks", "Book and member data"],
    links: [{ label: "GitHub", href: "https://github.com/4nur4gmishr4/library-inventory-mern", type: "github" }],
  },
  {
    slug: "aarogyajal-admin-dashboard",
    name: "AarogyaJal Admin Dashboard",
    group: "engineering",
    category: "Water monitoring dashboard",
    overview:
      "A dashboard for checking water quality, connected devices, maps, reports, and alerts.",
    role: "Dashboard and data work",
    impact: [
      "Made one clear view for water readings, device status, maps, alerts, and reports.",
    ],
    features: ["Live readings", "Maps", "Reports", "Create reports", "Different access levels", "Admin dashboard", "Alerts", "Charts"],
    stack: ["React", "TypeScript", "Firebase", "Supabase", "Google Maps", "Chart.js"],
    architecture: ["Get device readings", "Admin dashboard", "Maps and charts", "Reports and alerts"],
    links: [{ label: "GitHub", href: "https://github.com/4nur4gmishr4/AarogyaJal-Admin-Site", type: "github" }],
  },
  {
    slug: "indigames",
    name: "IndiGames",
    group: "engineering",
    category: "Mobile game collection",
    overview:
      "A collection of small mobile games made with Flutter and a shared design style.",
    role: "Built by me",
    impact: [
      "Built reusable parts for several mobile games, including a shared theme and screen layout.",
    ],
    features: ["Several games", "Works on different screen sizes", "Shared theme", "Reusable game parts", "Works across platforms"],
    stack: ["Flutter", "Dart", "Material Design"],
    architecture: ["Shared app shell", "Game parts", "Shared theme", "Mobile release"],
    links: [{ label: "GitHub", href: "https://github.com/4nur4gmishr4/IndiGames", type: "github" }],
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);

export const getProjectsByGroup = (group: ProjectGroupId) => projects.filter((project) => project.group === group);
