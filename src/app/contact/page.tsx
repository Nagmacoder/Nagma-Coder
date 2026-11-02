import { Mail } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ResumeLink } from "@/components/ResumeLink";
import { LinkedInIcon, GitHubIcon } from "@/components/BrandIcons";
import { pageMetadata } from "@/lib/seo";
import { profile } from "@/content/profile";
import { hasResume } from "@/lib/resume";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Nagma, Full Stack Engineer and AI Builder, for full stack and AI engineering roles. Connect on LinkedIn or download the resume.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="wrap page">
      <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
      <header className="page-head">
        <h1 className="page-title">Contact Me</h1>
        <p className="page-lede">
          Open to full stack and AI engineering roles. LinkedIn is the fastest way to reach me.
        </p>
      </header>

      <ul className="contact-list">
        <li>
          <a className="contact-card" href={profile.links.linkedin} target="_blank" rel="me noopener">
            <LinkedInIcon size={26} />
            <span>
              <strong>Connect on LinkedIn</strong>
              <span className="muted">Message me directly</span>
            </span>
          </a>
        </li>
        {profile.links.email && (
          <li>
            <a className="contact-card" href={`mailto:${profile.links.email}`}>
              <Mail size={26} aria-hidden="true" />
              <span>
                <strong>Email</strong>
                <span className="muted">{profile.links.email}</span>
              </span>
            </a>
          </li>
        )}
        {profile.links.github && (
          <li>
            <a className="contact-card" href={profile.links.github} target="_blank" rel="me noopener">
              <GitHubIcon size={26} />
              <span>
                <strong>GitHub</strong>
                <span className="muted">Code and projects</span>
              </span>
            </a>
          </li>
        )}
      </ul>

      <section id="resume" className="feature-block">
        <h2>Resume</h2>
        {hasResume() ? (
          <p>The PDF has my full experience, education and skills.</p>
        ) : (
          <p>
            My resume isn&apos;t posted here yet. Send me a message on LinkedIn and I&apos;ll share the latest version.
          </p>
        )}
        <ResumeLink variant="primary" />
      </section>
    </div>
  );
}
