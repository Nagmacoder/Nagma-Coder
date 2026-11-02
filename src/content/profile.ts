/**
 * Profile facts. Everything here is shown publicly.
 * Only confirmed information belongs in this file. `null` hides the related UI.
 */

export const profile = {
  name: "Nagma",
  brand: "NAGMA.EXE",
  role: "Full Stack Engineer",
  roles: ["Full Stack Engineer", "AI Builder", "Product-minded Software Engineer"],
  statusLabel: "FULL STACK ENGINEER · AI BUILDER",
  tagline: "Your next Full Stack Engineer might be one scan away.",
  yearsExperience: "5+",
  summary:
    "I'm Nagma, a Full Stack Engineer with 5+ years of experience building web applications, backend systems, and product experiences. Now I'm bringing that engineering mindset into Generative AI, RAG, and LLM-powered applications.",
  coreStrengths: ["React and Next.js", "Node.js and NestJS", "APIs and microservices", "AWS and Docker"],
  links: {
    linkedin: "https://www.linkedin.com/in/nagma-fullstack/",
    /** TODO(Nagma): add your GitHub profile URL, e.g. "https://github.com/your-handle". Null hides every GitHub link. */
    github: null as string | null,
    /** TODO(Nagma): add a public contact email if you want one shown. Null keeps LinkedIn as the contact route. */
    email: null as string | null,
  },
  /** Drop your resume at public/resume.pdf. The site detects it at build time. */
  resumePath: "/resume.pdf",
  resumeFileName: "Nagma-Full-Stack-Engineer-Resume.pdf",
} as const;

export const sameAs = [profile.links.linkedin, profile.links.github].filter(
  (u): u is string => typeof u === "string",
);
