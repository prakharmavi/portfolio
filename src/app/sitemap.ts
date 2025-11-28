import type { MetadataRoute } from "next";

import { getAllProjects } from "@/lib/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://prakhar.ca"
  ).replace(/\/$/, "");
  const now = new Date();

  const projects = await getAllProjects();
  const projectEntries: MetadataRoute.Sitemap = projects.map(({ meta }) => ({
    url: `${siteUrl}/projects/${meta.slug}`,
    lastModified: meta.date ? new Date(meta.date) : now,
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
    {
      url: `${siteUrl}/about/notes/tech-stack`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  return [...base, ...projectEntries];
}
