import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getAllProjects, getProjectBySlug } from "@/lib/projects";

type ProjectParams = Promise<{ slug: string }>;

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map(({ meta }) => ({ slug: meta.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: ProjectParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug).catch(() => null);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  const { title, description, thumbnail, date } = project.meta;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://prakhar.ca";
  const url = `${siteUrl}/projects/${slug}`;
  const ogImage = thumbnail
    ? [{ url: thumbnail, width: 1200, height: 630, alt: title }]
    : [];

  return {
    title: `${title} — Project`,
    description: description,
    openGraph: {
      title: `${title} — Prakhar Mavi`,
      description: description,
      url,
      siteName: "Prakhar Mavi",
      locale: "en_US",
      type: "article",
      publishedTime: date,
      authors: ["Prakhar Mavi"],
      images: ogImage,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Prakhar Mavi`,
      description: description,
      images: ogImage,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: ProjectParams;
}) {
  try {
    const { slug } = await params;
    const { meta, Component } = await getProjectBySlug(slug);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://prakhar.ca";

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      name: meta.title,
      description: meta.description,
      author: {
        "@type": "Person",
        name: "Prakhar Mavi",
        url: siteUrl,
      },
      datePublished: meta.date,
      image: meta.thumbnail ? `${siteUrl}${meta.thumbnail}` : undefined,
      url: `${siteUrl}/projects/${meta.slug}`,
    };

    return (
      <article className="prose lg:prose-xl mx-auto max-w-3xl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <h1>{meta.title}</h1>
        {meta.description ? <p className="lead">{meta.description}</p> : null}
        <Component />
      </article>
    );
  } catch {
    return notFound();
  }
}
