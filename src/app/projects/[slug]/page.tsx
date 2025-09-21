import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, getProjectContentModule, projects } from "@/lib/projects";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Project" };
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://prakhar.ca";
  const url = `${siteUrl.replace(/\/$/, "")}/projects/${project.slug}`;
  return {
    title: `${project.title} — Project Story`,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${project.title} — Project Story`,
      description: project.summary,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Project Story`,
      description: project.summary,
      images: [project.image],
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return notFound();

  const contentModule = await getProjectContentModule(project.slug);
  if (!contentModule) return notFound();

  const { default: ProjectStory, metadata } = contentModule;
  const heroAltMeta =
    metadata && typeof metadata["heroAlt"] === "string" ? (metadata["heroAlt"] as string) : null;
  const heroAlt = heroAltMeta && heroAltMeta.trim().length > 0 ? heroAltMeta : project.title;

  return (
    <main className="px-4">
      <article className="mt-8 relative w-full max-w-3xl bg-white border border-gray-200 rounded-[24px] mx-2 sm:mx-auto overflow-hidden">
        <div className="p-3 md:p-4">
          <Link
            href="/#projects"
            aria-label="Go back to Projects"
            className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 focus:outline-hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-3.5"
              aria-hidden
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>
        </div>
        <div className="relative w-full aspect-[16/9] bg-gray-100">
          <Image
            src={project.image}
            alt={heroAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
            className="object-contain p-8"
            priority
          />
        </div>

        <div className="p-6 md:p-8">
          <h1 className="text-2xl font-semibold text-gray-900">{project.title}</h1>
          {project.tags?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span key={t} className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-700">
                  {t}
                </span>
              ))}
            </div>
          ) : null}

          <p className="mt-4 text-gray-600">{project.summary}</p>

          <div className="mt-8 space-y-6 text-gray-700">
            <ProjectStory />
          </div>
        </div>
      </article>
    </main>
  );
}
