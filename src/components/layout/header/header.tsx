"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion as m } from "motion/react";
import { Container } from "../container";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";

export const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY.current);
      lastScrollY.current = currentScrollY;
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
      className="dark bg-background-dark supports-[backdrop-filter]:bg-background-dark/80 sticky top-0 z-50 h-[var(--header-height)] w-full duration-200 supports-[backdrop-filter]:backdrop-blur supports-[backdrop-filter]:backdrop-saturate-150"
    >
      <Container className="relative flex h-full w-full items-center justify-between gap-4">
        <Link
          className="text-foreground font-medium tracking-widest uppercase"
          href="/"
          aria-label="Logo"
          aria-description="Link to the home page"
        >
          Lucas Winkler
        </Link>
        <DesktopNav />
        <MobileNav />
      </Container>
    </m.header>
  );
};
