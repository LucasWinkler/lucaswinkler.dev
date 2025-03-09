"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";

import portrait from "@/../public/images/portrait.webp";
import { Container } from "@/components/layout/container";

const imageVariants = {
  hidden: (isMobile: boolean) => ({
    opacity: 0,
    scale: 0.95,
    x: isMobile ? 0 : -20,
    y: isMobile ? 20 : 0,
  }),
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

const contentVariants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 1,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      mass: 0.5,
    },
  },
};

export interface AboutProps {
  eyebrow: string;
  heading: string;
  description: string;
}

export const About = ({ eyebrow, heading, description }: AboutProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      id="about"
      className="scroll-mt-[var(--header-height)] py-12 sm:py-16 md:py-20"
    >
      <Container>
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          <motion.div
            className="relative aspect-square w-48 shrink-0 overflow-hidden rounded-full sm:w-56 lg:w-72"
            variants={imageVariants}
            custom={isMobile}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Image
              src={portrait}
              alt="Lucas Winkler"
              fill
              className="object-cover"
              sizes="(min-width: 64rem) 288px, (min-width: 40rem) 224px, 192px"
              draggable={false}
            />
          </motion.div>
          <motion.div
            className="text-center lg:text-start"
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span
              variants={itemVariants}
              className="mb-3 inline-block text-xs leading-tight tracking-[0.2em] text-eyebrow uppercase sm:mb-4 sm:text-sm"
            >
              {eyebrow}
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="font-heading text-heading xs:text-[2.25rem] mb-6 text-[1.75rem] leading-[1.1] font-bold sm:mb-8 sm:text-4xl sm:tracking-normal md:mb-8 md:text-5xl lg:text-6xl lg:tracking-[-0.02em]"
            >
              {heading}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="space-y-4 text-base sm:text-lg md:text-xl"
            >
              {description}
            </motion.p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
