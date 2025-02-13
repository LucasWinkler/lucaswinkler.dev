"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ExternalLink } from "lucide-react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import type { CursorVariant } from "@/types/cursor";
import { useIsTouchDevice } from "@/hooks/use-is-touch-device";

const Cursor = dynamic(
  () => import("@/components/ui/cursor").then((mod) => mod.Cursor),
  {
    ssr: false,
  },
);

export function GlobalCursor() {
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default");
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const isTouch = useIsTouchDevice();

  const handleMouseEnter = (variant: CursorVariant) => {
    setCursorVariant(variant);
  };

  const handleMouseLeave = () => {
    setCursorVariant("default");
  };

  useEffect(() => {
    setCursorVariant("default");
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== "undefined" && !isTouch) {
      window.cursorHandlers = {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      };

      const handleMouseMove = () => {
        if (!isVisible) {
          setIsVisible(true);
        }
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.cursorHandlers = {
          onMouseEnter: () => {},
          onMouseLeave: () => {},
        };
      };
    }
  }, [isVisible, isTouch]);

  if (isTouch || !isVisible) return null;

  return (
    <Cursor
      variants={{
        initial: { scale: 0.3, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.3, opacity: 0 },
      }}
      springConfig={{
        bounce: 0.01,
        stiffness: 1000,
        damping: 50,
        mass: 1,
      }}
      transition={{
        ease: "easeInOut",
        duration: 0.15,
      }}
      hideDefaultCursor={false}
      className="mix-blend-difference"
    >
      <motion.div
        animate={{
          width: cursorVariant !== "default" ? 80 : 0,
          height: cursorVariant !== "default" ? 32 : 0,
        }}
        className="flex items-center justify-center rounded-full bg-white"
      >
        <AnimatePresence>
          {cursorVariant === "view" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="inline-flex w-full items-center justify-center text-sm text-black"
            >
              View <ArrowRight className="ml-1 h-4 w-4" />
            </motion.div>
          )}
          {cursorVariant === "link" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="inline-flex w-full items-center justify-center text-sm text-black"
            >
              Click <ExternalLink className="ml-1 h-4 w-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Cursor>
  );
}

declare global {
  interface Window {
    cursorHandlers: {
      onMouseEnter: (variant: CursorVariant) => void;
      onMouseLeave: () => void;
    };
  }
}
