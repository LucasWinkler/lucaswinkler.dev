"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { GithubIconHandle } from "@/components/ui/icons/github";
import { GithubIcon } from "@/components/ui/icons/github";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

import { ProjectImage } from "./project-image";

interface ProjectCardProps extends HTMLMotionProps<"li"> {
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
  ...motionProps
}: ProjectCardProps) => {
  const githubIconRef = useRef<GithubIconHandle>(null);

  return (
    <motion.li
      className={cn(
        isReversed
          ? "min-[56.25rem]:flex-row-reverse lg:flex-row-reverse"
          : "min-[56.25rem]:flex-row lg:flex-row",
        "relative flex flex-col gap-8 min-[56.25rem]:items-center min-[56.25rem]:gap-6 lg:items-center lg:gap-12",
      )}
      {...motionProps}
    >
      <Link
        aria-label={`View ${project.title} demo`}
        href={project.links.demo}
        className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-br dark:from-slate-900/90 dark:to-slate-800/90 min-[56.25rem]:w-6/12 lg:w-7/12 from-slate-200/90 to-slate-100/90"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ProjectImage image={project.image} priority={priority} />
      </Link>
      <div
        className={cn(
          "flex flex-col min-[56.25rem]:w-6/12 lg:w-5/12",
          isReversed
            ? "min-[56.25rem]:pr-4 lg:pr-4"
            : "min-[56.25rem]:pl-4 lg:pl-4",
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <Link
            aria-label={`View ${project.title} demo`}
            href={project.links.demo}
            className="group text-heading hover:text-heading/80 inline-flex items-center gap-2 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="font-heading text-2xl font-bold sm:text-3xl">
              {project.title}
            </h3>
            <ArrowUpRight
              className="ease-snappy self-start size-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 shrink-0"
              aria-hidden="true"
            />
          </Link>
        </div>
        <p className="text-foreground mb-6 line-clamp-4 text-base sm:text-lg">
          {project.description}
        </p>

        {project.alert && (
          <div
            className={cn(
              "mb-6 rounded-lg border px-4 py-3 text-sm font-medium",
              project.alert.type === "warning" &&
                "border-yellow-600/20 bg-yellow-50 text-yellow-800 dark:border-yellow-500/20 dark:bg-yellow-500/10 dark:text-yellow-500",
              project.alert.type === "error" &&
                "border-red-600/20 bg-red-50 text-red-800 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-500",
              project.alert.type === "info" &&
                "border-blue-600/20 bg-blue-50 text-blue-800 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-500",
              project.alert.type === "success" &&
                "border-green-600/20 bg-green-50 text-green-800 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-500",
            )}
          >
            {project.alert.message}
          </div>
        )}

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
          <Button variant="default" size="lg" asChild>
            <Link
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="group xs:w-auto inline-flex w-full items-center gap-2"
            >
              Live demo
              <ArrowUpRight
                className="ease-snappy size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link
              href={project.links.source}
              target="_blank"
              rel="noopener noreferrer"
              className="xs:w-auto inline-flex w-full items-center gap-2"
              onMouseEnter={() => githubIconRef.current?.startAnimation()}
              onMouseLeave={() => githubIconRef.current?.stopAnimation()}
            >
              Source code
              <GithubIcon ref={githubIconRef} className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </motion.li>
  );
};
