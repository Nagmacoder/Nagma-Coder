import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ResumeLink } from "@/components/ResumeLink";
import { LinkedInIcon } from "@/components/BrandIcons";
import { pageMetadata } from "@/lib/seo";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";

export const metadata = pageMetadata({
  title: "Experience",
  description:
    "Work experience of Nagma: 5+ years as a Full Stack Engineer building web applications, backend systems and product experiences.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <div className="wrap page">
      <Breadcrumbs items={[{ name: "Experience", path: "/experience" }]} />
      <header className="page-head">
        <h1 className="page-title">Experience</h1>
        <p className="page-lede">
          {profile.yearsExperience} years building web applications, backend systems and product experiences across the
          full stack.
        </p>
      </header>

      {experience.length > 0 ? (
        <ol className="timeline">
          {experience.map((r) => (
            <li key={`${r.company}-${r.start}`} className="timeline__item">
              <p className="timeline__when">
                {r.start} to {r.end}
              </p>
              <div>
                <h2 className="timeline__role">
                  {r.role}, <span>{r.company}</span>
                </h2>
                <p>{r.summary}</p>
                {r.highlights.length > 0 && (
                  <ul className="timeline__highlights">
                    {r.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                )}
                <ul className="tags" aria-label="Technologies">
                  {r.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <section className="feature-block">
          <h2>Full role history</h2>
          <p>
            My complete, up-to-date employment history, with companies, dates and responsibilities, is on LinkedIn and
            in my resume.
          </p>
          <div className="hero__ctas">
            <a className="btn btn--primary" href={profile.links.linkedin} target="_blank" rel="me noopener">
              <LinkedInIcon />
              Connect on LinkedIn
            </a>
            <ResumeLink />
          </div>
        </section>
      )}

      <p className="muted page-foot">
        See the work behind the timeline in <Link href="/projects">Projects</Link> and the tools in{" "}
        <Link href="/skills">Skills</Link>.
      </p>
    </div>
  );
}
