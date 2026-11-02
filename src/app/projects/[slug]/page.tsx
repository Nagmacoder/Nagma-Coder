import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { StatusPill } from "@/components/ProjectCard";
import { GitHubIcon } from "@/components/BrandIcons";
import { getProject, projects } from "@/content/projects";
import { pageMetadata, projectJsonLd } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.title} case study`,
    description: `${project.oneLiner} Built by Nagma with ${project.stack.slice(0, 3).join(", ")}.`,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const others = projects.filter((p) => p.slug !== project.slug);

  return (
    <article className="wrap page case">
      <Breadcrumbs
        items={[
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ]}
      />
      <header className="page-head">
        <StatusPill status={project.status} />
        <h1 className="page-title">{project.title}</h1>
        <p className="page-lede">{project.oneLiner}</p>
        <div className="case__links">
          {project.links.demo && (
            <a className="btn btn--primary" href={project.links.demo} target="_blank" rel="noopener">
              Open live demo
            </a>
          )}
          {project.links.source && (
            <a className="btn btn--ghost" href={project.links.source} target="_blank" rel="noopener">
              <GitHubIcon />
              View source
            </a>
          )}
        </div>
      </header>

      <div className="case__grid">
        <section className="case__section">
          <h2>Problem and context</h2>
          <p>{project.context}</p>
        </section>
        <section className="case__section">
          <h2>My role</h2>
          <p>{project.role}</p>
          <ul className="tags" aria-label="Technologies">
            {project.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="case__section">
        <h2>What&apos;s built and what&apos;s next</h2>
        <ul className="capabilities">
          {project.capabilities.map((c) => (
            <li key={c.label} data-state={c.state}>
              <span className="capabilities__state">{c.state === "built" ? "Built" : "Planned"}</span>
              {c.label}
            </li>
          ))}
        </ul>
      </section>

      <section className="case__section">
        <h2>Architecture</h2>
        <ol className="pipeline">
          {project.architecture.map((a) => (
            <li key={a.step} data-state={a.state}>
              <h3>
                {a.step}
                {a.state === "planned" && <span className="pill pill--dust">Planned</span>}
              </h3>
              <p>{a.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      {(project.decisions.length > 0 || project.challenges.length > 0) && (
        <div className="case__grid">
          {project.decisions.length > 0 && (
            <section className="case__section">
              <h2>Technology choices and trade-offs</h2>
              <dl className="pairs">
                {project.decisions.map((d) => (
                  <div key={d.choice}>
                    <dt>{d.choice}</dt>
                    <dd>{d.reason}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
          {project.challenges.length > 0 && (
            <section className="case__section">
              <h2>Challenges and solutions</h2>
              <dl className="pairs">
                {project.challenges.map((c) => (
                  <div key={c.challenge}>
                    <dt>{c.challenge}</dt>
                    <dd>{c.approach}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>
      )}

      <section className="case__section">
        <h2>Outcomes</h2>
        {project.outcomes.length > 0 ? (
          <ul>
            {project.outcomes.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        ) : (
          <p className="muted">
            No measured outcomes to report yet. This page will be updated with real results rather than estimates.
          </p>
        )}
      </section>

      {project.screenshots.length > 0 && (
        <section className="case__section">
          <h2>Screenshots</h2>
          <div className="shots">
            {project.screenshots.map((s) => (
              <Image key={s.src} src={s.src} alt={s.alt} width={s.width} height={s.height} sizes="(max-width: 800px) 100vw, 800px" />
            ))}
          </div>
        </section>
      )}

      <nav className="case__next" aria-label="More projects">
        <h2 className="section-title">More work</h2>
        <ul>
          {others.map((p) => (
            <li key={p.slug}>
              <Link href={`/projects/${p.slug}`}>{p.title}</Link>
            </li>
          ))}
          <li>
            <Link href="/skills">Skills behind these projects</Link>
          </li>
          <li>
            <Link href="/contact">Talk to me about this work</Link>
          </li>
        </ul>
      </nav>

      <JsonLd data={projectJsonLd(project)} />
    </article>
  );
}
