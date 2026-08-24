import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPublishedProject, listPublishedProjects } from "@/lib/projects";
import LiveDemo from "@/components/LiveDemo";
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
  const liveLink = meta.links.find(
    (link) => link.type === "live" || link.type === "demo",
  );
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

      {liveLink ? (
        <div className="border-b border-gray-100 px-6 py-8 sm:px-10 md:px-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display mb-4 text-xl font-bold tracking-tight text-gray-900">
              Try it
            </h2>
            <LiveDemo url={liveLink.url} title={meta.title} />
          </div>
        </div>
      ) : null}

      <div className="px-6 py-8 sm:px-10 md:px-14 md:py-12">
        <div className="prose prose-gray mx-auto max-w-3xl prose-headings:font-display prose-headings:tracking-tight prose-h2:mt-10 prose-h2:text-2xl prose-h3:text-lg prose-p:leading-relaxed prose-a:font-medium prose-a:text-gray-900 prose-a:underline-offset-4 prose-pre:rounded-xl prose-pre:bg-gray-950 prose-img:rounded-xl prose-hr:my-8">
          <Content />
        </div>
      </div>
    </article>
  );
}
