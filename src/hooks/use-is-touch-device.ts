"use client";

import { useState, useEffect } from "react";

export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const handleTouch = () => {
      setIsTouch(true);
      window.removeEventListener("touchstart", handleTouch);
    };

    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    setIsTouch(isTouchDevice);
    window.addEventListener("touchstart", handleTouch);

    return () => {
      window.removeEventListener("touchstart", handleTouch);
    };
  }, []);

  return isTouch;
}
