import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProjectCard } from "@/components/ProjectCard";
import { pageMetadata } from "@/lib/seo";
import { projects } from "@/content/projects";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Case studies by Nagma, Full Stack Engineer: Next.js, React and Node.js builds plus AI projects like an LLM-powered resume analyzer.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <div className="wrap page">
      <Breadcrumbs items={[{ name: "Projects", path: "/projects" }]} />
      <header className="page-head">
        <h1 className="page-title">Projects</h1>
        <p className="page-lede">
          Each case study covers the problem, my role, the architecture and the trade-offs. Status labels are honest:
          work in progress is marked as such.
        </p>
      </header>
      <div className="project-grid">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} headingLevel={2} />
        ))}
      </div>
    </div>
  );
}
