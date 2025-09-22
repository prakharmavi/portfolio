import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getAllProjects, getProjectBySlug } from "@/lib/projects";

type ProjectParams = { slug: string };

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
  const project = await getProjectBySlug(params.slug).catch(() => null);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: `${project.meta.title} — Project`,
    description: project.meta.description,
  };
}

export default async function ProjectPage({ params }: { params: ProjectParams }) {
  try {
    const { meta, Component } = await getProjectBySlug(params.slug);

    return (
      <article className="prose lg:prose-xl mx-auto max-w-3xl">
        <h1>{meta.title}</h1>
        {meta.description ? <p className="lead">{meta.description}</p> : null}
        <Component />
      </article>
    );
  } catch {
    return notFound();
  }
}
