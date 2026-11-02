import { existsSync } from "node:fs";
import path from "node:path";
import { profile } from "@/content/profile";

/** Checked at build/render time on the server. Put the file at public/resume.pdf. */
export function hasResume(): boolean {
  return existsSync(path.join(process.cwd(), "public", profile.resumePath.replace(/^\//, "")));
}
