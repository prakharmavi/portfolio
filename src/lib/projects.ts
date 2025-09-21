import type { ComponentType } from "react";

export type Project = {
  slug: string;
  title: string;
  tags: string[];
  summary: string;
  image: string; // public/ path, e.g. "/window.svg"
};

export const projects: Project[] = [
  {
    slug: "portfolio-site",
    title: "Portfolio Site",
    tags: ["Next.js", "React", "Tailwind"],
    summary:
      "Personal site built with Next.js 15, React 19, and Tailwind 4 with a focus on clean UI and fast loads.",
    image: "/window.svg",
  },
  {
    slug: "ui-component-kit",
    title: "UI Component Kit",
    tags: ["Design System", "Accessibility"],
    summary:
      "Reusable patterns and components aligned to this site’s design system, emphasizing accessibility and consistency.",
    image: "/file.svg",
  },
  {
    slug: "data-dashboards",
    title: "Data Dashboards",
    tags: ["Charts", "Tables"],
    summary:
      "Lightweight dashboards with filters and tables, prioritizing clarity and performance.",
    image: "/globe.svg",
  },
];

export type ProjectSlug = (typeof projects)[number]["slug"];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

type ProjectContentModule = {
  default: ComponentType<Record<string, unknown>>;
  metadata?: Record<string, unknown>;
};

const projectContentLoaders: Record<ProjectSlug, () => Promise<ProjectContentModule>> = {
  "portfolio-site": async () =>
    (await import("@/content/projects/portfolio-site.mdx")) as ProjectContentModule,
  "ui-component-kit": async () =>
    (await import("@/content/projects/ui-component-kit.mdx")) as ProjectContentModule,
  "data-dashboards": async () =>
    (await import("@/content/projects/data-dashboards.mdx")) as ProjectContentModule,
};

export async function getProjectContentModule(slug: string) {
  const loader = projectContentLoaders[slug as ProjectSlug];
  if (!loader) return null;
  return loader();
}
