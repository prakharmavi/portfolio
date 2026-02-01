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
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-10 md:px-10 md:py-16">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 focus:outline-hidden"
          >
            <LuArrowLeft className="size-4" aria-hidden />
            <span>Back to projects</span>
          </Link>
          {primaryLink ? (
            <Link
              href={primaryLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 focus:outline-hidden"
            >
              <span>{primaryLink.label}</span>
              <LuExternalLink className="size-4" aria-hidden />
            </Link>
          ) : null}
        </div>
        <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="px-6 py-10 md:px-12 md:py-12">{children}</div>
        </div>
      </div>
    </main>
  );
}
