import ProjectCard from "@/components/ProjectCard";
import { listPublishedProjects } from "@/lib/projects";

export default async function ProjectsGrid() {
  const projects = await listPublishedProjects();

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="mt-14 border-y border-gray-900">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.slug}
          project={project}
          index={index + 1}
        />
      ))}
    </div>
  );
}
