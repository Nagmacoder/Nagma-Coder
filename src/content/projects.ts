/**
 * Project case studies.
 *
 * Rules for this file:
 * - Describe only what exists in the code. Anything not yet built goes under `state: "planned"`.
 * - No invented metrics, users, clients or deployments. `outcomes` stays empty until you have verified ones.
 * - VERIFY(Nagma): re-check the AI Resume Analyzer capabilities against its repository before deploying.
 *   They are based on the project brief, not on a repository I could inspect.
 */

export type ProjectStatus = "In progress" | "Experiment" | "Built";

export type Capability = { label: string; state: "built" | "planned" };

export type Project = {
  slug: string;
  title: string;
  status: ProjectStatus;
  oneLiner: string;
  context: string;
  role: string;
  stack: string[];
  capabilities: Capability[];
  architecture: { step: string; detail: string; state: "built" | "planned" }[];
  decisions: { choice: string; reason: string }[];
  challenges: { challenge: string; approach: string }[];
  /** Verified outcomes only. Leave empty rather than estimate. */
  outcomes: string[];
  links: { demo: string | null; source: string | null };
  /** Real screenshots only: files in /public/projects/<slug>/... */
  screenshots: { src: string; alt: string; width: number; height: number }[];
  featured: boolean;
  aiLab: boolean;
};

export const projects: Project[] = [
  {
    slug: "ai-resume-analyzer",
    title: "AI Resume Analyzer",
    status: "In progress",
    oneLiner:
      "A Next.js app that reads a PDF resume and is growing into an LLM-powered, ATS-oriented reviewer.",
    context:
      "Resumes are often screened by applicant tracking systems before a person reads them, and most feedback people get is generic. The goal of this project is feedback tied to the actual content of a resume, produced through a pipeline that can later be grounded in role-specific guidance.",
    role: "Sole developer: product scope, interface, API design and the analysis pipeline.",
    stack: ["Next.js", "TypeScript", "PDF parsing", "REST API", "LLM (planned)", "RAG (planned)"],
    capabilities: [
      { label: "Resume upload", state: "built" },
      { label: "PDF text extraction", state: "built" },
      { label: "Analysis API endpoint", state: "built" },
      { label: "Structured LLM evaluation (JSON schema output)", state: "planned" },
      { label: "ATS-oriented feedback", state: "planned" },
      { label: "RAG over role-specific guidance", state: "planned" },
    ],
    architecture: [
      { step: "Upload", detail: "The user selects a PDF resume in the Next.js interface.", state: "built" },
      { step: "Extract", detail: "The PDF is parsed into plain text for analysis.", state: "built" },
      { step: "Analyze API", detail: "An API route receives the extracted text and returns the analysis.", state: "built" },
      { step: "LLM evaluation", detail: "A model scores sections against a fixed JSON schema so the UI can render it reliably.", state: "planned" },
      { step: "Retrieve", detail: "A vector store supplies role-specific guidance to ground the feedback (RAG).", state: "planned" },
    ],
    decisions: [
      {
        choice: "Structured output before free text",
        reason:
          "Asking the model for a fixed schema makes results testable and lets the interface render scores and suggestions without parsing prose.",
      },
      {
        choice: "Ship extraction first, AI second",
        reason:
          "Reliable text extraction is the foundation every later step depends on, so it is built and checked before the LLM layer is added.",
      },
    ],
    challenges: [
      {
        challenge: "PDF layouts vary widely (columns, tables, icons).",
        approach: "Treat extraction as its own step with its own output, so its quality can be inspected independently of the analysis.",
      },
      {
        challenge: "LLM feedback can be vague or inconsistent between runs.",
        approach: "Planned: constrain the output with a schema and ground it with retrieved guidance instead of relying on the prompt alone.",
      },
    ],
    outcomes: [],
    links: { demo: null, source: null },
    screenshots: [],
    featured: true,
    aiLab: true,
  },
  {
    slug: "nagma-exe-portfolio",
    title: "NAGMA.EXE portfolio",
    status: "Built",
    oneLiner:
      "This site: a server-rendered Next.js portfolio with a lazy-loaded WebGL workspace that never blocks the content.",
    context:
      "A portfolio has to be readable by a recruiter in seconds on a phone and still show engineering craft. The challenge was adding an interactive 3D scene without hurting load time, accessibility or search visibility.",
    role: "Design and engineering, end to end.",
    stack: ["Next.js App Router", "React Server Components", "TypeScript (strict)", "Three.js", "React Three Fiber", "JSON-LD"],
    capabilities: [
      { label: "Server-rendered content on every route", state: "built" },
      { label: "Procedural 3D workspace, no model files", state: "built" },
      { label: "Static fallback for no-WebGL and reduced motion", state: "built" },
      { label: "Sitemap, robots, canonical URLs and structured data from one config", state: "built" },
    ],
    architecture: [
      { step: "Server Components", detail: "All text, navigation and metadata render on the server, so they work without JavaScript.", state: "built" },
      { step: "Static fallback", detail: "An SVG illustration fills the hero frame immediately, so nothing shifts when WebGL arrives.", state: "built" },
      { step: "Deferred scene", detail: "The Three.js bundle is code-split and requested only after the browser is idle and WebGL is confirmed.", state: "built" },
      { step: "Render loop control", detail: "Rendering stops when the scene is off-screen, the tab is hidden or reduced motion is requested.", state: "built" },
    ],
    decisions: [
      {
        choice: "Procedural geometry instead of a downloaded 3D model",
        reason: "Boxes, cylinders and tori with generated textures cost a few kilobytes and need no extra network request.",
      },
      {
        choice: "Client components only where interaction lives",
        reason: "The scene, terminal, card tilt and architecture map are small client islands; everything else ships zero JavaScript.",
      },
    ],
    challenges: [
      {
        challenge: "A canvas mounting late can push content around.",
        approach: "The hero frame has a fixed aspect ratio and the canvas fades in over the fallback rather than replacing it in the flow.",
      },
      {
        challenge: "One domain change should not mean editing many files.",
        approach: "A single NEXT_PUBLIC_SITE_URL variable feeds canonical URLs, Open Graph, sitemap, robots and JSON-LD.",
      },
    ],
    outcomes: [],
    links: { demo: null, source: null },
    screenshots: [],
    featured: true,
    aiLab: false,
  },
  // Professional projects below are taken from the previous portfolio (nagmadeveloper.netlify.app).
  // VERIFY(Nagma): outcome figures are copied from that site; confirm they are still accurate.
  {
    slug: "loanbox",
    title: "LoanBox – Vehicle & Loan Platform",
    status: "Built",
    oneLiner: "Vehicle and loan lifecycle management platform built for high-volume, scalable transactions.",
    context:
      "Built at CarDekho Group (Dec 2024 – Mar 2026). Vehicle and loan lifecycle management platform built for high-volume, scalable transactions.",
    role: "Full stack engineer at CarDekho Group.",
    stack: ["NestJS", "GraphQL", "Next.js 13", "TypeScript", "Kafka", "Redis", "MySQL"],
    capabilities: [
      { label: "Scalable NestJS and GraphQL backend with horizontal scaling and load balancing", state: "built" },
      { label: "Kafka event-driven pipelines for asynchronous loan status and notifications", state: "built" },
      { label: "Redis caching layer", state: "built" },
      { label: "Optimised Next.js 13 server-side rendering", state: "built" },
    ],
    architecture: [
      { step: "Frontend", detail: "Next.js 13 with server-side rendering.", state: "built" },
      { step: "API", detail: "NestJS and GraphQL backend, horizontally scaled behind a load balancer.", state: "built" },
      { step: "Events", detail: "Kafka carries loan status changes and notifications asynchronously.", state: "built" },
      { step: "Cache and data", detail: "Redis caching in front of MySQL.", state: "built" },
    ],
    decisions: [],
    challenges: [],
    outcomes: ["40% reduction in API response times from Redis caching", "LCP reduced by 57% and CLS eliminated after Next.js 13 SSR optimisation"],
    links: { demo: null, source: null },
    screenshots: [],
    featured: true,
    aiLab: false,
  },
  {
    slug: "bajaj-finserv-loan-management",
    title: "Bajaj Finserv – Loan Management",
    status: "Built",
    oneLiner: "Gold Loan Relationship Card and Flexi Loan Calculator for a leading financial services platform.",
    context:
      "Client engagement (2025) for Bajaj Finserv. Gold Loan Relationship Card and Flexi Loan Calculator for a leading financial services platform.",
    role: "Frontend developer on a client engagement.",
    stack: ["Solid.js", "TypeScript", "AEM", "REST APIs", "HTML5", "CSS3"],
    capabilities: [
      { label: "Gold Loan Relationship Card with reactive state and real-time eligibility calculations", state: "built" },
      { label: "Configurable Flexi Loan Calculator with dynamic EMI and interest logic", state: "built" },
      { label: "Reusable Solid.js components integrated with Adobe Experience Manager", state: "built" },
      { label: "REST API integration for loan validation and portfolio data", state: "built" },
    ],
    architecture: [
      { step: "Components", detail: "Reusable Solid.js components with reactive state.", state: "built" },
      { step: "CMS", detail: "Components integrated into Adobe Experience Manager pages.", state: "built" },
      { step: "APIs", detail: "REST APIs for loan validation and portfolio data, with robust error handling.", state: "built" },
    ],
    decisions: [],
    challenges: [],
    outcomes: [],
    links: { demo: null, source: null },
    screenshots: [],
    featured: false,
    aiLab: false,
  },
  {
    slug: "snowkap-net-zero",
    title: "Snowkap – Net Zero Platform",
    status: "Built",
    oneLiner: "Real-time emissions tracking SaaS with regulatory compliance reporting.",
    context:
      "Built at PowerWave Technologies (Jul 2024 – Nov 2024). Real-time emissions tracking SaaS with regulatory compliance reporting.",
    role: "Full stack engineer at PowerWave Technologies.",
    stack: ["NestJS", "Next.js 13", "React.js", "TypeScript", "Recharts", "Docker"],
    capabilities: [
      { label: "NestJS pipeline for large-scale Excel processing with schema validation and automated error reporting", state: "built" },
      { label: "REST APIs with request validation, rate limiting and comprehensive logging", state: "built" },
      { label: "Next.js 13 SSR dashboard with Recharts for real-time emissions visualisation", state: "built" },
      { label: "Clean, auditable data flows for compliance reporting", state: "built" },
    ],
    architecture: [
      { step: "Ingest", detail: "Large Excel uploads are validated against a schema in a NestJS pipeline.", state: "built" },
      { step: "API", detail: "REST APIs with request validation, rate limiting and logging.", state: "built" },
      { step: "Dashboard", detail: "Next.js 13 SSR dashboard visualising emissions with Recharts.", state: "built" },
    ],
    decisions: [],
    challenges: [],
    outcomes: [],
    links: { demo: null, source: null },
    screenshots: [],
    featured: false,
    aiLab: false,
  },
  {
    slug: "orim-stock-management",
    title: "ORIM – Stock Management",
    status: "Built",
    oneLiner: "Inventory and stock management platform with role-based access at scale.",
    context:
      "Built at DistrictD (Jun 2023 – Jun 2024). Inventory and stock management platform with role-based access at scale.",
    role: "Full stack developer at DistrictD.",
    stack: ["Express.js", "Node.js", "React.js", "TypeScript", "Redis", "PostgreSQL", "Kubernetes"],
    capabilities: [
      { label: "Express.js microservices", state: "built" },
      { label: "RBAC authorisation with JWT and Redis-backed inventory lookups", state: "built" },
      { label: "Docker containers orchestrated on Kubernetes for auto-scaling and high availability", state: "built" },
      { label: "MySQL to PostgreSQL migration for advanced querying and faster reporting", state: "built" },
    ],
    architecture: [
      { step: "Services", detail: "Express.js and Node.js microservices.", state: "built" },
      { step: "Auth", detail: "JWT-based role-based access control.", state: "built" },
      { step: "Data", detail: "PostgreSQL (migrated from MySQL) with Redis-backed inventory lookups.", state: "built" },
      { step: "Infrastructure", detail: "Containerised with Docker and orchestrated on Kubernetes.", state: "built" },
    ],
    decisions: [],
    challenges: [],
    outcomes: ["Supports 1,000+ concurrent users with 25% faster load times"],
    links: { demo: "https://tech.orim.in/", source: null },
    screenshots: [],
    featured: false,
    aiLab: false,
  },
  {
    slug: "devsko",
    title: "Devsko – Developer Platform",
    status: "Built",
    oneLiner: "Full-stack developer portfolio and project showcase platform on the MERN stack.",
    context:
      "Built at CoEdify Technology LLP (2022 – 2023). Full-stack developer portfolio and project showcase platform on the MERN stack.",
    role: "Built end to end at CoEdify Technology LLP.",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS", "JWT"],
    capabilities: [
      { label: "REST APIs for projects, blog posts and skills with JWT authentication and role-based access", state: "built" },
      { label: "Responsive React.js UI with animations, lazy loading and optimised page loads", state: "built" },
      { label: "Netlify deployment with automated CI/CD and engagement analytics", state: "built" },
    ],
    architecture: [
      { step: "API", detail: "Express.js and Node.js REST APIs on MongoDB, secured with JWT and roles.", state: "built" },
      { step: "Frontend", detail: "Responsive React.js and Tailwind CSS UI with lazy loading.", state: "built" },
      { step: "Delivery", detail: "Deployed on Netlify with automated CI/CD.", state: "built" },
    ],
    decisions: [],
    challenges: [],
    outcomes: ["40% increase in user engagement through UX improvements"],
    links: { demo: "https://devsko.com/", source: null },
    screenshots: [],
    featured: false,
    aiLab: false,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
