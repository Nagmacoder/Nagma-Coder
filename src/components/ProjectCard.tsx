import Link from "next/link";
import type { Project } from "@/content/projects";
import { TiltCard } from "./TiltCard";

export function StatusPill({ status }: { status: Project["status"] }) {
  const tone = status === "Built" ? "mint" : status === "In progress" ? "violet" : "dust";
  return <span className={`pill pill--${tone}`}>{status}</span>;
}

export function ProjectCard({ project, headingLevel = 3 }: { project: Project; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const built = project.capabilities.filter((c) => c.state === "built").length;
  return (
    <TiltCard className="project-card">
      <article className="project-card__body">
        <div className="project-card__top">
          <StatusPill status={project.status} />
          <span className="project-card__meta">
            {built} of {project.capabilities.length} capabilities built
          </span>
        </div>
        <H className="project-card__title">
          <Link href={`/projects/${project.slug}`} className="stretched">
            {project.title}
          </Link>
        </H>
        <p>{project.oneLiner}</p>
        <ul className="tags" aria-label="Technologies">
          {project.stack.slice(0, 5).map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <span className="project-card__cta" aria-hidden="true">
          Read the case study
        </span>
      </article>
    </TiltCard>
  );
}
