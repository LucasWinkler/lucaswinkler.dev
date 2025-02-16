"use client";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PROJECTS } from "@/constants/projects";
import { ProjectCard } from "@/components/features/projects/project-card";
import { useTouchDevice } from "@/hooks/use-touch-device";
import { Cursor } from "@/components/ui/cursor";
import { ProjectCursor } from "@/components/features/projects/project-cursor";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const Projects = () => {
  const [isHovering, setIsHovering] = useState(false);
  const isTouchDevice = useTouchDevice();

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return (
    <section
      id="projects"
      className={cn(
        "scroll-mt-[var(--header-height)] py-12 sm:py-16 md:py-20",
        isHovering && "cursor-none",
      )}
    >
      {!isTouchDevice && (
        <Cursor
          springConfig={{
            bounce: 0.001,
          }}
        >
          <AnimatePresence>{isHovering && <ProjectCursor />}</AnimatePresence>
        </Cursor>
      )}
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-3 inline-block text-xs leading-tight tracking-[0.2em] text-purple-400/80 uppercase sm:mb-4 sm:text-sm">
            Featured work
          </span>
          <h2 className="font-heading text-foreground-dark 2xs:text-[2.25rem] mb-4 text-[1.75rem] leading-[1.1] font-bold sm:mb-6 sm:text-4xl sm:tracking-normal md:mb-8 md:text-5xl lg:text-6xl lg:tracking-[-0.02em]">
            Selected projects
          </h2>
          <p className="text-foreground-dark-secondary mx-auto mb-12 max-w-[50ch] text-base sm:mb-16 sm:text-lg md:text-xl">
            Here are some of the projects I&apos;ve worked on. Each one taught
            me something new and helped me grow as a developer.
          </p>
        </div>
        <ul className="space-y-16 sm:space-y-20 md:space-y-24">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              isReversed={index % 2 !== 0}
              priority={index === 0}
              isHovering={isHovering}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </ul>
        <div className="mt-12 text-center sm:mt-16">
          <Button asChild variant="ghost" size="lg" className="group">
            <Link href="/projects" className="inline-flex items-center gap-2">
              View all projects
              <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
};
