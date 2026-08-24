import Image from "next/image";
import Link from "next/link";
import type { PublishedProject } from "@/types/project";

type Props = {
  project: PublishedProject;
};

export default function ProjectCard({ project }: Props) {
  return (
    <Link
      href={project.path}
      className="group block rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-hidden"
      aria-label={`Read about ${project.title}`}
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl bg-gray-100">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover"
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
