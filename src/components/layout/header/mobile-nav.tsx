"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_LINKS, SOCIAL_LINKS } from "@/constants/links";
import { Mail, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { config } from "@/config";

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          aria-label="Open mobile navigation menu"
          className="dark -mr-[0.625rem] h-[var(--header-height)] cursor-pointer bg-transparent hover:bg-transparent md:hidden"
          variant="ghost"
          size="icon"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="dark p-6">
        <SheetHeader>
          <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
          <SheetDescription className="hidden">
            A mobile-friendly menu for navigating through the website sections.
          </SheetDescription>
        </SheetHeader>
        <nav aria-label="Main" className="gap-4">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <SheetFooter className="border-border border-t pt-6">
          <ul className="flex items-center gap-2">
            {SOCIAL_LINKS.map(({ href, icon: Icon }) => (
              <li key={href}>
                <Link
                  className="border-border hover:bg-accent flex size-8 items-center justify-center rounded-full border"
                  href={href}
                >
                  <Icon className="size-4" />
                </Link>
              </li>
            ))}
            <li>
              <Link
                className="border-border hover:bg-accent flex size-8 items-center justify-center rounded-full border"
                href={`mailto:${config.contactEmail}`}
              >
                <Mail className="size-4" />
              </Link>
            </li>
          </ul>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
