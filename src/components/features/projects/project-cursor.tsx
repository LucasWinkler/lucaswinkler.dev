"use client";

import { motion, AnimatePresence } from "motion/react";
import { PlusIcon } from "@radix-ui/react-icons";

interface ProjectCursorProps {
  isHovering: boolean;
}

export function ProjectCursor({ isHovering }: ProjectCursorProps) {
  return (
    <motion.div
      animate={{
        width: isHovering ? 80 : 0,
        height: isHovering ? 32 : 0,
      }}
      className="flex items-center justify-center rounded-[24px] bg-gray-500/40 backdrop-blur-md dark:bg-gray-300/40"
    >
      <AnimatePresence>
        {isHovering ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="inline-flex w-full items-center justify-center"
          >
            <div className="inline-flex items-center text-sm text-white dark:text-black">
              View <PlusIcon className="ml-1 h-4 w-4" />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
