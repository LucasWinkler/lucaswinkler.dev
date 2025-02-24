"use client";

import { Container } from "@/components/layout/container";
import { Technologies } from "@/components/features/skills/technologies";
import type { Technology } from "@/types/technology";
import { motion } from "motion/react";

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
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 125,
      damping: 20,
      mass: 1,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

export interface SkillsProps {
  eyebrow: string;
  heading: string;
  description: string;
  technologies: Technology[];
}

export const Skills = ({
  eyebrow,
  heading,
  description,
  technologies,
}: SkillsProps) => {
  return (
    <section
      id="skills"
      className="scroll-mt-[var(--header-height)] py-12 sm:py-16 md:py-20"
    >
      <Container>
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="mb-3 inline-block text-xs leading-tight tracking-[0.2em] text-purple-400/80 uppercase sm:mb-4 sm:text-sm">
            {eyebrow}
          </span>
          <h2 className="font-heading text-foreground-dark 2xs:text-[2.25rem] mb-4 text-[1.75rem] leading-[1.1] font-bold sm:mb-6 sm:text-4xl md:mb-8 md:text-5xl lg:text-6xl">
            {heading}
          </h2>
          <p className="text-foreground-dark-secondary 2xs:text-lg mb-6 max-w-[60ch] text-base sm:mb-8 sm:text-lg md:mb-10 md:text-xl">
            {description}
          </p>
        </motion.div>
        <motion.div
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Technologies technologies={technologies} />
        </motion.div>
      </Container>
    </section>
  );
};
