"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors hover:bg-gray-50 focus:outline-hidden"
      aria-label={`${project.title} — read the story`}
    >
      <div className="relative w-full aspect-[16/9] bg-gray-100">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-medium text-gray-900">{project.title}</h3>
          {project.tags?.length ? (
            <span className="text-xs text-gray-500 truncate max-w-[40%]" title={project.tags.join(" • ")}>{project.tags.join(" • ")}</span>
          ) : null}
        </div>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{project.summary}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs text-gray-700 group-hover:text-gray-900">
          Read story
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
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

