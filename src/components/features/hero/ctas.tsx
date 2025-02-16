"use client";

import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

const MotionButton = motion.create(Button);

export const CTAs = () => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <MotionButton
        whileTap={{ scale: 0.95 }}
        className="group/cta xs:w-auto w-full"
        variant="default"
        size="lg"
        type="button"
        asChild
      >
        <a href="#projects">See my work</a>
      </MotionButton>
      <MotionButton
        whileTap={{ scale: 0.95 }}
        className="group/cta xs:w-auto w-full"
        variant="ghost"
        size="sm"
        type="button"
        asChild
      >
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open resume in new tab"
        >
          View my resume
          <ArrowRightIcon
            className="ease-snappy transition-transform duration-300 group-hover/cta:translate-x-1"
            aria-hidden="true"
          />
        </a>
      </MotionButton>
    </div>
  );
};
