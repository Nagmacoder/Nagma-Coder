import Link from "next/link";
import { Briefcase, Code2, Sparkles } from "lucide-react";
import { profile } from "@/content/profile";

/** Optional shortcuts. Plain links; nothing here is a required step. */
export function AudienceShortcuts() {
  const codeHref = profile.links.github ?? "/projects/nagma-exe-portfolio";
  const codeExternal = Boolean(profile.links.github);
  return (
    <section className="shortcuts" aria-labelledby="shortcuts-title">
      <h2 id="shortcuts-title" className="shortcuts__title">
        What brings you here?
      </h2>
      <ul className="shortcuts__list">
        <li>
          <Link href="/contact" className="shortcut">
            <Briefcase aria-hidden="true" size={20} />
            <span>
              <strong>Hire me</strong>
              <span className="muted">Recruiters: resume, LinkedIn and contact</span>
            </span>
          </Link>
        </li>
        <li>
          <a
            href={codeHref}
            className="shortcut"
            {...(codeExternal ? { target: "_blank", rel: "noopener" } : {})}
          >
            <Code2 aria-hidden="true" size={20} />
            <span>
              <strong>Explore my code</strong>
              <span className="muted">Engineering managers: architecture and decisions</span>
            </span>
          </a>
        </li>
        <li>
          <Link href="/ai-lab" className="shortcut">
            <Sparkles aria-hidden="true" size={20} />
            <span>
              <strong>See my AI projects</strong>
              <span className="muted">Founders: what I&apos;m building with LLMs</span>
            </span>
          </Link>
        </li>
      </ul>
    </section>
  );
}
