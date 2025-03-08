"use client";

import { motion } from "motion/react";

import { AvailabilityBadge } from "@/components/features/hero/availability-badge";
import { BackgroundEffect } from "@/components/features/hero/background-effect";
import { CTAs } from "@/components/features/hero/ctas";
import { Container } from "@/components/layout/container";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
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

const MotionContainer = motion.create(Container);

export interface HeroProps {
  title: React.ReactNode;
  description: React.ReactNode;
  isAvailable: boolean;
}

export const Hero = ({ title, description, isAvailable }: HeroProps) => {
  return (
    <section
      id="hero"
      className="relative -mt-[var(--header-height)] pt-[var(--header-height)]"
    >
      <BackgroundEffect />
      <MotionContainer
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid items-center py-12 sm:py-16 md:py-20"
      >
        {isAvailable && (
          <motion.div variants={itemVariants}>
            <AvailabilityBadge className="mb-4 sm:mb-6" />
          </motion.div>
        )}
        <motion.h1
          variants={itemVariants}
          className="font-heading 2xs:text-[3rem] mb-6 bg-gradient-to-br from-heading-from via-heading-via to-heading-to bg-clip-text text-[2.5rem] leading-[1.05] font-bold text-transparent sm:mb-8 sm:text-[4rem] md:text-7xl lg:text-8xl"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="2xs:text-lg mb-8 max-w-[48ch] text-base sm:mb-10 md:text-xl xl:text-xl"
        >
          {description}
        </motion.p>
        <motion.div variants={itemVariants}>
          <CTAs />
        </motion.div>
      </MotionContainer>
    </section>
  );
};
