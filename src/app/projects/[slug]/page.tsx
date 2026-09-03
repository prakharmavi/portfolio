import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPublishedProject, listPublishedProjects } from "@/lib/projects";
import ProjectHeader from "@/components/ProjectHeader";

type ProjectParams = Promise<{ slug: string }>;

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateStaticParams() {
  const projects = await listPublishedProjects();
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: ProjectParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const detail = await getPublishedProject(slug);

  if (!detail) notFound();

  const { project } = detail;
  const { title, description, thumbnail, date } = project;
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://pmavi.com"
  ).replace(/\/$/, "");
  const url = `${siteUrl}${project.path}`;
  const ogImage = thumbnail
    ? [{ url: thumbnail, width: 1200, height: 630, alt: title }]
    : [];

  return {
    title: `${title} | Project`,
    description: description,
    openGraph: {
      title: `${title} | Prakhar Mavi`,
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
      title: `${title} | Prakhar Mavi`,
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
  const { slug } = await params;
  const detail = await getPublishedProject(slug);

  if (!detail) notFound();

  const { project: meta, Content } = detail;
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://pmavi.com"
  ).replace(/\/$/, "");
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
    url: `${siteUrl}${meta.path}`,
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ProjectHeader project={meta} />

      <section className="px-6 py-16 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-gray-500">
              Case study
            </p>
          </aside>
          <div className="prose prose-lg prose-gray max-w-none lg:col-span-7 lg:col-start-5 prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-[-0.035em] prose-h2:mt-16 prose-h2:border-t prose-h2:border-gray-300 prose-h2:pt-8 prose-h2:text-3xl prose-h3:mt-10 prose-h3:text-xl prose-p:leading-relaxed prose-a:font-medium prose-a:text-gray-900 prose-a:underline-offset-4 prose-pre:rounded-none prose-pre:bg-gray-950 prose-img:rounded-none prose-hr:my-12">
            <Content />
          </div>
        </div>
      </section>
    </article>
  );
}
