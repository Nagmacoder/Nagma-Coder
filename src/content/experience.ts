/**
 * Employment timeline.
 *
 * TODO(Nagma): this is intentionally empty. Add only verified roles, newest first.
 * While it is empty, the site shows your 5+ years summary and points to LinkedIn
 * for the full history instead of inventing entries.
 *
 * Example shape:
 * {
 *   company: "Company name",
 *   role: "Senior Software Engineer",
 *   start: "2022",
 *   end: "Present",
 *   summary: "One sentence on the product and your scope.",
 *   highlights: ["What you built or owned, in plain words"],
 *   stack: ["React", "Node.js"],
 * }
 */

export type Role = {
  company: string;
  role: string;
  start: string;
  end: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experience: Role[] = [];
