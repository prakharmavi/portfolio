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
      className="group grid gap-6 border-b border-border/60 py-7 last:border-b-0 focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring md:grid-cols-12 md:items-center md:gap-10 md:py-9"
      aria-label={`Read about ${project.title}`}
    >
      <div className="md:col-span-7">
        <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
          <span>{String(index).padStart(2, "0")}</span>
          <span aria-hidden className="h-3 w-px bg-border" />
          <span>{year}</span>
        </div>
        <h3 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-[-0.03em] text-foreground md:text-3xl">
          {project.title}
        </h3>
        <p className="mt-3 max-w-[48ch] text-base leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground group-focus-visible:text-foreground">
          View project
          <LuArrowUpRight className="size-4 transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" aria-hidden />
        </span>
      </div>

      <div className="relative aspect-video overflow-hidden rounded-md border border-border/60 bg-muted md:col-span-5">
        <Image
          src={project.thumbnail}
          alt=""
          fill
          className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.03]"
          sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1152px) 40vw, 430px"
        />
      </div>
    </Link>
  );
}
