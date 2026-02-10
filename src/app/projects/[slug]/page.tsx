import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LuCalendar, LuExternalLink, LuGithub } from "react-icons/lu";

import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import LiveDemo from "@/components/LiveDemo";

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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pmavi.com";
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

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const linkIcons: Record<string, typeof LuExternalLink> = {
  repo: LuGithub,
};

export default async function ProjectPage({
  params,
}: {
  params: ProjectParams;
}) {
  try {
    const { slug } = await params;
    const { meta, Component } = await getProjectBySlug(slug);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pmavi.com";

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
      <article>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Header */}
        <div className="border-b border-gray-100 px-6 pt-8 pb-8 sm:px-10 md:px-14 md:pt-10 md:pb-10">
          <div className="mx-auto max-w-3xl">
            {meta.date ? (
              <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                <LuCalendar className="size-3.5" aria-hidden />
                <time dateTime={meta.date}>{formatDate(meta.date)}</time>
              </div>
            ) : null}

            <h1 className="font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {meta.title}
            </h1>

            {meta.description ? (
              <p className="mt-3 text-lg leading-relaxed text-gray-600">
                {meta.description}
              </p>
            ) : null}

            {meta.tags && meta.tags.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            {meta.links && meta.links.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-3">
                {meta.links.map((link) => {
                  const Icon = linkIcons[link.type ?? ""] ?? LuExternalLink;
                  return (
                    <Link
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-gray-300 hover:shadow-sm"
                    >
                      <Icon className="size-4" aria-hidden />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>

        {/* Try It - Live Demo */}
        {(() => {
          const liveLink = meta.links?.find((l) => l.type === "live" || l.type === "demo");
          return liveLink ? (
            <div className="border-b border-gray-100 px-6 py-8 sm:px-10 md:px-14">
              <div className="mx-auto max-w-3xl">
                <h2 className="font-display mb-4 text-xl font-bold tracking-tight text-gray-900">
                  Try It
                </h2>
                <LiveDemo url={liveLink.url} title={meta.title} />
              </div>
            </div>
          ) : null;
        })()}

        {/* MDX Content */}
        <div className="px-6 py-8 sm:px-10 md:px-14 md:py-12">
          <div className="prose prose-gray mx-auto max-w-3xl prose-headings:font-display prose-headings:tracking-tight prose-h2:mt-10 prose-h2:text-2xl prose-h3:text-lg prose-p:leading-relaxed prose-a:font-medium prose-a:text-gray-900 prose-a:underline-offset-4 prose-pre:rounded-xl prose-pre:bg-gray-950 prose-img:rounded-xl prose-hr:my-8">
            <Component />
          </div>
        </div>
      </article>
    );
  } catch {
    return notFound();
  }
}
