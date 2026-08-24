import type { ComponentType } from "react";

import type {
  Project,
  ProjectLink,
  PublishedProject,
  PublishedProjectDetail,
} from "@/types/project";

export type ProjectSource = {
  source: string;
  load: () => Promise<{
    metadata: unknown;
    Content: unknown;
  }>;
};

type PublishingOptions = {
  cache?: boolean;
};

const requiredFields = ["slug", "title", "description", "thumbnail"] as const;
const linkTypes = new Set(["live", "repo", "demo", "press", "writeup"]);

function isIsoCalendarDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

function isHttpUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function validateProjectMetadata(metadata: unknown, source: string): Project {
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
    throw new Error(`${source}: project metadata is required`);
  }

  const record = metadata as Record<string, unknown>;
  const errors: string[] = [];
  const required: Partial<Record<(typeof requiredFields)[number], string>> = {};

  for (const field of requiredFields) {
    const value = record[field];
    if (!(field in record)) {
      errors.push(`${source}: project.${field} is required`);
      continue;
    }
    if (typeof value !== "string" || value.trim() === "") {
      errors.push(
        `${source}: project.${field} must be a non-empty string`,
      );
      continue;
    }
    required[field] = value.trim();
  }

  const date = record.date;
  if (date !== undefined && !isIsoCalendarDate(date)) {
    errors.push(
      `${source}: project.date must be an ISO calendar date (YYYY-MM-DD)`,
    );
  }

  const links = record.links;
  if (links !== undefined && !Array.isArray(links)) {
    errors.push(`${source}: project.links must be an array`);
  }
  const normalizedLinks: ProjectLink[] = [];
  (Array.isArray(links) ? links : []).forEach((link, index) => {
    if (!link || typeof link !== "object" || Array.isArray(link)) {
      errors.push(`${source}: project.links[${index}] must be an object`);
      return;
    }
    const { label, url, type } = link as Record<string, unknown>;
    let valid = true;
    if (typeof label !== "string" || label.trim() === "") {
      errors.push(
        `${source}: project.links[${index}].label must be a non-empty string`,
      );
      valid = false;
    }
    if (!isHttpUrl(url)) {
      errors.push(
        `${source}: project.links[${index}].url must be an absolute HTTP(S) URL`,
      );
      valid = false;
    }
    if (
      type !== undefined &&
      (typeof type !== "string" || !linkTypes.has(type))
    ) {
      errors.push(`${source}: project.links[${index}].type is unsupported`);
      valid = false;
    }
    if (valid) {
      normalizedLinks.push({
        label: (label as string).trim(),
        url: (url as string).trim(),
        ...(type ? { type: type as ProjectLink["type"] } : {}),
      });
    }
  });

  const tags = record.tags;
  if (tags !== undefined && !Array.isArray(tags)) {
    errors.push(`${source}: project.tags must be an array`);
  }
  const normalizedTags: string[] = [];
  (Array.isArray(tags) ? tags : []).forEach((tag, index) => {
    if (typeof tag !== "string" || tag.trim() === "") {
      errors.push(
        `${source}: project.tags[${index}] must be a non-empty string`,
      );
      return;
    }
    normalizedTags.push(tag.trim());
  });

  const featured = record.featured;
  if (featured !== undefined && typeof featured !== "boolean") {
    errors.push(`${source}: project.featured must be a boolean`);
  }

  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }

  return {
    slug: required.slug!,
    title: required.title!,
    description: required.description!,
    thumbnail: required.thumbnail!,
    links: normalizedLinks,
    tags: normalizedTags,
    ...(featured !== undefined ? { featured: featured as boolean } : {}),
    ...(date !== undefined ? { date: date as string } : {}),
  };
}

function normalize(metadata: unknown, source: string): PublishedProject {
  const project = validateProjectMetadata(metadata, source);
  return {
    slug: project.slug,
    path: `/projects/${project.slug}`,
    title: project.title,
    description: project.description,
    thumbnail: project.thumbnail,
    tags: project.tags ?? [],
    links: project.links ?? [],
    featured: project.featured ?? false,
    ...(project.date ? { date: project.date } : {}),
  };
}

function validateContent(
  Content: unknown,
  source: string,
): ComponentType<unknown> {
  if (typeof Content !== "function") {
    throw new Error(`${source}: default Project content export is required`);
  }
  return Content as ComponentType<unknown>;
}

function readPublishedSlug(metadata: unknown) {
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
    return undefined;
  }
  const slug = (metadata as Record<string, unknown>).slug;
  return typeof slug === "string" && slug.trim() !== ""
    ? slug.trim()
    : undefined;
}

function compareProjects(a: PublishedProject, b: PublishedProject) {
  if (a.date && b.date && a.date !== b.date) {
    return b.date.localeCompare(a.date);
  }
  if (a.date && !b.date) return -1;
  if (!a.date && b.date) return 1;
  if (a.slug < b.slug) return -1;
  if (a.slug > b.slug) return 1;
  return 0;
}

export function createProjectPublishing(
  discover: () => Promise<ProjectSource[]>,
  options: PublishingOptions = {},
) {
  async function loadCatalog() {
    let sources: ProjectSource[];
    try {
      sources = await discover();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Unable to discover Projects: ${message}`);
    }

    const results = await Promise.allSettled(
      sources.map(async (source) => {
        let projectModule: Awaited<ReturnType<ProjectSource["load"]>>;
        try {
          projectModule = await source.load();
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          throw new Error(`${source.source}: failed to load Project: ${message}`);
        }
        const errors: string[] = [];
        let project: PublishedProject | undefined;
        let Content: ComponentType<unknown> | undefined;
        try {
          project = normalize(projectModule.metadata, source.source);
        } catch (error) {
          errors.push(error instanceof Error ? error.message : String(error));
        }
        try {
          Content = validateContent(projectModule.Content, source.source);
        } catch (error) {
          errors.push(error instanceof Error ? error.message : String(error));
        }

        return {
          source: source.source,
          slug: readPublishedSlug(projectModule.metadata),
          project,
          Content,
          errors,
        };
      }),
    );
    const inspections = results.flatMap((result) =>
      result.status === "fulfilled" ? [result.value] : [],
    );
    const catalog = inspections.flatMap((inspection) =>
      inspection.project && inspection.Content
        ? [
            {
              source: inspection.source,
              project: inspection.project,
              Content: inspection.Content,
            },
          ]
        : [],
    );
    const errors = results.flatMap((result) =>
      result.status === "rejected"
        ? [
            result.reason instanceof Error
              ? result.reason.message
              : String(result.reason),
          ]
        : [],
    );
    errors.push(...inspections.flatMap((inspection) => inspection.errors));
    const slugs = new Map<string, string>();
    for (const inspection of inspections) {
      if (!inspection.slug) continue;
      const firstSource = slugs.get(inspection.slug);
      if (firstSource) {
        errors.push(
          `duplicate published slug "${inspection.slug}" in ${firstSource} and ${inspection.source}`,
        );
      } else {
        slugs.set(inspection.slug, inspection.source);
      }
    }
    if (errors.length > 0) {
      throw new Error(`Invalid Project catalog:\n${errors.join("\n")}`);
    }
    return catalog.sort((a, b) => compareProjects(a.project, b.project));
  }

  let catalogPromise: ReturnType<typeof loadCatalog> | undefined;
  function getCatalog() {
    if (!options.cache) return loadCatalog();
    catalogPromise ??= loadCatalog();
    return catalogPromise;
  }

  return {
    async listPublishedProjects(): Promise<PublishedProject[]> {
      return (await getCatalog()).map(({ project }) => project);
    },
    async getPublishedProject(
      slug: string,
    ): Promise<PublishedProjectDetail | null> {
      const entry = (await getCatalog()).find(
        ({ project }) => project.slug === slug,
      );
      return entry ? { project: entry.project, Content: entry.Content } : null;
    },
  };
}
