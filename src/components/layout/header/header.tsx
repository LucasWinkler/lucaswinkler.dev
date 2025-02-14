"use client";

import { Container } from "@/components/layout/container";
import { Logo } from "@/components/common/logo";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 30);
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      role="banner"
      className={cn(
        "ease-fluid sticky top-0 z-50 h-[var(--header-height)] w-full border-b transition-all duration-300",
        hasScrolled
          ? "border-border bg-background-dark/80 shadow-lg backdrop-blur-md backdrop-saturate-150"
          : "border-transparent bg-transparent shadow-transparent backdrop-blur-none",
      )}
    >
      <Container className="flex h-full w-full items-center justify-between gap-4">
        <Logo />
        <DesktopNav />
        <MobileNav />
      </Container>
    </header>
  );
};
