"use client";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "@/components/features/projects/project-card";
import { useTouchDevice } from "@/hooks/use-touch-device";
import { Cursor } from "@/components/ui/cursor";
import { ProjectCursor } from "@/components/features/projects/project-cursor";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

const isProduction = process.env.NODE_ENV === "production";

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
      duration: 0.8,
      ease: [0.21, 0.47, 0.32, 0.98],
      delay: 0.4 + custom.index * 0.15,
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
  const shouldReduceMotion = useReducedMotion();

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
          <h2 className="font-heading text-foreground-dark 2xs:text-[2.25rem] mb-4 text-[1.75rem] leading-[1.1] font-bold sm:mb-6 sm:text-4xl sm:tracking-normal md:mb-8 md:text-5xl lg:text-6xl lg:tracking-[-0.02em]">
            {heading}
          </h2>
          <p className="text-foreground-dark-secondary mx-auto mb-12 max-w-[50ch] text-base sm:mb-16 sm:text-lg md:text-xl">
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
              variants={shouldReduceMotion ? {} : projectVariants}
              custom={{ isReversed: index % 2 !== 0, index }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "2.5%" }}
            />
          ))}
        </ul>
        {!isProduction && (
          <motion.div
            className="mt-12 text-center sm:mt-16"
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: "0px",
            }}
            transition={{
              delay: projects.length * 0.15,
            }}
          >
            <Button asChild variant="ghost" size="lg" className="group">
              <Link href="/projects" className="inline-flex items-center gap-2">
                View all projects
                <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        )}
      </Container>
    </section>
  );
};
