import path from "node:path";
import { readdir } from "node:fs/promises";

import { createProjectPublishing } from "@/lib/project-publishing/core";

const projectsDirectory = path.join(process.cwd(), "src/content/projects");

async function discoverProjectSources() {
  const entries = await readdir(projectsDirectory, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => {
      const fileName = entry.name;
      const fileSlug = fileName.replace(/\.mdx$/, "");

      return {
        source: fileName,
        load: async () => {
          const projectModule = (await import(
            `../content/projects/${fileSlug}.mdx`
          )) as unknown as {
            project?: unknown;
            default?: unknown;
          };

          return {
            metadata: projectModule.project,
            Content: projectModule.default,
          };
        },
      };
    });
}

const publishing = createProjectPublishing(discoverProjectSources, {
  // Next dev HMR replaces this server module after an MDX dependency changes.
  cache: true,
});

export const listPublishedProjects = publishing.listPublishedProjects;
export const getPublishedProject = publishing.getPublishedProject;
