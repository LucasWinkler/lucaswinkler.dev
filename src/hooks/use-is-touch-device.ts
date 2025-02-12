"use client";

import { useState, useEffect } from "react";

export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const handleTouch = () => {
      setIsTouch(true);
      // Remove the event listener once we detect touch
      window.removeEventListener("touchstart", handleTouch);
    };

    // Check if device has touch capabilities
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-ignore
      navigator.msMaxTouchPoints > 0;

    setIsTouch(isTouchDevice);

    // Add listener to detect first touch
    window.addEventListener("touchstart", handleTouch);

    return () => {
      window.removeEventListener("touchstart", handleTouch);
    };
  }, []);

  return isTouch;
}
