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
            <ul className="flex flex-col">
              {NAV_LINKS.map(({ href, label, sublinks }) => (
                <li
                  key={href}
                  className="border-border/50 flex flex-col border-t first:border-none"
                >
                  <motion.div
                    className="relative py-4"
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
                          transition={{
                            duration: 0.2,
                            ease: [0.32, 0.72, 0, 1],
                          }}
                        >
                          {label}
                        </motion.div>
                        <motion.div
                          className="text-muted-foreground absolute right-0"
                          variants={{
                            initial: { opacity: 0, x: translateAmount },
                            hover: { opacity: 1, x: 0 },
                          }}
                          transition={{
                            duration: 0.2,
                            ease: [0.32, 0.72, 0, 1],
                          }}
                        >
                          <CaretRightIcon className="size-4" />
                        </motion.div>
                      </div>
                    </Link>
                  </motion.div>

                  {sublinks && sublinks.links.length > 0 && (
                    <ul className="space-y-1 pb-4">
                      {sublinks.links.map((sublink) => (
                        <motion.li
                          key={sublink.href}
                          whileHover="hover"
                          initial="initial"
                          className="pl-2"
                        >
                          <Link
                            href={sublink.href}
                            className="hover:text-foreground text-muted-foreground relative flex items-center justify-between py-2 text-sm font-medium tracking-wide transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <motion.div
                                className="text-muted-foreground h-px w-3 bg-current opacity-60"
                                variants={{
                                  initial: { width: 12 },
                                  hover: { width: 18, opacity: 1 },
                                }}
                                transition={{
                                  duration: 0.2,
                                  ease: [0.32, 0.72, 0, 1],
                                }}
                                aria-hidden="true"
                              />
                              <motion.span
                                variants={{
                                  initial: { x: 0 },
                                  hover: { x: translateAmount / 2 },
                                }}
                                transition={{
                                  duration: 0.2,
                                  ease: [0.32, 0.72, 0, 1],
                                }}
                              >
                                {sublink.label}
                              </motion.span>
                            </div>
                            <motion.div
                              className="text-muted-foreground"
                              variants={{
                                initial: { opacity: 0, x: translateAmount },
                                hover: { opacity: 1, x: 0 },
                              }}
                              transition={{
                                duration: 0.2,
                                ease: [0.32, 0.72, 0, 1],
                              }}
                            >
                              <CaretRightIcon className="size-3" />
                            </motion.div>
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div>
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

          <SheetFooter className="border-border mt-6 border-t pt-6">
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
