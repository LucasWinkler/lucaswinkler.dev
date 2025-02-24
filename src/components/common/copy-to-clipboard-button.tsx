"use client";

import { Button } from "@/components/ui/button";
import { Copy, Check, X } from "lucide-react";
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import { useClipboardCopy } from "@/hooks/use-clipboard-copy";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

export interface CopyToClipboardButtonProps {
  textToCopy: string;
  text?: string;
  copiedText?: string;
  errorText?: string;
  iconPosition?: "left" | "right";
  copiedDuration?: number;
  tooltip?: string;
  tooltipSide?: "top" | "bottom" | "left" | "right";
  tooltipDelay?: number;
  tooltipEnabled?: boolean;
  disableTooltip?: boolean;
  className?: string;
}

const MotionButton = motion.create(Button);

const AnimatedIcon = ({
  hasError,
  copied,
}: {
  hasError: boolean;
  copied: boolean;
}) => (
  <AnimatePresence mode="wait" initial={false}>
    <motion.div
      key={hasError ? "error" : copied ? "check" : "copy"}
      initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
      transition={{
        duration: 0.2,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      {hasError ? (
        <X className="size-4" />
      ) : copied ? (
        <Check className="size-4" />
      ) : (
        <Copy className="size-4" />
      )}
    </motion.div>
  </AnimatePresence>
);

export const CopyToClipboardButton = ({
  textToCopy,
  iconPosition = "left",
  text = "Copy",
  copiedText = "Copied!",
  errorText = "Failed to copy",
  copiedDuration = 2000,
  tooltip,
  tooltipSide = "top",
  tooltipDelay = 300,
  disableTooltip = false,
  className,
}: CopyToClipboardButtonProps) => {
  const { copied, copyToClipboard, error } = useClipboardCopy({
    copiedDuration,
  });

  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(true);

  const displayText = error ? errorText : copied ? copiedText : text;
  const tooltipText = tooltip || `Copy "${textToCopy}"`;

  return (
    <TooltipProvider>
      <Tooltip
        delayDuration={tooltipDelay}
        open={disableTooltip ? false : isTooltipOpen}
        onOpenChange={setIsTooltipOpen}
      >
        <TooltipTrigger asChild>
          <MotionButton
            size="lg"
            className={cn("group flex items-center gap-2", className)}
            onClick={() => copyToClipboard(textToCopy)}
            whileTap={{ scale: 0.97 }}
          >
            {iconPosition === "left" && (
              <AnimatedIcon hasError={error !== null} copied={copied} />
            )}
            {displayText}
            {iconPosition === "right" && (
              <AnimatedIcon hasError={error !== null} copied={copied} />
            )}
          </MotionButton>
        </TooltipTrigger>
        <TooltipContent side={tooltipSide}>{tooltipText}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
