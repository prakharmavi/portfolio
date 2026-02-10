import type { ReactNode } from "react";
import Link from "next/link";
import { LuArrowLeft, LuExternalLink } from "react-icons/lu";

import { getProjectBySlug } from "@/lib/projects";

type ProjectLayoutProps = {
  children: ReactNode;
  params: Promise<{ slug: string }>;
};

export default async function ProjectLayout({
  children,
  params,
}: ProjectLayoutProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug).catch(() => null);

  const primaryLink =
    project?.meta.links?.find((link) => link.type === "live") ??
    project?.meta.links?.[0];

  return (
    <main className="min-h-dvh w-full bg-gray-50">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6 md:px-10 md:py-14">
        <nav className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition-all hover:border-gray-300 hover:text-gray-900 hover:shadow-md focus:outline-hidden"
          >
            <LuArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
            <span>Back to projects</span>
          </Link>
          {primaryLink ? (
            <Link
              href={primaryLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-gray-800 hover:shadow-md focus:outline-hidden"
            >
              <span>{primaryLink.label}</span>
              <LuExternalLink className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          ) : null}
        </nav>
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm sm:rounded-3xl">
          {children}
        </div>
      </div>
    </main>
  );
}
