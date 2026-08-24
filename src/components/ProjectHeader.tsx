import Link from "next/link";
import { LuCalendar, LuExternalLink, LuGithub } from "react-icons/lu";

import type { PublishedProject } from "@/types/project";

type Props = {
  project: PublishedProject;
};

const linkIcons: Record<string, typeof LuExternalLink> = {
  repo: LuGithub,
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function ProjectHeader({ project }: Props) {
  return (
    <div className="border-b border-gray-100 px-6 pt-8 pb-8 sm:px-10 md:px-14 md:pt-10 md:pb-10">
      <div className="mx-auto max-w-3xl">
        {project.date ? (
          <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
            <LuCalendar className="size-3.5" aria-hidden />
            <time dateTime={project.date}>{formatDate(project.date)}</time>
          </div>
        ) : null}

        <h1 className="font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-gray-600">
          {project.description}
        </p>

        {project.tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {project.links.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-3">
            {project.links.map((link) => {
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
  );
}
