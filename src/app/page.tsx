import Link from "next/link";
import { HeroScene } from "@/components/HeroScene";
import { BootTerminal } from "@/components/BootTerminal";
import { AudienceShortcuts } from "@/components/AudienceShortcuts";
import { ProjectCard } from "@/components/ProjectCard";
import { ArchitectureMap } from "@/components/ArchitectureMap";
import { ResumeLink } from "@/components/ResumeLink";
import { LinkedInIcon } from "@/components/BrandIcons";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { experience } from "@/content/experience";

export default function HomePage() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const latestRoles = experience.slice(0, 2);

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="status-label">
            <span className="status-dot" aria-hidden="true" />
            {profile.statusLabel}
          </p>
          <h1 id="hero-title" className="hero__title">
            <span className="hero__line">Building the web.</span>
            <span className="hero__line hero__line--alt">Exploring what AI can do.</span>
          </h1>
          <p className="hero__lede">{profile.summary}</p>
          <div className="hero__ctas">
            <Link href="/projects" className="btn btn--primary">
              Explore My Work
            </Link>
            <ResumeLink />
          </div>
          <p className="hero__aside">Currently debugging the universe. One component at a time.</p>
        </div>
        <div className="hero__visual">
          <HeroScene />
        </div>
      </section>

      <section className="glance wrap" aria-labelledby="glance-title">
        <h2 id="glance-title" className="sr-only">
          Profile at a glance
        </h2>
        <dl className="glance__grid">
          <div>
            <dt>Name</dt>
            <dd>{profile.name}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>Full Stack Engineer, AI Builder</dd>
          </div>
          <div>
            <dt>Experience</dt>
            <dd>{profile.yearsExperience} years</dd>
          </div>
          <div>
            <dt>Strengths</dt>
            <dd>{profile.coreStrengths.join(", ")}</dd>
          </div>
        </dl>
        <div className="glance__actions">
          <a className="btn btn--ghost" href={profile.links.linkedin} target="_blank" rel="me noopener">
            <LinkedInIcon />
            Connect on LinkedIn
          </a>
          <Link href="/contact" className="btn btn--ghost">
            Contact Me
          </Link>
        </div>
      </section>

      <section className="boot wrap" aria-labelledby="boot-title">
        <div className="boot__intro">
          <h2 id="boot-title" className="section-title">
            Boot nagma.exe
          </h2>
          <p className="muted">
            The short version, as a terminal would tell it. Press Skip or Escape anytime; nothing here stands between you
            and the portfolio.
          </p>
          <AudienceShortcuts />
        </div>
        <BootTerminal />
      </section>

      <section className="wrap section" aria-labelledby="work-title">
        <div className="section-head">
          <h2 id="work-title" className="section-title">
            Selected work
          </h2>
          <Link href="/projects" className="text-link">
            View Projects
          </Link>
        </div>
        <div className="project-grid">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <section className="wrap section stackmap" aria-labelledby="stack-title">
        <div className="stackmap__copy">
          <h2 id="stack-title" className="section-title">
            Every layer of the stack
          </h2>
          <p className="muted">
            Most of my work spans the whole path a request takes, from the interface to the API to the services and data
            behind it. The newest layer is AI. Pick a layer to see what lives there.
          </p>
          <ul className="skill-strip">
            {skillGroups.map((g) => (
              <li key={g.id}>
                <Link href={`/skills#${g.id}`}>{g.title}</Link>
                <span className="muted">{g.skills.slice(0, 3).join(", ")}</span>
              </li>
            ))}
          </ul>
        </div>
        <ArchitectureMap />
      </section>

      <section className="wrap section" aria-labelledby="exp-title">
        <div className="section-head">
          <h2 id="exp-title" className="section-title">
            Experience snapshot
          </h2>
          <Link href="/experience" className="text-link">
            Full timeline
          </Link>
        </div>
        <div className="snapshot">
          <p className="snapshot__big">
            {profile.yearsExperience} years building web applications, backend systems and product experiences.
          </p>
          {latestRoles.length > 0 ? (
            <ul className="snapshot__roles">
              {latestRoles.map((r) => (
                <li key={`${r.company}-${r.start}`}>
                  <strong>{r.role}</strong>, {r.company}
                  <span className="muted">
                    {" "}
                    {r.start} to {r.end}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">
              Role-by-role history is on{" "}
              <a href={profile.links.linkedin} target="_blank" rel="me noopener">
                LinkedIn
              </a>
              .
            </p>
          )}
        </div>
      </section>

      <section className="wrap section cta-band" aria-labelledby="cta-title">
        <h2 id="cta-title" className="cta-band__title">
          {profile.tagline}
        </h2>
        <p className="muted">Open to full stack and AI engineering roles. The fastest way to reach me is LinkedIn.</p>
        <div className="hero__ctas">
          <a className="btn btn--primary" href={profile.links.linkedin} target="_blank" rel="me noopener">
            <LinkedInIcon />
            Connect on LinkedIn
          </a>
          <ResumeLink />
          <Link href="/contact" className="btn btn--ghost">
            Contact Me
          </Link>
        </div>
      </section>
    </>
  );
}
