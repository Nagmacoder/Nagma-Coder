import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ResumeLink } from "@/components/ResumeLink";
import { pageMetadata } from "@/lib/seo";
import { profile } from "@/content/profile";

export const metadata = pageMetadata({
  title: "About",
  description:
    "How Nagma works as a Full Stack Engineer: engineering approach, product mindset, collaboration, and the move into Generative AI and LLM applications.",
  path: "/about",
});

/* TODO(Nagma): these paragraphs describe how you work in general terms. Add a specific story from your own work to each one. */
const principles = [
  {
    title: "Engineering approach",
    body: "I like systems that are easy to change. That means clear boundaries between the interface, the API and the services behind it, types that catch mistakes before users do, and code a teammate can read without a tour.",
  },
  {
    title: "Product mindset",
    body: "Features exist to solve someone's problem, so I start by asking who uses a thing and what they are trying to finish. That question usually decides the trade-offs: what to build first, what to leave out, and where speed matters most.",
  },
  {
    title: "Collaboration",
    body: "Working across the full stack means working with everyone who touches it: designers, product managers, other engineers and the people running it in production. I write things down, ask early and prefer small reviewable changes.",
  },
  {
    title: "Problem solving",
    body: "When something breaks, I look for the smallest reproducible case, then fix the cause rather than the symptom. Debugging the universe goes one component at a time.",
  },
];

export default function AboutPage() {
  return (
    <div className="wrap page">
      <Breadcrumbs items={[{ name: "About", path: "/about" }]} />
      <header className="page-head">
        <h1 className="page-title">About Nagma</h1>
        <p className="page-lede">
          {profile.yearsExperience} years of full stack engineering: web applications, backend systems and product
          experiences, built with React, Next.js, Node.js and cloud infrastructure.
        </p>
      </header>

      <div className="prose-grid">
        {principles.map((p) => (
          <section key={p.title} className="prose-block">
            <h2>{p.title}</h2>
            <p>{p.body}</p>
          </section>
        ))}
      </div>

      <section className="feature-block">
        <h2>Why AI, and why now</h2>
        <p>
          Generative AI changes what software can do, but it doesn&apos;t change what makes software good. An LLM feature
          still needs a clean API, predictable data, error handling and an interface people trust. I&apos;m bringing the
          habits from {profile.yearsExperience} years of full stack work to RAG pipelines, structured model outputs and
          LLM-powered applications, and documenting what I learn in the{" "}
          <Link href="/ai-lab">AI Lab</Link>.
        </p>
      </section>

      <div className="hero__ctas">
        <Link href="/projects" className="btn btn--primary">
          View Projects
        </Link>
        <ResumeLink />
        <Link href="/contact" className="btn btn--ghost">
          Contact Me
        </Link>
      </div>
    </div>
  );
}
