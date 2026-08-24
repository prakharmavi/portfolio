import { describe, expect, it } from "vitest";

import { createProjectPublishing } from "@/lib/project-publishing/core";

const ProjectBody = () => null;

function validMetadata(overrides: Record<string, unknown> = {}) {
  return {
    slug: "alpha",
    title: "Alpha",
    description: "The Alpha project",
    thumbnail: "/images/alpha.jpg",
    ...overrides,
  };
}

describe("Project publishing", () => {
  it("lists summaries and returns a renderable detail by published slug", async () => {
    const projects = createProjectPublishing(async () => [
      {
        source: "renamed-file.mdx",
        load: async () => ({
          metadata: validMetadata(),
          Content: ProjectBody,
        }),
      },
    ]);

    await expect(projects.listPublishedProjects()).resolves.toEqual([
      {
        slug: "alpha",
        path: "/projects/alpha",
        title: "Alpha",
        description: "The Alpha project",
        thumbnail: "/images/alpha.jpg",
        tags: [],
        links: [],
        featured: false,
      },
    ]);
    await expect(projects.getPublishedProject("alpha")).resolves.toEqual({
      project: {
        slug: "alpha",
        path: "/projects/alpha",
        title: "Alpha",
        description: "The Alpha project",
        thumbnail: "/images/alpha.jpg",
        tags: [],
        links: [],
        featured: false,
      },
      Content: ProjectBody,
    });
  });

  it("returns null when a published slug is missing", async () => {
    const projects = createProjectPublishing(async () => []);

    await expect(projects.getPublishedProject("missing")).resolves.toBeNull();
  });

  it("orders dated projects newest first, then slug, with undated projects last", async () => {
    const fixtures = [
      validMetadata({ slug: "undated", title: "Undated" }),
      validMetadata({ slug: "zulu", title: "Zulu", date: "2026-01-20" }),
      validMetadata({ slug: "alpha", title: "Alpha", date: "2026-01-20" }),
      validMetadata({ slug: "older", title: "Older", date: "2025-12-01" }),
    ];
    const projects = createProjectPublishing(async () =>
      fixtures.map((metadata, index) => ({
        source: `project-${index}.mdx`,
        load: async () => ({ metadata, Content: ProjectBody }),
      })),
    );

    const summaries = await projects.listPublishedProjects();

    expect(summaries.map(({ slug }) => slug)).toEqual([
      "alpha",
      "zulu",
      "older",
      "undated",
    ]);
  });

  it("uses code-point slug order for date ties", async () => {
    const projects = createProjectPublishing(async () =>
      ["alpha", "Beta"].map((slug) => ({
        source: `${slug}.mdx`,
        load: async () => ({
          metadata: validMetadata({ slug, date: "2026-01-20" }),
          Content: ProjectBody,
        }),
      })),
    );

    const summaries = await projects.listPublishedProjects();

    expect(summaries.map(({ slug }) => slug)).toEqual(["Beta", "alpha"]);
  });

  it("rejects missing required metadata with its source and field", async () => {
    const metadata = validMetadata();
    delete (metadata as Record<string, unknown>).title;
    const projects = createProjectPublishing(async () => [
      {
        source: "missing-title.mdx",
        load: async () => ({ metadata, Content: ProjectBody }),
      },
    ]);

    await expect(projects.listPublishedProjects()).rejects.toThrow(
      "missing-title.mdx: project.title is required",
    );
  });

  it("rejects empty required strings", async () => {
    const projects = createProjectPublishing(async () => [
      {
        source: "empty-slug.mdx",
        load: async () => ({
          metadata: validMetadata({ slug: "   " }),
          Content: ProjectBody,
        }),
      },
    ]);

    await expect(projects.listPublishedProjects()).rejects.toThrow(
      "empty-slug.mdx: project.slug must be a non-empty string",
    );
  });

  it("rejects dates that are not ISO calendar dates", async () => {
    const projects = createProjectPublishing(async () => [
      {
        source: "bad-date.mdx",
        load: async () => ({
          metadata: validMetadata({ date: "2026-02-30" }),
          Content: ProjectBody,
        }),
      },
    ]);

    await expect(projects.listPublishedProjects()).rejects.toThrow(
      "bad-date.mdx: project.date must be an ISO calendar date (YYYY-MM-DD)",
    );
  });

  it("rejects unsupported link types", async () => {
    const projects = createProjectPublishing(async () => [
      {
        source: "bad-link-type.mdx",
        load: async () => ({
          metadata: validMetadata({
            links: [{ label: "Launch", url: "https://example.com", type: "video" }],
          }),
          Content: ProjectBody,
        }),
      },
    ]);

    await expect(projects.listPublishedProjects()).rejects.toThrow(
      "bad-link-type.mdx: project.links[0].type is unsupported",
    );
  });

  it.each([
    ["label", { label: " ", url: "https://example.com" }, "must be a non-empty string"],
    ["url", { label: "Launch", url: "not-a-url" }, "must be an absolute HTTP(S) URL"],
  ])("rejects invalid link %s values", async (field, link, message) => {
    const projects = createProjectPublishing(async () => [
      {
        source: `bad-link-${field}.mdx`,
        load: async () => ({
          metadata: validMetadata({ links: [link] }),
          Content: ProjectBody,
        }),
      },
    ]);

    await expect(projects.listPublishedProjects()).rejects.toThrow(
      `bad-link-${field}.mdx: project.links[0].${field} ${message}`,
    );
  });

  it.each([
    ["tags", { tags: ["TypeScript", " "] }, "project.tags[1] must be a non-empty string"],
    ["featured", { featured: "yes" }, "project.featured must be a boolean"],
  ])("rejects invalid optional %s metadata", async (field, overrides, message) => {
    const projects = createProjectPublishing(async () => [
      {
        source: `bad-${field}.mdx`,
        load: async () => ({
          metadata: validMetadata(overrides),
          Content: ProjectBody,
        }),
      },
    ]);

    await expect(projects.listPublishedProjects()).rejects.toThrow(
      `bad-${field}.mdx: ${message}`,
    );
  });

  it("rejects duplicate published slugs and names both sources", async () => {
    const projects = createProjectPublishing(async () => [
      {
        source: "first.mdx",
        load: async () => ({ metadata: validMetadata(), Content: ProjectBody }),
      },
      {
        source: "second.mdx",
        load: async () => ({ metadata: validMetadata(), Content: ProjectBody }),
      },
    ]);

    await expect(projects.listPublishedProjects()).rejects.toThrow(
      'duplicate published slug "alpha" in first.mdx and second.mdx',
    );
  });

  it("reports validation errors from more than one Project together", async () => {
    const missingTitle = validMetadata();
    delete (missingTitle as Record<string, unknown>).title;
    const projects = createProjectPublishing(async () => [
      {
        source: "missing-title.mdx",
        load: async () => ({ metadata: missingTitle, Content: ProjectBody }),
      },
      {
        source: "bad-date.mdx",
        load: async () => ({
          metadata: validMetadata({ date: "tomorrow" }),
          Content: ProjectBody,
        }),
      },
    ]);

    const result = projects.listPublishedProjects();

    await expect(result).rejects.toThrow("missing-title.mdx: project.title is required");
    await expect(result).rejects.toThrow(
      "bad-date.mdx: project.date must be an ISO calendar date (YYYY-MM-DD)",
    );
  });

  it("reports every safe validation error from one Project", async () => {
    const metadata = validMetadata({
      date: "tomorrow",
      tags: [""],
    });
    delete (metadata as Record<string, unknown>).title;
    const projects = createProjectPublishing(async () => [
      {
        source: "several-errors.mdx",
        load: async () => ({ metadata, Content: ProjectBody }),
      },
    ]);

    const result = projects.listPublishedProjects();

    await expect(result).rejects.toThrow(
      "several-errors.mdx: project.title is required",
    );
    await expect(result).rejects.toThrow(
      "several-errors.mdx: project.date must be an ISO calendar date (YYYY-MM-DD)",
    );
    await expect(result).rejects.toThrow(
      "several-errors.mdx: project.tags[0] must be a non-empty string",
    );
  });

  it("reports content and duplicate errors alongside invalid metadata", async () => {
    const projects = createProjectPublishing(async () => [
      {
        source: "first.mdx",
        load: async () => ({ metadata: validMetadata(), Content: ProjectBody }),
      },
      {
        source: "second.mdx",
        load: async () => ({
          metadata: validMetadata({ date: "tomorrow" }),
          Content: undefined,
        }),
      },
    ]);

    const result = projects.listPublishedProjects();

    await expect(result).rejects.toThrow(
      "second.mdx: project.date must be an ISO calendar date (YYYY-MM-DD)",
    );
    await expect(result).rejects.toThrow(
      "second.mdx: default Project content export is required",
    );
    await expect(result).rejects.toThrow(
      'duplicate published slug "alpha" in first.mdx and second.mdx',
    );
  });

  it("reuses one catalog load across repeated list and lookup calls", async () => {
    let discoveryCount = 0;
    let loadCount = 0;
    const projects = createProjectPublishing(
      async () => {
        discoveryCount += 1;
        return [
          {
            source: "alpha.mdx",
            load: async () => {
              loadCount += 1;
              return { metadata: validMetadata(), Content: ProjectBody };
            },
          },
        ];
      },
      { cache: true },
    );

    await projects.listPublishedProjects();
    await projects.getPublishedProject("alpha");
    await projects.listPublishedProjects();

    expect({ discoveryCount, loadCount }).toEqual({
      discoveryCount: 1,
      loadCount: 1,
    });
  });
});
