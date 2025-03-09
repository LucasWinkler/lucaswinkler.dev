"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

import { cn } from "@/lib/utils";

export interface MonitorIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MonitorIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const screenVariants: Variants = {
  normal: {
    opacity: 1,
    y: 0,
  },
  animate: {
    opacity: [1, 0.8, 1],
    y: [0, -2, 0],
  },
};

const standHorizontalVariants: Variants = {
  normal: {
    opacity: 1,
    scale: 1,
  },
  animate: {
    opacity: [0, 1, 1],
    scale: [0.5, 1.1, 1],
  },
};

const standVerticalVariants: Variants = {
  normal: {
    scaleY: 1,
    originY: 1,
  },
  animate: {
    scaleY: [0, 1.1, 1],
    originY: 1,
  },
};

const screenTransition: Transition = {
  duration: 0.6,
  ease: "easeOut",
};

const standTransition: Transition = {
  duration: 0.5,
  ease: "easeOut",
};

const MonitorIcon = forwardRef<MonitorIconHandle, MonitorIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 24, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start("animate");
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, onMouseEnter],
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start("normal");
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, onMouseLeave],
    );

    return (
      <div
        className={cn(
          `flex items-center justify-center rounded-md select-none`,
          className,
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.rect
            x="2"
            y="3"
            width="20"
            height="14"
            rx="2"
            ry="2"
            variants={screenVariants}
            animate={controls}
            transition={screenTransition}
          />
          <motion.path
            d="M8 21h8"
            variants={standHorizontalVariants}
            animate={controls}
            transition={standTransition}
          />
          <motion.path
            d="M12 17v4"
            variants={standVerticalVariants}
            animate={controls}
            transition={standTransition}
          />
        </svg>
      </div>
    );
  },
);

MonitorIcon.displayName = "MonitorIcon";

export { MonitorIcon };
