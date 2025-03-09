"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Technology } from "@/types/technology";
import { hexToRgba } from "@/utils/colour";

interface TechnologyProps {
  technologies: Technology[];
}

const MotionButton = motion.create(Button);
const MotionChevron = motion.create(ChevronDown);

export const Technologies = ({ technologies }: TechnologyProps) => {
  const [showAll, setShowAll] = useState(false);
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  const handleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <ul className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence>
          {technologies
            .slice(0, showAll ? technologies.length : 8)
            .map((tech) => (
              <motion.li
                key={tech.name}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{
                  duration: 0.15,
                  ease: "easeInOut",
                }}
              >
                <Card className="flex h-full items-center gap-3 overflow-hidden rounded-xl border-transparent bg-secondary p-3 transition-all duration-300 hover:border-border-accent hover:bg-accent">
                  <div
                    className="shrink-0 rounded-lg"
                    style={{
                      backgroundColor: isDark
                        ? hexToRgba(tech.color, 0.2)
                        : hexToRgba(tech.color, 0.6),
                    }}
                  >
                    <Image
                      className={`aspect-square p-2 ${
                        !isDark ? "brightness-[0.85] contrast-[1.2]" : ""
                      }`}
                      src={tech.icon}
                      alt={`${tech.name} logo`}
                      width={48}
                      height={48}
                      draggable={false}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3
                      className="truncate font-medium text-heading"
                      title={tech.name}
                    >
                      {tech.name}
                    </h3>
                    <p
                      className="line-clamp-2 text-sm"
                      title={tech.description}
                    >
                      {tech.description}
                    </p>
                  </div>
                </Card>
              </motion.li>
            ))}
        </AnimatePresence>
      </ul>
      <MotionButton
        whileTap={{ scale: 0.95 }}
        className="group flex w-fit items-center gap-2"
        variant="outline"
        size="sm"
        onClick={handleShowAll}
      >
        {showAll ? "Show less" : "Show more"}
        <MotionChevron
          className="text-foreground group-hover:text-foreground h-4 w-4 transition-colors"
          initial={false}
          animate={{ rotate: showAll ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        />
      </MotionButton>
    </div>
  );
};
