import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/projects";

export default async function ProjectsGrid() {
  const projects = await getAllProjects();

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2">
      {projects.map(({ meta }) => (
        <ProjectCard key={meta.slug} project={meta} />
      ))}
    </div>
  );
}
