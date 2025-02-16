"use client";

import { motion } from "motion/react";
import { PlusIcon } from "@radix-ui/react-icons";

export const ProjectCursor = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
      }}
      className="flex h-8 w-20 items-center justify-center rounded-[24px] bg-gray-500/40 backdrop-blur-md dark:bg-gray-300/40"
    >
      <div className="inline-flex items-center text-sm text-white dark:text-black">
        View <PlusIcon className="ml-1 h-4 w-4" />
      </div>
    </motion.div>
  );
};
