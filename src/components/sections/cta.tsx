"use client";

import { config } from "@/config";
import { Container } from "@/components/layout/container";
import { CopyToClipboardButton } from "@/components/common/copy-to-clipboard-button";
import { motion } from "motion/react";

const containerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 20,
      mass: 1,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
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

const buttonVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 10,
      mass: 0.4,
    },
  },
};

export interface CTAProps {
  eyebrow: string;
  heading: string;
  description: string;
}

export const CTA = ({ eyebrow, heading, description }: CTAProps) => {
  return (
    <Container asChild>
      <section
        id="cta"
        className="scroll-mt-[var(--header-height)] py-12 sm:py-16 md:py-20"
      >
        <motion.div
          className="relative overflow-hidden rounded-3xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10" />
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.2) 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative px-6 py-10 sm:px-12 sm:py-14 md:py-16">
            <motion.div
              className="mx-auto max-w-2xl text-center"
              variants={contentVariants}
            >
              <motion.span
                variants={contentVariants}
                className="mb-3 inline-block text-xs leading-tight tracking-[0.2em] text-purple-400/80 uppercase sm:mb-4 sm:text-sm"
              >
                {eyebrow}
              </motion.span>
              <motion.h2
                variants={contentVariants}
                className="font-heading text-foreground-dark 2xs:text-[2.25rem] mb-4 text-[1.75rem] leading-[1.1] font-bold tracking-tight sm:mb-6 sm:text-4xl sm:tracking-normal md:mb-8 md:text-5xl lg:text-6xl lg:tracking-[-0.02em]"
              >
                {heading}
              </motion.h2>
              <motion.p
                variants={contentVariants}
                className="text-foreground-dark-secondary mx-auto mb-8 max-w-[50ch] text-base sm:text-lg md:text-xl"
              >
                {description}
              </motion.p>
              <motion.div variants={buttonVariants}>
                <CopyToClipboardButton
                  textToCopy={config.contactEmail}
                  iconPosition="left"
                  text="Copy Email"
                  copiedText="Email Copied"
                  errorText="Failed to Copy Email"
                  className="mx-auto w-full sm:w-auto"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </Container>
  );
};
