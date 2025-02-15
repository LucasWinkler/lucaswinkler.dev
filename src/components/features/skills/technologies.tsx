"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Card } from "@/components/ui/card";
import type { Technology } from "@/types/technology";
import { hexToRgba } from "@/utils/colour";
import { Button } from "@/components/ui/button";

interface TechnologyProps {
  technologies: Technology[];
}

const MotionButton = motion(Button);

export const Technologies = ({ technologies }: TechnologyProps) => {
  const [showAll, setShowAll] = useState(false);

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
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Card className="flex items-center gap-3 rounded-xl border-transparent bg-zinc-900/90 p-3 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-800/90">
                  <div
                    className="rounded-lg"
                    style={{ backgroundColor: hexToRgba(tech.color, 0.2) }}
                  >
                    <Image
                      className="aspect-square p-2"
                      src={tech.icon}
                      alt={`${tech.name} logo`}
                      width={48}
                      height={48}
                      unoptimized
                      draggable={false}
                    />
                  </div>
                  <div>
                    <h3 className="text-foreground-dark font-medium">
                      {tech.name}
                    </h3>
                    <p className="text-foreground-dark-secondary text-sm">
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
        className="w-fit"
        variant="outline"
        size="sm"
        onClick={handleShowAll}
      >
        {showAll ? "Show less" : "Show more"}
      </MotionButton>
    </div>
  );
};
