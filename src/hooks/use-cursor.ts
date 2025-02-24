"use client";

import { useEffect, useRef, useState } from "react";

import { useTouchDevice } from "./use-touch-device";

interface CursorState {
  isHovering: boolean;
  targetRef: React.RefObject<HTMLDivElement | null>;
  handlePositionChange: (x: number, y: number) => void;
}

export function useCursor(): CursorState {
  const [isHovering, setIsHovering] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const isTouchDevice = useTouchDevice();

  useEffect(() => {
    if (isTouchDevice) return;

    const handleScroll = () => {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        const { x, y } = lastMousePosition.current;
        const isInside =
          x >= rect.left &&
          x <= rect.right &&
          y >= rect.top &&
          y <= rect.bottom;
        setIsHovering(isInside);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isTouchDevice]);

  const handlePositionChange = (x: number, y: number) => {
    lastMousePosition.current = { x, y };
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      const isInside =
        x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
      setIsHovering(isInside);
    }
  };

  return {
    isHovering,
    targetRef,
    handlePositionChange,
  };
}
