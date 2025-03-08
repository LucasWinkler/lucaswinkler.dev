"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { ProjectCard } from "@/components/features/projects/project-card";
import { ProjectCursor } from "@/components/features/projects/project-cursor";
import { Container } from "@/components/layout/container";
import { Cursor } from "@/components/ui/cursor";
import { useTouchDevice } from "@/hooks/use-touch-device";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

const MotionProjectCard = motion.create(ProjectCard);

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      mass: 0.5,
      delay: 0.3,
    },
  },
};

const projectVariants = {
  hidden: (custom: { isReversed: boolean }) => ({
    opacity: 0,
    x: custom.isReversed ? 20 : -20,
  }),
  visible: (custom: { index: number }) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.21, 0.47, 0.32, 0.98],
      delay: 0.4 + custom.index * 0.05,
    },
  }),
};

export interface ProjectsProps {
  eyebrow: string;
  heading: string;
  description: string;
  projects: Project[];
}

export const Projects = ({
  eyebrow,
  heading,
  description,
  projects,
}: ProjectsProps) => {
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
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="mb-3 inline-block text-xs leading-tight tracking-[0.2em] text-purple-400/80 uppercase sm:mb-4 sm:text-sm">
            {eyebrow}
          </span>
          <h2 className="font-heading text-heading 2xs:text-[2.25rem] mb-4 text-[1.75rem] leading-[1.1] font-bold sm:mb-6 sm:text-4xl sm:tracking-normal md:mb-8 md:text-5xl lg:text-6xl lg:tracking-[-0.02em]">
            {heading}
          </h2>
          <p className="mx-auto mb-12 max-w-[50ch] text-base sm:mb-16 sm:text-lg md:text-xl">
            {description}
          </p>
        </motion.div>
        <ul className="space-y-16 sm:space-y-20 md:space-y-24">
          {projects.map((project, index) => (
            <MotionProjectCard
              key={project.slug}
              project={project}
              isReversed={index % 2 !== 0}
              priority={index === 0}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              variants={projectVariants}
              custom={{ isReversed: index % 2 !== 0, index }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "2.5%" }}
            />
          ))}
        </ul>
      </Container>
    </section>
  );
};
