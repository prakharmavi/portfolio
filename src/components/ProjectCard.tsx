import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import type { PublishedProject } from "@/types/project";

type Props = {
  project: PublishedProject;
  index: number;
};

export default function ProjectCard({ project, index }: Props) {
  const year = project.date?.slice(0, 4) ?? "Undated";

  return (
    <Link
      href={project.path}
      className="group grid gap-6 border-b border-border py-7 transition-colors last:border-b-0 hover:bg-background focus-visible:bg-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-900 md:grid-cols-12 md:items-center md:gap-5 md:px-4 md:py-6"
      aria-label={`Read about ${project.title}`}
    >
      <div className="flex items-start justify-between md:col-span-1 md:block md:self-start">
        <span className="font-mono text-xs text-muted-foreground">
          {String(index).padStart(2, "0")}
        </span>
        <span className="font-mono text-xs text-muted-foreground md:hidden">{year}</span>
      </div>

      <h3 className="font-display text-3xl font-semibold leading-[0.95] tracking-[-0.04em] text-foreground md:col-span-3 md:text-4xl">
        {project.title}
      </h3>

      <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:col-span-3">
        {project.description}
      </p>

      <div className="relative aspect-[16/10] overflow-hidden bg-muted md:col-span-3">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover grayscale transition duration-300 group-hover:scale-[1.03] group-hover:grayscale-0 group-focus-visible:grayscale-0"
          sizes="(max-width: 768px) 100vw, 270px"
          priority={false}
        />
      </div>

      <div className="hidden items-center justify-end gap-5 md:col-span-2 md:flex">
        <span className="font-mono text-xs text-muted-foreground">{year}</span>
        <span className="flex size-9 items-center justify-center border border-border transition-colors group-hover:border-foreground group-hover:bg-primary group-hover:text-primary-foreground">
          <LuArrowUpRight className="size-4" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
