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
import { ArrowTopRightIcon, CaretRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { config } from "@/config";
import { motion } from "motion/react";

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const translateAmount = 12;

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
      <SheetContent className="dark flex flex-col justify-between p-6">
        <div>
          <SheetHeader>
            <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
            <SheetDescription className="hidden">
              A mobile-friendly menu for navigating through the website
              sections.
            </SheetDescription>
          </SheetHeader>
          <nav aria-label="Main" className="mt-8">
            <ul className="divide-border/30 flex flex-col divide-y">
              {NAV_LINKS.map(({ href, label }) => (
                <motion.li
                  key={href}
                  className="relative py-4 first:pt-0 last:pb-0"
                  whileHover="hover"
                  initial="initial"
                >
                  <Link href={href} className="relative block">
                    <div className="relative flex items-center justify-between">
                      <motion.div
                        className="text-lg font-medium tracking-wide"
                        variants={{
                          initial: { x: 0 },
                          hover: { x: translateAmount },
                        }}
                        transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                      >
                        {label}
                      </motion.div>
                      <motion.div
                        className="text-muted-foreground absolute right-0"
                        variants={{
                          initial: { opacity: 0, x: translateAmount },
                          hover: { opacity: 1, x: 0 },
                        }}
                        transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                      >
                        <CaretRightIcon className="size-4" />
                      </motion.div>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="space-y-6">
          <div className="border-border/30 border-t pt-6">
            <Link
              href="/contact"
              className="bg-foreground text-background hover:bg-foreground/90 group flex w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 font-medium transition-colors"
            >
              <span>Get in touch</span>
              <ArrowTopRightIcon
                className="size-4 transition-transform duration-300 group-hover:rotate-45"
                aria-hidden="true"
              />
            </Link>
          </div>

          <SheetFooter className="border-border border-t pt-6">
            <ul className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ href, icon: Icon }) => (
                <li key={href}>
                  <Link
                    className="border-border hover:bg-accent/50 flex size-9 items-center justify-center rounded-full border transition-all duration-200 ease-out"
                    href={href}
                  >
                    <Icon className="size-4" />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  className="border-border hover:bg-accent/50 flex size-9 items-center justify-center rounded-full border transition-all duration-200 ease-out"
                  href={`mailto:${config.contactEmail}`}
                >
                  <Mail className="size-4" />
                </Link>
              </li>
            </ul>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};
