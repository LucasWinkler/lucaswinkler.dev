"use client";

import { useCursorVariant } from "@/hooks/use-cursor-variant";
import { Project } from "@/types/project";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cursorHandlers = useCursorVariant("view");

  return (
    <Link href={`/projects/${project.slug}`}>
      <div
        className="group relative rounded-lg border border-zinc-200 bg-white p-6 transition-all hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
        {...cursorHandlers}
      >
        <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
          {project.title}
        </h3>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {project.description}
        </p>
      </div>
    </Link>
  );
}
