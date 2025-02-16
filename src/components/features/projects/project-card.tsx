import Link from "next/link";
import { Github, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";
import { ProjectImage } from "./project-image";
import { Badge } from "@/components/ui/badge";

const isProduction = process.env.NODE_ENV === "production";

interface ProjectCardProps {
  project: Project;
  isReversed?: boolean;
  priority?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const ProjectCard = ({
  project,
  isReversed = false,
  priority = false,
  onMouseEnter,
  onMouseLeave,
}: ProjectCardProps) => {
  return (
    <li
      className={cn(
        isReversed ? "lg:flex-row-reverse" : "lg:flex-row",
        "relative flex flex-col gap-8 lg:flex lg:items-center lg:gap-12",
      )}
    >
      <Link
        aria-label={`View ${project.title} details`}
        href={!isProduction ? `/projects/${project.slug}` : project.links.demo}
        className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 lg:w-7/12"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <ProjectImage image={project.image} priority={priority} />
      </Link>
      <div
        className={cn(
          "flex flex-col lg:w-5/12",
          isReversed ? "lg:pr-4" : "lg:pl-4",
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <Link
            aria-label={`View ${project.title} details`}
            href={
              !isProduction ? `/projects/${project.slug}` : project.links.demo
            }
            className="group hover:text-foreground/80 inline-flex items-center gap-2 transition-colors"
          >
            <h3 className="font-heading text-2xl font-bold sm:text-3xl">
              {project.title}
            </h3>
            <ArrowUpRight
              aria-hidden="true"
              className="size-5 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
        <p className="text-foreground-dark-secondary mb-6 line-clamp-4 text-base sm:text-lg">
          {project.description}
        </p>
        {project.tags && project.tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge variant="tag" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild size="lg" variant="default">
            <Link
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2"
            >
              Live Demo
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link
              href={project.links.source}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              Source Code
              <Github aria-hidden="true" className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </li>
  );
};
