"use client";

import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/project";

interface ProjectCardContentProps {
  project: Project;
  className?: string;
}

export function ProjectCardContent({
  project,
  className,
}: ProjectCardContentProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group block ${className}`}
    >
      <div className="relative overflow-hidden rounded-lg">
        <div className="relative h-[300px] w-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
            unoptimized
          />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="text-foreground-dark-secondary mt-2 text-sm">
          {project.description}
        </p>
      </div>
    </Link>
  );
}
