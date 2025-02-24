"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import dynamic from "next/dynamic";

import { Logo } from "@/components/common/logo";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { DesktopNav } from "./desktop-nav";

const NavTriggerFallback = () => (
  <Button
    aria-label="Menu"
    className="-mr-[0.625rem] h-[var(--header-height)] bg-transparent hover:bg-transparent md:hidden"
    variant="ghost"
    size="icon"
  >
    <Menu />
  </Button>
);

const MobileNav = dynamic(
  () => import("./mobile-nav").then((mod) => mod.MobileNav),
  {
    loading: () => <NavTriggerFallback />,
    ssr: false,
  },
);

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
          ? "border-border/90 bg-background-dark shadow-lg"
          : "border-transparent bg-transparent shadow-transparent",
      )}
    >
      <a
        href="#main"
        className="focus:bg-background-dark focus:ring-ring sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:block focus:rounded-md focus:px-4 focus:py-2 focus:text-white focus:ring-2 focus:outline-none"
      >
        Skip to main content
      </a>
      <Container className="flex h-full w-full items-center justify-between gap-4">
        <Logo type="text" />
        <DesktopNav />
        <MobileNav />
      </Container>
    </header>
  );
};
