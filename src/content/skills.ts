/**
 * Skills, grouped by category.
 * `mode` states the evidence honestly.
 */

export type SkillGroup = {
  id: string;
  title: string;
  mode: "Professional experience" | "Learning and experimenting";
  skills: string[];
  note: string;
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    mode: "Professional experience",
    skills: ["React.js", "Next.js", "TypeScript", "JavaScript"],
    note: "Component-driven interfaces, server rendering and typed UI code.",
  },
  {
    id: "backend",
    title: "Backend",
    mode: "Professional experience",
    skills: ["Node.js", "NestJS", "Express", "GraphQL", "REST APIs"],
    note: "Services and APIs that frontends and other systems can depend on.",
  },
  {
    id: "architecture",
    title: "Architecture",
    mode: "Professional experience",
    skills: ["Microservices", "Distributed systems", "API design"],
    note: "Splitting systems along clear boundaries and designing the contracts between them.",
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    mode: "Professional experience",
    skills: ["AWS", "Docker", "Kubernetes", "Redis", "Kafka", "CI/CD"],
    note: "Shipping, scaling, caching and moving events between services.",
  },
  {
    id: "ai",
    title: "AI engineering",
    mode: "Professional experience",
    skills: [
      "Generative AI",
      "Prompt engineering",
      "RAG",
      "Vector databases",
      "LangChain",
      "LangGraph",
      "MCP",
      "AI agents",
      "LLM applications",
    ],
    note: "Applying the same engineering discipline to LLM-powered features, starting with the AI Resume Analyzer.",
  },
];
