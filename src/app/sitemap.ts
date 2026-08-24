import type { MetadataRoute } from "next";

import { listPublishedProjects } from "@/lib/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://pmavi.com"
  ).replace(/\/$/, "");
  const now = new Date();

  const projects = await listPublishedProjects();
  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}${project.path}`,
    lastModified: project.date
      ? new Date(`${project.date}T00:00:00.000Z`)
      : now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const base: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  return [...base, ...projectEntries];
}
