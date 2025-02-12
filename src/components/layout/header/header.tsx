"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion as m } from "motion/react";
import { Container } from "../container";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";

export const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY.current);
      lastScrollY.current = currentScrollY;
      setHasScrolled(currentScrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <m.header
      role="banner"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "sticky top-0 z-50 h-[var(--header-height)] w-full",
        hasScrolled &&
          "bg-background-dark supports-[backdrop-filter]:bg-background-dark/80 supports-[backdrop-filter]:backdrop-blur supports-[backdrop-filter]:backdrop-saturate-150",
      )}
    >
      <Container className="relative flex h-full w-full items-center justify-between gap-4">
        <Logo />
        <DesktopNav />
        <MobileNav />
      </Container>
    </m.header>
  );
};
