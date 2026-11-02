import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArchitectureMap } from "@/components/ArchitectureMap";
import { pageMetadata } from "@/lib/seo";
import { skillGroups } from "@/content/skills";

export const metadata = pageMetadata({
  title: "Skills",
  description:
    "Nagma's skills: React.js, Next.js, TypeScript, Node.js, NestJS, GraphQL, microservices, AWS, Docker, Kubernetes, Kafka, plus Generative AI and RAG.",
  path: "/skills",
});

export default function SkillsPage() {
  return (
    <div className="wrap page">
      <Breadcrumbs items={[{ name: "Skills", path: "/skills" }]} />
      <header className="page-head">
        <h1 className="page-title">Skills</h1>
        <p className="page-lede">
          Grouped by where they sit in a system. All of them are backed by real project work.
        </p>
      </header>

      <div className="skill-groups">
        {skillGroups.map((g) => (
          <section key={g.id} id={g.id} className="skill-group" data-mode={g.mode === "Professional experience" ? "pro" : "learning"}>
            <div className="skill-group__head">
              <h2>{g.title}</h2>
              <span className={`pill ${g.mode === "Professional experience" ? "pill--mint" : "pill--violet"}`}>{g.mode}</span>
            </div>
            <p className="muted">{g.note}</p>
            <ul className="tags tags--large">
              {g.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="section stackmap">
        <div className="stackmap__copy">
          <h2 className="section-title">How the layers fit together</h2>
          <p className="muted">
            See these skills applied in the <Link href="/projects">project case studies</Link> and the{" "}
            <Link href="/ai-lab">AI Lab</Link>.
          </p>
        </div>
        <ArchitectureMap />
      </section>
    </div>
  );
}
