"use client";

import { useEffect, useState } from "react";

export const useTouchDevice = (): boolean => {
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    const updateIsTouch = () => {
      const hasTouchPoints = navigator.maxTouchPoints > 0;
      const mediaQuery = window.matchMedia("(pointer: coarse)");
      setIsTouchDevice(hasTouchPoints || (mediaQuery && mediaQuery.matches));
    };

    updateIsTouch();

    const mediaQuery = window.matchMedia("(pointer: coarse)");
    const handleChange = (e: MediaQueryListEvent) => {
      setIsTouchDevice(e.matches || navigator.maxTouchPoints > 0);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isTouchDevice;
};
