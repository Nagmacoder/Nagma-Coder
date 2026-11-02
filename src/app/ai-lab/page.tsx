import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StatusPill } from "@/components/ProjectCard";
import { pageMetadata } from "@/lib/seo";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";

export const metadata = pageMetadata({
  title: "AI Lab",
  description:
    "AI projects by Full Stack Engineer Nagma: an LLM-powered resume analyzer, RAG pipelines, vector databases and structured model outputs.",
  path: "/ai-lab",
});

export default function AiLabPage() {
  const experiments = projects.filter((p) => p.aiLab);
  const learning = skillGroups.find((g) => g.id === "ai");

  return (
    <div className="wrap page">
      <Breadcrumbs items={[{ name: "AI Lab", path: "/ai-lab" }]} />
      <header className="page-head">
        <h1 className="page-title">AI Lab</h1>
        <p className="page-lede">
          Where full stack engineering meets LLMs. Projects are shown at their real stage, with what works today
          separated from what is planned.
        </p>
      </header>

      {experiments.map((p) => (
        <section key={p.slug} className="lab-entry" aria-labelledby={`lab-${p.slug}`}>
          <div className="lab-entry__head">
            <StatusPill status={p.status} />
            <h2 id={`lab-${p.slug}`}>{p.title}</h2>
          </div>
          <p>{p.oneLiner}</p>
          <figure className="flow">
            <ol className="flow__steps">
              {p.architecture.map((a) => (
                <li key={a.step} data-state={a.state}>
                  <span className="flow__name">{a.step}</span>
                  <span className="flow__state">{a.state === "built" ? "Built" : "Planned"}</span>
                </li>
              ))}
            </ol>
            <figcaption className="muted">
              Pipeline for {p.title}. Solid steps exist in code; dashed steps are planned.
            </figcaption>
          </figure>
          <Link href={`/projects/${p.slug}`} className="text-link">
            Read the full case study
          </Link>
        </section>
      ))}

      {learning && (
        <section className="section" aria-labelledby="track-title">
          <h2 id="track-title" className="section-title">
            AI toolkit
          </h2>
          <p className="muted">
            Tools I use to build LLM-powered applications.
          </p>
          <ul className="tags tags--large">
            {learning.skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="feature-block">
        <h2>Lessons learned</h2>
        <p className="muted">
          Write-ups land here as projects ship. Interested in what I&apos;m building next?{" "}
          <Link href="/contact">Get in touch</Link>.
        </p>
      </section>
    </div>
  );
}
