import { Container } from "@/components/layout/container";
import { ProjectCard } from "../features/projects/project-card";
import { PROJECTS } from "@/constants/projects";

export const Projects = () => {
  return (
    <section className="">
      <Container className="space-y-20">
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
