import path from "node:path";
import { readdir } from "node:fs/promises";

import type { Project, ProjectEntry } from "@/types/project";

const projectsDir = path.join(process.cwd(), "src/content/projects");

type ProjectModule = {
  default: ProjectEntry["Component"];
  project: Project;
};

async function getProjectSlugs() {
  const entries = await readdir(projectsDir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name.replace(/\.mdx$/, ""));
}

async function importProjectModule(fileSlug: string): Promise<ProjectEntry> {
  const mod = (await import(
    `../content/projects/${fileSlug}.mdx`
  )) as unknown as ProjectModule;

  if (!mod?.project) {
    throw new Error(`Project metadata missing for slug: ${fileSlug}`);
  }

  const metadata: Project = {
    ...mod.project,
    slug: mod.project.slug ?? fileSlug,
  };

  return {
    fileSlug,
    meta: metadata,
    Component: mod.default,
  };
}

export async function getAllProjects(): Promise<ProjectEntry[]> {
  const slugs = await getProjectSlugs();
  const projects = await Promise.all(slugs.map(importProjectModule));
  return projects;
}

export async function getProjectBySlug(slug: string): Promise<ProjectEntry> {
  const fileSlugs = await getProjectSlugs();

  for (const fileSlug of fileSlugs) {
    const project = await importProjectModule(fileSlug);
    if (project.meta.slug === slug) {
      return project;
    }
  }

  throw new Error(`Project not found for slug: ${slug}`);
}
