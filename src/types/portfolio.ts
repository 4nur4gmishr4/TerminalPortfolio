export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  contact: {
    email: string;
    phone: string;
    github: string;
    linkedin: string;
  };
  education: Array<{
    institution: string;
    location: string;
    degree: string;
    gpa?: string;
    percentage?: string;
    years: string;
  }>;
  experience: Array<{
    company: string;
    role: string;
    location: string;
    duration: string;
    highlights: string[];
  }>;
  projects: Array<{
    name: string;
    description: string;
    tech: string[];
    highlights: string[];
    github?: string;
  }>;
  skills: {
    [category: string]: string[];
  };
  achievements: string[];
}

export const portfolioData: PortfolioData = {
  name: "Anurag Mishra",
  title: "ML Engineer & Flutter App Developer",
  bio: "Passionate ML Engineer and Flutter App Developer with a strong interest in building intelligent, user-focused mobile solutions. Experienced in TensorFlow, Flutter, and modern UI/UX design, creating seamless, data-driven applications that blend performance with great user experiences.",
  contact: {
    email: "anuragmishrasnag06082004@gmail.com",
    phone: "+91 9302786886",
    github: "https://github.com/4nur4gmishr4",
    linkedin: "https://linkedin.com/in/4nur4gmishra"
  },
  education: [
    {
      institution: "Gyan Ganga Institute of Technology and Sciences",
      location: "Jabalpur, MP",
      degree: "B.Tech. in Computer Science & Eng. (AI & ML)",
      gpa: "7.48",
      years: "2022 – 2026"
    },
    {
      institution: "Sarvodaya English Higher Secondary School",
      location: "Lakhnadon, MP",
      degree: "Class XII",
      percentage: "84.00%",
      years: "2022"
    },
    {
      institution: "Sarvodaya English Higher Secondary School",
      location: "Lakhnadon, MP",
      degree: "Class X",
      percentage: "83.33%",
      years: "2020"
    }
  ],
  experience: [
    {
      company: "Prominent Digitech Global",
      role: "Automation and Web Development Intern",
      location: "Remote",
      duration: "May 2024 – Nov 2024",
      highlights: [
        "Deployed customer support chatbots, boosting user interaction by 35%",
        "Streamlined CRM workflows for increased efficiency",
        "Managed full-stack development and deployment of multiple dynamic websites"
      ]
    }
  ],
  projects: [
    {
      name: "AarogyaJal",
      description: "IoT & AI-Driven Water Quality Monitor",
      tech: ["Python", "Flutter", "Node.js", "Ensemble ML/AI", "IoT Sensors"],
      highlights: [
        "Developed AI-driven IoT water quality monitor with Ensemble ML (88.9% accuracy)",
        "Real-time disease prediction and mobile app for instant alerts",
        "Achieved 90% cost reduction in monitoring processes"
      ],
      github: "https://github.com/4nur4gmishr4/AarogyaJal"
    },
    {
      name: "Calcura",
      description: "Handwritten Math Solver App",
      tech: ["Python", "Flutter", "Google OCR API", "TensorFlow", "OpenCV"],
      highlights: [
        "Cross-platform AI Math Solver interpreting handwritten equations",
        "Dedicated ML model with Google OCR/ML Kit integration",
        "Features dynamic graphing and complete scientific tool suite"
      ],
      github: "https://github.com/4nur4gmishr4/Calcura"
    },
    {
      name: "Smart Money",
      description: "AI Financial Advisor App",
      tech: ["Flutter", "TensorFlow", "Gemini API", "Finnhub", "Supabase"],
      highlights: [
        "AI financial mobile app with real-time stock data and insights",
        "Personalized savings chatbot using Gemini API",
        "Secure authentication via Supabase"
      ],
      github: "https://github.com/4nur4gmishr4/Smart-Money"
    }
  ],
  skills: {
    "ML/AI": ["TensorFlow", "PyTorch", "OpenCV", "LLMs", "Computer Vision"],
    "Web/Backend": ["React.js", "Next.js", "Node.js", "FastAPI"],
    "Cloud/DevOps": ["Docker", "Kubernetes", "AWS", "GCP", "OCI", "Git"],
    "Programming": ["Python", "C/C++", "JavaScript", "Flutter (Dart)", "Bash/Shell"],
    "Data/Systems": ["SQL", "MongoDB", "Supabase", "Linux/Unix", "Raspberry Pi"]
  },
  achievements: [
    "Nexify Hackathon Finalist (4th place, Round 2) - AI Financial Advisor App",
    "CISCO IT & AI Certifications (GenAI Hackathon 2024, Nexify 2025)",
  ]
};
