import Link from "next/link";
import { profile } from "@/content/profile";
import { LinkedInIcon, GitHubIcon } from "./BrandIcons";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <p className="site-footer__name">{profile.name}</p>
          <p className="muted">Full Stack Engineer building web products and exploring AI.</p>
        </div>
        <nav aria-label="Footer" className="site-footer__links">
          <Link href="/projects">Projects</Link>
          <Link href="/ai-lab">AI Lab</Link>
          <Link href="/skills">Skills</Link>
          <Link href="/experience">Experience</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="site-footer__social">
          <a href={profile.links.linkedin} rel="me noopener" target="_blank" aria-label="Nagma on LinkedIn (opens in a new tab)">
            <LinkedInIcon />
          </a>
          {profile.links.github && (
            <a href={profile.links.github} rel="me noopener" target="_blank" aria-label="Nagma on GitHub (opens in a new tab)">
              <GitHubIcon />
            </a>
          )}
        </div>
      </div>
      <p className="site-footer__fine">
        Built with Next.js and a little Three.js. No trackers, no cookies.
      </p>
    </footer>
  );
}
