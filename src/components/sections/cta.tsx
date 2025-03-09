"use client";

import { motion } from "motion/react";

import { CopyToClipboardButton } from "@/components/common/copy-to-clipboard-button";
import { Container } from "@/components/layout/container";
import { config } from "@/config";

const containerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 150,
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
          viewport={{ once: true, margin: "-10%" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-bg-cta-from via-bg-cta-via to-bg-cta-to" />
          <div className="absolute inset-0 opacity-[0.15] bg-radial-[circle_at_1px_1px] from-slate-900/40 dark:from-white/20 to-transparent from-[1px] to-[1px] bg-[size:32px_32px]" />
          <div className="relative px-6 py-12 sm:px-12 sm:py-16 md:px-16 md:py-20">
            <motion.div
              className="mx-auto max-w-2xl text-center"
              variants={contentVariants}
            >
              <motion.span
                variants={contentVariants}
                className="mb-3 inline-block text-xs leading-tight tracking-[0.2em] text-eyebrow uppercase sm:mb-4 sm:text-sm"
              >
                {eyebrow}
              </motion.span>
              <motion.h2
                variants={contentVariants}
                className="font-heading text-heading xs:text-[2.25rem] mb-4 text-[1.75rem] leading-[1.1] font-bold tracking-tight sm:mb-6 sm:text-4xl sm:tracking-normal md:mb-8 md:text-5xl lg:text-6xl lg:tracking-[-0.02em]"
              >
                {heading}
              </motion.h2>
              <motion.p
                variants={contentVariants}
                className="mx-auto mb-8 max-w-[50ch] text-base sm:text-lg md:text-xl"
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
