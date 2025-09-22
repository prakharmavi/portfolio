import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg focus:outline-hidden"
      aria-label={`${project.title} — read the story`}
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl bg-gray-100">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={false}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
        <p className="mt-2 text-sm text-gray-600">{project.description}</p>
      </div>
    </Link>
  );
}
