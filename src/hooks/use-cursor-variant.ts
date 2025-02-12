"use client";

import { useCallback } from "react";
import type { CursorVariant } from "@/types/cursor";

export function useCursorVariant(variant: CursorVariant) {
  const handleMouseEnter = useCallback(() => {
    if (typeof window !== "undefined" && window.cursorHandlers) {
      window.cursorHandlers.onMouseEnter(variant);
    }
  }, [variant]);

  const handleMouseLeave = useCallback(() => {
    if (typeof window !== "undefined" && window.cursorHandlers) {
      window.cursorHandlers.onMouseLeave();
    }
  }, []);

  return {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };
}
