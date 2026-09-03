import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LuArrowLeft, LuArrowUpRight } from "react-icons/lu";

import { getPublishedProject } from "@/lib/projects";

type ProjectLayoutProps = {
  children: ReactNode;
  params: Promise<{ slug: string }>;
};

export default async function ProjectLayout({
  children,
  params,
}: ProjectLayoutProps) {
  const { slug } = await params;
  const detail = await getPublishedProject(slug);

  if (!detail) notFound();

  const primaryLink =
    detail.project.links.find((link) => link.type === "live") ??
    detail.project.links[0];

  return (
    <main className="min-h-dvh w-full bg-white">
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-5 md:px-10">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-3 text-sm font-medium text-gray-700 hover:text-gray-950 focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <LuArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
            <span>Back to projects</span>
          </Link>
          {primaryLink ? (
            <Link
              href={primaryLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border-b border-gray-900 pb-1 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-500 focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <span>{primaryLink.label}</span>
              <LuArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </Link>
          ) : null}
        </div>
      </nav>
      {children}
    </main>
  );
}
