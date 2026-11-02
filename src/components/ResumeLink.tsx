import { Download } from "lucide-react";
import Link from "next/link";
import { profile } from "@/content/profile";
import { hasResume } from "@/lib/resume";

type Props = { variant?: "primary" | "ghost"; className?: string };

/**
 * "Download Resume" when public/resume.pdf exists.
 * Otherwise an honest fallback that sends people to the contact options.
 */
export function ResumeLink({ variant = "ghost", className = "" }: Props) {
  const cls = `btn btn--${variant} ${className}`.trim();
  if (hasResume()) {
    return (
      <a
        className={cls}
        href={profile.resumePath}
        download={profile.resumeFileName}
        aria-label={`Download Resume: ${profile.name}, PDF`}
      >
        <Download size={18} aria-hidden="true" />
        Download Resume
      </a>
    );
  }
  return (
    <Link className={cls} href="/contact#resume">
      Request my resume
    </Link>
  );
}
