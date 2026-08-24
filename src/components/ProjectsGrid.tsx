import ProjectCard from "@/components/ProjectCard";
import { listPublishedProjects } from "@/lib/projects";

export default async function ProjectsGrid() {
  const projects = await listPublishedProjects();

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
