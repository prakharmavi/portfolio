import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight, LuGithub } from "react-icons/lu";

import type { PublishedProject } from "@/types/project";

type Props = {
  project: PublishedProject;
};

const linkIcons: Record<string, typeof LuArrowUpRight> = {
  repo: LuGithub,
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}

function previewClassName(slug: string) {
  return slug === "fastman"
    ? "object-cover object-center scale-150"
    : "object-cover";
}

export default function ProjectHeader({ project }: Props) {
  return (
    <header className="border-b border-gray-900 bg-[#f7f7f4] px-6 pt-20 md:px-10 md:pt-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-gray-500">
              <span>Case study</span>
              {project.date ? (
                <>
                  <span aria-hidden>/</span>
                  <time dateTime={project.date}>{formatDate(project.date)}</time>
                </>
              ) : null}
            </div>
            <h1 className="mt-5 font-display text-6xl font-semibold leading-[0.86] tracking-[-0.055em] text-gray-900 sm:text-7xl lg:text-8xl">
              {project.title}
            </h1>
          </div>
          <div className="flex flex-col justify-end lg:col-span-5 lg:pb-1">
            <p className="max-w-xl text-xl leading-relaxed text-gray-600 md:text-2xl">
              {project.description}
            </p>
            {project.tags.length > 0 ? (
              <p className="mt-5 font-mono text-xs uppercase tracking-[0.12em] text-gray-500">
                {project.tags.join(" / ")}
              </p>
            ) : null}
            {project.links.length > 0 ? (
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                {project.links.map((link) => {
                  const Icon = linkIcons[link.type ?? ""] ?? LuArrowUpRight;
                  return (
                    <Link
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border-b border-gray-900 pb-1 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-500 focus-visible:outline-2 focus-visible:outline-offset-4"
                    >
                      <span>{link.label}</span>
                      <Icon className="size-4" aria-hidden />
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>

        <div className="relative mt-16 aspect-[16/8] overflow-hidden bg-gray-200 md:mt-24">
          <Image
            src={project.thumbnail}
            alt={`${project.title} project preview`}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1152px"
            className={previewClassName(project.slug)}
          />
        </div>
      </div>
    </header>
  );
}
