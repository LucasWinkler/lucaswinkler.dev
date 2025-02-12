"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  motion,
  SpringOptions,
  useMotionValue,
  useSpring,
  AnimatePresence,
  Transition,
  Variant,
} from "motion/react";
import { cn } from "@/lib/utils";

export type CursorProps = {
  children: React.ReactNode;
  className?: string;
  springConfig?: SpringOptions;
  attachToParent?: boolean;
  hideDefaultCursor?: boolean;
  transition?: Transition;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
  onPositionChange?: (x: number, y: number) => void;
};

export function Cursor({
  children,
  className,
  springConfig,
  attachToParent,
  hideDefaultCursor = false,
  variants,
  transition,
  onPositionChange,
}: CursorProps) {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!attachToParent);

  // Update cursor position handler
  const updatePosition = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      onPositionChange?.(e.clientX, e.clientY);
    },
    [cursorX, cursorY, onPositionChange],
  );

  // Handle cursor visibility
  const handleVisibilityChange = useCallback((visible: boolean) => {
    setIsVisible(visible);
  }, []);

  // Handle parent mouse events
  const handleParentMouseEnter = useCallback(() => {
    if (hideDefaultCursor && cursorRef.current?.parentElement) {
      cursorRef.current.parentElement.style.cursor = "none";
    }
    handleVisibilityChange(true);
  }, [hideDefaultCursor, handleVisibilityChange]);

  const handleParentMouseLeave = useCallback(() => {
    if (cursorRef.current?.parentElement) {
      cursorRef.current.parentElement.style.cursor = "auto";
    }
    handleVisibilityChange(false);
  }, [handleVisibilityChange]);

  // Set up cursor movement tracking
  useEffect(() => {
    if (!attachToParent && hideDefaultCursor) {
      document.body.style.cursor = "none";
    } else {
      document.body.style.cursor = "auto";
    }

    document.addEventListener("mousemove", updatePosition);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.body.style.cursor = "auto";
    };
  }, [attachToParent, hideDefaultCursor, updatePosition]);

  // Set up parent element event listeners
  useEffect(() => {
    const parent = cursorRef.current?.parentElement;

    if (attachToParent && parent) {
      parent.addEventListener("mouseenter", handleParentMouseEnter);
      parent.addEventListener("mouseleave", handleParentMouseLeave);

      return () => {
        parent.removeEventListener("mouseenter", handleParentMouseEnter);
        parent.removeEventListener("mouseleave", handleParentMouseLeave);
      };
    }
  }, [attachToParent, handleParentMouseEnter, handleParentMouseLeave]);

  const cursorXSpring = useSpring(cursorX, springConfig || { duration: 0 });
  const cursorYSpring = useSpring(cursorY, springConfig || { duration: 0 });

  return (
    <motion.div
      ref={cursorRef}
      className={cn("pointer-events-none fixed top-0 left-0 z-100", className)}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={transition}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
